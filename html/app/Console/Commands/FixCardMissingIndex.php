<?php

namespace App\Console\Commands;

use App\Helpers\CardHelper;
use App\Models\Card\Card;
use App\Models\Order\Order;
use DemeterChain\C;
use Illuminate\Console\Command;

class FixCardMissingIndex extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:card';

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
        $order_id = 752;
        $order = Order::with('items')->where('id', '=', $order_id)->first();
        $card_numbers = CardHelper::getCards($order, false, true);
        foreach ($card_numbers as $order_item_id => $card_number_list){
                $new_cards = Card::whereOrderItemId($order_item_id)->whereIn('number', $card_number_list)->where('digital_email_sent', '=', 0)->get();
                foreach ($new_cards as $new_card){
                    $old_card = Card::whereOrderItemId($order_item_id)->whereNotIn('number', $card_number_list)->where('disabled', '=', 0)->where('digital_email_sent', '=', 1)->first();
                    if($old_card){
                        $new_card->custom_number = $old_card->custom_number;
                        $new_card->cvv = $old_card->cvv;
                        $new_card->name = $old_card->name;
                        $new_card->lastname = $old_card->lastname;
                        $new_card->valid_from = $old_card->valid_from;
                        $new_card->valid_thru = $old_card->valid_thru;
                        $new_card->sender_name = $old_card->sender_name;
                        $new_card->digital_recipient_email = $old_card->digital_recipient_email;
                        $new_card->digital_recipient_name = $old_card->digital_recipient_name;
                        $new_card->digital_recipient_message_title = $old_card->digital_recipient_message_title;
                        $new_card->digital_recipient_message_body = $old_card->digital_recipient_message_body;
                        $new_card->digital_email_sent = $old_card->digital_email_sent;
                        $new_card->digital_date_email_sent = $old_card->digital_date_email_sent;
                        $new_card->activated = $old_card->activated;
                        $new_card->date_activated = $old_card->date_activated;
                        $new_card->used_on_product_id = $old_card->used_on_product_id;
                        $new_card->used_on_product_address_id = $old_card->used_on_product_address_id;
                        $new_card->used = $old_card->used;
                        $new_card->date_used = $old_card->date_used;
                        $new_card->provider_transaction_id = $old_card->provider_transaction_id;
                        $new_card->activated_by_user_id = $old_card->activated_by_user_id;

                        $old_card->disabled = 1;
                        if($old_card->save()){
                            $new_card->save();
                        }
                    }
                }
        }

        dd($card_numbers);

//        foreach ($order as $)
//
//        $cards = Card::whereOrderItemId($order_item_id)->get();
//
//        foreach ($cards as $card){
//            dd($card);
//        }
    }
}
