<?php

use Illuminate\Database\Seeder;

class TreinTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('trein')->insert([
        'coupe_id' => '1',
        'faciliteiten_id' => '1',
        'type' => 'sneltrein',
      ]);

      DB::table('trein')->insert([
        'coupe_id' => '2',
        'faciliteiten_id' => '2',
        'type' => 'intercity',
      ]);

    }
}
