<?php

namespace App\Models\Card;

use App\Models\Catalog\Product;
use App\Models\Catalog\ProductAddress;
use App\Models\Client\Client;
use App\Models\Order\OrderItem;
use App\Models\ServiceProvider\ProviderAddress;
use App\Models\ServiceProvider\ProviderTransaction;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $fillable = [
        'number', 'custom_number', 'cvv', 'name', 'lastname', 'valid_from', 'valid_thru', 'delivery_type', 'sender_name',
        'digital_custom_logo', 'digital_recipient_email', 'digital_recipient_phone','digital_recipient_name',
        'digital_recipient_message_title', 'digital_recipient_message_body', 'digital_email_sent', 'digital_wp_sent', 'digital_date_pdf_downloaded',
        'digital_date_email_sent', 'digital_date_wp_sent', 'template', 'user_id', 'client_id', 'order_item_id', 'enabled', 'activated',
        'date_activated', 'used_on_product_id', 'used_on_product_address_id', 'used', 'date_used', 'disabled', 'provider_transaction_id'
    ];

    public function user(){
        return $this->belongsTo( User::class, 'user_id', 'id');
    }

    public function client(){
        return $this->belongsTo( Client::class, 'client_id', 'id');
    }

    public function orderItem(){
        return $this->belongsTo( OrderItem::class, 'order_item_id', 'id');
    }

    public function usedOnProduct(){
        return $this->belongsTo( Product::class, 'used_on_product_id', 'id');
    }

    public function usedOnAddress(){
        return $this->belongsTo( ProductAddress::class, 'used_on_product_address_id', 'id');
    }

    public function providerTransaction(){
        return $this->belongsTo( ProviderTransaction::class, 'provider_transaction_id', 'id');
    }
}
