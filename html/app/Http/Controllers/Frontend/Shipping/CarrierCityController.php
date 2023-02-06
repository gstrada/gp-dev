<?php

namespace App\Http\Controllers\Frontend\Shipping;

use App\Http\Controllers\Controller;
use App\Models\Shipping\Carrier;
use App\Models\Shipping\CarrierCity;
use App\Models\Shipping\CarrierState;
use Illuminate\Http\Request;

class CarrierCityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getCarriers($city_id){
        $carrier_state_ids = CarrierCity::select('carrier_state_id')
            ->where('city_id', '=', $city_id)
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)
            ->get()->pluck('carrier_state_id');

        $carrier_ids = CarrierState::select('carrier_id')
            ->whereIn('state_id', $carrier_state_ids)
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)
            ->get()->pluck('carrier_id');


        $carriers = Carrier::whereIn('id', $carrier_ids)
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)->get();
        return response_json('OK', 200, $carriers);
    }
}
