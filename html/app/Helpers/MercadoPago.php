<?php

namespace App\Helpers;

class MercadoPago {


    public static function pushItem(&$array, $id, $title, $currency_iso_code_3, $quantity, $unit_price, $description = null, $picture_url = null){
        $item = array(
            "id" => (string)$id,
            "title" => (string)$title,
            "currency_id" => $currency_iso_code_3,
            "quantity" => (int)$quantity,
            "unit_price" => (float)$unit_price
        );
        if($picture_url){
            $item['picture_url'] = (string)$picture_url;
        }
        if($description){
            $item['description'] = (string)$description;
        }
        $array[] = $item;
    }


    public static function createPreference($items, $firstname, $lastname, $email, $phone, $zipcode, $streetName, $streetNumber, $externalReference, $additionalInfo = null){
        $preference_data = array(
            "items" => $items,
            "payer" => array(
                "name" => $firstname,
                "surname" => $lastname,
                "email" => $email,
                "phone" => array(
                    "number" => $phone
                ),
                "address" => array(
                    "zip_code" => $zipcode,
                    "street_name" => $streetName,
                    "street_number" => (int)$streetNumber
                )

            ),
            "notification_url" => env('MP_NOTIFY_BASE_URL', '') . "/hook/mp/notify",
            "back_urls" => array(
                "success" => env('MP_NOTIFY_BASE_URL', '') . "/hook/mp/success",
                "failure" => env('MP_NOTIFY_BASE_URL', '') . "/hook/mp/error",
                "pending" => env('MP_NOTIFY_BASE_URL', '') . "/hook/mp/pending"
            ),
            "auto_return" => "all",
            "external_reference" => base64_encode($externalReference),
            "additional_info" => ($additionalInfo == null) ? '' : base64_encode($additionalInfo)
        );
        return $preference_data;
    }

}
