<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ClearDb extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'clear:db';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->cleanDb();
    }

    public function cleanDb(){
        DB::select('DELETE FROM users;');
        DB::select('ALTER TABLE users AUTO_INCREMENT=0;');
        DB::select('DELETE FROM categories;');
        DB::select('ALTER TABLE categories AUTO_INCREMENT=0;');
        DB::select('DELETE FROM providers;');
        DB::select('ALTER TABLE providers AUTO_INCREMENT=0;');
        DB::select('ALTER TABLE provider_addresses AUTO_INCREMENT=0;');
        DB::select('DELETE FROM products;');
        DB::select('ALTER TABLE products AUTO_INCREMENT=0;');
        DB::select('ALTER TABLE product_addresses AUTO_INCREMENT=0;');
        DB::select('DELETE FROM product_pictures;');
        DB::select('ALTER TABLE product_pictures AUTO_INCREMENT=0;');


        DB::select('DELETE FROM cities;');
        DB::select('ALTER TABLE cities AUTO_INCREMENT=0;');
        DB::select('DELETE FROM  states;');
        DB::select('ALTER TABLE states AUTO_INCREMENT=0;');
    }
}
