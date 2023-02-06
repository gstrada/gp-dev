<?php

namespace App\Models\ServiceProvider;

use App\Models\Location\City;
use App\Models\Location\State;
use Illuminate\Database\Eloquent\Model;

class ProviderAddress extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'provider_id', 'city_id', 'address', 'phone', 'email', 'website', 'lat', 'lon', 'embedded_map', 'enabled', 'removed'
    ];

    public function provider(){
        return $this->belongsTo(Provider::class, 'provider_id', 'id');
    }

    public function city(){
        return $this->belongsTo(City::class, 'city_id', 'id');
    }

    public function state(){
        return $this->hasOneThrough(State::class, City::class, 'cities.id','states.id', 'city_id',  'state_id');
    }
}
