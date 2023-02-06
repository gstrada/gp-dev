<?php

namespace App\Console\Commands;

use App\Helpers\CardHelper;
use App\Helpers\Helper;
use App\Models\Card\Card;
use App\Models\Catalog\Category;
use App\Models\Catalog\Pack;
use App\Models\Catalog\PackProduct;
use App\Models\Catalog\Product;
use App\Models\Catalog\ProductAddress;
use App\Models\Catalog\ProductPicture;
use App\Models\Client\Client;
use App\Models\Location\City;
use App\Models\Location\State;
use App\Models\Order\Order;
use App\Models\Order\OrderItem;
use App\Models\ServiceProvider\Provider;
use App\Models\ServiceProvider\ProviderAddress;
use App\Models\ServiceProvider\ProviderTransaction;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class TrasnsactionMigrator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tr:migrator';

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
//        $this->cleanDb();
//        $this->migrateClients();
//        $this->migrateOrders();
//        $this->migrateExternalClientCards();
//        $this->migrateTransactions();

    }

    public function cleanDb(){
        DB::select('DELETE FROM clients;');
        DB::select('ALTER TABLE clients AUTO_INCREMENT=0;');
        DB::select('DELETE FROM cards;');
        DB::select('ALTER TABLE cards AUTO_INCREMENT=0;');
        DB::select('DELETE FROM orders;');
        DB::select('ALTER TABLE orders AUTO_INCREMENT=0;');
        DB::select('DELETE FROM order_items;');
        DB::select('ALTER TABLE order_items AUTO_INCREMENT=0;');
        DB::select('DELETE FROM provider_transactions;');
        DB::select('ALTER TABLE provider_transactions AUTO_INCREMENT=0;');
    }

    public function migrateClients(){
        $external_clients = DB::connection('mysql_old')->table('external_clients')->get();

        foreach ($external_clients as $external_client){
            $client = new Client();
            $client->name = $external_client->name;
            $client->social_name = $external_client->name;
            $client->tax_condition = $external_client->iva_condition;
            $client->phone = $external_client->phone;
            $client->mail = $external_client->mail;
            $client->address = $external_client->address;
            $client->save();
        }

    }

    public function migrateOrders(){

        $states = State::with('cities')->get();

        $users = User::select('email', 'id')->get()->pluck('id', 'email')->toArray();
        $old_users = DB::connection('mysql_old')->table('users')->select('users.id', 'users.email')->get()->pluck('id', 'email');

        $user_ids = [];
        foreach ($old_users as $old_email => $old_user_id){
            if(array_key_exists($old_email, $users)){
                $user_ids[$old_user_id] = $users[$old_email];
            }
        }

        $orders = DB::connection('mysql_old')->table('orders')->get();

        $bar = $this->output->createProgressBar(count($orders));
        $bar->start();

        $shipping = [
            2 => 1,
            3 => 4
        ];

        $payment = [
            1 => 1,
            3 => 2
        ];

        foreach ($orders as $order) {

            $user_id = $user_ids[$order->user_id];

            $gpOrder = new Order();

            $gpOrder->user_id = $user_id;

            if($order->shipping_method_id and array_key_exists($order->shipping_method_id, $shipping)){
                $gpOrder->carrier_id = $shipping[$order->shipping_method_id];
            }
            if($order->payment_method_id and array_key_exists($order->payment_method_id, $payment)){
                $gpOrder->payment_id = $payment[$order->payment_method_id];
            }

            $items = DB::connection('mysql_old')->table('order_items')
                ->where('order_id','=', $order->id)
                ->get();

            $gpOrder->amount_to_pay = $order->full_shipping_cost;
            $gpOrder->user_id = $user_id;

            foreach ($items as $item){
                $gpOrder->amount_to_pay += $item->price;
            }

            $gpOrder->shipping_price = $order->shipping_cost;

            if($order->status === 'approved'){
                $gpOrder->payment_price = $gpOrder->amount_to_pay;
                $gpOrder->approved = 1;
            }else{
                if($order->status === 'rejected' || $order->status === 'returned' || $order->status === 'discarded' || $order->status === 'cancelled'){
                    $gpOrder->rejected = 1;
                }else if ($order->status === 'pending_approval'){
                    $gpOrder->processed = 1;
                    $gpOrder->date_processed = $order->status_date;
                }
            }

            $shipping_city_id = $this->findCityId($states, $this->buildFullAddress($order->shipping_country, $order->shipping_state, $order->shipping_city , $order->shipping_address, $order->shipping_street_number, $order->shipping_floor, $order->shipping_dpto));
            $billing_city_id = $this->findCityId($states, $this->buildFullAddress($order->billing_country, $order->billing_state, $order->billing_city , $order->billing_address, $order->billing_street_number, $order->billing_floor, $order->billing_dpto));

            if($gpOrder->carrier_id){
                $gpOrder->shipping_city_id = $shipping_city_id;
                $gpOrder->shipping_zip_code = $order->shipping_zipcode;
                $gpOrder->shipping_address = $this->buildAddress($order->shipping_address, $order->shipping_street_number, $order->shipping_floor, $order->shipping_dpto);
            }

            $gpOrder->billing_city_id = $billing_city_id;
            $gpOrder->billing_zip_code = $order->billing_zipcode;
            $gpOrder->billing_address = $this->buildAddress($order->billing_address, $order->billing_street_number, $order->billing_floor, $order->billing_dpto);
            if($order->need_invoice){
                $gpOrder->billing_social_name = $order->company_name;
                $gpOrder->billing_social_number = $order->company_identifier;
            }


            $gpOrder->transaction_id = $order->transaction_id;
            $gpOrder->alternative_id = $order->alternative_id;

            if($order->delivery_type_id === 1){
                $gpOrder->is_pick_up = 1;
                $gpOrder->pick_up_location = 'Luis de Tejeda 3933 PB - Oficina 2 (Timbre 4) Cordoba Capital';
            }

            $gpOrder->created_at = $order->created_at;
            $gpOrder->updated_at = $order->updated_at;
            $gpOrder->user_id = $user_id;

            if($gpOrder->save()){
                foreach ($items as $item){
                    $product_combination = DB::connection('mysql_old')->table('product_combinations')
                        ->where('id','=', $item->product_combination_id)
                        ->first();
                    if($product_combination){
                        $product = DB::connection('mysql_old')->table('product_trs')
                            ->where('product_id','=', $product_combination->product_id)
                            ->first();
                        if($product){
                            $pack = Pack::where('sku', '=', $product->name_id)->first();
                            if($pack){
                                $delivery_type = 'physical';
                                if($product_combination->is_virtual){
                                    $delivery_type = 'digital';
                                }

                                $gpOrderItem = new OrderItem();
                                $gpOrderItem->user_id = $user_id;
                                $gpOrderItem->order_id = $gpOrder->id;
                                $gpOrderItem->pack_id = $pack->id;
                                $gpOrderItem->delivery_type = $delivery_type;
                                $gpOrderItem->quantity = $item->quantity;
                                $gpOrderItem->item_price = $item->price / $item->quantity;
                                $gpOrderItem->created_at = $item->created_at;
                                $gpOrderItem->updated_at = $item->updated_at;

                                if($gpOrderItem->save()){
                                    $cards = DB::connection('mysql_old')->table('cards')
                                        ->where('order_item_id','=', $item->id)
                                        ->get();

                                    foreach ($cards as $card){


                                        $gpCard = new Card();
                                        $gpCard->number = CardHelper::generateCardNumber($gpOrder, $gpOrderItem, false);
                                        $gpCard->custom_number = $card->number;
                                        $gpCard->cvv = $card->cvv;
                                        $gpCard->name = $card->firstname;
                                        $gpCard->lastname = $card->lastname;
                                        $gpCard->valid_from = $card->valid_from;
                                        $gpCard->valid_thru = $card->valid_thru;
                                        $gpCard->delivery_type = 'physical';
                                        if($card->virtual){
                                            $gpCard->delivery_type = 'digital';
                                        }
                                        $gpCard->sender_name = $card->recipient_sender;
                                        $gpCard->digital_recipient_email = $card->recipient_email;
                                        $gpCard->digital_recipient_name = $card->recipient_name;
                                        $gpCard->digital_recipient_message_title = $card->recipient_message_title;
                                        $gpCard->digital_recipient_message_body = $card->recipient_message_body;
                                        $gpCard->digital_email_sent = $card->email_sent;
                                        $gpCard->digital_date_email_sent = $card->date_email_sent;
                                        $gpCard->user_id = $user_id;
                                        $gpCard->order_item_id = $gpOrderItem->id;
                                        $gpCard->enabled = $card->enabled;
                                        $gpCard->activated = $card->card_verified;
                                        if($card->card_verified){
                                            $gpCard->date_activated = $card->updated_at;
                                        }

                                        if($card->service_id){
                                            $service = DB::connection('mysql_old')->table('provider_services')->where('id', '=', $card->service_id)->first();
                                            if($service){
                                                $new_product = Product::where('provider_id', '=', $service->provider_id)
                                                    ->where('name', '=', $service->name)->first();
                                                if(!$new_product){
                                                    $new_product = Product::where('provider_id', '=', $service->provider_id)->first();

                                                }

                                                if($new_product){
                                                    $gpCard->used_on_product_id = $new_product->id;
                                                    if($new_product->addresses()->first()){
                                                        $gpCard->used_on_product_address_id = $new_product->addresses()->first()->id;
                                                    }
                                                }

                                            }
                                        }

                                        $gpCard->used = $card->used;
                                        $gpCard->date_used = $card->date_used;
                                        $gpCard->disabled = !$card->enabled;

                                        $gpCard->save();


                                    }
                                }
                            }
                        }
                    }
                }
            }




            $bar->advance();
        }
        $bar->finish();
    }

    public function migrateExternalClientCards(){

        $client_and_services = DB::connection('mysql_old')->table('cards')->whereNotNull('external_client_id')->groupBy('external_client_id', 'product_id')->get();

        $bar = $this->output->createProgressBar(count($client_and_services));
        $bar->start();
        $user = User::whereEmail(env('EXTERNAL_CLIENT_USER_EMAIL', 'external@site.org'))->first();
        if(!$user){
            $user = new User();
            $user->email = env('EXTERNAL_CLIENT_USER_EMAIL', 'external@site.org');
            $user->name = env('EXTERNAL_CLIENT_USER_NAME', 'Cliente');
            $user->lastname = env('EXTERNAL_CLIENT_USER_LASTNAME', 'Externo');
            $user->city_id = env('EXTERNAL_CLIENT_USER_CITY_ID');
            $user->save();
        }

        foreach ($client_and_services as $cs) {
            $external_client = DB::connection('mysql_old')->table('external_clients')->where('id', '=', $cs->external_client_id)->first();
            if ($external_client) {
                $gpClient = Client::where('name', '=', $external_client->name)->first();
                if($gpClient){

                    $order = new Order();
                    $order->user_id = $user->id;
                    $order->client_id = $gpClient->id;
                    $order->approved = 1;
                    $order->processed = 1;
                    $order->date_processed = $cs->created_at;
                    $order->created_at = $cs->created_at;
                    $order->updated_at = $cs->updated_at;
                    if($order->save()){

                        $cards = DB::connection('mysql_old')->table('cards')->where('external_client_id', '=', $cs->external_client_id)->where('product_id', '=', $cs->product_id)->get();

                        $pack = null;
                        $product = DB::connection('mysql_old')->table('product_trs')
                            ->where('product_id','=', $cs->product_id)
                            ->first();
                        if($product) {
                            $pack = Pack::where('sku', '=', $product->name_id)->first();
                        }
                        if (!$pack) {
                            continue;
                        }

                        $item = new OrderItem();
                        $item->user_id = $user->id;
                        $item->pack_id = $pack->id;
                        $item->order_id = $order->id;
                        $item->quantity = count($cards);
                        $item->item_price = 0;
                        $item->created_at = $cs->created_at;
                        $item->updated_at = $cs->updated_at;
                        $item->delivery_type = 'physical';
                        if($item->save()){

                            foreach ($cards as $card){

                                $gpCard = new Card();
                                $gpCard->number = CardHelper::generateCardNumber($order, $item, false);
                                $gpCard->custom_number = $card->number;
                                $gpCard->cvv = $card->cvv;
                                $gpCard->name = $card->firstname;
                                $gpCard->lastname = $card->lastname;
                                $gpCard->valid_from = $card->valid_from;
                                $gpCard->valid_thru = $card->valid_thru;
                                $gpCard->delivery_type = 'physical';
                                if($card->virtual){
                                    $gpCard->delivery_type = 'digital';
                                }
                                $gpCard->sender_name = $card->recipient_sender;
                                $gpCard->digital_recipient_email = $card->recipient_email;
                                $gpCard->digital_recipient_name = $card->recipient_name;
                                $gpCard->digital_recipient_message_title = $card->recipient_message_title;
                                $gpCard->digital_recipient_message_body = $card->recipient_message_body;
                                $gpCard->digital_email_sent = $card->email_sent;
                                $gpCard->digital_date_email_sent = $card->date_email_sent;
                                $gpCard->user_id = $user->id;
                                $gpCard->order_item_id = $item->id;
                                $gpCard->enabled = $card->enabled;
                                $gpCard->activated = $card->card_verified;
                                if($card->card_verified){
                                    $gpCard->date_activated = $card->updated_at;
                                }

                                if($card->service_id){
                                    $service = DB::connection('mysql_old')->table('provider_services')->where('id', '=', $card->service_id)->first();
                                    if($service){
                                        $new_product = Product::where('provider_id', '=', $service->provider_id)
                                            ->where('name', '=', $service->name)->first();
                                        if(!$new_product){
                                            $new_product = Product::where('provider_id', '=', $service->provider_id)->first();
                                        }

                                        if($new_product){
                                            $gpCard->used_on_product_id = $new_product->id;
                                            if($new_product->addresses()->first()){
                                                $gpCard->used_on_product_address_id = $new_product->addresses()->first()->id;
                                            }
                                        }

                                    }
                                }

                                $gpCard->used = $card->used;
                                $gpCard->date_used = $card->date_used;
                                $gpCard->disabled = !$card->enabled;

                                $gpCard->save();

                            }

                        }
                    }
                }
            }
            $bar->advance();
        }

        DB::select('DELETE FROM cards where custom_number is null;');

        $bar->finish();
    }

    public function migrateTransactions(){

        $global_transactions = DB::connection('mysql_old')->table('card_transactions')->whereNotNull('payment_requested')->groupBy('payment_requested')->get();

        $bar = $this->output->createProgressBar(count($global_transactions));
        $bar->start();

        foreach ($global_transactions as $global_transaction) {
            $card_ids = DB::connection('mysql_old')->table('card_transactions')->where('payment_requested', '=', $global_transaction->payment_requested)->get()->pluck('card_id')->toArray();

            if (count($card_ids) > 0) {
                $transaction_ammount = DB::connection('mysql_old')->table('card_transactions')->where('payment_requested', '=', $global_transaction->payment_requested)->sum('payment_amount');

                $card_numbers = DB::connection('mysql_old')->table('cards')->whereIn('id', $card_ids)->get();
                $provider_id = null;
                $card_data = DB::connection('mysql_old')->table('card_transactions')->where('payment_requested', '=', $global_transaction->payment_requested)->first();
                $gpCardId = [];
                foreach ($card_numbers as $card_number){
                    $card = Card::with('usedOnProduct')->where('custom_number', '=',$card_number->number)->first();
                    if($card){
                        $gpCardId[] = $card->id;
                        if($card->usedOnProduct && $card->usedOnProduct->provider_id){
                            if(!$provider_id){
                                $provider_id = $card->usedOnProduct->provider_id;
                            }
                        }
                    }
                }

                if($provider_id && $card_data){
                    $provider = Provider::find($provider_id);
                    if($provider){
                        $user_id = null;
                        $user = $provider->users()->first();
                        if($user){
                            $user_id = $user->id;
                        }
                        $providerTransaction = new ProviderTransaction();
                        $providerTransaction->user_id = $user_id;
                        $providerTransaction->provider_id = $provider->id;
                        $providerTransaction->amount = $transaction_ammount;
                        $providerTransaction->reference_id = $card_data->invoice_number;
                        $providerTransaction->reference_file = $card_data->invoice_file;
                        $providerTransaction->transaction_file = $card_data->transfer_file;
                        $providerTransaction->paid = 1;
                        $providerTransaction->date_paid = $card_data->payment_date;
                        if($providerTransaction->save()){
                            DB::table('cards')->whereIn('id', $gpCardId)->update(['provider_transaction_id' => $providerTransaction->id]);
                        }
                    }

                }



            }
            $bar->advance();
        }

        DB::select('DELETE FROM cards where custom_number is null;');

        $bar->finish();
    }

    public function buildFullAddress($country, $state, $city, $address, $street_number, $floor, $dpto){
        $full_address = $address;
        if($address){
            if($street_number){
                $full_address .= ' ' . $street_number;
            }
            if($floor){
                $full_address .= ' ' . $floor;
            }
            if($dpto){
                $full_address .= ' ' . $dpto;
            }
            if($city){
                $full_address .= ' ' . $city;
            }
            if($state){
                $full_address .= ' ' . $state;
            }
            if($country){
                $full_address .= ' ' . $country;
            }
        }
        return $full_address;
    }

    public function buildAddress($address, $street_number, $floor, $dpto){
        $full_address = $address;
        if($address){
            if($street_number){
                $full_address .= ' ' . $street_number;
            }
            if($floor){
                $full_address .= ' ' . $floor;
            }
            if($dpto){
                $full_address .= ' ' . $dpto;
            }
        }
        return $full_address;
    }

    public function findCityId($states, $full_address){

        $user_city_id = null;
        $normalize_full_address = Helper::normalizeString($full_address);

        $user_state = null;
        $user_city = null;

        foreach ($states as $state) {
            $state_name = Helper::normalizeString($state->name);
            if (strpos(strtolower($normalize_full_address), strtolower($state_name)) !== false) {
                $user_state = $state;
                break;
            }
        }

        if($user_state){
            foreach ($user_state->cities as $city) {
                $city_name = Helper::normalizeString($city->name);
                if (strpos(strtolower($normalize_full_address), strtolower( ', ' . $city_name )) !== false) {
                    $user_city_id = $city->id;
                    $user_city = $city;
                    break;
                }
            }
        }
        if (!$user_city_id) {
            $default_state = State::where('name', 'Córdoba')->first();
            if($default_state){
                $default_city = City::where('state_id', $default_state->id)->where('name', 'CORDOBA')->first();
                if($default_city){
                    $user_city_id = $default_city->id;
                }
            }
        }
        return $user_city_id;
    }

}
