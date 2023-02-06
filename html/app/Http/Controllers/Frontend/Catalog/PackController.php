<?php

namespace App\Http\Controllers\Frontend\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Category;
use App\Models\Catalog\Pack;
use App\Models\Catalog\Product;
use App\Models\Catalog\ProductAddress;
use App\Models\Location\City;
use App\Models\Location\State;
use App\Models\ServiceProvider\ProviderAddress;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class PackController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($identifier)
    {
        $show_city_filter = 0;
        $state_id = Request::get('state');
        $city_id = Request::get('city');
        $hidden_state_id = Request::get('state-id');
        if($hidden_state_id){
            $state_id = $hidden_state_id;
        }
        $show_city_filter = $state_id > 0 ? 1 : 0;
        $city_ids = [];
        if($state_id){
            $state = State::find($state_id);
            if($state){
                $cities = City::select('id')->where('state_id', '=', $state->id)->where('enabled', '=', 1)->where('removed', '=', 0)->orderBy('name')->get()->pluck('id')->toArray();
                $city_ids = array_unique($cities);
            }
        }

        $pack = Pack::with(['category', 'products'])->where(function ($query) use ($identifier){
            $query->where('id', '=', $identifier)->orWhere('sku', '=', $identifier)->orWhere('friendly_url', '=', $identifier);
        })->where('enabled', '=', 1)->where('removed', '=', 0)->firstOrFail();

//        $no_filter_included_products = $pack->products()->wherePivot('enabled','=', '1')->wherePivot('removed','=', '0')
//            ->where('products.enabled', 1)
//            ->where('products.removed', 0)
//            ->where('invisible', '=', 0)->get();
        $no_filter_included_products = DB::Select(DB::raw("select distinct `city_name`, `city_id`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `pack_products`.`pack_id` = " . $pack->id  .
                                                          " and `pack_products`.`enabled` = 1" .
                                                          " and `pack_products`.`removed` = 0" .
                                                          " and`products`.`enabled` = 1" .
                                                          " and`provider_addresses`.`enabled` = 1" .
                                                          " and`provider_addresses`.`removed` = 0" .
                                                          " and`invisible` = 0" .
                                                          " and`products`.`removed` = 0" . ") as t"));
        $available_in_states = $this->getStatesFromProducts($no_filter_included_products);

//        if($state_id && $city_ids && count($city_ids) > 0){
//            $provider_address_ids = ProviderAddress::select('id')->whereIn('city_id', $city_ids)->where('enabled', 1)
//                ->where('removed', 0)->get()->pluck('id');
//            $valid_product_ids = ProductAddress::select('product_id')->whereIn('provider_address_id', $provider_address_ids)->get()->unique('product_id')->pluck('product_id');
//            $included_products = $pack->products()->whereIn('products.id', $valid_product_ids)->wherePivot('enabled','=', '1')->wherePivot('removed','=', '0')
//                ->where('products.enabled', 1)
//                ->where('products.removed', 0)
//                ->where('invisible', '=', 0)->get();
//        }else{
//            $included_products = $pack->products()->wherePivot('enabled','=', '1')->wherePivot('removed','=', '0')
//                ->where('products.enabled', 1)
//                ->where('products.removed', 0)
//                ->where('invisible', '=', 0)->get();
//        }
        if ($state_id > 0) {
            $available_in_cities
                = $this->getCitiesFromProductsWithState($no_filter_included_products, $state_id);
        } else {
            $available_in_cities = $this->getCitiesFromProducts($no_filter_included_products);
        }

        if ($state_id && $city_ids && ($city_id < 0 || is_null($city_id))  && count($city_ids) > 0) {

            $provider_address_ids = ProviderAddress::whereIn('city_id', $city_ids)->where('enabled', 1)
                                                   ->where('removed', 0)->get()->pluck('id');
            $valid_product_ids = ProductAddress::select('product_id')->whereIn('provider_address_id', $provider_address_ids)->get()->unique('product_id')->pluck('product_id');
            $valid_prod_string = "";
            foreach ($valid_product_ids as $product){
                $valid_prod_string .= $product . ",";
            }
            $included_products        = DB::Select(DB::raw("select distinct `city_name`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `cities`.`state_id` = " . $state_id . " and `pack_products`.`pack_id` = " . $pack->id  .
                                                       " and `pack_products`.`enabled` = 1" .
                                                       " and `pack_products`.`removed` = 0" .
                                                       " and`products`.`enabled` = 1" .
                                                       " and`products`.`removed` = 0" .
                                                       " and`provider_addresses`.`enabled` = 1" .
                                                       " and`provider_addresses`.`removed` = 0" .
                                                       " and`invisible` = 0" .
                                                       " and `products`.`id` in (" . trim($valid_prod_string, ",") . ")) as t "));
//                    $card_includes
//                        = $pack->products()->whereIn('products.id', $valid_product_ids)->wherePivot('enabled', '=', '1')->wherePivot('removed', '=', '0')
//                               ->where('products.enabled', 1)
//                               ->where('products.removed', 0)
//                               ->where('invisible', '=', 0)->get();

        } elseif ($state_id && $city_ids && $city_id > 0 && count($city_ids) > 0) {
            $provider_address_ids = ProviderAddress::whereIn('city_id', $city_ids)->where('enabled', 1)
                                                   ->where('removed', 0)->get();
            $filteredByCity       = $provider_address_ids->where("city_id", $city_id)->pluck('id');
            $valid_product_ids    = ProductAddress::select('product_id')->whereIn('provider_address_id', $filteredByCity)->get()->unique('product_id')->pluck('product_id');
            $valid_prod_string = "";
            foreach ($valid_product_ids as $product){
                $valid_prod_string .= $product . ",";
            }
            $included_products        = DB::Select(DB::raw("select distinct `city_name`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `cities`.`id` = " . $city_id . " and`pack_products`.`pack_id` = " . $pack->id  .
                                                       " and `pack_products`.`enabled` = 1" .
                                                       " and `pack_products`.`removed` = 0" .
                                                       " and`products`.`enabled` = 1" .
                                                       " and`products`.`removed` = 0" .
                                                       " and`provider_addresses`.`enabled` = 1" .
                                                       " and`provider_addresses`.`removed` = 0" .
                                                       " and`invisible` = 0" .
                                                       " and `products`.`id` in (" . trim($valid_prod_string, ",") . ")) as t "));
//                    dd($card_includes);
        } else {
//            $included_products        = DB::Select(DB::raw("select distinct `city_name`, `name`, `short_description`,
//                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
//                                            `enabled`,`removed`
//                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
//                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
//                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
//                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
//                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
//                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
//                                            where `pack_products`.`pack_id` = " . $pack->id  .
//                                                       " and `pack_products`.`enabled` = 1" .
//                                                       " and `pack_products`.`removed` = 0" .
//                                                       " and`products`.`enabled` = 1" .
//                                                       " and`provider_addresses`.`enabled` = 1" .
//                                                       " and`provider_addresses`.`removed` = 0" .
//                                                       " and`invisible` = 0" .
//                                                       " and`products`.`removed` = 0" . ") as t"));
            $included_products = $pack->products()->wherePivot('enabled', '=', '1')->wherePivot('removed', '=', '0')
                                          ->where('products.enabled', 1)
                                          ->where('products.removed', 0)
                                          ->where('invisible', '=', 0)->get();
        }
        if($state_id && count($included_products) === 0){
            return redirect(route('frontend.packs', $identifier))->withErrors(['No encontramos prestaciones en la provincia seleccionada']);
        }
        return view('catalog.packs.pack_view', compact('pack', 'included_products', 'available_in_states', 'available_in_cities', 'identifier', 'city_id',
                                                       'state_id', 'show_city_filter'));
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function show($identifier)
    {
        $state_id = Request::get('state');
        $city_id = Request::get('city');
        $show_city_filter = 0;
        $show_city_filter = $state_id > 0 ? 1 : 0;
        $city_ids = [];
        if($state_id){
            $state = State::find($state_id);
            if($state){
                $cities = City::select('id')->where('state_id', '=', $state->id)->where('enabled', '=', 1)->where('removed', '=', 0)->orderBy('name')->get()->pluck('id')->toArray();
                $city_ids = array_unique($cities);
            }
        }
        $pack = Pack::with(['category', 'products'])->where(function ($query) use ($identifier){
            $query->where('id', '=', $identifier)->orWhere('sku', '=', $identifier)->orWhere('friendly_url', '=', $identifier);
        })->where('enabled', '=', 1)->where('removed', '=', 0)->firstOrFail();

        $no_filter_included_products = DB::Select(DB::raw("select distinct `city_name`, `city_id`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `pack_products`.`pack_id` = " . $pack->id  .
                                                          " and `pack_products`.`enabled` = 1" .
                                                          " and `pack_products`.`removed` = 0" .
                                                          " and`products`.`enabled` = 1" .
                                                          " and`provider_addresses`.`enabled` = 1" .
                                                          " and`provider_addresses`.`removed` = 0" .
                                                          " and`invisible` = 0" .
                                                          " and`products`.`removed` = 0" . ") as t"));
        $available_in_states = $this->getStatesFromProducts($no_filter_included_products);

        if ($state_id > 0) {
            $available_in_cities
                = $this->getCitiesFromProductsWithState($no_filter_included_products, $state_id);
        } else {
            $available_in_cities = $this->getCitiesFromProducts($no_filter_included_products);
        }

        if ($state_id && $city_ids && ($city_id < 0 || is_null($city_id))  && count($city_ids) > 0) {

            $provider_address_ids = ProviderAddress::whereIn('city_id', $city_ids)->where('enabled', 1)
                                                   ->where('removed', 0)->get()->pluck('id');
            $valid_product_ids = ProductAddress::select('product_id')->whereIn('provider_address_id', $provider_address_ids)->get()->unique('product_id')->pluck('product_id');
            $valid_prod_string = "";
            foreach ($valid_product_ids as $product){
                $valid_prod_string .= $product . ",";
            }
            $included_products        = DB::Select(DB::raw("select distinct `city_name`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `cities`.`state_id` = " . $state_id . " and `pack_products`.`pack_id` = " . $pack->id  .
                                                           " and `pack_products`.`enabled` = 1" .
                                                           " and `pack_products`.`removed` = 0" .
                                                           " and`products`.`enabled` = 1" .
                                                           " and`products`.`removed` = 0" .
                                                           " and`provider_addresses`.`enabled` = 1" .
                                                           " and`provider_addresses`.`removed` = 0" .
                                                           " and`invisible` = 0" .
                                                           " and `products`.`id` in (" . trim($valid_prod_string, ",") . ")) as t "));
//                    $card_includes
//                        = $pack->products()->whereIn('products.id', $valid_product_ids)->wherePivot('enabled', '=', '1')->wherePivot('removed', '=', '0')
//                               ->where('products.enabled', 1)
//                               ->where('products.removed', 0)
//                               ->where('invisible', '=', 0)->get();

        } elseif ($state_id && $city_ids && $city_id > 0 && count($city_ids) > 0) {
            $provider_address_ids = ProviderAddress::whereIn('city_id', $city_ids)->where('enabled', 1)
                                                   ->where('removed', 0)->get();
            $filteredByCity       = $provider_address_ids->where("city_id", $city_id)->pluck('id');
            $valid_product_ids    = ProductAddress::select('product_id')->whereIn('provider_address_id', $filteredByCity)->get()->unique('product_id')->pluck('product_id');
            $valid_prod_string = "";
            foreach ($valid_product_ids as $product){
                $valid_prod_string .= $product . ",";
            }
            $included_products        = DB::Select(DB::raw("select distinct `city_name`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `cities`.`id` = " . $city_id . " and`pack_products`.`pack_id` = " . $pack->id  .
                                                           " and `pack_products`.`enabled` = 1" .
                                                           " and `pack_products`.`removed` = 0" .
                                                           " and`products`.`enabled` = 1" .
                                                           " and`products`.`removed` = 0" .
                                                           " and`provider_addresses`.`enabled` = 1" .
                                                           " and`provider_addresses`.`removed` = 0" .
                                                           " and`invisible` = 0" .
                                                           " and `products`.`id` in (" . trim($valid_prod_string, ",") . ")) as t "));
//                    dd($card_includes);
        } else {
//            $included_products        = DB::Select(DB::raw("select distinct `city_name`, `name`, `short_description`,
//                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
//                                            `enabled`,`removed`
//                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
//                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
//                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
//                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
//                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
//                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
//                                            where `pack_products`.`pack_id` = " . $pack->id  .
//                                                           " and `pack_products`.`enabled` = 1" .
//                                                           " and `pack_products`.`removed` = 0" .
//                                                           " and`products`.`enabled` = 1" .
//                                                           " and`provider_addresses`.`enabled` = 1" .
//                                                           " and`provider_addresses`.`removed` = 0" .
//                                                           " and`invisible` = 0" .
//                                                           " and`products`.`removed` = 0" . ") as t"));
                    $included_products = $pack->products()->wherePivot('enabled', '=', '1')->wherePivot('removed', '=', '0')
                                          ->where('products.enabled', 1)
                                          ->where('products.removed', 0)
                                          ->where('invisible', '=', 0)->get();
        }
        if($state_id && count($included_products) === 0){
            return redirect(route('frontend.packs.show', $identifier))->withErrors(['No encontramos prestaciones en la provincia seleccionada']);
        }
        return view('catalog.packs.pack_show', compact('pack', 'included_products', 'available_in_states', 'available_in_cities', 'identifier', 'city_id',
                                                       'state_id', 'show_city_filter'));
    }

    private function getStatesFromProducts($products){
        $city_ids = [];
        foreach($products as $product) {
//            $addresses = $product->addresses;
//            if($addresses) {
//                foreach($product->city_id as $value) {
            $city_ids[] = $product->city_id;
//                }
//            }
        }
        $city_ids  = array_unique($city_ids);
        $state_ids = City::select('state_id')->whereIn('id', $city_ids)->where('enabled', '=', 1)->where('removed', '=', 0)->get()->unique('state_id')->pluck('state_id')->toArray();
        return State::whereIn('id', $state_ids)->where('enabled', '=', 1)->where('removed', '=', 0)->orderBy('name')->get();
    }

    private function getCitiesFromProducts($products){
        $city_ids = [];
        foreach($products as $product) {
//            $addresses = $product->addresses;
//            if($addresses && $product->invisible == 0) {
//                foreach($product->addresses->pluck('city_id')->toArray() as $value) {
            $city_ids[] = $product->city_id;
//                }
//            }
        }
        $city_ids  = array_unique($city_ids);
        return City::whereIn('id', $city_ids)->where('enabled', '=', 1)->where('removed', '=', 0)->orderBy('name')->get();
    }

    private function getCitiesFromProductsWithState($products, $state){
        $city_ids = [];
        foreach($products as $product) {
//            $addresses = $product->addresses;
//            if($addresses && $product->invisible == 0) {
//                foreach($product->addresses->pluck('city_id')->toArray() as $value) {
            $city_ids[] = $product->city_id;
//                }
//            }
        }
        $city_ids  = array_unique($city_ids);
        return City::whereIn('id', $city_ids)->where('state_id', $state)->where('enabled', '=', 1)->where('removed', '=', 0)->orderBy('name')->get();
    }
}
