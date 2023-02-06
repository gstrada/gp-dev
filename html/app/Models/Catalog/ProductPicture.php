<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Model;

class ProductPicture extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'product_id', 'path',
        'enabled', 'removed'
    ];

    /**
     * The attributes that should be appended to the model.
     *
     * @var array
     */

    protected $appends = ['pictureUrl'];

    public function getPictureUrlAttribute(){
        if($this->path){
            return asset($this->path);
        }
        return asset('assets/images/no-image.png');
    }

    /**
     * Get Products
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function product(){
        return $this->belongsTo(Product::class,'product_id', 'id');
    }

}
