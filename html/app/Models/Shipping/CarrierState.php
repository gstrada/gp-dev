<?php

namespace App\Models\Shipping;

use App\Models\Location\State;
use Illuminate\Database\Eloquent\Model;

class CarrierState extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'carrier_id', 'state_id', 'price', 'free_if_order_above', 'enabled_for_all_subitems', 'enabled', 'removed'
    ];

    public function carrier(){
        return $this->belongsTo(Carrier::class, 'carrier_id', 'id');
    }

    public function state(){
        return $this->belongsTo(State::class, 'state_id', 'id');
    }

}
