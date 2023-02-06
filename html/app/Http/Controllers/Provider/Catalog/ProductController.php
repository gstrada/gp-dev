<?php

namespace App\Http\Controllers\Provider\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Product;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $user = Auth::user();

        $provider_id = $user->provider_id;

      //     $result_query = QueryBuilder::for(Product::with('category:id,name')->with('provider:id,name')->select(

        $result_query = QueryBuilder::for(Product::with('category:id,name')->with(['provider' => function ($q) {
            $q->where('enabled', 1)->where('removed', 0);
        }])->where('provider_id', '=', $provider_id)->select(
            'id', 'enabled', 'name', 'sku', 'picture', 'internal_price','internal_benefit_discount',
            'short_description', 'friendly_url', 'created_by_provider',
            'approved', 'category_id', 'provider_id', 'metodo_reserva')
            ->whereHas('provider', function($q){
                $q->where('enabled', 1)->where('removed', 0);
            })
            ->where('removed', '=', 0))
            ->defaultSort('name')
            ->allowedSorts(['name', 'sku', 'enabled', 'physical_price', 'digital_price', 'card_price'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-name', new StartsWithFilter(), 'name'),
                AllowedFilter::custom('ends-with-name', new EndsWithFilter(), 'name'),
                AllowedFilter::custom('contains-name', new ContainsFilter(), 'name'),
                AllowedFilter::custom('matches-name', new MatchesFilter(), 'name'),
                AllowedFilter::custom('greater-than-name', new GreaterThanFilter(), 'name'),
                AllowedFilter::custom('less-than-name', new LessThanFilter(), 'name'),

                AllowedFilter::custom('starts-with-category.name', new StartsWithFilter(), 'category.name'),
                AllowedFilter::custom('ends-with-category.name', new EndsWithFilter(), 'category.name'),
                AllowedFilter::custom('contains-category.name', new ContainsFilter(), 'category.name'),
                AllowedFilter::custom('matches-category.name', new MatchesFilter(), 'category.name'),
                AllowedFilter::custom('greater-than-category.name', new GreaterThanFilter(), 'category.name'),
                AllowedFilter::custom('less-than-category.name', new LessThanFilter(), 'category.name'),

                AllowedFilter::custom('starts-with-provider.name', new StartsWithFilter(), 'provider.name'),
                AllowedFilter::custom('ends-with-provider.name', new EndsWithFilter(), 'provider.name'),
                AllowedFilter::custom('contains-provider.name', new ContainsFilter(), 'provider.name'),
                AllowedFilter::custom('matches-provider.name', new MatchesFilter(), 'provider.name'),
                AllowedFilter::custom('greater-than-provider.name', new GreaterThanFilter(), 'provider.name'),
                AllowedFilter::custom('less-than-provider.name', new LessThanFilter(), 'provider.name'),

                AllowedFilter::custom('starts-with-sku', new StartsWithFilter(), 'sku'),
                AllowedFilter::custom('ends-with-sku', new EndsWithFilter(), 'sku'),
                AllowedFilter::custom('contains-sku', new ContainsFilter(), 'sku'),
                AllowedFilter::custom('matches-sku', new MatchesFilter(), 'sku'),
                AllowedFilter::custom('greater-than-sku', new GreaterThanFilter(), 'sku'),
                AllowedFilter::custom('less-than-sku', new LessThanFilter(), 'sku'),

                AllowedFilter::custom('starts-with-short_description', new StartsWithFilter(), 'short_description'),
                AllowedFilter::custom('ends-with-short_description', new EndsWithFilter(), 'short_description'),
                AllowedFilter::custom('contains-short_description', new ContainsFilter(), 'short_description'),
                AllowedFilter::custom('matches-short_description', new MatchesFilter(), 'short_description'),
                AllowedFilter::custom('greater-than-short_description', new GreaterThanFilter(), 'short_description'),
                AllowedFilter::custom('less-than-short_description', new LessThanFilter(), 'short_description'),

                AllowedFilter::custom('starts-with-friendly_url', new StartsWithFilter(), 'friendly_url'),
                AllowedFilter::custom('ends-with-friendly_url', new EndsWithFilter(), 'friendly_url'),
                AllowedFilter::custom('contains-friendly_url', new ContainsFilter(), 'friendly_url'),
                AllowedFilter::custom('matches-friendly_url', new MatchesFilter(), 'friendly_url'),
                AllowedFilter::custom('greater-than-friendly_url', new GreaterThanFilter(), 'friendly_url'),
                AllowedFilter::custom('less-than-friendly_url', new LessThanFilter(), 'friendly_url')

            );
        $result = $result_query->jsonPaginate();
        return response_json('OK', 200, $result);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Product::find($id);
        return response_json('OK', 200, $item);
    }
}
