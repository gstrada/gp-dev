<?php

namespace App\Http\Controllers\Backend\Order;

use App\Helpers\CardHelper;
use App\Http\Controllers\Controller;
use App\Mail\DigitalItemMail;
use App\Mail\OrderMail;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Order\Order;
use App\Models\Filters\StartsWithFilter;
use App\Models\Order\OrderItem;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $status = Request::capture()->get('status');
        $available_status = ['pending', 'confirmed', 'dismissed'];
        if(!in_array($status,$available_status)){
            $status = 'pending';
        }

        $query = Order::with('user', 'payment', 'shipping_city', 'billing_city', 'items');
        if($status === 'pending'){
            $query->where('approved', '=', 0)->where('rejected', '=', 0)->where('processed', '=', 0)->whereHas('payment', function($q){
                $q->where('slug', '=', 'wiredtransfer');
            });
        }
        if($status === 'confirmed'){
            $query->where('approved', '=', 1)->where('rejected', '=', 0);
        }
        if($status === 'dismissed'){
            $query->where('rejected', '=', 1);
        }

        $result_query = QueryBuilder::for($query)
            ->defaultSort('-id')
            ->allowedSorts(['id', 'created_at', 'approved'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-user.name', new StartsWithFilter(), 'user.name'),
                AllowedFilter::custom('ends-with-user.name', new EndsWithFilter(), 'user.name'),
                AllowedFilter::custom('contains-user.name', new ContainsFilter(), 'user.name'),
                AllowedFilter::custom('matches-user.name', new MatchesFilter(), 'user.name'),
                AllowedFilter::custom('greater-than-user.name', new GreaterThanFilter(), 'user.name'),
                AllowedFilter::custom('less-than-user.name', new LessThanFilter(), 'user.name'),

                AllowedFilter::custom('starts-with-user.lastname', new StartsWithFilter(), 'user.lastname'),
                AllowedFilter::custom('ends-with-user.lastname', new EndsWithFilter(), 'user.lastname'),
                AllowedFilter::custom('contains-user.lastname', new ContainsFilter(), 'user.lastname'),
                AllowedFilter::custom('matches-user.lastname', new MatchesFilter(), 'user.lastname'),
                AllowedFilter::custom('greater-than-user.lastname', new GreaterThanFilter(), 'user.lastname'),
                AllowedFilter::custom('less-than-user.lastname', new LessThanFilter(), 'user.lastname'),

                AllowedFilter::custom('starts-with-user.email', new StartsWithFilter(), 'user.email'),
                AllowedFilter::custom('ends-with-user.email', new EndsWithFilter(), 'user.email'),
                AllowedFilter::custom('contains-user.email', new ContainsFilter(), 'user.email'),
                AllowedFilter::custom('matches-user.email', new MatchesFilter(), 'user.email'),
                AllowedFilter::custom('greater-than-user.email', new GreaterThanFilter(), 'user.email'),
                AllowedFilter::custom('less-than-user.email', new LessThanFilter(), 'user.email'),

                AllowedFilter::custom('starts-with-payment.name', new StartsWithFilter(), 'payment.name'),
                AllowedFilter::custom('ends-with-payment.name', new EndsWithFilter(), 'payment.name'),
                AllowedFilter::custom('contains-payment.name', new ContainsFilter(), 'payment.name'),
                AllowedFilter::custom('matches-payment.name', new MatchesFilter(), 'payment.name'),
                AllowedFilter::custom('greater-than-payment.name', new GreaterThanFilter(), 'payment.name'),
                AllowedFilter::custom('less-than-payment.name', new LessThanFilter(), 'payment.name'),

                AllowedFilter::custom('starts-with-created_At', new StartsWithFilter(), 'created_At'),
                AllowedFilter::custom('ends-with-created_At', new EndsWithFilter(), 'created_At'),
                AllowedFilter::custom('contains-created_At', new ContainsFilter(), 'created_At'),
                AllowedFilter::custom('matches-created_At', new MatchesFilter(), 'created_At'),
                AllowedFilter::custom('greater-than-created_At', new GreaterThanFilter(), 'created_At'),
                AllowedFilter::custom('less-than-created_At', new LessThanFilter(), 'created_At'),


                AllowedFilter::custom('starts-with-delivery_mode', new StartsWithFilter(), 'delivery_mode'),
                AllowedFilter::custom('ends-with-delivery_mode', new EndsWithFilter(), 'delivery_mode'),
                AllowedFilter::custom('contains-delivery_mode', new ContainsFilter(), 'delivery_mode'),
                AllowedFilter::custom('matches-delivery_mode', new MatchesFilter(), 'delivery_mode'),
                AllowedFilter::custom('greater-than-delivery_mode', new GreaterThanFilter(), 'delivery_mode'),
                AllowedFilter::custom('less-than-delivery_mode', new LessThanFilter(), 'delivery_mode'),


                AllowedFilter::custom('starts-with-amount_to_pay', new StartsWithFilter(), 'amount_to_pay'),
                AllowedFilter::custom('ends-with-amount_to_pay', new EndsWithFilter(), 'amount_to_pay'),
                AllowedFilter::custom('contains-amount_to_pay', new ContainsFilter(), 'amount_to_pay'),
                AllowedFilter::custom('matches-amount_to_pay', new MatchesFilter(), 'amount_to_pay'),
                AllowedFilter::custom('greater-than-amount_to_pay', new GreaterThanFilter(), 'amount_to_pay'),
                AllowedFilter::custom('less-than-amount_to_pay', new LessThanFilter(), 'amount_to_pay')

            );

        $result = $result_query->jsonPaginate();

        $result->getCollection()->transform(function ($order) use ($status){

            $one_physical = false;
            $one_digital = false;

            foreach ($order->items as $item){
                $item->name = '';
                if($item->pack){
                    $item->name = $item->pack->name;
                }
                if($item->product){
                    $item->name = $item->product->name;
                }
                if($item->delivery_type === 'physical' || $item->delivery_type === 'card'){
                    $one_physical = true;
                }
                if($item->delivery_type === 'digital'){
                    $one_digital = true;
                }
            }
            $order->delivery_mode = '';
            if($one_digital && $one_physical){
                $order->delivery_mode = 'Ambos';
            }else{
                if($one_digital && !$one_physical){
                    $order->delivery_mode = 'Digital';
                }else if(!$one_digital && $one_physical){
                    $order->delivery_mode = 'Físico';
                }else{
                    $order->delivery_mode = 'S/D';
                }

            }

            $order->full_billing_address = $order->billing_address;
            if($order->billing_city){
                $order->full_billing_address .= ' ' . $order->billing_city->name . ' (' . $order->billing_zip_code .')';
                if($order->billing_city->state){
                    $order->full_billing_address .= ' ' . $order->billing_city->state->name;
                    if($order->billing_city->state->country){
                        $order->full_billing_address .= ' ' .$order->billing_city->state->country->name;
                    }
                }
            }

            $order->full_shipping_address = $order->shipping_address;
            if($order->shipping_city){
                $order->full_shipping_address .= ' ' . $order->shipping_city->name . ' (' . $order->shipping_zip_code .')';
                if($order->shipping_city->state){
                    $order->full_shipping_address .= ' ' . $order->shipping_city->state->name;
                    if($order->shipping_city->state->country){
                        $order->full_shipping_address .= ' ' .$order->shipping_city->state->country->name;
                    }
                }
            }
            $order->status = $status;
            return $order;
        });

        return response_json('OK', 200, $result);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function setStatus(Request $request)
    {
        $order_id = $request->get('id');
        $status = $request->get('status', 'pending');
        $containsDigital = false;
        $orderItemsDelivery = OrderItem::where('order_id', $order_id)->get()->pluck("delivery_type");

        foreach ($orderItemsDelivery as $oid){
            if($oid == "digital") {
                $containsDigital = true;
                break;
            }
        }

        $available_status = ['pending', 'confirmed', 'dismissed'];
        if(!in_array($status,$available_status)){
            $status = 'pending';
        }

        $order = Order::find($order_id);


        if($order){
            $message = '';
            if($status === 'pending'){
                $order->approved = 0;
                $order->rejected = 0;
                $order->processed = 0;
                $order->date_processed = null;
                $message = 'La orden fue actualizada a Pendiente';
            }
            if($status === 'confirmed'){
                $order->approved = 1;
                $order->rejected = 0;
                $order->processed = 1;
                $order->date_processed = Carbon::now();

                Mail::to($order->user->email)->send(new OrderMail($order, $containsDigital));
                Mail::to('pagos@goldenpack.com.ar')->send(new OrderMail($order, $containsDigital));
                if($containsDigital == true){
                    Mail::to($order->user->email)->send(new DigitalItemMail($order, $containsDigital));
                }

                CardHelper::getCards($order);

                $message = 'La orden fue actualizada a Confirmada';
            }
            if($status === 'dismissed'){
                $order->approved = 0;
                $order->rejected = 1;
                $order->processed = 0;
                $order->date_processed = null;
                $message = 'La orden fue actualizada a Rechazada';
            }
            if($order->save()){
                return response_json($message, 200);
            }
        }
        return response_json('La orden no fue encontrada', 401);
    }

}
