<?php

namespace App\Models\Reservation;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'nombre_apellido',
        'contact_phone',
        'card_number',
        'custom_number',
        'cvv',
        'pack',
        'prestador',
        'localidad_prestador',
        'q_personas',
        'reservation_date',
        'reservation_hour',
        'observations',
        'status',
        'responsable',
        'comments',
        'used_on',
        'date_activated'
    ];
}
