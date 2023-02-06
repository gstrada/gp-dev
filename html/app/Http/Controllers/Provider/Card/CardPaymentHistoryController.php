<?php

namespace App\Http\Controllers\Provider\Card;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\ServiceProvider\ProviderTransaction;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CardPaymentHistoryController extends Controller
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

        $result_query = QueryBuilder::for(ProviderTransaction::where('provider_id', $provider_id)->where('old_system', 0)->select(
            'id', 'amount', 'reference_id', 'reference_file', 'transaction_file', 'paid', 'date_paid', 'created_at'))
            ->defaultSort('-created_at')
            ->allowedSorts(['reference_id', 'date_paid', 'created_at', 'paid'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-reference_id', new StartsWithFilter(), 'reference_id'),
                AllowedFilter::custom('ends-with-reference_id', new EndsWithFilter(), 'reference_id'),
                AllowedFilter::custom('contains-reference_id', new ContainsFilter(), 'reference_id'),
                AllowedFilter::custom('matches-reference_id', new MatchesFilter(), 'reference_id'),
                AllowedFilter::custom('greater-than-reference_id', new GreaterThanFilter(), 'reference_id'),
                AllowedFilter::custom('less-than-reference_id', new LessThanFilter(), 'reference_id'),

                AllowedFilter::custom('starts-with-amount', new StartsWithFilter(), 'amount'),
                AllowedFilter::custom('ends-with-amount', new EndsWithFilter(), 'amount'),
                AllowedFilter::custom('contains-amount', new ContainsFilter(), 'amount'),
                AllowedFilter::custom('matches-amount', new MatchesFilter(), 'amount'),
                AllowedFilter::custom('greater-than-amount', new GreaterThanFilter(), 'amount'),
                AllowedFilter::custom('less-than-amount', new LessThanFilter(), 'amount'),


                AllowedFilter::custom('starts-with-date_paid', new StartsWithFilter(), 'date_paid'),
                AllowedFilter::custom('ends-with-date_paid', new EndsWithFilter(), 'date_paid'),
                AllowedFilter::custom('contains-date_paid', new ContainsFilter(), 'date_paid'),
                AllowedFilter::custom('matches-date_paid', new MatchesFilter(), 'date_paid'),
                AllowedFilter::custom('greater-than-date_paid', new GreaterThanFilter(), 'date_paid'),
                AllowedFilter::custom('less-than-date_paid', new LessThanFilter(), 'date_paid'),

                AllowedFilter::custom('starts-with-created_at', new StartsWithFilter(), 'created_at'),
                AllowedFilter::custom('ends-with-created_at', new EndsWithFilter(), 'created_at'),
                AllowedFilter::custom('contains-created_at', new ContainsFilter(), 'created_at'),
                AllowedFilter::custom('matches-created_at', new MatchesFilter(), 'created_at'),
                AllowedFilter::custom('greater-than-created_at', new GreaterThanFilter(), 'created_at'),
                AllowedFilter::custom('less-than-created_at', new LessThanFilter(), 'created_at')


            );
        $result = $result_query->jsonPaginate();
        return response_json('OK', 200, $result);

    }

}
