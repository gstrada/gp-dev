<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProviderTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('provider_transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('provider_id')->nullable();
            $table->decimal('amount', 13,4)->default(0);
            $table->string('reference_id')->nullable();
            $table->string('reference_file')->nullable();
            $table->string('transaction_file')->nullable();
            $table->text('reference_description')->nullable();
            $table->boolean('removed')->default(0);
            $table->string('remove_motive')->nullable();
            $table->boolean('paid')->default(0);
            $table->dateTime('date_paid')->nullable()->default(null);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('provider_id')->references('id')->on('providers')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('provider_transactions');
    }
}
