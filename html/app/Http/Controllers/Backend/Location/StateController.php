<?php

namespace App\Http\Controllers\Backend\Location;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Location\State;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class StateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($country_id)
    {
        $result_query = QueryBuilder::for(State::with('country:id,name')->select('id', 'name', 'enabled', 'country_id')->where('country_id', '=', $country_id)->where('removed', '=', 0))
            ->defaultSort('name')
            ->allowedSorts(['name', 'enabled'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-name', new StartsWithFilter(), 'name'),
                AllowedFilter::custom('ends-with-name', new EndsWithFilter(), 'name'),
                AllowedFilter::custom('contains-name', new ContainsFilter(), 'name'),
                AllowedFilter::custom('matches-name', new MatchesFilter(), 'name'),
                AllowedFilter::custom('greater-than-name', new GreaterThanFilter(), 'name'),
                AllowedFilter::custom('less-than-name', new LessThanFilter(), 'name')

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
        $country_id = $request->get('country_id', null);
        $name = $request->get('name', null);
        $data = $request->except('created_at', 'updated_at', 'removed');
        $item = State::where('country_id', '=', $country_id)->where('name', '=', $name)->first();
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
            if(!State::create($data)){
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
        $item = State::find($id);
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
        $item = State::find($id);
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
        $item = State::find($id);

        $name = $request->get('name', null);
        $tmp = State::where('name', '=', $name)->first();
        if($tmp && $tmp->id != $item->id ){
            return response_json('La Provincia ya existe, intente nuevamente', 401);
        }

        if(!$item){
            return response_json('La Provincia no fue encontrada, intente nuevamente', 401);
        }
        if(!$item->update($data)){
            return response_json('La Provincia no fue actualizado, intente nuevamente', 401);
        }
        return response_json('La Provincia fue actualizado correctamente', 200);

    }

    public function getStates($country_id){
        $states = State::select('id', 'name', 'country_id')
            ->where('country_id', '=', $country_id)
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)
            ->get();
        return response_json('OK', 200, $states);
    }

}
