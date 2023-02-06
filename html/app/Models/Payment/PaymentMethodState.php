<?php

namespace App\Models\Payment;

use App\Models\Location\State;
use Illuminate\Database\Eloquent\Model;

class PaymentMethodState extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'payment_method_id', 'state_id', 'price', 'enabled_for_all_subitems', 'enabled', 'removed'
    ];

    public function payment_method(){
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id', 'id');
    }

    public function state(){
        return $this->belongsTo(State::class, 'state_id', 'id');
    }

}
