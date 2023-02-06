<?php

namespace App\Models\ServiceProvider;

use App\Models\Card\Card;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class ProviderTransaction extends Model
{

    protected $fillable = ['paid', 'removed', 'remove_motive', 'date_paid'];

    /**
     * The attributes that should be appended to the model.
     *
     * @var array
     */


    protected $appends = ['referenceFileUrl', 'transactionFileUrl'];

    public function getReferenceFileUrlAttribute(){
        if($this->reference_file){
            return asset($this->reference_file);
        }
        return null;
    }

    public function getTransactionFileUrlAttribute(){
        if($this->transaction_file){
            return asset($this->transaction_file);
        }
        return null;
    }

    public function user(){
        return $this->belongsTo( User::class, 'user_id', 'id');
    }

    public function provider(){
        return $this->belongsTo( Provider::class, 'provider_id', 'id');
    }

    public function cards(){
        return $this->hasMany(Card::class, 'provider_transaction_id', 'id');
    }
}
