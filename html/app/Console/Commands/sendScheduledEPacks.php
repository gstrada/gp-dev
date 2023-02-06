<?php

namespace App\Console\Commands;

use App\Http\Controllers\Frontend\Card\CardController;
use App\Mail\ECardMail;
use App\Models\Card\Card;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class sendScheduledEPacks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sendSheduled:epack';

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
        $minEnabledDate = Carbon::parse('2020-10-16 00:00:00');
        $cardsToSend = Card::where('delivery_type', '=', 'digital')
                           ->whereNotNull('digital_email_delivery_date')
                           ->where('digital_email_delivery_date', '>=', $minEnabledDate)
                           ->where('digital_email_delivery_date', '<=', Carbon::now())
                           ->where('digital_email_sent', '=', 0)->get();
        foreach ($cardsToSend as $card){
            $template = New ECardMail($card);
            $ccs = str_replace(',', ';', $card->digital_cc_email);
            $ccs = str_replace(' ', '', $ccs);
            $cc = explode(";",$ccs);
            if(!is_null($card->digital_cc_email) && $card->digital_cc_email != '' && $card->digital_cc_email != ' ' && $card->digital_cc_email != '--'){
                Mail::to($card->digital_recipient_email)->cc($cc)->send($template);
                Log::info('MAILCC: SUCCESS');
            } else {
                Mail::to($card->digital_recipient_email)->send($template);
                Log::info('MAIL: SUCCESS');
            }
            $card->digital_email_sent          = 1;
            $card->digital_date_email_sent     = Carbon::now();
            $card->save();
        }

        $cardsToSendWp = Card::where('delivery_type', '=', 'digital')
                             ->whereNotNull('digital_wp_delivery_date')
                             ->where('digital_wp_delivery_date', '>=', $minEnabledDate)
                             ->where('digital_wp_delivery_date', '<=', Carbon::now())
                             ->where('digital_wp_sent', '=', 0)->get();

        foreach ($cardsToSendWp as $card){
            $cCtrl = new CardController();
            if(!$cCtrl->sendScheduledWhatsapp($card)){
                continue;
            }
        }
        return true;
    }
}
