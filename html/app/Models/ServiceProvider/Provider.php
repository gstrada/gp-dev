<?php

namespace App\Models\ServiceProvider;

use App\Models\Location\State;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name', 'logo', 'description',
        'internal_contact_name', 'internal_contact_address', 'internal_contact_phone', 'internal_contact_email', 'internal_contact_alternative_email',
        'social_name', 'social_number',
        'bank_name', 'bank_account_holder', 'bank_account_social_number', 'bank_account_number', 'bank_account_identifier', 'bank_account_alias',
        'enabled', 'removed'
    ];

    /**
     * The attributes that should be appended to the model.
     *
     * @var array
     */

    protected $appends = ['logoUrl'];

    public function getLogoUrlAttribute(){
        if($this->logo){
            return asset($this->logo);
        }
        return asset('assets/images/no-image.png');
    }

    public function state(){
        return $this->belongsTo(State::class, 'state_id', 'id');
    }

    public function addresses(){
        return $this->hasMany(ProviderAddress::class);
    }

    public function users(){
        return $this->hasMany(User::class, 'id', 'provider_id');
    }
}
