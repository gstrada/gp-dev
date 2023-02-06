<?php

namespace App\Http\Controllers\Frontend\Order;

use App\Helpers\CardHelper;
use App\Helpers\CartHelper;
use App\Helpers\MercadoPago;
use App\Http\Controllers\Controller;
use App\Mail\DigitalItemMail;
use App\Mail\OrderMail;
use App\Models\Catalog\Discount;
use App\Models\Catalog\Pack;
use App\Models\Location\Country;
use App\Models\Location\State;
use App\Models\Order\Cart;
use App\Models\Order\Order;
use App\Models\Order\OrderItem;
use App\Models\Payment\PaymentMethod;
use App\Models\Payment\PaymentMethodCity;
use App\Models\Payment\PaymentMethodState;
use App\Models\Shipping\Carrier;
use App\Models\Shipping\CarrierCity;
use App\Models\Shipping\CarrierState;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Patosmack\MercadoPago\MP;

class CheckoutController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $countries = Country::where('enabled', '=', 1)->where('removed', '=', 0)->orderBy('name')->get();
        $payment_methods = PaymentMethod::where('enabled', '=', 1)->where('removed', '=', 0)->get();
        $all_items_are_digital = $this->allCartItemsAreDigital();
        $all_items_are_physical = $this->allCartItemsArePhysical();

        $last_order_information = Order::where('user_id', '=', $user->id)->orderBy('created_at', 'DESC')->first();

        $latest_data = (object)[
            'name' => $user->name,
            'lastname' => $user->lastname,
            'billing_social_name' => null,
            'billing_social_number' => null,
            'billing_country_id' => null,
            'billing_state_id' => null,
            'billing_city_id' => null,
            'billing_address' => null,
            'billing_zip_code' => null,
            'billing_phone' => null,

            'shipping_country_id' => null,
            'shipping_state_id' => null,
            'shipping_city_id' => null,
            'shipping_address' => null,
            'shipping_zip_code' => null,
            'shipping_phone' => null,
            'shipping_note' => null,
        ];
        if($last_order_information){
            $latest_data->billing_social_name = $last_order_information->billing_social_name;
            $latest_data->billing_social_number = $last_order_information->billing_social_number;

            if($last_order_information->billing_city){
                if($last_order_information->billing_city->state){
                    $latest_data->billing_country_id = $last_order_information->billing_city->state->country_id;
                    $latest_data->billing_state_id = $last_order_information->billing_city->state_id;
                }
                $latest_data->billing_city_id = $last_order_information->billing_city_id;
            }
            $latest_data->billing_address = $last_order_information->billing_address;
            $latest_data->billing_zip_code = $last_order_information->billing_zip_code;
            $latest_data->billing_phone = $last_order_information->billing_phone;


            if($last_order_information->shipping_city){
                if($last_order_information->shipping_city->state){
                    $latest_data->shipping_country_id = $last_order_information->shipping_city->state->country_id;
                    $latest_data->shipping_state_id = $last_order_information->shipping_city->state_id;
                }
                $latest_data->shipping_city_id = $last_order_information->shipping_city_id;
            }
            $latest_data->shipping_address = $last_order_information->shipping_address;
            $latest_data->shipping_zip_code = $last_order_information->shipping_zip_code;
            $latest_data->shipping_phone = $last_order_information->shipping_phone;

            $latest_data->shipping_note = $last_order_information->shipping_note;

        }
        return view('order.checkout.checkout', compact('countries', 'payment_methods', 'all_items_are_digital', 'all_items_are_physical', 'latest_data'));
    }

    public function store(Request $request)
    {

        $user = User::where('id', $request->user()['id'])->first();

        $order_data = $request->all();

        $name = $request->get('name');
        $lastname = $order_data["lastname"];
        $user->name = $name;
        $user->lastname = $lastname;
        $user->save();
       // $billing_social_name = $request->get('billing_social_name');
      //  $billing_social_number = $request->get('billing_social_number');

        $billing_country_id = $request->get('billing_country_id');
        $billing_state_id = $request->get('billing_state_id');
        $billing_city_id = $request->get('billing_city_id');
        $billing_address = $request->get('billing_address');
        $billing_zip_code = $request->get('billing_zip_code');
        $billing_phone = $request->get('billing_phone');

        $shipping_country_id = $request->get('shipping_country_id');
        $shipping_state_id = $request->get('shipping_state_id');
        $shipping_city_id = $request->get('shipping_city_id');
        $shipping_address = $request->get('shipping_address');
        $shipping_zip_code = $request->get('$shipping_zip_code');
        $shipping_phone = $request->get('shipping_phone');

        $shipping_method = $request->get('shipping_method');
        $payment_method = $request->get('payment_method');

        $use_billing_for_shipping = $request->get('use_billing_for_shipping') ? 1 : 0;

        //$shipping_note = $request->get('shipping_note');


        if(!$name){
            return redirect()->back()->withInput()->withErrors(['El Nombre es Requerido']);
        }
        if(!$lastname){
            return redirect()->back()->withInput()->withErrors(['El Apellido es Requerido']);
        }

        $all_items_are_digital = $this->allCartItemsAreDigital();

        if($use_billing_for_shipping){
            if(!$billing_country_id){
                return redirect()->back()->withInput()->withErrors(['El País es requerido']);
            }
            if(!$billing_state_id){
                return redirect()->back()->withInput()->withErrors(['La Provincia es requerida']);
            }
            if(!$billing_city_id){
                return redirect()->back()->withInput()->withErrors(['La Ciudad es requerida']);
            }
            if(!$billing_address){
                return redirect()->back()->withInput()->withErrors(['La Dirección es requerida']);
            }
            if(!$billing_zip_code){
                return redirect()->back()->withInput()->withErrors(['El Código postal es requerido']);
            }
            if(!$billing_phone){
                return redirect()->back()->withInput()->withErrors(['El Teléfono es requerido']);
            }
            $shipping_country_id = $billing_country_id;
            $shipping_state_id = $billing_state_id;
            $shipping_city_id = $billing_city_id;
            $shipping_address = $billing_address;
            $shipping_zip_code = $billing_zip_code;
            $shipping_phone = $billing_phone;

            $order_data['shipping_country_id'] = $shipping_country_id;
            $order_data['shipping_state_id'] = $shipping_state_id;
            $order_data['shipping_city_id'] = $shipping_city_id;
            $order_data['shipping_address'] = $shipping_address;
            $order_data['shipping_zip_code'] = $shipping_zip_code;
            $order_data['shipping_phone'] = $shipping_phone;

        }else{

            if(!$all_items_are_digital){
                if(!$shipping_country_id){
                    return redirect()->back()->withInput()->withErrors(['El País de envío es requerido']);
                }
                if(!$shipping_state_id){
                    return redirect()->back()->withInput()->withErrors(['La Provincia de envío  es requerida']);
                }
                if(!$shipping_city_id){
                    return redirect()->back()->withInput()->withErrors(['La Ciudad de envío es requerida']);
                }
                if(!$shipping_address){
                    return redirect()->back()->withInput()->withErrors(['La Dirección de envío es requerida']);
                }
                if(!$shipping_zip_code){
                    return redirect()->back()->withInput()->withErrors(['El Código postal de envío es requerido']);
                }
                if(!$shipping_phone){
                    return redirect()->back()->withInput()->withErrors(['El Teléfono de envío es requerido']);
                }
            }

            $order_data['shipping_country_id'] = $shipping_country_id;
            $order_data['shipping_state_id'] = $shipping_state_id;
            $order_data['shipping_city_id'] = $shipping_city_id;
            $order_data['shipping_address'] = $shipping_address;
            $order_data['shipping_zip_code'] = $shipping_zip_code;
            $order_data['shipping_phone'] = $shipping_phone;

        }

        //$all_items_are_physical = $this->allCartItemsArePhysical();

        if(!$all_items_are_digital){
            if(!$shipping_method){
                return redirect()->back()->withInput()->withErrors(['El Método de envio es requerido']);
            }
        }

        if(!$payment_method){
            return redirect()->back()->withInput()->withErrors(['El Método de pago es requerido']);
        }

        $appliedDiscount = null;
        $userCartTotal = 0;

        $userCartItems = Cart::with(['pack' => function ($q) {
            $q->where('enabled', 1)->where('removed', 0);
        }],['product' => function ($q) {
            $q->where('enabled', 1)->where('removed', 0);
        }])->where('user_id', $user->id)->get();
        foreach ($userCartItems as $userCart){
            $userCartTotal += CartHelper::getCartItemPrice($userCart);
            if(!$appliedDiscount){
                $appliedDiscount = $userCart->discount;
            }
        }

        if($appliedDiscount){
            $userCartTotal = $userCartTotal - (($userCartTotal * $appliedDiscount->rate)) / 100;
        }

        $carrier = Carrier::find($shipping_method);
        $payment = PaymentMethod::find($payment_method);

        $carrier_price = 0;
        $payment_price = 0;

        if($carrier){
            $carrier_state = CarrierState::where('state_id', '=', $shipping_state_id)->where('carrier_id', '=', $carrier->id)->first();
            if($carrier_state){
                $carrier_city = CarrierCity::where('city_id', '=', $shipping_city_id)->where('carrier_state_id', '=', $carrier_state->id)->first();
                if($carrier_city){
                    if($userCartTotal < $carrier_city->free_if_order_above){
                        $carrier_price = $carrier_city->price;
                    }else{
                        $carrier_price = 0;
                    }
                }else{
                    if($userCartTotal < $carrier_state->free_if_order_above){
                        $carrier_price = $carrier_state->price;
                    }else{
                        $carrier_price = 0;
                    }
                }
            }else{
                if($userCartTotal < $carrier->free_if_order_above){
                    $carrier_price = $carrier->price;
                }else{
                    $carrier_price = 0;
                }
            }
        }

        if($payment){
            $payment_state = PaymentMethodState::where('state_id', '=', $billing_state_id)->where('payment_method_id', '=', $payment->id)->first();
            if($payment_state){
                $payment_city = PaymentMethodCity::where('city_id', '=', $shipping_city_id)->where('payment_method_state_id', '=', $payment_state->id)->first();
                if($payment_city){
                    $payment_price = $payment_city->price;
                }else{
                    $payment_price = $payment_state->price;
                }
            }
        }

        $order_data['payment_id'] = $payment? $payment->id : null;
        $order_data['carrier_id'] = $carrier? $carrier->id : null;
        $order_data['user_id'] = $user->id;
        $order_data['payment_price'] = $payment_price;
        $order_data['shipping_price'] = $carrier_price;
        $order_data['discount_id'] = $appliedDiscount ? $appliedDiscount->id : null;
        $order_data['amount_to_pay'] = $carrier_price + $payment_price + $userCartTotal;
        $order = Order::create($order_data);
        if($order){
            if($payment->slug === 'mercadopago'){
                return $this->payWithMercadoPago($user, $order, $userCartItems, $carrier_price, $payment_price, $billing_phone, $billing_zip_code, $billing_address, $appliedDiscount);
            }elseif ($payment->slug === 'wiredtransfer'){
                $containsDigital = false;
                foreach ($userCartItems as $userCart) {
                    $cartPrice = CartHelper::getCartItemPrice($userCart);
                    $orderItem = new OrderItem();
                    $orderItem->user_id = $user->id;
                    $orderItem->order_id = $order->id;
                    $orderItem->product_id = $userCart->product_id;
                    $orderItem->pack_id = $userCart->pack_id;
                    $orderItem->delivery_type = $userCart->delivery_type;
                    $orderItem->quantity = $userCart->quantity;
                    $orderItem->item_price = $cartPrice;
                    $orderItem->save();
                    if($orderItem->delivery_type == "digital") {
                        $containsDigital = true;
                    }
                }

                CardHelper::getCards($order, false);
//
//                Mail::to($order->user->email)->send(new OrderMail($order, $containsDigital));
//                Mail::to('pagos@goldenpack.com.ar')->send(new OrderMail($order, $containsDigital));
//                if($containsDigital == true) {
//                    Mail::to($order->user->email)->send(new DigitalItemMail($order, $containsDigital));
//                }

                $this->clearCart($user);
                return redirect(route('frontend.checkout.pending', $order->id));
            }
        }
        $order->date_processed = Carbon::now();
        $order->rejected = 1;
        $order->external_response = 'Error al conectar con el Método de Pago';
        $order->save();
        return response_json('Se produjo un error al generar la orden y conectar con el Método de pago, intente nuevamente', 401);
    }

    private function clearCart($user){
        $carts = Cart::where('user_id', '=', $user->id)->get();
        foreach ($carts as $cart){
            $cart->delete();
        }
    }

    private function payWithMercadoPago($user, $order, $userCartItems, $carrier_price, $payment_price, $billing_phone, $billing_zip_code, $billing_address, $appliedDiscount = null){

        $mercadoItems = [];
        foreach ($userCartItems as $userCart){
            $cartPrice = CartHelper::getCartItemPrice($userCart, true);

            if($appliedDiscount){
                $cartPrice = $cartPrice - (($cartPrice * $appliedDiscount->rate)) / 100;
            }

            $orderItem = new OrderItem();
            $orderItem->user_id = $user->id;
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $userCart->product_id;
            $orderItem->pack_id = $userCart->pack_id;
            $orderItem->delivery_type = $userCart->delivery_type;
            $orderItem->quantity = $userCart->quantity;
            $orderItem->item_price = $cartPrice;
            $orderItem->save();

            $title = '';
            $description = '';
            if($userCart->product_id){
                $title = $userCart->product->name;
                $description = $userCart->product->sku;
            }elseif ($userCart->pack_id){
                $title = $userCart->pack->name;
                $description = $userCart->pack->sku;
            }
            MercadoPago::pushItem(
                $mercadoItems,
                $userCart->id,
                $title,
                env('MP_CURRENCY', 'ARS'),
                $userCart->quantity,
                $cartPrice,
                $description
            );
        }

        CardHelper::getCards($order, false);

        $extra_payment = $carrier_price + $payment_price;
        if($extra_payment > 0){
            MercadoPago::pushItem(
                $mercadoItems,
                -1,
                'Costos Extra',
                env('MP_CURRENCY', 'ARS'),
                1,
                $extra_payment,
                ''
            );
        }

        $additionalInfo = json_encode([
            'action' => 'PURCHASE',
            'amount' => $order->amount_to_pay,
            'user_id' => $user->id,
            'external_reference' => $order->id,
        ]);

        $preference_data = MercadoPago::createPreference(
            $mercadoItems,
            $user->name,
            $user->lastname,
            $user->email,
            $billing_phone ? $billing_phone  : '',
            $billing_zip_code ? $billing_zip_code : '',
            $billing_address ? $billing_address : '',
            '',
            $order->id,
            $additionalInfo);




        try {
            $mp = new MP(env('MP_APP_ID'), env('MP_APP_SECRET'));
            $mp->sandbox_mode(env('MP_APP_SANDBOX'));
            $preference = $mp->create_preference($preference_data);
            if($preference and is_array($preference) and isset($preference['status']) and $preference['status'] === 201){
                $order->external_response = json_encode($preference);
                $order->transaction_id = $preference['response']['id'];

                $containsDigital = false;
                foreach ($userCartItems as $userCart) {
                    if($userCart->delivery_type == "digital") {
                        $containsDigital = true;
                    }
                }

                CardHelper::getCards($order, false);

                Mail::to($order->user->email)->send(new OrderMail($order, $containsDigital));
                Mail::to('pagos@goldenpack.com.ar')->send(new OrderMail($order, $containsDigital));
                if($containsDigital == true) {
                    Mail::to($order->user->email)->send(new DigitalItemMail($order, $containsDigital));
                }

                if($order->save()){
                    $redirect_url = $preference['response']['init_point'];
                    return Redirect::to($redirect_url);
                }
            }
        } catch (\Exception $e) {
            $order->date_processed = Carbon::now();
            $order->rejected = 1;
            $order->external_response = $e->getMessage();
            $order->save();
            return response_json('Se produjo un error al conectar con el método de pago, intente nuevamente', 401);
        }
    }

    public function destroy($id)
    {
        $user = Auth::user();
        if($cart = Cart::where('id', $id)->where('user_id', $user->id)->first()){
            if($cart->delete()){
                return redirect()->back()->withSuccess('El Item fue eliminado correctamente del carrito');
            }
        }
        return redirect()->back()->withErrors(['El Item del carrito no fue encontrado, intente nuevamente']);
    }

    public function successResponse(Order $order){
        $user = Auth::user();
        if($user->id !== $order->user_id){
            return redirect(route('home'));
        }

        $containsDigital = false;
        $orderItemsDelivery = OrderItem::where('order_id', $order->id)->get()->pluck("delivery_type");

        foreach ($orderItemsDelivery as $oid){
            if($oid == "digital") {
                $containsDigital = true;
                break;
            }
        }

        $all_items_are_digital = $this->allOrderItemsAreDigital($order);
        $all_items_are_physical = $this->allOrdertemsArePhysical($order);

        $shipping_address = '';
        if(!$all_items_are_digital){
            $shipping_address = $order->shipping_address . ' ' . $order->shipping_zip_code;
            if($order->shipping_city){
                $shipping_address .= ' ' . $order->shipping_city->name;
                if($order->shipping_city->state){
                    $shipping_address .= ', ' . $order->shipping_city->state->name;
                    if($order->shipping_city->state->country){
                        $shipping_address .= ' ' . $order->shipping_city->state->country->name;
                    }
                }
            }
        }
        if(strlen($shipping_address) == 0){
            $shipping_address = null;
        }

        Mail::to($order->user->email)->send(new OrderMail($order, $containsDigital));
        Mail::to('pagos@goldenpack.com.ar')->send(new OrderMail($order, $containsDigital));
        if($containsDigital == true){
            Mail::to($order->user->email)->send(new DigitalItemMail($order, $containsDigital));
        }
        return view('order.checkout.success_response', compact('order','all_items_are_digital', 'all_items_are_physical', 'shipping_address'));
    }

    public function errorResponse(Order $order){
        return view('order.checkout.error_response', compact('order'));
    }

    public function pendingResponse(Order $order){
        return view('order.checkout.pending_response', compact('order'));
    }

    private function allCartItemsAreDigital(){
        $all_items_are_digital = false;
        $user = Auth::user();
        if($user) {
            $oneCartNoDigital = Cart::with(['pack' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }], ['product' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }])->where('user_id', $user->id)->where('delivery_type', '!=', 'digital')->first();
            $all_items_are_digital = !$oneCartNoDigital;
        }
        return $all_items_are_digital;
    }

    private function allCartItemsArePhysical(){
        $all_items_are_physical = false;
        $user = Auth::user();
        if($user) {
            $oneCartNoPhysical = Cart::with(['pack' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }], ['product' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }])->where('user_id', $user->id)->where('delivery_type', '!=', 'physical')->first();
            $all_items_are_physical = !$oneCartNoPhysical;
        }
        return $all_items_are_physical;
    }

    private function allOrderItemsAreDigital($order){
        $all_items_are_digital = false;
        $user = Auth::user();
        if($user) {
            $oneCartNoDigital = OrderItem::with(['pack' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }], ['product' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }])->where('order_id', '=', $order->id)->where('user_id', $user->id)->where('delivery_type', '!=', 'digital')->first();
            $all_items_are_digital = !$oneCartNoDigital;
        }
        return $all_items_are_digital;
    }

    private function allOrdertemsArePhysical($order){
        $all_items_are_physical = false;
        $user = Auth::user();
        if($user) {
            $oneCartNoPhysical = OrderItem::with(['pack' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }], ['product' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }])->where('order_id', '=', $order->id)->where('user_id', $user->id)->where('delivery_type', '!=', 'physical')->first();
            $all_items_are_physical = !$oneCartNoPhysical;
        }
        return $all_items_are_physical;
    }


    public function applyDiscount(Request $request){
        $code = $request->get('code');
        $discount = Discount::where('code', '=', $code)->where('enabled', '=', 1)->where('removed', '=', 0)->first();
        if(!$discount){
            return redirect()->back()->withInput()->withErrors(['El Descuento no fué aplicado correctamente, intente nuevamente']);
        }

        if($discount->one_time_use){
            $tmpDiscountCartCount = Cart::where('discount_id', '=', $discount->id)->count();
            $tmpDiscountOrderCount = Order::where('discount_id', '=', $discount->id)->where('rejected', '=', 0)->count();
            if($tmpDiscountCartCount || $tmpDiscountOrderCount){
                return redirect()->back()->withErrors(['error' => 'El descuento ingresado ya fué utilizado'])->withInput();
            }
        }

        $user = Auth::user();
        if($user){
            if(Cart::where('user_id', '=', $user->id)->update(['discount_id' => $discount->id])){
                return redirect()->back()->withInput()->withSuccess('El Descuento fue aplicado correctamente');
            }
        }

        return redirect()->back()->withErrors(['error' => 'Ocurrió un problema al aplicar el descuento, intente nuevamente'])->withInput();


    }
}
