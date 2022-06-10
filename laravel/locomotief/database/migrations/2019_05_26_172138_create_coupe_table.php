<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoupeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coupe', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->integer('NS_coupe_id');
            $table->integer('zitplaatsen');
            $table->string('klasse');
        });

        Schema::table('coupe', function($table) {
          $table->foreign('NS_coupe_id')->references('coupe_id')->on('trein')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coupe');
    }
}
