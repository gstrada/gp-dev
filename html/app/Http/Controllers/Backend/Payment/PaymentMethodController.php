<?php

namespace App\Http\Controllers\Backend\Payment;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Payment\PaymentMethod;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result_query = QueryBuilder::for(PaymentMethod::select('id', 'name', 'slug', 'enabled', 'enabled_for_all_subitems')->where('removed', '=', 0))
            ->defaultSort('name')
            ->allowedSorts(['name', 'slug', 'enabled'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-name', new StartsWithFilter(), 'name'),
                AllowedFilter::custom('ends-with-name', new EndsWithFilter(), 'name'),
                AllowedFilter::custom('contains-name', new ContainsFilter(), 'name'),
                AllowedFilter::custom('matches-name', new MatchesFilter(), 'name'),
                AllowedFilter::custom('greater-than-name', new GreaterThanFilter(), 'name'),
                AllowedFilter::custom('less-than-name', new LessThanFilter(), 'name'),

                 AllowedFilter::custom('starts-with-slug', new StartsWithFilter(), 'slug'),
                AllowedFilter::custom('ends-with-slug', new EndsWithFilter(), 'slug'),
                AllowedFilter::custom('contains-slug', new ContainsFilter(), 'slug'),
                AllowedFilter::custom('matches-slug', new MatchesFilter(), 'slug'),
                AllowedFilter::custom('greater-than-slug', new GreaterThanFilter(), 'slug'),
                AllowedFilter::custom('less-than-slug', new LessThanFilter(), 'slug')
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
        $slug = $request->get('slug', null);
        $data = $request->except('created_at', 'updated_at', 'removed');
        $item = PaymentMethod::where('slug', '=', $slug)->first();
        if($item){
            if($item->removed){
                $item->removed = 0;
                $item->update($data);
                if(!$item->save()){
                    return response_json('El Método de pago fue no fue creado, intente nuevamente', 401);
                }
            }else{
                return response_json('El Método de pago ya existe, intente nuevamente', 401);
            }
        }else{
            if(!PaymentMethod::create($data)){
                return response_json('El Método de pago no fue creado, intente nuevamente', 401);
            }
        }
        return response_json('El Método de pago fue creado correctamente', 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = PaymentMethod::find($id);
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
        $item = PaymentMethod::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('El Método de pago fue eliminado correctamente', 200);
            }
            return response_json('El Método de pago fue no fue eliminado, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar el Método de pago, intente nuevamente', 401);
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
        $item = PaymentMethod::find($id);

        $slug = $request->get('slug', null);
        $tmp = PaymentMethod::where('slug', '=', $slug)->first();
        if($tmp && $tmp->id != $item->id){
            return response_json('El Método de pago ya existe, intente nuevamente', 401);
        }
        if(!$item){
            return response_json('El Método de pago no fue encontrado, intente nuevamente', 401);
        }
        if(!$item->update($data)){
            return response_json('El Método de pago no fue actualizado, intente nuevamente', 401);
        }
        return response_json('El Método de pago fue actualizado correctamente', 200);

    }
}
