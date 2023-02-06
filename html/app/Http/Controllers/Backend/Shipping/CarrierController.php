<?php

namespace App\Http\Controllers\Backend\Shipping;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Shipping\Carrier;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CarrierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result_query = QueryBuilder::for(Carrier::select('id', 'name', 'description', 'enabled', 'price', 'free_if_order_above', 'enabled_for_all_subitems')->where('removed', '=', 0))
            ->defaultSort('name')
            ->allowedSorts(['name', 'description', 'enabled'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-name', new StartsWithFilter(), 'name'),
                AllowedFilter::custom('ends-with-name', new EndsWithFilter(), 'name'),
                AllowedFilter::custom('contains-name', new ContainsFilter(), 'name'),
                AllowedFilter::custom('matches-name', new MatchesFilter(), 'name'),
                AllowedFilter::custom('greater-than-name', new GreaterThanFilter(), 'name'),
                AllowedFilter::custom('less-than-name', new LessThanFilter(), 'name'),

                 AllowedFilter::custom('starts-with-description', new StartsWithFilter(), 'description'),
                AllowedFilter::custom('ends-with-description', new EndsWithFilter(), 'description'),
                AllowedFilter::custom('contains-description', new ContainsFilter(), 'description'),
                AllowedFilter::custom('matches-description', new MatchesFilter(), 'description'),
                AllowedFilter::custom('greater-than-description', new GreaterThanFilter(), 'description'),
                AllowedFilter::custom('less-than-description', new LessThanFilter(), 'description')
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
        $name = $request->get('name', null);
        $data = $request->except('created_at', 'updated_at', 'removed');
        $item = Carrier::where('name', '=', $name)->first();
        if($item){
            if($item->removed){
                $item->removed = 0;
                $item->update($data);
                if(!$item->save()){
                    return response_json('El Método de envío fue no fue creado, intente nuevamente', 401);
                }
            }else{
                return response_json('El Método de envío ya existe, intente nuevamente', 401);
            }
        }else{
            if(!Carrier::create($data)){
                return response_json('El Método de envío no fue creado, intente nuevamente', 401);
            }
        }
        return response_json('El Método de envío fue creado correctamente', 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Carrier::find($id);
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
        $item = Carrier::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('El Método de envío fue eliminado correctamente', 200);
            }
            return response_json('El Método de envío fue no fue eliminado, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar el Método de envío, intente nuevamente', 401);
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
        $item = Carrier::find($id);

        $name = $request->get('name', null);
        $tmp = Carrier::where('name', '=', $name)->first();
        if($tmp && $tmp->id != $item->id){
            return response_json('El Método de envío ya existe, intente nuevamente', 401);
        }
        if(!$item){
            return response_json('El Método de envío no fue encontrado, intente nuevamente', 401);
        }
        if(!$item->update($data)){
            return response_json('El Método de envío no fue actualizado, intente nuevamente', 401);
        }
        return response_json('El Método de envío fue actualizado correctamente', 200);

    }
}
