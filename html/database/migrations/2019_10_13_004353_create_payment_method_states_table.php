<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentMethodStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_method_states', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('payment_method_id')->unsigned();
            $table->unsignedBigInteger('state_id')->nullable();
            $table->double('price')->default(0);
            $table->boolean('enabled_for_all_subitems')->default(0);
            $table->boolean('enabled')->default(1);
            $table->boolean('removed')->default(0);
            $table->timestamps();
            $table->foreign('payment_method_id')->references('id')->on('payment_methods')->onDelete('cascade');
            $table->foreign('state_id')->references('id')->on('states')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_method_states');
    }
}
