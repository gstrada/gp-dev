<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('provider_id')->nullable();
            $table->string('name');
            $table->string('title')->nullable();
            $table->string('sku')->nullable();
            $table->string('friendly_url')->nullable();
            $table->longText('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->longText('details')->nullable();
            $table->longText('tips')->nullable();
            $table->longText('foot_note')->nullable();

            $table->unsignedBigInteger('recommended_people')->default(1);
            $table->double('physical_price')->nullable()->default(null);
            $table->double('digital_price')->nullable()->default(null);
            $table->double('card_price')->nullable()->default(null);
            $table->double('discount')->default(0);
            $table->double('internal_benefit_discount')->default(0);
            $table->double('internal_price')->default(0);

            $table->string('picture')->nullable();
            $table->boolean('featured')->default(0);
            $table->boolean('available_for_sale')->default(0);
            $table->boolean('created_by_provider')->default(0);
            $table->unsignedBigInteger('order')->default(0);
            $table->boolean('online_only')->default(1);
            $table->boolean('enabled')->default(1);
            $table->boolean('removed')->default(0);


            $table->timestamps();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
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
        Schema::dropIfExists('products');
    }
}
