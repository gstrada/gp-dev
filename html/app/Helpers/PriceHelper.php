<?php

namespace App\Helpers;

class PriceHelper {

    public static function getOriginalPriceByType($item, $type) {
        if($item){
            if($type === 'digital'){
                return self::getDigitalPrice($item);
            }else if($type === 'physical'){
                return self::getFisicalPrice($item);
            }else if($type === 'card'){
                return self::getCardPrice($item);
            }
        }
        return 0;
    }

    public static function getPriceByType($item, $type) {
        if($item){
            if($type === 'digital'){
                return self::getDigitalPrice($item);
            }else if($type === 'physical'){
                //return self::priceWithDiscount($item, self::getFisicalPrice($item));
                return self::getFisicalPrice($item);
            }else if($type === 'card'){
                //return self::priceWithDiscount($item, self::getDigitalPrice($item));
                return self::getCardPrice($item);
            }
        }
        return 0;
    }

    private static function priceWithDiscount($item, $price){
        if($item->discount && $item->discount > 0){
            return $price - (($item->discount * $price) / 100);
        }
        return $price;
    }

    public static function getDigitalPrice($item, $withDiscount = true) {
        if($item){
            if($withDiscount){
                return self::priceWithDiscount($item, round($item->digital_price,2));
            }
            return round($item->digital_price,2);
        }
        return 0;
    }

    public static function getFisicalPrice($item, $withDiscount = true) {
        if($item){
            if($withDiscount) {
                return self::priceWithDiscount($item, round($item->physical_price, 2));
            }
            return round($item->physical_price,2);
        }
        return 0;
    }

    public static function getCardPrice($item, $withDiscount = true) {
        if($item){
            if($withDiscount) {
                return self::priceWithDiscount($item, round($item->card_price, 2));
            }
            return round($item->card_price,2);
        }
        return 0;
    }


    public static function getMinPrice($item, $withDiscount = true) {
        if($item){
            $min = $item->digital_price;
            if($min > $item->physical_price){
                $min = $item->physical_price;
            }
            if($min > $item->card_price){
                $min = $item->card_price;
            }
            if($withDiscount){
                $min = self::priceWithDiscount($item, $min);
            }
            return round($min,2);
        }
        return 0;
    }

    public static function getMaxPrice($item) {
        if($item){
            $max = $item->digital_price;
            if($max < $item->physical_price){
                $max = $item->physical_price;
            }
            if($max < $item->card_price){
                $max = $item->card_price;
            }
            return round($max,2);
        }
        return 0;
    }

    public static function getFisicalPriceDiferenceWithDigital($item, $positive_symbol = '+', $negative_symbol = '-', $equal_symbol = ''){
        $val = round($item->physical_price - $item->digital_price,2);
        if($val == 0){
            return $equal_symbol;
        }
        return $val > 0 ? $positive_symbol . $val : $negative_symbol . $val;
    }

    public static function getCardPriceDiferenceWithDigital($item, $positive_symbol = '+', $negative_symbol = '-', $equal_symbol = ''){
        $val = round($item->card_price - $item->digital_price,2);
        if($val == 0){
            return $equal_symbol;
        }
        return $val > 0 ? $positive_symbol . $val : $negative_symbol . $val;
    }

}
