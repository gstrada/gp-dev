<?php

namespace App\Models\Payment;

use App\Models\Location\City;
use Illuminate\Database\Eloquent\Model;

class PaymentMethodCity extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'payment_method_state_id', 'city_id', 'price', 'enabled', 'removed'
    ];

    public function payment_method(){
        return $this->hasOneThrough(PaymentMethod::class, PaymentMethodState::class, 'payment_method_states.id','payment_methods.id', 'payment_method_state_id',  'payment_method_id');
    }

    public function city(){
        return $this->belongsTo(City::class, 'city_id', 'id');
    }

    public function cityWithState(){
        return $this->belongsTo(City::class, 'city_id', 'id')->with('state');
    }
}
