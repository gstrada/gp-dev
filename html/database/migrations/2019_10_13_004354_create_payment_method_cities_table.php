<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentMethodCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_method_cities', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('payment_method_state_id')->unsigned();
            $table->unsignedBigInteger('city_id')->nullable();
            $table->double('price')->default(0);
            $table->boolean('enabled')->default(1);
            $table->boolean('removed')->default(0);

            $table->timestamps();
            $table->foreign('payment_method_state_id')->references('id')->on('payment_method_states')->onDelete('cascade');
            $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_method_cities');
    }
}
