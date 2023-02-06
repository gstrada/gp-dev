<?php

namespace App\Http\Controllers\Backend\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Discount;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result_query = QueryBuilder::for(Discount::select('id', 'enabled', 'code', 'rate', 'one_time_use')
            ->where('removed', '=', 0))
            ->defaultSort('code')
            ->allowedSorts(['code', 'enabled'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-code', new StartsWithFilter(), 'code'),
                AllowedFilter::custom('ends-with-code', new EndsWithFilter(), 'code'),
                AllowedFilter::custom('contains-code', new ContainsFilter(), 'code'),
                AllowedFilter::custom('matches-code', new MatchesFilter(), 'code'),
                AllowedFilter::custom('greater-than-code', new GreaterThanFilter(), 'code'),
                AllowedFilter::custom('less-than-code', new LessThanFilter(), 'code'),

                AllowedFilter::custom('starts-with-rate', new StartsWithFilter(), 'rate'),
                AllowedFilter::custom('ends-with-rate', new EndsWithFilter(), 'rate'),
                AllowedFilter::custom('contains-rate', new ContainsFilter(), 'rate'),
                AllowedFilter::custom('matches-rate', new MatchesFilter(), 'rate'),
                AllowedFilter::custom('greater-than-rate', new GreaterThanFilter(), 'rate'),
                AllowedFilter::custom('less-than-rate', new LessThanFilter(), 'rate')


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
        $code = $request->get('code', null);

        $data = $request->except('created_at', 'updated_at', 'removed', 'picture');
        $item = Discount::where('code', '=', $code)->first();
        if($item){
            if($item->removed){
                $item->removed = 0;
                $item->update($data);
                if(!$item->save()){
                    return response_json('La Descuento fue no fue creado, intente nuevamente', 401);
                }
            }else{
                return response_json('La Descuento ya existe, intente nuevamente', 401);
            }
        }else{
            if(!$item = Discount::create($data)){
                return response_json('La Descuento no fue creado, intente nuevamente', 401);
            }
        }
        return response_json('La Descuento fue creado correctamente', 200, $item);

    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Discount::find($id);
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
        $item = Discount::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('La Descuento fue eliminado correctamente', 200);
            }
            return response_json('La Descuento fue no fue eliminado, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar el Descuento, intente nuevamente', 401);
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
        $item = Discount::find($id);

        $code = $request->get('code', null);


        $tmp = Discount::where('code', '=', $code)->first();
        if($tmp && $tmp->id != $item->id){
            return response_json('La Descuento ya existe, intente nuevamente', 401);
        }
        if(!$item){
            return response_json('La Descuento no fue encontrado, intente nuevamente', 401);
        }
        if(!$item->update($data)){
            return response_json('La Descuento no fue actualizado, intente nuevamente', 401);
        }
        return response_json('La Descuento fue actualizado correctamente', 200, $item);

    }

    public function getJsonDiscounts(){
        $categories = Discount::select('id', 'code', 'rate', 'one_time_use')
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)
            ->get();
        return response_json('OK', 200, $categories);
    }
}
