<?php

namespace App\Models\Catalog;

use App\Models\ServiceProvider\ProviderAddress;
use Illuminate\Database\Eloquent\Model;
use NunoMaduro\Collision\Provider;

class ProductAddress extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'product_id', 'provider_address_id',
        'enabled', 'removed'
    ];

    /**
     * Get Products
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function product(){
        return $this->belongsTo(Product::class,'product_id', 'id');
    }

    /**
     * Get Address
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function address(){
        return $this->belongsTo(ProviderAddress::class,'provider_address_id', 'id');
    }

    /**
     * Get Address With State
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function addressWithProviderAndState(){
        return $this->belongsTo(ProviderAddress::class,'provider_address_id', 'id')->with(['provider', 'state']);
    }

}
