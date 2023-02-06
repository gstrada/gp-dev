<?php

namespace App\Helpers;

use App\Models\Card\Card;
use Carbon\Carbon;

class CardHelper {

    public static function getCards($order, $formatted = true, $order_item_id_as_index = false) {
        $order_items = $order->items;
        $card_numbers = [];
        foreach ($order_items as $order_item){
            for ($i = 1; $i <= $order_item->quantity; $i++) {
                $card_number = self::generateCardNumber($order, $order_item, $formatted, $i);
                if($order_item_id_as_index){
                    if(!array_key_exists($order_item->id, $card_numbers)){
                        $card_numbers[$order_item->id] = [];
                    }
                    $card_numbers[$order_item->id][] = $card_number;
                }else{
                    $card_numbers[] = $card_number;
                }

            }
        }
        return $card_numbers;
    }

    public static function generateCardNumber($order, $order_item, $formatted, $index = 0){
        if($order && $order_item){
            $card_type = 'U';
            $item_numeration = '0';
            if($order_item->pack_id){
                $card_type = 'K';
                $item_numeration = str_pad($order_item->pack_id,5, '0', STR_PAD_LEFT);
            }
            if($order_item->product_id) {
                $card_type = 'P';
                $item_numeration = str_pad($order_item->product_id, 5, '0', STR_PAD_LEFT);
            }

            $user_numeration = str_pad($order->user_id,6, '0', STR_PAD_LEFT);
            $order_item_numeration = str_pad($order_item->id . $index,8, '0', STR_PAD_LEFT);
            $card_number = strtoupper($user_numeration . $order_item_numeration . $item_numeration . $card_type . substr($order_item->delivery_type, 0, 1));

            if($card_number){
                if($order->approved){
                    $card = Card::where('number', '=', $card_number)->first();
                    if(!$card){
                        $card_duration = env('CARD_VALID_MONTHS', 4);
                        $valid_from = Carbon::now();
                        if ($order_item->created_at) {
                            $valid_from = $order_item->created_at;
                        }
                        $valid_thru = clone $valid_from;
                        $valid_thru->addMonths($card_duration);

                        $card_data = [
                            'number' => $card_number,
                            'cvv' => str_pad(mt_rand(0, 9999),4, '0', STR_PAD_LEFT),
                            'delivery_type' => $order_item->delivery_type,
                            'user_id'=> $order->user_id,
                            'order_item_id' => $order_item->id,
                            'valid_from' => $valid_from,
                            'valid_thru' => $valid_thru,
                        ];
                        Card::create($card_data);
                    }
                }
            }

            return $formatted ? self::formatCardNumber(strtoupper($card_number)) : strtoupper($card_number);
        }
        return null;
    }

    public static function formatCardNumber($cardNumber){
        $parts = self::getCardNumberItems($cardNumber, true);
        try {
            return implode(' ', $parts);
        }catch (\Exception $exception){
            return $cardNumber;
        }
    }

    public static function getCardNumberItems($cardNumber, $merge_type_mode = false){
        try{
            if(!$merge_type_mode){
                return unpack("a6user_id/a8order_id/a5item_id/a1type/a1mode",$cardNumber);
            }
            return unpack("a6user_id/a8order_id/a5item_id/a2identifier",$cardNumber);
        }catch (\Exception $exception){
            return $cardNumber;
        }

    }
}
