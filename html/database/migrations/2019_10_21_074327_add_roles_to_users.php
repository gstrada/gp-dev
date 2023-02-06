<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRolesToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('provider_role', ['admin', 'editor', 'verifier', 'accountant'])->nullable();
            $table->enum('admin_role', ['admin', 'editor', 'verifier', 'support', 'seller', 'designer', 'accountant'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('provider_role');
            $table->dropColumn('admin_role');
        });
    }
}
