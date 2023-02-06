<?php

namespace App\Models\Shipping;

use Illuminate\Database\Eloquent\Model;

class Carrier extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name', 'description', 'price', 'free_if_order_above', 'enabled_for_all_subitems', 'enabled', 'removed'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'laravel_through_key',
    ];

    public function states(){
        return $this->hasMany(CarrierState::class);
    }
}
