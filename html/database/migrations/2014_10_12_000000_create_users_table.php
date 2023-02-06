<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('email')->unique();
            $table->string('name');
            $table->string('lastname')->nullable();
            $table->string('player_id')->nullable();
            $table->unsignedBigInteger('city_id')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->date('birthday')->nullable();
            $table->string('shipping_zip_code')->nullable();
            $table->string('shipping_address')->nullable();
            $table->string('shipping_note')->nullable();
            $table->string('billing_address')->nullable();
            $table->string('billing_social_name')->nullable();
            $table->string('billing_social_number')->nullable();
            $table->double('discount')->default(0);
            $table->boolean('is_admin')->default(0);
            $table->boolean('is_provider')->default(0);
            $table->boolean('receive_push_notifications')->default(0);
            $table->boolean('enabled')->default(1);
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('city_id')->references('id')->on('cities')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
