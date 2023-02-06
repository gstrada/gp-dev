<?php

namespace App\Models\Order;

use App\Models\Catalog\Discount;
use App\Models\Catalog\Pack;
use App\Models\Catalog\Product;
use App\Models\Client\Client;
use App\Models\Location\City;
use App\Models\Payment\PaymentMethod;
use App\Models\Shipping\Carrier;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'user_id', 'client_id', 'shipping_city_id', 'billing_city_id', 'carrier_id', 'payment_id', 'payment_price', 'shipping_price', 'amount_to_pay',
        'tracking_code', 'shipping_zip_code', 'shipping_address', 'shipping_phone', 'shipping_note', 'billing_address', 'billing_social_name', 'billing_zip_code', 'billing_phone',
        'billing_social_number', 'is_pick_up', 'pick_up_location','payment_total', 'discount_id'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function client(){
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }

    public function carrier(){
        return $this->belongsTo(Carrier::class, 'carrier_id', 'id');
    }

    public function payment(){
        return $this->belongsTo(PaymentMethod::class, 'payment_id', 'id');
    }

    public function shipping_city(){
        return $this->belongsTo( City::class, 'shipping_city_id', 'id');
    }

    public function billing_city(){
        return $this->belongsTo( City::class, 'billing_city_id', 'id');
    }

    public function items(){
        return $this->hasMany( OrderItem::class, 'order_id', 'id');
    }

    public function discount(){
        return $this->hasOne(Discount::class,'id', 'discount_id');
    }
}
