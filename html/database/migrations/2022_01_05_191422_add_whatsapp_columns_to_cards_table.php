<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddWhatsappColumnsToCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cards', function (Blueprint $table) {
            $table->string('digital_recipient_phone')->nullable()->after('digital_recipient_email');
            $table->boolean('digital_wp_sent')->nullable()->after('digital_email_sent')->default(0);
            $table->dateTime('digital_date_wp_sent')->nullable()->after('digital_date_email_sent');
            $table->dateTime('digital_wp_delivery_date')->nullable()->after('digital_email_delivery_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cards', function (Blueprint $table) {
            $table->dropColumn('digital_wp_sent');
            $table->dropColumn('digital_recipient_phone');
            $table->dropColumn('digital_date_wp_sent');
            $table->dropColumn('digital_wp_delivery_date');
        });
    }
}
