<?php

namespace App\Models\Catalog;

use App\Models\ServiceProvider\Provider;
use App\Models\ServiceProvider\ProviderAddress;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'category_id', 'provider_id', 'name', 'title', 'sku', 'friendly_url', 'short_description', 'description',
        'details', 'tips', 'foot_note', 'recommended_people', 'physical_price', 'digital_price', 'card_price',
        'discount', 'internal_benefit_discount', 'internal_price', 'picture', 'featured', 'available_for_sale',
        'created_by_provider', 'online_only', 'order', 'enabled', 'removed', 'approved', 'invisible', 'metodo_reserva',
        'num_wp_reserva', 'alternativa_reserva'
    ];

    /**
     * The attributes that should be appended to the model.
     *
     * @var array
     */

    protected $appends = ['pictureUrl', 'nameSku'];

    public function getPictureUrlAttribute(){
        if($this->picture){
            return asset($this->picture);
        }
        return asset('assets/images/no-image.png');
    }

    public function getNameSkuAttribute(){

        return $this->name . ' (' . $this->sku . ')';
    }

    /**
     * Get Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function category(){
        return $this->belongsTo(Category::class,'category_id', 'id');
    }

    /**
     * Get Provider
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function provider(){
        return $this->belongsTo(Provider::class,'provider_id', 'id');
    }

    /**
     * Get Pictures
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function pictures(){
        return $this->hasMany(ProductPicture::class,'product_id', 'id');
    }

    /**
     * Get Reviews
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function reviews(){
        return $this->hasMany(ProductReview::class,'product_id', 'id');
    }

    /**
     * Get Packs
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function packs(){
        return $this->belongsToMany(Pack::class, PackProduct::class, 'product_id', 'pack_id');
    }

    /**
     * Get Packs
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function addresses(){
        return $this->belongsToMany(ProviderAddress::class, ProductAddress::class, 'product_id', 'provider_address_id');
    }
}
