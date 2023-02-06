<?php

namespace App\Http\Controllers\Backend\ServiceProvider;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\ServiceProvider\ProviderAddress;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProviderAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($provider_id)
    {
        $result_query = QueryBuilder::for(ProviderAddress::with('provider')->with('state')->with('city')
            ->select('id', 'enabled', 'provider_id', 'city_id', 'address', 'phone', 'email')
            ->where('provider_id', '=', $provider_id)->where('removed', '=', 0))
//            ->defaultSort('-provider.name')
//            ->allowedSorts(['provider.name', 'state.name', 'enabled'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-state.name', new StartsWithFilter(), 'state.name'),
                AllowedFilter::custom('ends-with-state.name', new EndsWithFilter(), 'state.name'),
                AllowedFilter::custom('contains-state.name', new ContainsFilter(), 'state.name'),
                AllowedFilter::custom('matches-state.name', new MatchesFilter(), 'state.name'),
                AllowedFilter::custom('greater-than-state.name', new GreaterThanFilter(), 'state.name'),
                AllowedFilter::custom('less-than-state.name', new LessThanFilter(), 'state.name'),

                AllowedFilter::custom('starts-with-address', new StartsWithFilter(), 'address'),
                AllowedFilter::custom('ends-with-address', new EndsWithFilter(), 'address'),
                AllowedFilter::custom('contains-address', new ContainsFilter(), 'address'),
                AllowedFilter::custom('matches-address', new MatchesFilter(), 'address'),
                AllowedFilter::custom('greater-than-address', new GreaterThanFilter(), 'address'),
                AllowedFilter::custom('less-than-address', new LessThanFilter(), 'address'),

                AllowedFilter::custom('starts-with-email', new StartsWithFilter(), 'email'),
                AllowedFilter::custom('ends-with-email', new EndsWithFilter(), 'email'),
                AllowedFilter::custom('contains-email', new ContainsFilter(), 'email'),
                AllowedFilter::custom('matches-email', new MatchesFilter(), 'email'),
                AllowedFilter::custom('greater-than-email', new GreaterThanFilter(), 'email'),
                AllowedFilter::custom('less-than-email', new LessThanFilter(), 'email'),

                AllowedFilter::custom('starts-with-phone', new StartsWithFilter(), 'phone'),
                AllowedFilter::custom('ends-with-phone', new EndsWithFilter(), 'phone'),
                AllowedFilter::custom('contains-phone', new ContainsFilter(), 'phone'),
                AllowedFilter::custom('matches-phone', new MatchesFilter(), 'phone'),
                AllowedFilter::custom('greater-than-phone', new GreaterThanFilter(), 'phone'),
                AllowedFilter::custom('less-than-phone', new LessThanFilter(), 'phone')
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
        $provider_id = $request->get('provider_id', null);
        $city_id = $request->get('city_id', null);
        $address = $request->get('address', null);
        $data = $request->except('created_at', 'updated_at', 'removed');
        $item = ProviderAddress::where('provider_id', '=', $provider_id)
            ->where('city_id', '=', $city_id)
            ->where('address', '=', $address)
            ->first();
        if($item){
            if($item->removed){
                $item->removed = 0;
                $item->update($data);
                if(!$item->save()){
                    return response_json('La Dirección fue no fue creada, intente nuevamente', 401);
                }
            }else{
                return response_json('La Dirección ya existe, intente nuevamente', 401);
            }
        }else{
            if(!ProviderAddress::create($data)){
                return response_json('La Dirección no fue creada, intente nuevamente', 401);
            }
        }
        return response_json('La Dirección fue creada correctamente', 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = ProviderAddress::with('city')->with('state')->find($id);
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
        $item = ProviderAddress::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('La Dirección fue eliminada correctamente', 200);
            }
            return response_json('La Dirección fue no fue eliminada, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar La Dirección, intente nuevamente', 401);
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
        $item = ProviderAddress::find($id);

        $provider_id = $request->get('provider_id', null);
        $city_id = $request->get('city_id', null);
        $address = $request->get('address', null);
        $tmp = ProviderAddress::where('provider_id', '=', $provider_id)
            ->where('city_id', '=', $city_id)
            ->where('address', '=', $address)->first();

        if($tmp && $tmp->id != $item->id){
            if($tmp->removed === 0){
                return response_json('La Dirección ya existe, intente nuevamente', 401);
            }
            $original = clone $item;
            $item = $tmp;
            //$original->city_id = $tmp->city_id;
            $original->removed = 1;
            $original->save();
            //return response_json('La aaa ya existe, intente nuevamente', 401);
        }

        if(!$item){
            return response_json('La Dirección no fue encontrada, intente nuevamente', 401);
        }
        if(!$item->update($data)){
            return response_json('La Dirección no fue actualizada, intente nuevamente', 401);
        }
        return response_json('La Dirección fue actualizada correctamente', 200);

    }

    public function getJsonAddressFromProviders($provider_id){
        $providers = ProviderAddress::select('provider_addresses.id', 'provider_addresses.address', 'provider_addresses.city_id')->with('state:states.id,states.name')
            ->where('provider_id', '=', $provider_id)
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)
            ->orderBy('city_id')
            ->get();
        return response_json('OK', 200, $providers);
    }

}
