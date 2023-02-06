<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'code', 'rate', 'one_time_use',
        'enabled', 'removed'
    ];
}
