<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'parent_id', 'name', 'friendly_url',
        'color', 'visible_on_menu', 'order',
        'enabled', 'removed'
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

    public function parent(){
        return $this->belongsTo(Category::class,'parent_id', 'id');
    }

    /**
     * Get Child Categories
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function children(){
        return $this->hasMany(Category::class,'parent_id', 'id')->with('children', 'parent')->orderBy('order');
    }

    public function packs(){
        return $this->hasMany(Pack::class,'category_id', 'id');
    }

    public function products(){
        return $this->hasMany(Product::class,'category_id', 'id')
            ->with('provider')
            ->orderBy('order');
    }

}
