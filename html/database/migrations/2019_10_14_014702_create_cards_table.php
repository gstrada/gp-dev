<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('number');
            $table->string('custom_number')->nullable();
            $table->string('cvv')->nullable();
            $table->string('name')->nullable();
            $table->string('lastname')->nullable();
            $table->date('valid_from');
            $table->date('valid_thru');
            $table->enum('delivery_type', ['physical','digital','card'])->default('digital');

            $table->string('sender_name')->nullable();
            $table->string('digital_recipient_email')->nullable();
            $table->string('digital_recipient_name')->nullable();
            $table->string('digital_recipient_message_title')->nullable();
            $table->longText('digital_recipient_message_body')->nullable();

            $table->boolean('digital_email_sent')->default(0);
            $table->timestamp('digital_date_email_sent')->nullable();

            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('client_id')->nullable();
            $table->unsignedBigInteger('order_item_id')->nullable();
            $table->boolean('enabled')->default(1);


            $table->boolean('activated')->default(0);
            $table->date('date_activated')->nullable();

            $table->unsignedBigInteger('used_on_product_id')->nullable();
            $table->unsignedBigInteger('used_on_product_address_id')->nullable();
            $table->boolean('used')->default(0);
            $table->date('date_used')->nullable();
            $table->boolean('disabled')->default(0);

            $table->unsignedBigInteger('provider_transaction_id')->nullable();

            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('set null');
            $table->foreign('order_item_id')->references('id')->on('order_items')->onDelete('set null');
            $table->foreign('used_on_product_id')->references('id')->on('products')->onDelete('set null');
            $table->foreign('used_on_product_address_id')->references('id')->on('product_addresses')->onDelete('set null');

            $table->foreign('provider_transaction_id')->references('id')->on('provider_transactions')->onDelete('set null');



        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cards');
    }
}
