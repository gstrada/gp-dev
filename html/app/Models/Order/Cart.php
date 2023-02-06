<?php

namespace App\Models\Order;

use App\Models\Catalog\Discount;
use App\Models\Catalog\Pack;
use App\Models\Catalog\Product;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'user_id', 'product_id', 'pack_id', 'delivery_type', 'quantity', 'discount_id'
    ];

    /**
     * The attributes that should be appended to the model.
     *
     * @var array
     */

    protected $appends = ['typeName'];

    public function getTypeNameAttribute(){
        if($this->delivery_type){
            if($this->delivery_type === 'digital'){
                return 'Digital';
            }else if($this->delivery_type === 'physical'){
                return 'Físico';
            }else if($this->delivery_type === 'card'){
                return 'Con Tarjeta';
            }
        }
        return '';
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function product(){
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function pack(){
        return $this->belongsTo(Pack::class, 'pack_id', 'id');
    }

    public function discount(){
        return $this->belongsTo(Discount::class,'discount_id', 'id');
    }
}
