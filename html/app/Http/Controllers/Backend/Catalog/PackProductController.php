<?php

namespace App\Http\Controllers\Backend\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Catalog\PackProduct;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PackProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($pack_id)
    {
        $result_query = QueryBuilder::for(PackProduct::with('pack:id,name')->with('productWithProvider:id,provider_id,name,sku,short_description')
            ->select('id', 'enabled', 'pack_id', 'product_id')
            ->where('pack_id', '=', $pack_id)->where('removed', '=', 0))
//            ->defaultSort('-pack.name')
//            ->allowedSorts(['pack.name', 'product.name', 'enabled'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-product_with_provider.name', new StartsWithFilter(), 'product_with_provider.name'),
                AllowedFilter::custom('ends-with-product_with_provider.name', new EndsWithFilter(), 'product_with_provider.name'),
                AllowedFilter::custom('contains-product_with_provider.name', new ContainsFilter(), 'product_with_provider.name'),
                AllowedFilter::custom('matches-product_with_provider.name', new MatchesFilter(), 'product_with_provider.name'),
                AllowedFilter::custom('greater-than-product_with_provider.name', new GreaterThanFilter(), 'product_with_provider.name'),
                AllowedFilter::custom('less-than-product_with_provider.name', new LessThanFilter(), 'product_with_provider.name'),

                AllowedFilter::custom('starts-with-product_with_provider.sku', new StartsWithFilter(), 'product_with_provider.sku'),
                AllowedFilter::custom('ends-with-product_with_provider.sku', new EndsWithFilter(), 'product_with_provider.sku'),
                AllowedFilter::custom('contains-product_with_provider.sku', new ContainsFilter(), 'product_with_provider.sku'),
                AllowedFilter::custom('matches-product_with_provider.sku', new MatchesFilter(), 'product_with_provider.sku'),
                AllowedFilter::custom('greater-than-product_with_provider.sku', new GreaterThanFilter(), 'product_with_provider.sku'),
                AllowedFilter::custom('less-than-product_with_provider.sku', new LessThanFilter(), 'product_with_provider.sku'),

                AllowedFilter::custom('starts-with-product_with_provider.short_description', new StartsWithFilter(), 'product_with_provider.short_description'),
                AllowedFilter::custom('ends-with-product_with_provider.short_description', new EndsWithFilter(), 'product_with_provider.short_description'),
                AllowedFilter::custom('contains-product_with_provider.short_description', new ContainsFilter(), 'product_with_provider.short_description'),
                AllowedFilter::custom('matches-product_with_provider.short_description', new MatchesFilter(), 'product_with_provider.short_description'),
                AllowedFilter::custom('greater-than-product_with_provider.short_description', new GreaterThanFilter(), 'product_with_provider.short_description'),
                AllowedFilter::custom('less-than-product_with_provider.short_description', new LessThanFilter(), 'product_with_provider.short_description'),

                AllowedFilter::custom('starts-with-pack.name', new StartsWithFilter(), 'pack.name'),
                AllowedFilter::custom('ends-with-pack.name', new EndsWithFilter(), 'pack.name'),
                AllowedFilter::custom('contains-pack.name', new ContainsFilter(), 'pack.name'),
                AllowedFilter::custom('matches-pack.name', new MatchesFilter(), 'pack.name'),
                AllowedFilter::custom('greater-than-pack.name', new GreaterThanFilter(), 'pack.name'),
                AllowedFilter::custom('less-than-pack.name', new LessThanFilter(), 'pack.name')

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
        $pack_id = $request->get('pack_id', null);
        $product_id = $request->get('product_id', null);

        $data = $request->except('created_at', 'updated_at', 'removed');
        $item = PackProduct::where('pack_id', '=', $pack_id)
            ->where('product_id', '=', $product_id)
            ->first();
        if($item){
            if($item->removed){
                $item->removed = 0;
                $item->update($data);
                if(!$item->save()){
                    return response_json('El Producto fue no fue creado, intente nuevamente', 401);
                }
            }else{
                return response_json('El Producto ya existe, intente nuevamente', 401);
            }
        }else{
            if(!PackProduct::create($data)){
                return response_json('El Producto no fue creado, intente nuevamente', 401);
            }
        }
        return response_json('El Producto fue creado correctamente', 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = PackProduct::with('pack:id,name')->with('product:id,name,sku')->find($id);
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
        $item = PackProduct::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('El Producto fue eliminado correctamente', 200);
            }
            return response_json('El Producto fue no fue eliminado, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar El Producto, intente nuevamente', 401);
    }

}
