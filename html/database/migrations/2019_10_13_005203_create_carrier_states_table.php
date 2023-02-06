<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarrierStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carrier_states', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('carrier_id')->unsigned();
            $table->unsignedBigInteger('state_id')->nullable();
            $table->double('price')->default(0);
            $table->double('free_if_order_above')->nullable()->default(null);
            $table->boolean('enabled_for_all_subitems')->default(0);
            $table->boolean('enabled')->default(1);
            $table->boolean('removed')->default(0);

            $table->timestamps();
            $table->foreign('carrier_id')->references('id')->on('carriers')->onDelete('cascade');
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
        Schema::dropIfExists('carrier_states');
    }
}
