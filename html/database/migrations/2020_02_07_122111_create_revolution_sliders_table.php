<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRevolutionSlidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('revolution_sliders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable();
            $table->date('activate_date_from')->nullable();
            $table->date('activate_date_until')->nullable();
            $table->string('zip_file_path')->nullable();
            $table->string('slider_file_path')->nullable();
            $table->string('slider_id')->nullable();
            $table->text('slider_div')->nullable();
            $table->text('slider_js')->nullable();
            $table->boolean('valid')->default(0);
            $table->boolean('processed')->default(0);
            $table->boolean('enabled')->default(0);
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
        Schema::dropIfExists('revolution_sliders');
    }
}
