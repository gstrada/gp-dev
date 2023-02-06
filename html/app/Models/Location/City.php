<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'state_id', 'zip_code', 'name', 'enabled', 'removed'
    ];

    public function state(){
        return $this->belongsTo(State::class, 'state_id', 'id');
    }

}
