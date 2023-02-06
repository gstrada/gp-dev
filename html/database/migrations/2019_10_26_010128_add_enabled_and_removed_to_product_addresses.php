<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEnabledAndRemovedToProductAddresses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('product_addresses', function (Blueprint $table) {
            $table->boolean('enabled')->default(1);
            $table->boolean('removed')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('product_addresses', function (Blueprint $table) {
            $table->dropColumn('enabled');
            $table->dropColumn('removed');
        });
    }
}
