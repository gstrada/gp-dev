<?php

namespace App\Console\Commands;

use App\Http\Controllers\Frontend\Card\CardController;
use App\Mail\ECardMail;
use App\Models\Card\Card;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class prevPastDueNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sendNotif:pDue';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envio de notificaciones antes del vencimiento de los regalos';

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
        $cardsToNotif = DB::Select(DB::raw("select `cards`.`id`, `cards`.`number`, `cards`.`digital_recipient_email`, `cards`.`digital_recipient_phone`, `users`.`email`
                        from `cards` inner join `users` on `cards`.`activated_by_user_id` = `users`.`id`
                        where DATE_ADD(DATE_FORMAT(DATE_SUB(now(), INTERVAL 3 HOUR), '%Y-%m-%d'), INTERVAL 2 MONTH) = `valid_thru` and `cards`.`used` = 0"));
        foreach($cardsToNotif as $card) {
            $phone = $card->digital_recipient_phone;
            $email = $card->email;
            //if(is_null($phone) || $phone == '--') {
                $template = New testCardMail($card);
                Mail::to($email)->send($template);
                var_dump($email);
//            } else {
//                var_dump($phone);
//            }
        };
    }
}
