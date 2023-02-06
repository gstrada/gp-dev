<?php

namespace App\Models\User;

use App\Models\ServiceProvider\Provider;

use App\Notifications\ResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'lastname', 'email', 'password',
        'player_id', 'city_id', 'gender', 'birthday',
        'shipping_zip_code', 'shipping_address', 'shipping_note', 'billing_address', 'billing_social_name', 'billing_social_number',
        'discount', 'receive_push_notifications', 'enabled',
        'is_admin', 'is_provider', 'provider_role', 'admin_role',
    ];

    protected $appends = ['role'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getRoleAttribute(){
        if($this->is_admin){
            return 'admin';
        }
        if($this->is_provider){
            return 'provider';
        }
        return 'user';
    }

    public function provider(){
        return $this->belongsTo(Provider::class, 'provider_id', 'id');
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }

}
