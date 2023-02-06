<?php

namespace App\Http\Controllers\Frontend\Shipping;

use App\Helpers\CartHelper;
use App\Http\Controllers\Controller;
use App\Models\Order\Cart;
use App\Models\Shipping\Carrier;
use App\Models\Shipping\CarrierCity;
use App\Models\Shipping\CarrierState;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class CarrierController extends Controller
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

    public function getForCheckoutCarriers($state_id = null, $city_id = null){

        $user = Auth::user();
        if($user) {
            $userCartItems = Cart::with(['pack' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }],['product' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }])->where('user_id', $user->id)->get();
        }

        $userCartTotal = 0;
        foreach ($userCartItems as $userCart){
            $userCartTotal += CartHelper::getCartItemPrice($userCart);
        }

        $carriers_global = Carrier::where('carriers.enabled', 1)->where('carriers.removed', 0)->where('carriers.enabled_for_all_subitems', 1)->get()->filter();

        $carriers = new Collection($carriers_global);

        if($city_id){

            $carriers_by_city = CarrierCity::with(['carrier' => function ($q) {
                $q->where('carriers.enabled', 1)->where('carriers.removed', 0);
            }])
                ->where('carrier_cities.city_id', '=', $city_id)
                ->where('carrier_cities.enabled', '=', 1)
                ->where('carrier_cities.removed', '=', 0)
                ->get();

            $carriers_by_state = CarrierState::with(['carrier' => function ($q) {
                $q->where('carriers.enabled', 1)->where('carriers.removed', 0)->where('carriers.enabled_for_all_subitems', 1);
            }])
                ->where('carrier_states.state_id', '=', $state_id)
                ->where('carrier_states.enabled', '=', 1)
                ->where('carrier_states.removed', '=', 0)
                ->get()->filter();

            $this->getCarriersByPrice($carriers, $carriers_by_city, $userCartTotal);
            $this->getCarriersByPrice($carriers, $carriers_by_state, $userCartTotal);


//            $carriers = $carriers->merge($carriers_by_city);
//            $carriers = $carriers->merge($carriers_by_state);


        }else{
            $carriers_by_state = CarrierState::with(['carrier' => function ($q) {
                $q->where('carriers.enabled', 1)->where('carriers.removed', 0);
            }])
                ->where('carrier_states.state_id', '=', $state_id)
                ->where('carrier_states.enabled', '=', 1)
                ->where('carrier_states.removed', '=', 0)
                ->get()->pluck('carrier')->filter();

            $this->getCarriersByPrice($carriers, $carriers_by_state, $userCartTotal);

            //$carriers = $carriers->merge($carriers_by_state);
        }

        $this->getCarriersByPrice($carriers, $carriers_global);


        $min_price = [];
        $bestCarriers = [];
        foreach ($carriers as $carrier){
            $free_if_order_above = $carrier->free_if_order_above;
            if($free_if_order_above){
                if($userCartTotal > $free_if_order_above){
                    $carrier->price = 0;
                }
            }
            if(!array_key_exists($carrier->name, $min_price)){
                $min_price[$carrier->name] = $carrier->price;
                $bestCarriers[$carrier->name] = $carrier;
            }else{
                if($min_price[$carrier->name] > $carrier->price){
                    $min_price[$carrier->name] = $carrier->price;
                    $bestCarriers[$carrier->name] = $carrier;
                }
            }
        }
        $finalCarriers = new Collection(array_values($bestCarriers));
        return response_json('OK', 200, $finalCarriers);
    }

    private function getCarriersByPrice(&$carriers,$carrier_items){
        foreach ($carrier_items as $item){
            $free_if_order_above = $item->free_if_order_above;

            $price = (double)$item->price;

            if($item->carrier){
                $item->carrier->price = $price;
                $item->carrier->free_if_order_above = $free_if_order_above;
                $carriers->push($item->carrier);
            }
        }
    }
}
