<?php

namespace App\Http\Controllers\Backend\Payment;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Payment\PaymentMethodCity;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PaymentMethodCityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($payment_method_state_id)
    {
        $result_query = QueryBuilder::for(PaymentMethodCity::with('payment_method')->with('cityWithState')->select('id', 'enabled', 'payment_method_state_id', 'city_id', 'price')
            ->where('payment_method_state_id', '=', $payment_method_state_id)->where('removed', '=', 0))
//            ->defaultSort('-payment_method.name')
//            ->allowedSorts(['payment_method.name', 'city.name', 'enabled'])
            ->allowedFilters(
//                AllowedFilter::custom('starts-with-payment_method.name', new StartsWithFilter(), 'payment_method.name'),
//                AllowedFilter::custom('ends-with-payment_method.name', new EndsWithFilter(), 'payment_method.name'),
//                AllowedFilter::custom('contains-payment_method.name', new ContainsFilter(), 'payment_method.name'),
//                AllowedFilter::custom('matches-payment_method.name', new MatchesFilter(), 'payment_method.name'),
//                AllowedFilter::custom('greater-than-payment_method.name', new GreaterThanFilter(), 'payment_method.name'),
//                AllowedFilter::custom('less-than-payment_method.name', new LessThanFilter(), 'payment_method.name'),

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
        $payment_method_state_id = $request->get('payment_method_state_id', null);
        $city_id = $request->get('city_id', null);
        $data = $request->except('created_at', 'updated_at', 'removed');
        $item = PaymentMethodCity::where('payment_method_state_id', '=', $payment_method_state_id)->where('city_id', '=', $city_id)->first();
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
            if(!PaymentMethodCity::create($data)){
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
        $item = PaymentMethodCity::with('city')->find($id);
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
        $item = PaymentMethodCity::find($id);
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
        $item = PaymentMethodCity::find($id);

        $payment_method_state_id = $request->get('payment_method_state_id', null);
        $city_id = $request->get('city_id', null);
        $tmp = PaymentMethodCity::where('payment_method_state_id', '=', $payment_method_state_id)->where('city_id', '=', $city_id)->first();

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
