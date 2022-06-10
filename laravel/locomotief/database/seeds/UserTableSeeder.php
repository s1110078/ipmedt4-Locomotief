<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
          'name' => 'Jeroen',
          'email' => 'Jeroen_NS@gmail.com',
          'kaart_id' => '1',
          'password' => 'NSpassword',
        ]);

        DB::table('users')->insert([
          'name' => 'Robert',
          'email' => 'Robert_NS@gmail.com',
          'kaart_id' => '2',
          'password' => 'NSpassword',
        ]);
    }
}
