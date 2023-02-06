<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddReservationColumnsToProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->integer('metodo_reserva')->default(0);
            $table->string('num_wp_reserva')->nullable();
            $table->string('alternativa_reserva')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('metodo_reserva');
            $table->dropColumn('num_wp_reserva');
            $table->dropColumn('alternativa_reserva');
        });
    }
}
