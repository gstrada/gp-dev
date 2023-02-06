<?php

namespace App\Http\Controllers\Provider\Card;

use App\Http\Controllers\Controller;
use App\Models\Card\Card;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CardHistoryController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();

        $result = [];
        if($user){

            $provider_id = $user->provider_id;

            $result_query = QueryBuilder::for(Card::with('usedOnProduct', 'providerTransaction')->select(
                'id', 'number', 'custom_number', 'used_on_product_id', 'date_used', 'provider_transaction_id')
                ->whereHas('usedOnProduct', function($q) use ($provider_id){
                    $q->where('provider_id', $provider_id);
                })
                ->where('used', '=', 1))
                ->defaultSort('-date_used')
                ->allowedSorts(['number', 'custom_number', 'date_used'])
                ->allowedFilters(

                    AllowedFilter::custom('starts-with-provider_transaction.id', new StartsWithFilter(), 'providerTransaction.id'),
                    AllowedFilter::custom('ends-with-provider_transaction.id', new EndsWithFilter(), 'providerTransaction.id'),
                    AllowedFilter::custom('contains-provider_transaction.id', new ContainsFilter(), 'providerTransaction.id'),
                    AllowedFilter::custom('matches-provider_transaction.id', new MatchesFilter(), 'providerTransaction.id'),
                    AllowedFilter::custom('greater-than-provider_transaction.id', new GreaterThanFilter(), 'providerTransaction.id'),
                    AllowedFilter::custom('less-than-provider_transaction.id', new LessThanFilter(), 'providerTransaction.id'),

                    AllowedFilter::custom('starts-with-number', new StartsWithFilter(), 'number'),
                    AllowedFilter::custom('ends-with-number', new EndsWithFilter(), 'number'),
                    AllowedFilter::custom('contains-number', new ContainsFilter(), 'number'),
                    AllowedFilter::custom('matches-number', new MatchesFilter(), 'number'),
                    AllowedFilter::custom('greater-than-number', new GreaterThanFilter(), 'number'),
                    AllowedFilter::custom('less-than-number', new LessThanFilter(), 'number'),

                    AllowedFilter::custom('starts-with-custom_number', new StartsWithFilter(), 'custom_number'),
                    AllowedFilter::custom('ends-with-custom_number', new EndsWithFilter(), 'custom_number'),
                    AllowedFilter::custom('contains-custom_number', new ContainsFilter(), 'custom_number'),
                    AllowedFilter::custom('matches-custom_number', new MatchesFilter(), 'custom_number'),
                    AllowedFilter::custom('greater-than-custom_number', new GreaterThanFilter(), 'custom_number'),
                    AllowedFilter::custom('less-than-custom_number', new LessThanFilter(), 'custom_number'),

                    AllowedFilter::custom('starts-with-date_used', new StartsWithFilter(), 'date_used'),
                    AllowedFilter::custom('ends-with-date_used', new EndsWithFilter(), 'date_used'),
                    AllowedFilter::custom('contains-date_used', new ContainsFilter(), 'date_used'),
                    AllowedFilter::custom('matches-date_used', new MatchesFilter(), 'date_used'),
                    AllowedFilter::custom('greater-than-date_used', new GreaterThanFilter(), 'date_used'),
                    AllowedFilter::custom('less-than-date_used', new LessThanFilter(), 'date_used'),

                    AllowedFilter::custom('starts-with-used_on_product.name', new StartsWithFilter(), 'usedOnProduct.name'),
                    AllowedFilter::custom('ends-with-used_on_product.name', new EndsWithFilter(), 'usedOnProduct.name'),
                    AllowedFilter::custom('contains-used_on_product.name', new ContainsFilter(), 'usedOnProduct.name'),
                    AllowedFilter::custom('matches-used_on_product.name', new MatchesFilter(), 'usedOnProduct.name'),
                    AllowedFilter::custom('greater-than-used_on_product.name', new GreaterThanFilter(), 'usedOnProduct.name'),
                    AllowedFilter::custom('less-than-used_on_product.name', new LessThanFilter(), 'usedOnProduct.name'),

                    AllowedFilter::custom('starts-with-used_on_product.internal_price', new StartsWithFilter(), 'usedOnProduct.internal_price'),
                    AllowedFilter::custom('ends-with-used_on_product.internal_price', new EndsWithFilter(), 'usedOnProduct.internal_price'),
                    AllowedFilter::custom('contains-used_on_product.internal_price', new ContainsFilter(), 'usedOnProduct.internal_price'),
                    AllowedFilter::custom('matches-used_on_product.internal_price', new MatchesFilter(), 'usedOnProduct.internal_price'),
                    AllowedFilter::custom('greater-than-used_on_product.internal_price', new GreaterThanFilter(), 'usedOnProduct.internal_price'),
                    AllowedFilter::custom('less-than-used_on_product.internal_price', new LessThanFilter(), 'usedOnProduct.internal_price'),

                    AllowedFilter::custom('starts-with-provider_transaction.reference_id', new StartsWithFilter(), 'providerTransaction.reference_id'),
                    AllowedFilter::custom('ends-with-provider_transaction.reference_id', new EndsWithFilter(), 'providerTransaction.reference_id'),
                    AllowedFilter::custom('contains-provider_transaction.reference_id', new ContainsFilter(), 'providerTransaction.reference_id'),
                    AllowedFilter::custom('matches-provider_transaction.reference_id', new MatchesFilter(), 'providerTransaction.reference_id'),
                    AllowedFilter::custom('greater-than-provider_transaction.reference_id', new GreaterThanFilter(), 'providerTransaction.reference_id'),
                    AllowedFilter::custom('less-than-provider_transaction.reference_id', new LessThanFilter(), 'providerTransaction.reference_id'),

                    AllowedFilter::custom('starts-with-provider_transaction.created_at', new StartsWithFilter(), 'providerTransaction.created_at'),
                    AllowedFilter::custom('ends-with-provider_transaction.created_at', new EndsWithFilter(), 'providerTransaction.created_at'),
                    AllowedFilter::custom('contains-provider_transaction.created_at', new ContainsFilter(), 'providerTransaction.created_at'),
                    AllowedFilter::custom('matches-provider_transaction.created_at', new MatchesFilter(), 'providerTransaction.created_at'),
                    AllowedFilter::custom('greater-than-provider_transaction.created_at', new GreaterThanFilter(), 'providerTransaction.created_at'),
                    AllowedFilter::custom('less-than-provider_transaction.created_at', new LessThanFilter(), 'providerTransaction.created_at')
                );
            $result = $result_query->jsonPaginate();
            $result->getCollection()->transform(function ($card){
                $card->price_to_pay = 0;
                if($card->usedOnProduct){
                    $card->price_to_pay = $card->usedOnProduct->internal_price - ($card->usedOnProduct->internal_benefit_discount * $card->usedOnProduct->internal_price) / 100 ;
                }
                return $card;
            });
        }


        return response_json('OK', 200, $result);

    }
}
