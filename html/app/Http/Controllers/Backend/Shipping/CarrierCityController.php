<?php

namespace App\Http\Controllers\Backend\Shipping;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Shipping\CarrierCity;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CarrierCityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($carrier_state_id)
    {
        $result_query = QueryBuilder::for(CarrierCity::with('carrier')->with('cityWithState')->select('id', 'enabled', 'carrier_state_id', 'city_id',  'price', 'free_if_order_above')
            ->where('carrier_state_id', '=', $carrier_state_id)->where('removed', '=', 0))
//            ->defaultSort('-carrier.name')
//            ->allowedSorts(['carrier.name', 'city.name', 'enabled'])
            ->allowedFilters(
//                AllowedFilter::custom('starts-with-carrier.name', new StartsWithFilter(), 'carrier.name'),
//                AllowedFilter::custom('ends-with-carrier.name', new EndsWithFilter(), 'carrier.name'),
//                AllowedFilter::custom('contains-carrier.name', new ContainsFilter(), 'carrier.name'),
//                AllowedFilter::custom('matches-carrier.name', new MatchesFilter(), 'carrier.name'),
//                AllowedFilter::custom('greater-than-carrier.name', new GreaterThanFilter(), 'carrier.name'),
//                AllowedFilter::custom('less-than-carrier.name', new LessThanFilter(), 'carrier.name'),

                AllowedFilter::custom('starts-with-city_with_state.name', new StartsWithFilter(), 'cityWithState.name'),
                AllowedFilter::custom('ends-with-city_with_state.name', new EndsWithFilter(), 'cityWithState.name'),
                AllowedFilter::custom('contains-city_with_state.name', new ContainsFilter(), 'cityWithState.name'),
                AllowedFilter::custom('matches-city_with_state.name', new MatchesFilter(), 'cityWithState.name'),
                AllowedFilter::custom('greater-than-city_with_state.name', new GreaterThanFilter(), 'cityWithState.name'),
                AllowedFilter::custom('less-than-city_with_state.name', new LessThanFilter(), 'cityWithState.name')
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
        $carrier_state_id = $request->get('carrier_state_id', null);
        $city_id = $request->get('city_id', null);
        $data = $request->except('created_at', 'updated_at', 'removed');
        $item = CarrierCity::where('carrier_state_id', '=', $carrier_state_id)->where('city_id', '=', $city_id)->first();
        if($item){
            if($item->removed){
                $item->removed = 0;
                $item->update($data);
                if(!$item->save()){
                    return response_json('La Ciudad fue no fue creada, intente nuevamente', 401);
                }
            }else{
                return response_json('La Ciudad ya existe, intente nuevamente', 401);
            }
        }else{
            if(!CarrierCity::create($data)){
                return response_json('La Ciudad no fue creada, intente nuevamente', 401);
            }
        }
        return response_json('La Ciudad fue creada correctamente', 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = CarrierCity::with('city')->find($id);
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
        $item = CarrierCity::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('La Ciudad fue eliminada correctamente', 200);
            }
            return response_json('La Ciudad fue no fue eliminada, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar La Ciudad, intente nuevamente', 401);
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
        $item = CarrierCity::find($id);

        $carrier_state_id = $request->get('carrier_state_id', null);
        $city_id = $request->get('city_id', null);
        $tmp = CarrierCity::where('carrier_state_id', '=', $carrier_state_id)->where('city_id', '=', $city_id)->first();

        if($tmp && $tmp->id != $item->id){
            if($tmp->removed === 0){
                return response_json('La Ciudad ya existe, intente nuevamente', 401);
            }
            $original = clone $item;
            $item = $tmp;
            //$original->city_id = $tmp->city_id;
            $original->removed = 1;
            $original->save();
            //return response_json('La aaa ya existe, intente nuevamente', 401);
        }

        if(!$item){
            return response_json('La Ciudad no fue encontrada, intente nuevamente', 401);
        }
        if(!$item->update($data)){
            return response_json('La Ciudad no fue actualizada, intente nuevamente', 401);
        }
        return response_json('La Ciudad fue actualizada correctamente', 200);

    }
}
