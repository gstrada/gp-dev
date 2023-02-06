<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePacksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('packs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('name');
            $table->string('sku')->nullable();
            $table->string('friendly_url')->nullable();
            $table->string('color')->nullable();
            $table->longText('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->string('picture')->nullable();
            $table->unsignedBigInteger('order')->default(0);

            $table->double('physical_price')->nullable()->default(null);
            $table->double('digital_price')->nullable()->default(null);
            $table->double('card_price')->nullable()->default(null);
            $table->double('discount')->default(0);

            $table->boolean('online_only')->default(1);
            $table->boolean('featured')->default(0);
            $table->boolean('available_for_sale')->default(0);
            $table->boolean('enabled')->default(1);
            $table->boolean('removed')->default(0);
            $table->timestamps();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('packs');
    }
}
