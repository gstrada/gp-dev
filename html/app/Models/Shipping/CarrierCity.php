<?php

namespace App\Models\Shipping;

use App\Models\Location\City;
use App\Models\Location\State;
use Illuminate\Database\Eloquent\Model;

class CarrierCity extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'carrier_state_id', 'city_id', 'price', 'free_if_order_above', 'enabled', 'removed'
    ];

    public function carrier(){
        return $this->hasOneThrough(Carrier::class, CarrierState::class, 'carrier_states.id','carriers.id', 'carrier_state_id',  'carrier_id');
    }

    public function city(){
        return $this->belongsTo(City::class, 'city_id', 'id');
    }

    public function cityWithState(){
        return $this->belongsTo(City::class, 'city_id', 'id')->with('state');
    }

}
