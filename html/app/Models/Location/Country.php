<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name', 'enabled', 'removed'
    ];

    public function states(){
        return $this->hasMany(State::class);
    }
}
