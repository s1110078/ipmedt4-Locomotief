<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKaartTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kaart', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->integer('kaart_id')->unique();
            $table->string('klasse');
        });

        Schema::table('kaart', function($table) {
          $table->foreign('kaart_id')->references('kaart_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kaart');
    }
}
