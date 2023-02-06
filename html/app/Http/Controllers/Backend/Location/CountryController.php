<?php

namespace App\Http\Controllers\Backend\Location;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Location\Country;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result_query = QueryBuilder::for(Country::select('id', 'name', 'enabled')->where('removed', '=', 0))
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
        $name = $request->get('name', null);
        $data = $request->except('created_at', 'updated_at', 'removed');
        $item = Country::where('name', '=', $name)->first();

        if($item){
            if($item->removed){
                $item->removed = 0;
                $item->update($data);
                if(!$item->save()){
                    return response_json('El País fue no fue creado, intente nuevamente', 401);
                }
            }else{
                return response_json('El País ya existe, intente nuevamente', 401);
            }
        }else{
            if(!Country::create($data)){
                return response_json('El País no fue creado, intente nuevamente', 401);
            }
        }
        return response_json('El País fue creado correctamente', 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Country::find($id);
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
        $item = Country::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('El País fue eliminado correctamente', 200);
            }
            return response_json('El País fue no fue eliminado, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar el país, intente nuevamente', 401);
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
        $item = Country::find($id);

        $name = $request->get('name', null);
        $tmp = Country::where('name', '=', $name)->first();
        if($tmp && $tmp->id != $item->id){
            return response_json('El País ya existe, intente nuevamente', 401);
        }

        if(!$item){
            return response_json('El País no fue encontrado, intente nuevamente', 401);
        }
        if(!$item->update($data)){
            return response_json('El País no fue actualizado, intente nuevamente', 401);
        }
        return response_json('El País fue actualizado correctamente', 200);

    }

    public function getCountries(){
        $countries = Country::select('id', 'name')
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)
            ->get();
        return response_json('OK', 200, $countries);
    }

}
