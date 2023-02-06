<?php

namespace App\Console\Commands;

use App\Http\Controllers\Frontend\Card\CardController;
use App\Mail\testCardMail;
use App\Models\Card\Card;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class testEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sendTest:email';

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

        $card = Card::where('number','0089190008840100019KD')->first();
//        $card = Card::where('number','0089190007154100016KD')->first();
        $template = New testCardMail($card);
        Mail::to('guillermostrada@gmail.com')->send($template);
//        Mail::to('marianocolome@goldenpack.com.ar')->send($template);
        Log::info('MAILCC: SUCCESS');

        return true;
    }
}
