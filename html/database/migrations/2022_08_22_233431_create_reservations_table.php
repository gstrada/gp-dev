<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('reservation_method')->default(0);
            $table->string('nombre_apellido');
            $table->string('contact_phone')->nullable();
            $table->string('card_number');
            $table->string('custom_number')->nullable();
            $table->string('cvv')->nullable();
            $table->string('pack');
            $table->string('prestador');
            $table->string('localidad_prestador');
            $table->integer('q_personas');
            $table->date('reservation_date');
            $table->time('reservation_hour');
            $table->string('observations')->nullable();
            $table->string('status')->nullable();
            $table->string('responsable')->nullable();
            $table->string('comments')->nullable();
            $table->string('used_on')->nullable();
            $table->date('date_activated')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
