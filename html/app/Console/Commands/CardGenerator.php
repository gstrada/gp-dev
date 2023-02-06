<?php

namespace App\Console\Commands;

use App\Helpers\CardHelper;
use App\Models\Card\Card;
use App\Models\Order\Order;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CardGenerator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'card:generator {order_id}';

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
        $order_id = $this->argument('order_id');
        $order = Order::find($order_id);
        if($order){
            $cards = CardHelper::getCards($order, true);
            dd($cards);
        }
        $this->error('La orden no fue encontrada');
    }
}
