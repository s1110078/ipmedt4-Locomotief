<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFaciliteitenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faciliteiten', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->boolean('toilet');
            $table->boolean('wifi');
            $table->boolean('fiets');
            $table->boolean('toegankelijk');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('faciliteiten');
    }
}
