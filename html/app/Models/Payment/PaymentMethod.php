<?php

namespace App\Models\Payment;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'slug', 'order', 'name', 'success_description', 'order_description', 'enabled_for_all_subitems', 'enabled', 'removed'
    ];

    public function payment_method_states(){
        return $this->hasMany(PaymentMethodState::class);
    }

}
