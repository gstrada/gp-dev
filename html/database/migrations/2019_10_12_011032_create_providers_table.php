<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable();
            $table->string('logo')->nullable();
            $table->longText('description')->nullable();

            $table->string('internal_contact_name')->nullable();
            $table->string('internal_contact_address')->nullable();
            $table->string('internal_contact_phone')->nullable();
            $table->string('internal_contact_email')->nullable();
            $table->string('internal_contact_alternative_email')->nullable();

            $table->string('social_name')->nullable();
            $table->string('social_number')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('bank_account_holder')->nullable();
            $table->string('bank_account_social_number')->nullable();
            $table->string('bank_account_number')->nullable();
            $table->string('bank_account_identifier')->nullable();
            $table->string('bank_account_alias')->nullable();

            $table->boolean('enabled')->default(1);
            $table->boolean('removed')->default(0);

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
        Schema::dropIfExists('providers');
    }
}
