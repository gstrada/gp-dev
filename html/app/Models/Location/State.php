<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'country_id', 'name', 'enabled', 'removed'
    ];

    public function country(){
        return $this->belongsTo(Country::class, 'country_id', 'id');
    }

    public function cities(){
        return $this->hasMany(City::class);
    }
}
