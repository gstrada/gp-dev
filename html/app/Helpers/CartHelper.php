<?php

namespace App\Helpers;

class CartHelper {

    public static function getCartPrice($item) {
        if($item){

        }
    }

    public static function getCartItemPrice($item, $show_unit_price = false) {
        $price = 0;
        if($item){
            if($item->pack){
                $price = PriceHelper::getPriceByType($item->pack, $item->delivery_type);
            }else if($item->product){
                $price = PriceHelper::getPriceByType($item->product, $item->delivery_type);
            }
            if(!$show_unit_price){
                $price = $price * $item->quantity;
            }
        }
        return $price;
    }

}
