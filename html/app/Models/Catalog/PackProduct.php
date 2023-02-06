<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Model;

class PackProduct extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'pack_id', 'product_id',
        'enabled', 'removed'
    ];

    /**
     * Get Provider
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function productWithProvider(){
        return $this->belongsTo(Product::class,'product_id', 'id')->with('provider:id,name');
    }

    /**
     * Get Products
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function product(){
        return $this->belongsTo(Product::class,'product_id', 'id');
    }

    /**
     * Get Packs
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function pack(){
        return $this->belongsTo(Pack::class,'pack_id', 'id');
    }
}
