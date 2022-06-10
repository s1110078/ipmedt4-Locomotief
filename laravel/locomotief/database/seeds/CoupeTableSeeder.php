<?php

use Illuminate\Database\Seeder;

class CoupeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('coupe')->insert([
          'NS_coupe_id' => '1',
          'zitplaatsen' => '35',
          'klasse' => '2',
        ]);

        DB::table('coupe')->insert([
          'NS_coupe_id' => '1',
          'zitplaatsen' => '40',
          'klasse' => '1',
        ]);

        DB::table('coupe')->insert([
          'NS_coupe_id' => '1',
          'zitplaatsen' => '73',
          'klasse' => '2',
        ]);

        DB::table('coupe')->insert([
          'NS_coupe_id' => '1',
          'zitplaatsen' => '102',
          'klasse' => '2',
        ]);

        DB::table('coupe')->insert([
          'NS_coupe_id' => '2',
          'zitplaatsen' => '50',
          'klasse' => '2',
        ]);

        DB::table('coupe')->insert([
          'NS_coupe_id' => '2',
          'zitplaatsen' => '66',
          'klasse' => '1',
        ]);

        DB::table('coupe')->insert([
          'NS_coupe_id' => '2',
          'zitplaatsen' => '105',
          'klasse' => '2',
        ]);

        DB::table('coupe')->insert([
          'NS_coupe_id' => '2',
          'zitplaatsen' => '44',
          'klasse' => '2',
        ]);
    }
}
