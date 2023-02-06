<?php

namespace App\Http\Controllers\Backend\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Catalog\ProductAddress;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProductAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($product_id)
    {
        $result_query = QueryBuilder::for(ProductAddress::with(['product:id,name','addressWithProviderAndState'])
            ->select('id', 'enabled', 'provider_address_id', 'product_id')
            ->where('product_id', '=', $product_id)->where('removed', '=', 0))
//            ->defaultSort('-pack.name')
//            ->allowedSorts(['pack.name', 'product.name', 'enabled'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-address_with_provider.address', new StartsWithFilter(), 'address_with_provider.address'),
                AllowedFilter::custom('ends-with-product_with_provider.address', new EndsWithFilter(), 'address_with_provider.address'),
                AllowedFilter::custom('contains-product_with_provider.address', new ContainsFilter(), 'address_with_provider.address'),
                AllowedFilter::custom('matches-product_with_provider.address', new MatchesFilter(), 'address_with_provider.address'),
                AllowedFilter::custom('greater-than-product_with_provider.address', new GreaterThanFilter(), 'address_with_provider.address'),
                AllowedFilter::custom('less-than-product_with_provider.address', new LessThanFilter(), 'address_with_provider.address'),

                AllowedFilter::custom('starts-with-address_with_provider.phone', new StartsWithFilter(), 'address_with_provider.phone'),
                AllowedFilter::custom('ends-with-address_with_provider.phone', new EndsWithFilter(), 'address_with_provider.phone'),
                AllowedFilter::custom('contains-address_with_provider.phone', new ContainsFilter(), 'address_with_provider.phone'),
                AllowedFilter::custom('matches-address_with_provider.phone', new MatchesFilter(), 'address_with_provider.phone'),
                AllowedFilter::custom('greater-than-address_with_provider.phone', new GreaterThanFilter(), 'address_with_provider.phone'),
                AllowedFilter::custom('less-than-address_with_provider.phone', new LessThanFilter(), 'address_with_provider.phone'),

                AllowedFilter::custom('starts-with-address_with_provider.email', new StartsWithFilter(), 'address_with_provider.email'),
                AllowedFilter::custom('ends-with-address_with_provider.email', new EndsWithFilter(), 'address_with_provider.email'),
                AllowedFilter::custom('contains-address_with_provider.email', new ContainsFilter(), 'address_with_provider.email'),
                AllowedFilter::custom('matches-address_with_provider.email', new MatchesFilter(), 'address_with_provider.email'),
                AllowedFilter::custom('greater-than-address_with_provider.email', new GreaterThanFilter(), 'address_with_provider.email'),
                AllowedFilter::custom('less-than-address_with_provider.email', new LessThanFilter(), 'address_with_provider.email')

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
        $provider_address_id = $request->get('provider_address_id', null);
        $product_id = $request->get('product_id', null);

        $data = $request->except('created_at', 'updated_at', 'removed');
        $item = ProductAddress::where('provider_address_id', '=', $provider_address_id)
            ->where('product_id', '=', $product_id)
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
            if(!ProductAddress::create($data)){
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
        $item = ProductAddress::with(['addressWithProviderAndState:id,name, address,state_id', 'product:id,name,sku'])->find($id);
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
        $item = ProductAddress::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('La Dirección fue eliminada correctamente', 200);
            }
            return response_json('La Dirección fue no fue eliminada, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar La Dirección, intente nuevamente', 401);
    }

}
