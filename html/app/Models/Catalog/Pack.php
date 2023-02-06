<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Model;

class Pack extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'category_id', 'name', 'sku', 'friendly_url',
        'color', 'short_description', 'description', 'order',
        'physical_price', 'digital_price', 'card_price', 'discount', 'online_only', 'featured',
        'available_for_sale', 'enabled', 'removed'
    ];

    /**
     * The attributes that should be appended to the model.
     *
     * @var array
     */

    protected $appends = ['pictureUrl'];

    public function getPictureUrlAttribute(){
        if($this->picture){
            return asset($this->picture);
        }
        return asset('assets/images/no-image.png');
    }

    /**
     * Get Parent Categories
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function category(){
        return $this->belongsTo(Category::class,'category_id', 'id');
    }

    /**
     * Get Products
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function products(){
        return $this->belongsToMany(Product::class, PackProduct::class, 'pack_id', 'product_id');
    }


}
