<?php

use Illuminate\Database\Seeder;

class KaartTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('kaart')->insert([
        'kaart_id' => '1',
        'klasse' => '2',
      ]);

      DB::table('kaart')->insert([
        'kaart_id' => '2',
        'klasse' => '1',
      ]);
    }
}
