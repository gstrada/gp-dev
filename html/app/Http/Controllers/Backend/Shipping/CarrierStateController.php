<?php

namespace App\Http\Controllers\Backend\Shipping;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Shipping\CarrierState;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CarrierStateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($carrier_id)
    {
        $result_query = QueryBuilder::for(CarrierState::with('carrier:id,name,description')->with('state:id,name')->select('id', 'enabled', 'carrier_id', 'state_id', 'price', 'free_if_order_above', 'enabled_for_all_subitems')
            ->where('carrier_id', '=', $carrier_id)->where('removed', '=', 0))
//            ->defaultSort('-carrier.name')
//            ->allowedSorts(['carrier.name', 'state.name', 'enabled'])
            ->allowedFilters(
//                AllowedFilter::custom('starts-with-carrier.name', new StartsWithFilter(), 'carrier.name'),
//                AllowedFilter::custom('ends-with-carrier.name', new EndsWithFilter(), 'carrier.name'),
//                AllowedFilter::custom('contains-carrier.name', new ContainsFilter(), 'carrier.name'),
//                AllowedFilter::custom('matches-carrier.name', new MatchesFilter(), 'carrier.name'),
//                AllowedFilter::custom('greater-than-carrier.name', new GreaterThanFilter(), 'carrier.name'),
//                AllowedFilter::custom('less-than-carrier.name', new LessThanFilter(), 'carrier.name'),

                AllowedFilter::custom('starts-with-state.name', new StartsWithFilter(), 'state.name'),
                AllowedFilter::custom('ends-with-state.name', new EndsWithFilter(), 'state.name'),
                AllowedFilter::custom('contains-state.name', new ContainsFilter(), 'state.name'),
                AllowedFilter::custom('matches-state.name', new MatchesFilter(), 'state.name'),
                AllowedFilter::custom('greater-than-state.name', new GreaterThanFilter(), 'state.name'),
                AllowedFilter::custom('less-than-state.name', new LessThanFilter(), 'state.name')
            );

        $result = $result_query->jsonPaginate();
        return response_json('OK', 200, $result);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $carrier_id = $request->get('carrier_id', null);
        $state_id = $request->get('state_id', null);
        $data = $request->except('created_at', 'updated_at', 'removed');
        $item = CarrierState::where('carrier_id', '=', $carrier_id)->where('state_id', '=', $state_id)->first();
        if($item){
            if($item->removed){
                $item->removed = 0;
                $item->update($data);
                if(!$item->save()){
                    return response_json('La Provincia fue no fue creada, intente nuevamente', 401);
                }
            }else{
                return response_json('La Provincia ya existe, intente nuevamente', 401);
            }
        }else{
            if(!CarrierState::create($data)){
                return response_json('La Provincia no fue creada, intente nuevamente', 401);
            }
        }
        return response_json('La Provincia fue creada correctamente', 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = CarrierState::with('state')->with('carrier')->find($id);
        return response_json('OK', 200, $item);
    }

    /**
     * Remove a created resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function remove(Request $request)
    {
        $id = $request->get('id', null);
        $item = CarrierState::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('La Provincia fue eliminada correctamente', 200);
            }
            return response_json('La Provincia fue no fue eliminada, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar La Provincia, intente nuevamente', 401);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $id = $request->get('id', null);
        $data = $request->except('created_at', 'updated_at');
        $item = CarrierState::find($id);

        $carrier_id = $request->get('carrier_id', null);
        $state_id = $request->get('state_id', null);
        $tmp = CarrierState::where('carrier_id', '=', $carrier_id)->where('state_id', '=', $state_id)->first();

        if($tmp && $tmp->id != $item->id){
            if($tmp->removed === 0){
                return response_json('La Provincia ya existe, intente nuevamente', 401);
            }
            $original = clone $item;
            $item = $tmp;
            //$original->state_id = $tmp->state_id;
            $original->removed = 1;
            $original->save();
            //return response_json('La aaa ya existe, intente nuevamente', 401);
        }

        if(!$item){
            return response_json('La Provincia no fue encontrada, intente nuevamente', 401);
        }
        if(!$item->update($data)){
            return response_json('La Provincia no fue actualizada, intente nuevamente', 401);
        }
        return response_json('La Provincia fue actualizada correctamente', 200);

    }
}
