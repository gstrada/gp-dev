<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('client_id')->nullable();
            $table->bigInteger('carrier_id')->unsigned()->nullable();
            $table->unsignedBigInteger('payment_id')->nullable();

            $table->float('amount_to_pay')->default(0);
            $table->float('payment_price')->default(0);
            $table->float('shipping_price')->default(0);

            $table->string('transaction_id')->nullable();
            $table->string('alternative_id')->nullable();
            $table->string('tracking_code')->nullable();

            $table->unsignedBigInteger('shipping_city_id')->nullable();
            $table->string('shipping_zip_code')->nullable();
            $table->string('shipping_address')->nullable();
            $table->string('shipping_phone')->nullable();
            $table->string('shipping_note')->nullable();

            $table->unsignedBigInteger('billing_city_id')->nullable();
            $table->string('billing_address')->nullable();
            $table->string('billing_zip_code')->nullable();
            $table->string('billing_phone')->nullable();
            $table->string('billing_social_name')->nullable();
            $table->string('billing_social_number')->nullable();

            $table->boolean('approved')->default(0);
            $table->boolean('rejected')->default(0);
            $table->boolean('processed')->default(0);
            $table->date('date_processed')->nullable();

            $table->boolean('shipped')->default(0);
            $table->date('date_shipped')->nullable();

            $table->boolean('is_pick_up')->default(0);
            $table->string('pick_up_location')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('set null');
            $table->foreign('carrier_id')->references('id')->on('carriers')->onDelete('set null');
            $table->foreign('payment_id')->references('id')->on('payment_methods')->onDelete('set null');
            $table->foreign('shipping_city_id')->references('id')->on('cities')->onDelete('set null');
            $table->foreign('billing_city_id')->references('id')->on('cities')->onDelete('set null');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
