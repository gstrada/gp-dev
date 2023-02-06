<?php

namespace App\Http\Controllers\Backend\Card;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use App\Models\Reservation\Reservation;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CardReservationController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getReservations()
    {

        $status = Request::capture()->get('status');
        $available_status = ['pending', 'confirmed', 'cancelled'];
        if(!in_array($status,$available_status)){
            $status = 'pending';
        }


        if($status === 'pending'){
            $query = Reservation::where('status', '=', 'pending');
        }
        if($status === 'confirmed'){
            $query = Reservation::where('status', '=', 'confirmed');
        }
        if($status === 'dismissed'){
            $query = Reservation::where('status', '=', 'cancelled');
        }


//        $result_query = QueryBuilder::for($query)
//                                    ->defaultSort('created_at')
//                                    ->allowedSorts(['created_at'])
//                                    ->allowedFilters(
//                                        AllowedFilter::custom('starts-with-experience_selected', new StartsWithFilter(), 'experience_selected'),
//                                        AllowedFilter::custom('ends-with-experience_selected', new EndsWithFilter(), 'experience_selected'),
//                                        AllowedFilter::custom('contains-experience_selected', new ContainsFilter(), 'experience_selected'),
//                                        AllowedFilter::custom('matches-experience_selected', new MatchesFilter(), 'experience_selected'),
//                                        AllowedFilter::custom('greater-than-experience_selected', new GreaterThanFilter(), 'experience_selected'),
//                                        AllowedFilter::custom('less-than-experience_selected', new LessThanFilter(), 'experience_selected'),
//
//                                        AllowedFilter::custom('starts-with-card_code', new StartsWithFilter(), 'card_code'),
//                                        AllowedFilter::custom('ends-with-card_code', new EndsWithFilter(), 'card_code'),
//                                        AllowedFilter::custom('contains-card_code', new ContainsFilter(), 'card_code'),
//                                        AllowedFilter::custom('matches-card_code', new MatchesFilter(), 'card_code'),
//                                        AllowedFilter::custom('greater-than-card_code', new GreaterThanFilter(), 'card_code'),
//                                        AllowedFilter::custom('less-than-card_code', new LessThanFilter(), 'card_code')
//                                        AllowedFilter::custom('starts-with-paid', new StartsWithFilter(), 'paid'),
//                                        AllowedFilter::custom('ends-with-paid', new EndsWithFilter(), 'paid'),
//                                        AllowedFilter::custom('contains-paid', new ContainsFilter(), 'paid'),
//                                        AllowedFilter::custom('matches-paid', new MatchesFilter(), 'paid'),
//                                        AllowedFilter::custom('greater-than-paid', new GreaterThanFilter(), 'paid'),
//                                        AllowedFilter::custom('less-than-paid', new LessThanFilter(), 'paid'),
//
//                                        AllowedFilter::custom('starts-with-removed', new StartsWithFilter(), 'removed'),
//                                        AllowedFilter::custom('ends-with-removed', new EndsWithFilter(), 'removed'),
//                                        AllowedFilter::custom('contains-removed', new ContainsFilter(), 'removed'),
//                                        AllowedFilter::custom('matches-removed', new MatchesFilter(), 'removed'),
//                                        AllowedFilter::custom('greater-than-removed', new GreaterThanFilter(), 'removed'),
//                                        AllowedFilter::custom('less-than-removed', new LessThanFilter(), 'removed'),
//
//                                        AllowedFilter::custom('starts-with-date_paid', new StartsWithFilter(), 'date_paid'),
//                                        AllowedFilter::custom('ends-with-date_paid', new EndsWithFilter(), 'date_paid'),
//                                        AllowedFilter::custom('contains-date_paid', new ContainsFilter(), 'date_paid'),
//                                        AllowedFilter::custom('matches-date_paid', new MatchesFilter(), 'date_paid'),
//                                        AllowedFilter::custom('greater-than-date_paid', new GreaterThanFilter(), 'date_paid'),
//                                        AllowedFilter::custom('less-than-date_paid', new LessThanFilter(), 'date_paid')
//            );
        $result = Reservation::all();
        return response_json('OK', 200, $result);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function show()
    {

        $status = Request::capture()->get('status');
        $available_status = ['pending', 'confirmed', 'cancelled'];
        if(!in_array($status,$available_status)){
            $status = 'pending';
        }


        if($status === 'pending'){
            $query = Reservation::where('status', '=', 'pending');
        }
        if($status === 'confirmed'){
            $query = Reservation::where('status', '=', 'confirmed');
        }
        if($status === 'dismissed'){
            $query = Reservation::where('status', '=', 'cancelled');
        }

        $result = Reservation::all();
        //return response_json('OK', 200, $result);
        return view('card.reservations');
    }
}


