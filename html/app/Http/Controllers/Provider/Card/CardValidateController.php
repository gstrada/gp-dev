<?php

namespace App\Http\Controllers\Provider\Card;

use App\Http\Controllers\Controller;
use App\Models\Card\Card;
use App\Models\Catalog\PackProduct;
use App\Models\Catalog\Product;
use App\Models\Reservation\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CardValidateController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function validateCard(Request $request)
    {
        $user = Auth::user();
        $card_number = $request->get('card', '');
        $cvv = $request->get('cvv', '');

        $card_number = strtoupper(preg_replace('/\s+/', '', $card_number));
        $card = $this->verifyCard($card_number, $cvv);
        if(!$card instanceof Card){
            return $card;
        }


        $provider_id = $user->provider_id;
        $provider_product_ids = Product::select('id')
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)
            ->where('provider_id', '=', $provider_id)
            ->where('invisible', '=', 0)
            ->get()->pluck('id')->toArray();

        $pack = $card->orderItem->pack;
        $product = $card->orderItem->product;
        $available_product_ids = [];
        if($pack){
            $available_product_ids = PackProduct::select('product_id')->where('pack_id', '=', $pack->id)->whereIn('product_id', $provider_product_ids)->get()->pluck('product_id')->toArray();
        }
        if($product){
            $available_product_ids = [$product->id];
        }
        $products = Product::whereIn('id', $available_product_ids)->where('enabled', '=', 1)->where('removed', '=', 0)->where('invisible', '=', 0)->get();
        //dd();
        //return response_json(json_encode($products), 400, $products);
        //000002 00030873 00003 KD
        if(count($available_product_ids) === 0 || count($products) === 0){
            return response_json('Este establecimiento no posee ninguna prestación para ofrecer sobre esta tarjeta', 401);
        }

        return response_json('La tarjeta es válida para ser utilizada', 200, $products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function exchangeCard(Request $request)
    {
        $user = Auth::user();
        $card_number = $request->get('card', '');
        $cvv = $request->get('cvv', '');
        $product_id = $request->get('product_id', null);

        $card_number = strtoupper(preg_replace('/\s+/', '', $card_number));
        $reservations = Reservation::where('card_number', $card_number)->where('status', 'confirmed')->get();
        $card = $this->verifyCard($card_number, $cvv);
        if(!$card instanceof Card){
            return $card;
        }

        $provider_id = $user->provider_id;
        $provider_product_ids = Product::select('id')
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)
            ->where('provider_id', '=', $provider_id)
            ->get()->pluck('id')->toArray();

        $pack = $card->orderItem->pack;
        $product = $card->orderItem->product;
        $available_product_ids = [];
        if($pack){
            $available_product_ids = PackProduct::select('product_id')->where('pack_id', '=', $pack->id)->whereIn('product_id', $provider_product_ids)->get()->pluck('product_id')->toArray();
        }
        if($product){
            $available_product_ids = [$product->id];
        }

        if(!in_array($product_id, $available_product_ids)){
            return response_json('Este producto no corresponde a tus prestaciones', 401);
        }

        $card->used = 1;
        $card->date_used = Carbon::now();
        $card->used_on_product_id = $product_id;
        if($card->save()){
            if($reservations->count() > 0){
                $usedOnProduct = Product::find($product_id);
                foreach ($reservations as $reservation) {
                    $reservation->status = 'used';
                    $reservation->date_activated = Carbon::now();
                    $reservation->used_on =  !is_null($usedOnProduct) ? $usedOnProduct->sku : '';
                    $reservation->save();
                }
            }
            return response_json('La tarjeta fué canjeada correctamente', 200);
        }
        return response_json('La tarjeta no pudo ser canjeada, intente nuevamente, si el problema persiste, contacte a un administrador', 401);
    }


    private function verifyCard($card_number, $cvv){
        if(strlen($card_number) === 0){
            return response_json('El Código es requerido', 401);
        }

        $card_number = str_replace(' ', '', $card_number);
        $cvv = str_replace(' ', '', $cvv);

        $card = Card::where('number', '=', $card_number)->orWhere('custom_number', '=', $card_number)->first();

        if(!$card){
            return response_json('El Código ingresado no existe en nuestra base de datos', 401);
        }
        if($card->delivery_type !== 'digital'){
            if($card->cvv && strlen($card->cvv) > 0 && strtoupper($card->cvv) != strtoupper($cvv)){
                return response_json('El CVV (Código de verificación) es incorrecto', 401);
            }
        }
        if(!$card->enabled){
            return response_json('La Tarjeta se encuentra deshabilitada', 401);
        }
        if($card->used){
            return response_json('La Tarjeta ya fué utilizada', 401);
        }

//        if(!$card->activated){
//            return response_json('La Tarjeta no se encuentra activa, solicitá al cliente que active antes de realizar el canje', 401);
//        }

        $valid_until = Carbon::parse($card->valid_thru)->addMonth();

        if(!Carbon::now()->between($card->valid_from, $valid_until)){
            return response_json('La Tarjeta se encuentra vencida', 401);
        }

        if(!$card->orderItem){
            return response_json('La Tarjeta no se encuentra vinculada a nuestro sistema, contacte a un administrador', 401);
        }

        return $card;
    }


}
