<?php

use Illuminate\Database\Seeder;

class FaciliteitenTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('faciliteiten')->insert([
          'toilet' => '1',
          'wifi' => '0',
          'fiets' => '0',
          'toegankelijk' => '1',
        ]);

        DB::table('faciliteiten')->insert([
          'toilet' => '1',
          'wifi' => '1',
          'fiets' => '1',
          'toegankelijk' => '1',
        ]);
    }
}
