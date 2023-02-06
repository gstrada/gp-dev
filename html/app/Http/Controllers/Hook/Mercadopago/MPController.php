<?php

namespace App\Http\Controllers\Hook\Mercadopago;


use App\Helpers\CardHelper;
use App\Mail\ECardMail;
use App\Mail\OrderMail;
use App\Models\Order\Cart;
use App\Models\Order\Order;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Request;
use Patosmack\MercadoPago\MP;



class MPController extends Controller
{
    /**
     * Catch Notifications
     *
     * @return \Illuminate\Http\Response
     */
    public function onNotify()
    {
        $topic = Request::get('topic');
        $id = Request::get('id');
        if ($topic === 'merchant_order') {
            $this->processMerchantOrder($id);
        }
    }

    public function onFailure()
    {
        $merchant_order_id = Request::get('merchant_order_id');
        if($merchant_order_id === 'null'){
            $merchant_order_id = null;
        }
        $preference_id = Request::get('preference_id');
        if($merchant_order_id){
            $response = (object)$this->processMerchantOrder($merchant_order_id, $preference_id);
        }elseif($preference_id){
            $response = (object)$this->cancelPaymentPreference($preference_id);
        }
        $order_id = 0;
        if($response && $response->result){
            $order_id = $response->result->id;
        }
        return redirect(route('frontend.checkout.error',$order_id));
        //return view('order.checkout.result', compact('response'));
    }

    public function onPending()
    {
        $merchant_order_id = Request::get('merchant_order_id');
        $response = (object)$this->processMerchantOrder($merchant_order_id);
        $order_id = 0;
        if($response){
            $order_id = $response->id;
        }
        return redirect(route('frontend.checkout.pending',$order_id));
        //return view('order.checkout.result', compact('response'));
    }

    public function onSuccess()
    {
        $merchant_order_id = Request::get('merchant_order_id');
        $response = (object)$this->processMerchantOrder($merchant_order_id);
        $order_id = 0;
        if($response && $response->result){
            $order_id = $response->result->id;
            if($response->result->approved){
                return redirect(route('frontend.checkout.success',$order_id));
            }elseif ($response->result->rejected){
                return redirect(route('frontend.checkout.error',$order_id));
            }
        }
        return redirect(route('frontend.checkout.pending',$order_id));
        //return view('order.checkout.result', compact('response'));

    }

    private function cancelPaymentPreference($preference_id){
        try {
            $mp = new MP(env('MP_APP_ID'), env('MP_APP_SECRET'));
            $preference_order_info = $mp->get_preference($preference_id);
            if (!$preference_order_info) {
                return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago no fue concretado', 'message' => 'Error al recuperar la orden desde el método de pago', 'result' => null];
            }
        }catch (\Exception $exception){
            return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago no fue concretado', 'message' => 'Error al conectar con el método de pago: ' . $exception->getMessage(), 'result' => null];
        }

        if ($preference_order_info["status"] !== 200) {
            return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago no fue concretado', 'message' => 'La transacción posee un estado inválido', 'result' => null];
        }

        $transaction = Order::with('payment')->where('transaction_id', '=', $preference_id)->first();
        if(!$transaction){
            return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago no fue concretado', 'message' => 'La transacción no fue encontrada', 'result' => null];
        }
        $transaction->rejected = 1;
        $transaction->approved = 0;
        $transaction->date_processed = Carbon::now();
        $transaction->save();
        return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago fue cancelado', 'message' => 'Tu transacción fué cancelada desde la entidad de cobro', 'result' => $transaction];
    }

    /**
     * Manage Redirector
     *
     * @return array
     */
    private function processMerchantOrder($merchant_order_id){
        try {
            $mp = new MP(env('MP_APP_ID'), env('MP_APP_SECRET'));
            $merchant_order_info = $mp->get_merchant_order_info($merchant_order_id);
            if (!$merchant_order_info) {
                return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago no fue concretado', 'message' => 'Error al recuperar la orden desde el método de pago', 'result' => null];
            }
        }catch (\Exception $exception){
            return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago no fue concretado', 'message' => 'Error al conectar con el método de pago: ' . $exception->getMessage(), 'result' => null];
        }

        if ($merchant_order_info["status"] !== 200) {
            return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago no fue concretado', 'message' => 'La transacción posee un estado inválido', 'result' => null];
        }

        $preference_id = $merchant_order_info['response']['preference_id'];
        $transaction_id = base64_decode($merchant_order_info['response']['external_reference']);
        $transaction = Order::where('id', '=', $transaction_id)->where('transaction_id', '=', $preference_id)->first();
        if(!$transaction){
            return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago no fue concretado', 'message' => 'La transacción no fue encontrada', 'result' => null];
        }

        $total_amount = (double)$merchant_order_info["response"]["total_amount"];
        $paid_amount = 0;
        foreach ($merchant_order_info["response"]["payments"] as $payment) {
            if ($payment['status'] === 'approved') {
                $paid_amount += (double)$payment['transaction_amount'] - (double)$payment['amount_refunded'];
            }
        }

        if($transaction->transaction_id !== $merchant_order_info['response']['preference_id']){
            return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago no fue concretado', 'message' => 'La transacción no corresponde con el identificador entregado', 'result' => null];
        }

        if((int)$transaction->amount_to_pay !== (int)$total_amount){
            return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago no fue concretado', 'message' => 'El total de la transacción es inválido', 'result' => null];
        }

        if ($transaction->approved === 1){
            CardHelper::getCards($transaction);
            return ['error' => false, 'type' => 'success', 'title' => 'Tu pago fue exitoso',  'message' => 'Tu transacción está aprobada', 'result' => $transaction];
        }

        if ($transaction->rejected === 1){
            return ['error' => false, 'type' => 'danger', 'title' => 'Tu pago fue rechazado', 'message' => 'Tu transacción está rechazada', 'result' => $transaction];
        }

        $transaction->external_response = json_encode($merchant_order_info);

        if($merchant_order_info['response']['cancelled']){
            $transaction->rejected = 0;
            $transaction->date_processed = Carbon::now();
            $transaction->save();
            return ['error' => false, 'type' => 'danger', 'title' => 'Tu pago fue cancelado', 'message' => 'Tu transacción fué cancelada desde la entidad de cobro', 'result' => $transaction];
        }else{
            if ($paid_amount >= $total_amount) {
                $transaction->approved = 1;
                $transaction->date_processed = Carbon::now();
                if ($transaction->save()) {
                    Mail::to($transaction->user->email)->send(new OrderMail($transaction));
                    Mail::to('pagos@goldenpack.com.ar')->send(new OrderMail($transaction));
                    CardHelper::getCards($transaction);
                    $this->clearCart($transaction->user_id);
                    return ['error' => false , 'type' => 'success', 'title' => 'Tu pago fue exitoso', 'message' => 'Tu transacción está aprobada', 'result' => $transaction];
                }
            }else{
                $this->clearCart($transaction->user_id);
                return ['error' => false,
                    'type' => 'warning',
                    'title' => 'Tu pago se encuentra en proceso de aprobación',
                    'message' => 'Tu transacción fue aceptada, pero requiere confirmación desde la entidad de pago, una vez concretado, la misma será aprobada',
                    'result' => $transaction];
            }
        }

        return ['error' => true, 'type' => 'danger', 'title' => 'Tu pago no fue concretado', 'message' => 'Tu transacción no fue guardada correctamente', 'result' => $transaction];
    }


    private function clearCart($user_id){
        $carts = Cart::where('user_id', '=', $user_id)->get();
        foreach ($carts as $cart){
            $cart->delete();
        }
    }
}
