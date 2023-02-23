<?php

namespace App\Http\Controllers\Frontend\Card;

use App\Exports\CardsExport;
use App\Helpers\CardHelper;
use App\Http\Controllers\Controller;
use App\Mail\ActivateECardMail;
use App\Mail\ECardMail;
use App\Mail\NotificationMail;
use App\Mail\testCardMail;
use App\Models\Card\Card;
use App\Models\User\User;
use App\Models\Catalog\Pack;
use App\Models\Catalog\Product;
use App\Models\Catalog\ProductAddress;
use App\Models\Location\City;
use App\Models\Location\State;
use App\Models\Order\Order;
use App\Models\Order\OrderItem;
use App\Models\ServiceProvider\ProviderAddress;
use App\Models\Reservation\Reservation;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;

use phpDocumentor\Reflection\Types\Boolean;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Reader\Xls;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use ZipArchive;
ini_set('max_execution_time', '300');

class CardController extends Controller{

    /**
     * Create a new controller instance.
     * @return void
     */
    public function __construct(){
        $this->middleware('auth')->except('activate');
    }

    /**
     * Display a listing of the resource.
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(Request $request){
        return Excel::download(new CardsExport(5588), 'cards.xlsx');
    }

    public function dev() {
        return view('card.pdf_ecardN');
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|Response|\Illuminate\Routing\Redirector
     */
    public function manage(Order $order){
        $user = auth()->user();
        if($this->allOrdertemsArePhysical($order)) {
            return redirect(route('home'))->withErrors(['Esta orden no çontiene productos digitales']);
        }
        if($user->id !== $order->user_id) {
            return redirect(route('home'))->withErrors(['Esta orden no existe']);
        }

        if($order->approved === 0) {
            return redirect(route('home'))->withErrors(['Esta orden no fue aprobada, intente nuevamente o contacte a un administrador']);
        }
        $card_numbers = CardHelper::getCards($order, false);
        $cards        = Card::with('orderItem')->whereIn('number', $card_numbers)->where('delivery_type', '=', 'digital')->get();
        //$cards = Card::with('orderItem')->where('order_item_id', OrderItem::where('order_id', $order->id)->pluck('id')[0])->get();
        $countNoMessage = Card::with('orderItem')->whereNull('digital_recipient_message_body')->get()->where('orderItem.order_id', '=', $order->id)->count();
        if(count($cards) === 0) {
            return redirect(route('home'))->withErrors(['No encontramos productos digitales para ser administrados']);
        }
        $arrIds[] = $order->id;
        foreach($cards as $card) {
            $arrIds[] = $card->id;
        }
        $cardsIds = json_encode($arrIds);
        return view('card.manage_ecard', compact('order', ['cards', 'cardsIds','countNoMessage']));
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function activate($number = null){
        $user = Auth::user();
        if($user) {
            return view('basic.activate_form', compact('number'));
        }
        return view('basic.activate', compact('number'));
    }

    /**
     * Check if the card has a CVV.
     * @return false
     */
    public function checkCvv(Request $request) {

        $number = $request->get('card-number');
        $number = str_replace(' ', '', $number);
        $card = Card::where(function($q) use ($number){
            $q->where('number', '=', $number)->orWhere('custom_number', '=', $number);
        })->first();

        if(!$card) {
            return 'false';
        }

        if(is_null($card->cvv)) {
            return 'false';
        }

        return 'true';
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function linkCard(Request $request){
        $already_activated = 0;
        $user   = Auth::user();
        $number = $request->get('cvv-modal-number') !== null ? $request->get('cvv-modal-number') : $request->get('number');
        $cvv = $request->get('cvv-modal-cvv') !== null ? $request->get('cvv-modal-cvv') : "";
        $number = str_replace(' ', '', $number);
        $show_city_filter = 0;

        if(!$number) {
            return redirect()->back()->withErrors(['El Código es requerido']);
        }

        $card = Card::where(function($q) use ($number){
            $q->where('number', '=', $number)->orWhere('custom_number', '=', $number);
        })->first();

        if(!$card) {
            return redirect()->back()->withErrors(['El Código no existe']);
        }
        $cardCvv = $card->cvv;

        if($cvv != "" && $cvv != $cardCvv) {
            return redirect()->back()->withErrors(['El código CVV es incorrecto. Verifique en su regalo recibido e intente nuevamente.']);
        }

        $card->activated_by_user_id = $user->id;
        if(!$card->name) {
            $card->name = $user->name;
        }
        if(!$card->name) {
            $card->lastname = $user->lastname;
        }

        $state_id = \Illuminate\Support\Facades\Request::get('state');
        $city_id = \Illuminate\Support\Facades\Request::get('city');
        $hidden_state_id = \Illuminate\Support\Facades\Request::get('state-id');
        if($hidden_state_id){
            $state_id = $hidden_state_id;
        }
        $show_city_filter = $state_id > 0 ? 1 : 0;
        $city_ids = [];
        if($state_id) {
            $state = State::find($state_id);
            if($state) {
                $cities   = City::select('id')->where('state_id', '=', $state->id)
                                ->where('enabled', '=', 1)
                                ->where('removed', '=', 0)
                                ->orderBy('name')
                                ->get()
                                ->pluck('id')
                                ->toArray();
                $city_ids = array_unique($cities);
            }
        }

        $card_includes        = null;
        if($card->orderItem) {
            $pack = $card->orderItem->pack;
            if($pack) {
                $no_filter_included_products = DB::Select(DB::raw("select distinct `city_name`, `city_id`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `pack_products`.`pack_id` = " . $pack->id  .
                                                                  " and `pack_products`.`enabled` = 1" .
                                                                  " and `pack_products`.`removed` = 0" .
                                                                  " and`products`.`enabled` = 1" .
                                                                  " and`provider_addresses`.`enabled` = 1" .
                                                                  " and`provider_addresses`.`removed` = 0" .
                                                                  " and`invisible` = 0" .
                                                                  " and`products`.`removed` = 0" . ") as t"));
                $available_in_states         = $this->getStatesFromProducts($no_filter_included_products);
                if ($state_id > 0) {
                    $available_in_cities
                        = $this->getCitiesFromProductsWithState($no_filter_included_products, $state_id);
                } else {
                    $available_in_cities = $this->getCitiesFromProducts($no_filter_included_products);
                }

                if ($state_id && $city_ids && ($city_id < 0 || is_null($city_id))  && count($city_ids) > 0) {

                    $provider_address_ids = ProviderAddress::whereIn('city_id', $city_ids)->where('enabled', 1)
                                                           ->where('removed', 0)->get()->pluck('id');
                    $valid_product_ids = ProductAddress::select('product_id')->whereIn('provider_address_id', $provider_address_ids)->get()->unique('product_id')->pluck('product_id');
                    $valid_prod_string = "";
                    foreach ($valid_product_ids as $product){
                        $valid_prod_string .= $product . ",";
                    }
                    $card_includes        = DB::Select(DB::raw("select distinct `city_name`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `cities`.`state_id` = " . $state_id . " and `pack_products`.`pack_id` = " . $pack->id  .
                                                               " and `pack_products`.`enabled` = 1" .
                                                               " and `pack_products`.`removed` = 0" .
                                                               " and`products`.`enabled` = 1" .
                                                               " and`products`.`removed` = 0" .
                                                               " and`provider_addresses`.`enabled` = 1" .
                                                               " and`provider_addresses`.`removed` = 0" .
                                                               " and`invisible` = 0" .
                                                               " and `products`.`id` in (" . trim($valid_prod_string, ",") . ")) as t "));

                } elseif ($state_id && $city_ids && $city_id > 0 && count($city_ids) > 0) {
                    $provider_address_ids = ProviderAddress::whereIn('city_id', $city_ids)->where('enabled', 1)
                                                           ->where('removed', 0)->get();
                    $filteredByCity       = $provider_address_ids->where("city_id", $city_id)->pluck('id');
                    $valid_product_ids    = ProductAddress::select('product_id')->whereIn('provider_address_id', $filteredByCity)->get()->unique('product_id')->pluck('product_id');
                    $valid_prod_string = "";
                    foreach ($valid_product_ids as $product){
                        $valid_prod_string .= $product . ",";
                    }
                    $card_includes        = DB::Select(DB::raw("select distinct `city_name`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `cities`.`id` = " . $city_id . " and`pack_products`.`pack_id` = " . $pack->id  .
                                                               " and `pack_products`.`enabled` = 1" .
                                                               " and `pack_products`.`removed` = 0" .
                                                               " and`products`.`enabled` = 1" .
                                                               " and`products`.`removed` = 0" .
                                                               " and`provider_addresses`.`enabled` = 1" .
                                                               " and`provider_addresses`.`removed` = 0" .
                                                               " and`invisible` = 0" .
                                                               " and `products`.`id` in (" . trim($valid_prod_string, ",") . ")) as t "));
                } else {
                    $card_includes = $pack->products()->wherePivot('enabled', '=', '1')->wherePivot('removed', '=', '0')
                                          ->where('products.enabled', 1)
                                          ->where('products.removed', 0)
                                          ->where('invisible', '=', 0)->get();
                }
            } else {
                $product = $card->orderItem->product;
                if($product) {
                    $card_includes = new Collection();
                    $card_includes->push($product);
                }
            }
        }

        if ($card->activated == 1) {
            $already_activated = 1;
            return view('basic.activate_result', compact('card', 'user', 'card_includes', 'available_in_states', 'state_id', 'already_activated', 'available_in_cities', 'city_id',
                                                         'show_city_filter'));
        }

        $card->date_activated = Carbon::now();
        $card->activated = 1;
        if($card->save()) {
            $template = New ActivateECardMail($card);
            try {
                Mail::to($user->email)->send($template);
            } catch (\Exception $e){
            }
            return view('basic.activate_result', compact('card', 'user', 'card_includes', 'available_in_states', 'state_id', 'already_activated', 'available_in_cities', 'city_id',
                                                         'show_city_filter'));
        }

        return redirect()->back()->withErrors('El Código no fué activado, intente nuevamente');

    }

    /**
     * Check code before a reservation.
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkCodeForReservation(Request $request){
        $user   = Auth::user();
        $number = $request->get('number');
        $number = str_replace(' ', '', $number);
        if(!$number) {
            return response_json($message = 'El Código es requerido', $code = '400', $result = '');
        }

        try {
            $card = Card::with('orderItem.pack')->with('usedOnProduct')
                                                ->where('number', '=', $number)
                                                ->orWhere('custom_number', '=', $number)
                                                ->first();
        } catch (\Exception $e) {
            return response_json($message = 'Error al validar el código', $code = '500', $result = '');
        }

        if(!$card) {
            return response_json($message = 'El Código no existe', $code = '404', $result = '');
        }
        if(!$card->valid_from || !$card->valid_thru) {
            return response_json($message = 'El Código se encuentra en proceso de verificación interno, intente nuevamente más tarde', $code = '403', $result = '');
        }
        return response_json($message = '', $code = '200', $result = $card);
    }


    /**
     * Save a reservation to database.
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveReservation(Request $request) {

        $oReservation = new Reservation();
        $number       = $request->get('number');
        $number       = str_replace(' ', '', $number);
        $province     = State::where('id', $request->get('prov_id'))->first();

        $oReservation->reservation_method  = $request->get('reservation_method');
        $oReservation->nombre_apellido     = $request->get('name');
        $oReservation->contact_phone       = $request->get('phone');
        $oReservation->card_number         = $number;
        $oReservation->custom_number       = $request->get('custom_number');
        $oReservation->cvv                 = $request->get('cvv');
        $oReservation->pack                = $request->get('pack');
        $oReservation->prestador           = $request->get('prestador');
        $oReservation->localidad_prestador = $province ? $province->name : "";
        $oReservation->q_personas          = $request->get('cant_people');
        $oReservation->reservation_date    = $request->get('reservation_date');
        $oReservation->reservation_hour    = $request->get('reservation_hour');
        $oReservation->observations        = $request->get('observations');
        $oReservation->status              = 'new';

        try{
            $oReservation->save();
            return response_json($message = 'Reservation saved', $code = '200', $result = '');
        } catch(Exception $e) {
            return response_json($message = $e->getMessage(), $code = '500', $result = '');
        }

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function getReservations($identifier)
    {
        $reservation = Reservation::firstOrFail();

        return view($reservation, compact('identifier'));
    }

    /**
     * Check if there's a reservation for the current card.
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkPreviousReservation(Request $request) {

        $number = $request->get('number');
        $number = str_replace(' ', '', $number);
        try {
            $oReservation = Reservation::where('status', '<>', 'cancelled')->where('card_number', $number)
                                       ->orWhere('custom_number', $number)
                                       ->first();
        } catch(Exception $e) {
            return response_json($message = $e->getMessage(), $code = '500', $result = '');
        }

        if(!is_null($oReservation)) {
            return response_json($message = 'Ya existe una reservación para éste regalo', $code = '200', $result = $oReservation);
        } else {
            return response_json($message = 'OK', $code = '200', $result = '');
        }

    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function checkCard(Request $request){
        $user   = Auth::user();
        $number = $request->get('number');
        $number = str_replace(' ', '', $number);
        $show_city_filter = 0;
        if(!$number) {
            return redirect()->back()->withErrors(['El Código es requerido']);
        }

        $card = Card::where(function($q) use ($number){
            $q->where('number', '=', $number)->orWhere('custom_number', '=', $number);
        })->first();

        if(!$card) {
            return redirect()->back()->withErrors(['El Código no existe']);
        }

        if(!$card->valid_from || !$card->valid_thru) {
            return redirect()->back()->withErrors(['El Código se encuentra en proceso de verificación interno, intente nuevamente más tarde']);
        }

        $state_id = \Illuminate\Support\Facades\Request::get('state');
        $city_id = \Illuminate\Support\Facades\Request::get('city');
        $hidden_state_id = \Illuminate\Support\Facades\Request::get('state-id');
        if($hidden_state_id){
            $state_id = $hidden_state_id;
        }
        $show_city_filter = $state_id > 0 ? 1 : 0;
        $city_ids = [];
        if($state_id) {
            $state = State::find($state_id);
            if($state) {
                $cities   = City::select('id')->where('state_id', '=', $state->id)->where('enabled', '=', 1)->where('removed', '=', 0)->orderBy('name')->get()->pluck('id')->toArray();
                $city_ids = array_unique($cities);
            }
        }
        $card_includes        = null;
        $related_target_route = null;
        if($card->orderItem) {
            $pack = $card->orderItem->pack;
            if($pack) {
                $no_filter_included_products = DB::Select(DB::raw("select distinct `city_name`, `city_id`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `pack_products`.`pack_id` = " . $pack->id  .
                                                                  " and `pack_products`.`enabled` = 1" .
                                                                  " and `pack_products`.`removed` = 0" .
                                                                  " and`products`.`enabled` = 1" .
                                                                  " and`provider_addresses`.`enabled` = 1" .
                                                                  " and`provider_addresses`.`removed` = 0" .
                                                                  " and`invisible` = 0" .
                                                                  " and`products`.`removed` = 0" . ") as t"));

                $available_in_states = $this->getStatesFromProducts($no_filter_included_products);
                if ($state_id > 0) {
                    $available_in_cities
                        = $this->getCitiesFromProductsWithState($no_filter_included_products, $state_id);
                } else {
                    $available_in_cities = $this->getCitiesFromProducts($no_filter_included_products);
                }

                if ($state_id && $city_ids && ($city_id < 0 || is_null($city_id))  && count($city_ids) > 0) {

                    $provider_address_ids = ProviderAddress::whereIn('city_id', $city_ids)->where('enabled', 1)
                                                           ->where('removed', 0)->get()->pluck('id');
                    $valid_product_ids = ProductAddress::select('product_id')->whereIn('provider_address_id', $provider_address_ids)->get()->unique('product_id')->pluck('product_id');
                    $valid_prod_string = "";
                    foreach ($valid_product_ids as $product){
                        $valid_prod_string .= $product . ",";
                    }
                    $card_includes        = DB::Select(DB::raw("select distinct `city_name`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `cities`.`state_id` = " . $state_id . " and `pack_products`.`pack_id` = " . $pack->id  .
                                                               " and `pack_products`.`enabled` = 1" .
                                                               " and `pack_products`.`removed` = 0" .
                                                               " and`products`.`enabled` = 1" .
                                                               " and`products`.`removed` = 0" .
                                                               " and`provider_addresses`.`enabled` = 1" .
                                                               " and`provider_addresses`.`removed` = 0" .
                                                               " and`invisible` = 0" .
                                                               " and `products`.`id` in (" . trim($valid_prod_string, ",") . ")) as t "));
                } elseif ($state_id && $city_ids && $city_id > 0 && count($city_ids) > 0) {
                    $provider_address_ids = ProviderAddress::whereIn('city_id', $city_ids)->where('enabled', 1)
                                                           ->where('removed', 0)->get();
                    $filteredByCity       = $provider_address_ids->where("city_id", $city_id)->pluck('id');
                    $valid_product_ids    = ProductAddress::select('product_id')->whereIn('provider_address_id', $filteredByCity)->get()->unique('product_id')->pluck('product_id');
                    $valid_prod_string = "";
                    foreach ($valid_product_ids as $product){
                        $valid_prod_string .= $product . ",";
                    }
                    $card_includes        = DB::Select(DB::raw("select distinct `city_name`, `name`, `short_description`,
                                            `friendly_url`, `discount`, `physical_price`, `digital_price`, `card_price`, `id`,`created_at`, `picture`,
                                            `enabled`,`removed`
                                            from (select `cities`.`name` as `city_name`,`provider_addresses`.`city_id`,
                                            `provider_addresses`.`address`, `products`.* , `pack_products`.`pack_id` as `pivot_pack_id`, `pack_products`.`product_id` as `pivot_product_id`
                                            from `products` inner join `pack_products` on `products`.`id` = `pack_products`.`product_id`
                                            inner join `product_addresses` on `product_addresses`.`product_id` = `pack_products`.`product_id`
                                            inner join `provider_addresses` on `provider_addresses`.`id` = `product_addresses`.`provider_address_id`
                                            inner join `cities` on `provider_addresses`.`city_id` = `cities`.`id`
                                            where `cities`.`id` = " . $city_id . " and`pack_products`.`pack_id` = " . $pack->id  .
                                                               " and `pack_products`.`enabled` = 1" .
                                                               " and `pack_products`.`removed` = 0" .
                                                               " and`products`.`enabled` = 1" .
                                                               " and`products`.`removed` = 0" .
                                                               " and`provider_addresses`.`enabled` = 1" .
                                                               " and`provider_addresses`.`removed` = 0" .
                                                               " and`invisible` = 0" .
                                                               " and `products`.`id` in (" . trim($valid_prod_string, ",") . ")) as t "));
                } else {
                    $card_includes = $pack->products()->wherePivot('enabled', '=', '1')->wherePivot('removed', '=', '0')
                                          ->where('products.enabled', 1)
                                          ->where('products.removed', 0)
                                          ->where('invisible', '=', 0)->get();
                }
            } else {
                $product = $card->orderItem->product;
                if($product) {
                    $card_includes = new Collection();
                    $card_includes->push($product);
                }
            }
        }
        return view('basic.code_verify_result', compact('card', 'user', 'card_includes',
                                                        'available_in_states', 'available_in_cities', 'city_id',
                                                        'state_id', 'show_city_filter'));

    }

    private function getStatesFromProducts($products){
        $city_ids = [];
        foreach($products as $product) {
            $city_ids[] = $product->city_id;
        }
        $city_ids  = array_unique($city_ids);
        $state_ids = City::select('state_id')->whereIn('id', $city_ids)->where('enabled', '=', 1)->where('removed', '=', 0)->get()->unique('state_id')->pluck('state_id')->toArray();
        return State::whereIn('id', $state_ids)->where('enabled', '=', 1)->where('removed', '=', 0)->orderBy('name')->get();
    }

    private function getCitiesFromProducts($products){
        $city_ids = [];
        foreach($products as $product) {
            $city_ids[] = $product->city_id;
        }
        $city_ids  = array_unique($city_ids);
        return City::whereIn('id', $city_ids)->where('enabled', '=', 1)->where('removed', '=', 0)->orderBy('name')->get();
    }

    private function getCitiesFromProductsWithState($products, $state){
        $city_ids = [];
        foreach($products as $product) {
            $city_ids[] = $product->city_id;
        }
        $city_ids  = array_unique($city_ids);
        return City::whereIn('id', $city_ids)->where('state_id', $state)->where('enabled', '=', 1)->where('removed', '=', 0)->orderBy('name')->get();
    }


    /**
     * Send Card
     * @return \Illuminate\Http\RedirectResponse
     */
    public function send(Request $request){

        $user = Auth::user();

        $card_id       = $request->get('card_id');
        $sender_name   = $request->get('sender_name');
        $name          = $request->get('name');
        $lastname      = $request->get('lastname');
        $email         = $request->get('email');
        $subject       = $request->get('subject');
        $message       = $request->get('message');
        $delivery_date = $request->get('delivery_date');
        $templateCard  = $request->get('templateSelected');
        $ccField       = $request->ccField == '' ? '' : $request->ccField;
        if(!$email) {
            return redirect()->back()->withErrors(['El Email es requerido']);
        }

        $card = Card::with("orderItem")->find($card_id);

        if (!is_null($card->digital_custom_logo)){
            if (file_exists(public_path("user_logos/mail_" . $card->digital_custom_logo))){
                unlink(public_path("user_logos/mail_" . $card->digital_custom_logo));
            }
        }

        if(!$card || ($card && ($card->user_id != $user->id || $card->delivery_type !== 'digital'))) {
            return redirect()->back()->withErrors(['El producto a enviar no fue encontrado']);
        }

        if($card->activated || $card->used || $card->disabled) {
            return redirect()->back()->withErrors(['El producto no puede ser enviado']);
        }


        $card_duration = env('CARD_VALID_MONTHS', 4);

        if(sizeof($request->allFiles()) > 0){
            $card->digital_custom_logo = $card->orderItem->order_id . '_' . $request->customFile;
            $card->save();
            $archivo = $request->custom_logo_file;
            move_uploaded_file($archivo->getPathname(), public_path('user_logos/mail_') . $card->orderItem->order_id . '_' . $request->customFile);
        } else {
            $card->digital_custom_logo = null;
            $card->save();
        }

        $card->sender_name                     = $sender_name;
        $card->digital_recipient_name          = trim($name . ' ' . $lastname);
        $card->digital_recipient_email         = $email;
        $card->digital_cc_email                = $ccField == '' ? null : $ccField;
        $card->name                            = $name;
        $card->lastname                        = $lastname;
        $card->digital_recipient_message_title = $subject;
        $card->digital_recipient_message_body  = $message;
        $card->template                        = $templateCard;
        $card->save();

        $send_email = true;
        if(!$delivery_date) {
            $card->digital_email_sent          = 0;
            $card->digital_date_email_sent     = null;
            $card->digital_email_delivery_date = null;
            $card->save();
        } else {
            try {
                $delivery_date = Carbon::parse($delivery_date);
            } catch(\Exception $exception) {
                return redirect()->back()->withErrors(['La fecha de envío programado es incorrecta']);
            }
            $card->digital_email_delivery_date = $delivery_date;
            $card->digital_email_sent          = 0;
            $card->digital_date_email_sent     = null;
            $card->save();
            $send_email                        = false;
        }

        $card->valid_from = Carbon::now();
        $card->valid_thru = Carbon::now()->addMonths($card_duration);
        if($card->save()) {
            if($send_email) {
                $template = New ECardMail($card);
//                Cambio la cuenta de mail para el Envío
                Config::set('mail.username', env("GIFT_MAIL_USERNAME"));
                Config::set('mail.password', env("GIFT_MAIL_PASSWORD"));
                try {
                    if(!is_null($card->digital_cc_email) && $card->digital_cc_email != '' && $card->digital_cc_email != ' ' && $card->digital_cc_email != '--'){
                        Mail::to($card->digital_recipient_email)->cc(explode(';',str_replace(',', ';',$card->digital_cc_email)))->send($template);
                    } else {
                        Mail::to($card->digital_recipient_email)->send($template);
//                        if(!$this->sendEmail($card)){
//                            throw new Exception('errorrr');
//                        };
                    }
                    $card->digital_email_sent          = 1;
                    $card->digital_date_email_sent     = Carbon::now();
                    $card->save();
                    //Restauro la cuenta de mail para el Envío
                    Config::set('mail.username', env("DEFAULT_MAIL_USERNAME"));
                    Config::set('mail.password', env("DEFAULT_MAIL_PASSWORD"));
                    return redirect()->back()->withSuccess('El Producto fue enviado correctamente');
                } catch (\Exception $e){
                    \Log::debug('MAIL error: ' . $e);
                    //Restauro la cuenta de mail para el Envío
                    Config::set('mail.username', env("DEFAULT_MAIL_USERNAME"));
                    Config::set('mail.password', env("DEFAULT_MAIL_PASSWORD"));
                    return redirect()->back()->withErrors(['Hubo un error al enviar el email, intenta más tarde.']);
                }

            }
            return redirect()->back()->withSuccess('El Producto fue programado para su envío correctamente');
        }

    }

    public function sendEmail($card){
        $template = New ECardMail($card);
        $ccs = str_replace(',', ';', $card->digital_cc_email);
        $ccs = str_replace(' ', '', $ccs);
        $cc = explode(";",$ccs);
        //Cambio la cuenta de mail para el Envío
        Config::set('mail.username', env("GIFT_MAIL_USERNAME"));
        Config::set('mail.password', env("GIFT_MAIL_PASSWORD"));
        try {
            if(!is_null($card->digital_cc_email) && $card->digital_cc_email != '' && $card->digital_cc_email != ' ' && $card->digital_cc_email != '--'){
                Mail::to($card->digital_recipient_email)->cc($cc)->send($template);
            } else {
                Mail::to($card->digital_recipient_email)->send($template);
            }
            $card->digital_email_sent          = 1;
            $card->digital_date_email_sent     = Carbon::now();
            $card->save();
            //Restauro la cuenta de mail para el Envío
            Config::set('mail.username', env("DEFAULT_MAIL_USERNAME"));
            Config::set('mail.password', env("DEFAULT_MAIL_PASSWORD"));
            return true;
        } catch (\Exception $e){
            \Log::debug('SENDMAIL error: ' . $e);
            //Restauro la cuenta de mail para el Envío
            Config::set('mail.username', env("DEFAULT_MAIL_USERNAME"));
            Config::set('mail.password', env("DEFAULT_MAIL_PASSWORD"));
            return false;
        }
    }

    private function allOrderItemsAreDigital($order){
        $all_items_are_digital = false;
        $user                  = Auth::user();
        if($user) {
            $oneCartNoDigital      = OrderItem::with(
                                        [
                                         'pack' => function($q){
                                                        $q->where('enabled', 1)->where('removed', 0);
                                                    },
                                         ],
                                        [
                                         'product' => function($q){
                                                         $q->where('enabled', 1)->where('removed', 0);
                                                     },
                                         ])->where('order_id', '=', $order->id)->where('user_id', $user->id)->where('delivery_type', '!=', 'digital')->first();
            $all_items_are_digital = !$oneCartNoDigital;
        }
        return $all_items_are_digital;
    }

    private function allOrdertemsArePhysical($order){
        $all_items_are_physical = false;
        $user                   = Auth::user();
        if($user) {
        $oneCartNoPhysical      = OrderItem::with(
            [
                  'pack' => function($q){
                      $q->where('enabled', 1)->where('removed', 0);
                  },
            ],
            [
              'product' => function($q){
                  $q->where('enabled', 1)->where('removed', 0);
              },
            ]
        )->where('order_id', '=', $order->id)->where('user_id', $user->id)->where('delivery_type', '!=', 'physical')->first();
            $all_items_are_physical = !$oneCartNoPhysical;
        }
        return $all_items_are_physical;
    }

    private function loadPdfData($request = null, $card = null){
        if(!is_null($request)){
            $oCard     = Card::with('orderItem')->find($request->card_id);
            $oPack     = Pack::find($oCard->orderItem->pack_id);
            $oProducto = Product::find($oCard->orderItem->product_id);
        } else {
            $oCard = $card;
            $oPack     = Pack::find($oCard->orderItem->pack_id);
            $oProducto = Product::find($oCard->orderItem->product_id);
        }
        if(isset($request->message)){
            $message = $request->message;
            $oCard->digital_recipient_message_body = $message;
            $oCard->save();
        } else {
            $message = $oCard->digital_recipient_message_body;
        }
        $data = [
            'id'                               => $oCard->id,
            'number'                           => !is_null($oCard->custom_number) ? $oCard->custom_number : '',
            'code'                             => $oCard->number,
            'digital_recipient_name'           => trim($oCard->name . ' ' . $oCard->lastname),
            'recipient_name'                   => trim($oCard->name),
            'recipient_last_name'              => trim($oCard->lastname),
            'digital_recipient_message_title'  => !is_null($oCard->digital_recipient_message_title) ? $oCard->digital_recipient_message_title : '',
            'digital_recipient_message_body'   => !is_null($message) ? $message : '',
            'orderItemPackSku'                 => !is_null($oPack) ? $oPack->sku : '',
            'orderItemPackPicture'             => !is_null($oPack) ? $oPack->picture : '',
            'orderItemPackName'                => !is_null($oPack) ? $oPack->name : '',
            'orderItemPackShortDescription'    => !is_null($oPack) ? $oPack->short_description : '',
            'orderItemProductSku'              => !is_null($oProducto) ? $oProducto->sku : '',
            'orderItemProductPicture'          => !is_null($oProducto) ? $oProducto->picture : '',
            'orderItemProductName'             => !is_null($oProducto) ? $oProducto->name : '',
            'orderItemProductShortDescription' => !is_null($oProducto) ? $oProducto->short_description : '',
            'sender_name'                      => $oCard->sender_name,
            'custom_logo'                      => !is_null($oCard->digital_custom_logo) ? $oCard->digital_custom_logo : '',
            'cvv'                              => $oCard->cvv,
            'valid_from'                       => $oCard->valid_from,
            'valid_thru'                       => $oCard->valid_thru,
            'templateCard'                     => $request->templatePdfSelected ?? $oCard->template,
        ];
        return $data;
    }

    public function createPdf(Request $request){
        if (isset($_FILES['image']) && file_exists(public_path("user_logos/" . $_POST['order'] . "_" . $_FILES['image']['name']))) {
            unlink(public_path("user_logos/" . $_POST['order'] . "_" . $_FILES['image']['name']));
        }
        if (isset($_FILES['image'])){
            copy($_FILES["image"]["tmp_name"], public_path("user_logos/" . $_POST['order'] . "_" . $_FILES['image']['name']));
        }
        $oCard = Card::with('orderItem')->where("number", $_POST['number'])->first();
        $oCard->digital_recipient_message_body = empty($_POST['message']) ? '' : $_POST['message'];
        if (isset($_FILES['image'])){
            $oCard->digital_custom_logo = $_POST['order'] . "_" . $_FILES['image']['name'];
        } else {
            $oCard->digital_custom_logo = null;
        }
        $oCard->digital_date_pdf_downloaded = Carbon::now();
        $oCard->template = empty($_POST['template']) ? 'default' : $_POST['template'];
        $oCard->save();
        $this->savePdf($oCard, $_POST['order']);
        return 'true';
    }

    public function postMasivePdf(Request $request) {
        if (isset($_FILES['image']) && file_exists(public_path("user_logos/" . $_POST['order'] . "_" . $_FILES['image']['name']))) {
            unlink(public_path("user_logos/" . $_POST['order'] . "_" . $_FILES['image']['name']));
        }
        if (file_exists(public_path("uploaded_excel_files/" . $_POST['order'] . "/" . $_FILES['pdfs']['name']))){
            $dir = @scandir(public_path("uploaded_excel_files/" . $_POST['order']));
            unlink(public_path("uploaded_excel_files/" . $_POST['order'] . "/" . $_FILES['pdfs']['name']));
            if (count($dir) == 0){
                rmdir(public_path("uploaded_excel_files/" . $_POST['order']));
            }
        }
        try {
            if(!file_exists(public_path("uploaded_excel_files/" . $_POST['order']))){
                mkdir(public_path("uploaded_excel_files/" . $_POST['order']));
            }
            if (isset($_FILES['image'])){
                copy($_FILES["image"]["tmp_name"], public_path("user_logos/" . $_POST['order'] . "_" . $_FILES['image']['name']));
            }
            try{
                copy($_FILES["pdfs"]["tmp_name"], public_path("uploaded_excel_files/" . $_POST['order'] . "/" . $_FILES["pdfs"]["name"]));
            } catch (Exception $e) {
                return ($e->getMessage());
            }
        } catch (Exception $e) {
            return $e->getMessage();
        }
        $arrayDataPdf = array();
        $reader = IOFactory::createReader("Xlsx");
        $spreadsheet = $reader->load(public_path("uploaded_excel_files/" . $_POST['order'] . "/" . $_FILES["pdfs"]["name"]));
        $hojaActual = $spreadsheet->getSheet(0);
        $lastRow = $hojaActual->getHighestRow();
        $cont = 0;
        $arrayErrors = [];
        for($i = 3; $i <= $lastRow; $i++){
            for($j = 1; $j <= 7; $j++){
                $arrayDataPdf[$cont][] =
                    $hojaActual->getCellByColumnAndRow ($j,$i)->getFormattedValue();
            }
            $cont++;
        }
        for($k = 0; $k < sizeof($arrayDataPdf); $k++) {
            $index = $k;
            $oCard = Card::with('orderItem')->where("number", $arrayDataPdf[$index][1])->first();
            $oCard->digital_recipient_message_body = empty($arrayDataPdf[$index][6]) ? '' : $arrayDataPdf[$index][6];
            if (isset($_FILES['image'])){
                $oCard->digital_custom_logo = $_POST['order'] . "_" . $_FILES['image']['name'];
            } else {
                $oCard->digital_custom_logo = null;
            }
            $oCard->digital_date_pdf_downloaded = Carbon::now();
            $oCard->template = empty($arrayDataPdf[$index][7]) ? 'default' : $arrayDataPdf[$index][7];
            $oCard->save();
            $this->savePdf($oCard, $_POST['order']);
        }

        $pack = array();

        $file_path = public_path("pdf_to_download/" . $_POST['order']);

        //Get the name of all the files in that folder
        $files = scandir($file_path);

        //Make the Zip
        $zip = new ZipArchive();
        $filename = public_path("pdf_to_download/" . $_POST['order'] . "/" . $_POST['order'] . ".zip");

        //If there is an issue... close
        try {
            $zip->open($filename, ZipArchive::CREATE);
            foreach($files as $file){
                if ($file != "." && $file != ".."){
                    $zip->addFile($file_path . "/" . $file, $file);
                }
            }
            $zip->close();
        } catch(Exception $e) {
            return $e->getMessage();
        }
        $nameFile = $_POST['order'] . ".zip";

        return [$nameFile, $_POST['order']];
    }

    public function createZip(Request $request) {
        $file_path = public_path("pdf_to_download/" . $_POST['order']);

        //Get the name of all the files in that folder
        $files = scandir($file_path);

        //Make the Zip
        $zip = new ZipArchive();
        $filename = public_path("pdf_to_download/" . $_POST['order'] . "/" . $_POST['order'] . ".zip");

        //If there is an issue... close
        try {
            $zip->open($filename, ZipArchive::CREATE);
            foreach($files as $file){
                if ($file != "." && $file != ".." && $file != $_POST['order'] . ".zip"){
                    $zip->addFile($file_path . "/" . $file, $file);
                }
            }
            $zip->close();
        } catch(Exception $e) {
            return $e->getMessage();
        }
        $nameFile = $_POST['order'] . ".zip";
        return $nameFile;
    }

    private function borrar_directorio($dirname) {
        //si es un directorio lo abro
        if (is_dir($dirname))
            $dir_handle = opendir($dirname);
        //si no es un directorio devuelvo false para avisar de que ha habido un error
        if (!$dir_handle)
            return false;
        //recorro el contenido del directorio fichero a fichero
        while($file = readdir($dir_handle)) {
            if ($file != "." && $file != "..") {
                //si no es un directorio elemino el fichero con unlink()
                if (!is_dir($dirname."/".$file))
                    unlink($dirname."/".$file);
                else //si es un directorio hago la llamada recursiva con el nombre del directorio
                    borrar_directorio($dirname.'/'.$file);
            }
        }
        closedir($dir_handle);
        //elimino el directorio que ya he vaciado
        rmdir($dirname);
        return true;
    }

    public function downloadZip($filename, $dirName) {
        header("Content-type: application/octet-stream");
        header("Content-Disposition: attachment; filename=$filename");

        // Read the file
        readfile(public_path("pdf_to_download/" . $dirName . "/" . $filename));
        $this->borrar_directorio(public_path("pdf_to_download/" . $dirName));
    }

    public function postMasive(Request $request){

        if (isset($_FILES['image']) && file_exists(public_path("user_logos/" . $_POST['order'] . "_" . $_FILES['image']['name']))) {
            unlink(public_path("user_logos/" . $_POST['order'] . "_" . $_FILES['image']['name']));
        }
        if (file_exists(public_path("uploaded_excel_files/" . $_POST['order'] . "/" . $_FILES['excel']['name']))){
            $dir = @scandir(public_path("uploaded_excel_files/" . $_POST['order']));
            unlink(public_path("uploaded_excel_files/" . $_POST['order'] . "/" . $_FILES['excel']['name']));
            if (count($dir) == 0){
                rmdir(public_path("uploaded_excel_files/" . $_POST['order']));
            }
        }
        try {
            if(!file_exists(public_path("uploaded_excel_files/" . $_POST['order']))){
                mkdir(public_path("uploaded_excel_files/" . $_POST['order']));
            }
            if (isset($_FILES['image'])){
                copy($_FILES["image"]["tmp_name"], public_path("user_logos/" . $_POST['order'] . "_" . $_FILES['image']['name']));
            }
            try{
                copy($_FILES["excel"]["tmp_name"], public_path("uploaded_excel_files/" . $_POST['order'] . "/" . $_FILES["excel"]["name"]));
            } catch (Exception $e) {
                return ($e->getMessage());
            }
        } catch (Exception $e) {
            return $e->getMessage();
        }

        $arrayDataExcel = array();
        $reader = IOFactory::createReader("Xlsx");
        $spreadsheet = $reader->load(public_path("uploaded_excel_files/" . $_POST['order'] . "/" . $_FILES["excel"]["name"]));
        $hojaActual = $spreadsheet->getSheet(0);
        $lastRow = $hojaActual->getHighestRow();
        $cont = 0;
        $arrayErrors = [];
        for($i = 3; $i <= $lastRow; $i++){
            for($j = 1; $j <= 16; $j++){
                $arrayDataExcel[$cont][] =
                    $hojaActual->getCellByColumnAndRow ($j,$i)->getFormattedValue();
            }
            $cont++;
        }
        for($k = 0; $k < sizeof($arrayDataExcel); $k++){
            $index = $k;
            $oCard     = Card::with('orderItem')->where("number", $arrayDataExcel[$index][1])->first();
            $oCard->sender_name = $arrayDataExcel[$index][3];
            $oCard->name = $arrayDataExcel[$index][4];
            $oCard->lastname = $arrayDataExcel[$index][5];
            $oCard->digital_recipient_email = $arrayDataExcel[$index][9];
            $oCard->template = $arrayDataExcel[$index][7];
            $ccField       = is_null($arrayDataExcel[$index][10]) ? '' : explode(';',str_replace(',', ';',$arrayDataExcel[$index][10]));
            if($ccField != ''){
                $oCard->digital_cc_email = str_replace(',', ';',$arrayDataExcel[$index][10]);
                $oCard->save();
            } else {
                $oCard->digital_cc_email = null;
                $oCard->save();
            }
            if(!is_null($arrayDataExcel[$index][11])){
                $oCard->digital_recipient_phone = $arrayDataExcel[$index][11] . '-' . $arrayDataExcel[$index][12] . '-' . $arrayDataExcel[$index][13];
            }
            if(!is_null($arrayDataExcel[$index][4])){
                $oCard->digital_recipient_name = $arrayDataExcel[$index][4] . ' ' . $arrayDataExcel[$index][5];
            }
            $oCard->digital_recipient_message_title = $arrayDataExcel[$index][8];
            $oCard->digital_recipient_message_body = $arrayDataExcel[$index][6];
            if($arrayDataExcel[$index][14] == ""){
                $oCard->digital_email_delivery_date = null;
            } else {
                $oCard->digital_email_delivery_date = $arrayDataExcel[$index][14];
            }
            if($arrayDataExcel[$index][15] == ""){
                $oCard->digital_wp_delivery_date = null;
            } else {
                $oCard->digital_wp_delivery_date = $arrayDataExcel[$index][15];
            }
            if(isset($_FILES['image'])){
                $oCard->digital_custom_logo = $_POST['order'] . "_" . $_FILES['image']['name'];
            } else {
                $oCard->digital_custom_logo = null;
            }
            try {
                $oCard->save();
            } catch (Exception $e){
                return $e->getMessage();
            }

            //Envío correo si no programa fecha
            if($arrayDataExcel[$index][9] != "" && $arrayDataExcel[$index][14] == ""){
                try {
                    if($this->sendEmail($oCard) == false){
                        $arrayErrors [] = "Error al enviar por email el producto código: " . $oCard->number;
                    };
                } catch (Exception $e){
                    return $e->getMessage();
                }

            }
            //Envío whatsapp si no es programado
            if($arrayDataExcel[$index][11] != "" && $arrayDataExcel[$index][15] == ""){
                try {
                    $result = $this->sendScheduledWhatsapp($oCard);
                    if($result == false){
                        $arrayErrors [] = "Error al enviar por whatsapp el producto código: " . $oCard->number;
                    }
                } catch (Exception $e){
                    return $e->getMessage();
                }

            }
        }
        return ($arrayErrors);
    }

    public function downloadPdfAll($request){
        $arrReq = json_decode($request);
        $orderId = $arrReq[0];
        if (file_exists(public_path("excel_files/" . $orderId . ".xlsx"))){
            unlink(public_path("excel_files/" . $orderId . ".xlsx"));
        }
        copy(public_path("assets/files/template.xlsx"), public_path("excel_files/" . $orderId . ".xlsx"));
        $reader = IOFactory::createReader("Xlsx");
        $spreadsheet = $reader->load(public_path("excel_files/" . $orderId . ".xlsx"));
        for($i = 1; $i < sizeof($arrReq); $i++){
            $oCard     = Card::with('orderItem')->find($arrReq[$i]);
            $data = $this->loadPdfData(null, $oCard);
            $strCcMail = "";
            if(!is_null($oCard->digital_cc_email) && $oCard->digital_cc_email != "" ){
                $strArr = explode(",", $oCard->digital_cc_email);
                foreach($strArr as $ccMail){
                    $strCcMail == "" ? $strCcMail .= $ccMail : $strCcMail .= ", ". $ccMail;
                }
            }
            if($oCard->digital_email_sent == 0 && $oCard->digital_wp_sent == 0){
                try {
                    $sheet = $spreadsheet->getActiveSheet();
                    $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
                    $name = is_null($data["orderItemPackName"]) ? $data["orderItemProductName"] : $data["orderItemPackName"];
                    $sheet->setCellValue("A" . ($i + 2), $name);
                    $sheet->setCellValue("B" . ($i + 2), $data["code"]);
                    $sheet->setCellValue("C" . ($i + 2), $data["cvv"]);
                    $sheet->setCellValue("D" . ($i + 2), $data["sender_name"]);
                    $sheet->setCellValue("E" . ($i + 2), $data["recipient_name"]);
                    $sheet->setCellValue("F" . ($i + 2), $data["recipient_last_name"]);
                    $sheet->setCellValue("G" . ($i + 2), $data["digital_recipient_message_body"]);
                    $sheet->setCellValue("H" . ($i + 2), $data["templateCard"]);
                    $sheet->setCellValue("I" . ($i + 2), $data["digital_recipient_message_title"]);
                    $sheet->setCellValue("J" . ($i + 2), $oCard->digital_recipient_email);
                    $sheet->setCellValue("K" . ($i + 2), $strCcMail);
                    $sheet->setCellValue("L" . ($i + 2),is_null($oCard->digital_recipient_phone) ? '' : explode("-",$oCard->digital_recipient_phone)[0]);
                    $sheet->setCellValue("M" . ($i + 2),is_null($oCard->digital_recipient_phone) ? '' : explode("-",$oCard->digital_recipient_phone)[1]);
                    $sheet->setCellValue("N" . ($i + 2),is_null($oCard->digital_recipient_phone) ? '' : explode("-",$oCard->digital_recipient_phone)[2]);
                    $sheet->setCellValue("O" . ($i + 2), $oCard->digital_email_delivery_date);
                    $sheet->setCellValue("P" . ($i + 2), $oCard->digital_wp_delivery_date);
                    $writer->save(public_path("excel_files/" . $orderId . ".xlsx"));
                } catch (\Exception $e) {
                    echo 'Ocurrió un error al intentar abrir el archivo ' . $e;
                }
            } else {
                try {
                    $sheet = $spreadsheet->getActiveSheet();
                    $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
                    $sheet->setCellValue("A" . ($i + 2), "EL REGALO YA HA SIDO ENVIADO O PROGRAMADO PARA ENVIAR");
                    $writer->save(public_path("excel_files/" . $orderId . ".xlsx"));
                } catch (\Exception $e) {
                    echo 'Ocurrió un error al intentar abrir el archivo ' . $e;
                }
            }
        }

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'. urlencode($orderId . ".xlsx"));
        $writer->save('php://output');
    }

    public function downloadForPdfData($request){
        $arrReq = json_decode($request);
        $orderId = $arrReq[0];
        if (file_exists(public_path("excel_files/" . $orderId . ".xlsx"))){
            unlink(public_path("excel_files/" . $orderId . ".xlsx"));
        }
        copy(public_path("assets/files/template_pdf.xlsx"), public_path("excel_files/" . $orderId . "_pdf.xlsx"));
        $reader = IOFactory::createReader("Xlsx");
        $spreadsheet = $reader->load(public_path("excel_files/" . $orderId . "_pdf.xlsx"));
        for($i = 1; $i < sizeof($arrReq); $i++){
            $oCard     = Card::with('orderItem')->find($arrReq[$i]);
            $data = $this->loadPdfData(null, $oCard);
            try {
                $sheet = $spreadsheet->getActiveSheet();
                $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
                $name = is_null($data["orderItemPackName"]) ? $data["orderItemProductName"] : $data["orderItemPackName"];
                $sheet->setCellValue("A" . ($i + 2), $name);
                $sheet->setCellValue("B" . ($i + 2), $data["code"]);
                $sheet->setCellValue("C" . ($i + 2), $data["cvv"]);
                $sheet->setCellValue("D" . ($i + 2), $data["sender_name"]);
                $sheet->setCellValue("E" . ($i + 2), $data["recipient_name"]);
                $sheet->setCellValue("F" . ($i + 2), $data["recipient_last_name"]);
                $sheet->setCellValue("G" . ($i + 2), $data["digital_recipient_message_body"]);
                $sheet->setCellValue("H" . ($i + 2), $data["templateCard"]);
                $writer->save(public_path("excel_files/" . $orderId . "_pdf.xlsx"));
            } catch (\Exception $e) {
                echo 'Ocurrió un error al intentar abrir el archivo ' . $e;
            }
        }
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'. urlencode($orderId . "_pdf.xlsx"));
        $writer->save('php://output');
    }

    public function savePdf($oCard, $order){
        $dataPdf = $this->loadPdfData(null, $oCard);
        $packProductName = $dataPdf['orderItemPackName'] == '' ? $dataPdf['orderItemProductName'] :  $dataPdf['orderItemPackName'];
        if(!file_exists(public_path("pdf_to_download/" . $order))){
            mkdir(public_path("pdf_to_download/" . $order));
        }
        $pdf =  \PDF::loadView('card/pdf_ecardN', $dataPdf)
                    ->setPaper('a4', 'portrait')
                    ->save(public_path('pdf_to_download/') . $order . '/ecard_' . $dataPdf['id'] . '_' . $dataPdf['digital_recipient_name']  . '_' . $packProductName . '.pdf');
    }

    public function downloadPdf(Request $request){
        $oCard     = Card::with('orderItem')->find($request->card_id);
        $oCard->sender_name = $request->sender_name;
        $oCard->digital_recipient_phone = $request->WPcountry . '-' . $request->WPcaract . '-' . $request->WPnumber;
        $oCard->name = $request->name;
        $oCard->lastname = $request->lastname;
        $oCard->digital_recipient_name = trim($request->name . ' ' . $request->lastname);
        $oCard->save();

        if(sizeof($request->allFiles()) > 0){
            $oCard->digital_custom_logo = $oCard->id . '_' . $request->customFile;
            $oCard->save();
            $archivo = $request->custom_logo_file;
            move_uploaded_file($archivo->getPathname(), public_path('user_logos/') . $oCard->id . '_' . $request->customFile);
        }
        $data = $this->loadPdfData($request);
        $oCard->digital_date_pdf_downloaded = Carbon::now();
        $oCard->save();
        $pdf = \PDF::loadView('card/pdf_ecardN', $data)->setPaper('a4', 'portrait')->stream('ecard-' . $data['id'] . '.pdf',array('Attachment'=>0));
        if(!is_null($oCard->digital_custom_logo)){
            if(file_exists(public_path('user_logos/') . $oCard->digital_custom_logo)){
                unlink(public_path('user_logos/') . $oCard->digital_custom_logo);
            }
            $oCard->digital_custom_logo = null;
            $oCard->save();
        }
        return $pdf;
    }

    public function sendWhatsapp(Request $request){
        $oCard     = Card::with('orderItem')->find($request->card_id);
        $oCard->sender_name = $request->sender_name;
        $oCard->digital_recipient_phone = $request->WPcountry . '-' . $request->WPcaract . '-' . $request->WPnumber;
        $oCard->name = $request->name;
        $oCard->lastname = $request->lastname;
        $oCard->digital_recipient_name = trim($request->name . ' ' . $request->lastname);
        $oCard->digital_wp_delivery_date = $request->delivery_date_wp;
        $oCard->template = $request->templateWpSelected;
        $oCard->save();
        $destPhone = $request->WPcountry . $request->WPcaract . $request->WPnumber;

        if(sizeof($request->allFiles()) > 0){
            $oCard->digital_custom_logo = $oCard->id . '_' . $request->customFile;
            $oCard->save();
            $archivo = $request->custom_logo_file;
            move_uploaded_file($archivo->getPathname(), public_path('user_logos/') . $oCard->id . '_' . $request->customFile);
        } else {
            $oCard->digital_custom_logo = null;
            $oCard->save();
        }
        if($request->delivery_date_wp != ""){
            $oCard->digital_wp_delivery_date = $request->delivery_date_wp;
            $oCard->digital_date_wp_sent = null;
            $oCard->digital_wp_sent = 0;
            $oCard->save();
            return redirect()->back()->withSuccess('El mensaje fue programado para enviar correctamente');
        }
        $dataPdf = $this->loadPdfData($request, null);
        if (file_exists(public_path('pdf_to_send/') . 'ecard-' . $dataPdf['id'] . '.pdf')) {
            unlink(public_path('pdf_to_send/') . 'ecard-' . $dataPdf['id'] . '.pdf');
        }
        \PDF::loadView('card/pdf_ecardN', $dataPdf)
                    ->setPaper('a4', 'portrait')
                    ->save(public_path('pdf_to_send/') . 'ecard-' . $dataPdf['id'] . '.pdf');
        $postFields =  $this->composeMediaWpMessage($destPhone, $oCard->name . ' ' . $oCard->lastname,
            $oCard->sender_name,'Regalo_' . $oCard->name . '_' . $oCard->lastname . '.pdf',
   asset('pdf_to_send/' . 'ecard-' . $dataPdf['id'] . '.pdf'));
        $response = $this->sendWhatsappApi($postFields);
        if (isset(json_decode($response)->error)){
            \Log::debug('API response: ' . $response);
            return redirect()->back()->withErrors(['Hubo un error al enviar el mensaje']);
        }
        \Log::debug('API response: ' . $response);
        $file = public_path('pdf_to_send/') . 'ecard-' . $dataPdf['id'] . '.pdf';

        $oCard->digital_wp_sent = 1;
        $oCard->digital_date_wp_sent = Carbon::now();
        $oCard->save();
        return redirect()->back()->withSuccess('El mensaje fue enviado correctamente');
    }

    public function sendScheduledWhatsapp($card){
        $user = User::where('id', $card->user_id)->pluck("email");
        $destPhone = str_replace('-', '', $card->digital_recipient_phone);

        if($card->digital_recipient_phone == '--' || is_null($card->digital_recipient_phone) || $card->digital_recipient_phone == '') {
            $card->digital_wp_delivery_date = null;
            $card->digital_recipient_phone = null;
            $card->save();
            $this->sendNotificationEmail($card, $user[0],"El regalo no se pudo enviar por whatsapp ya que no tiene cargado el teléfono del receptor, por favor comunícate con soporte al cliente", "Error en envío de Whatsapp", false);
            return false;
        }

        $dataPdf = $this->loadPdfData(null, $card);
        if (file_exists(public_path('pdf_to_send/') . 'ecard-' . $dataPdf['id'] . '.pdf')) {
            unlink(public_path('pdf_to_send/') . 'ecard-' . $dataPdf['id'] . '.pdf');
        }
        \PDF::loadView('card/pdf_ecard', $dataPdf)
                    ->setPaper('a4', 'portrait')
                    ->save(public_path('pdf_to_send/') . 'ecard-' . $dataPdf['id'] . '.pdf');
        if(!is_null($card->digital_custom_logo)){
            if(file_exists(public_path('user_logos/') . $card->digital_custom_logo)){
               unlink(public_path('user_logos/') . $card->digital_custom_logo);
            }
            $card->digital_custom_logo = null;
            $card->save();
        }
        $postFields =  $this->composeMediaWpMessage($destPhone, $card->name . ' ' . $card->lastname,
            $card->sender_name,'Regalo_' . $card->name . '_' . $card->lastname . '.pdf',
//            'https://goldenpack.com.ar/pdf_to_send/ecard-46224.pdf');
   'https://goldenpack.com.ar/pdf_to_send/' . 'ecard-' . $dataPdf['id'] . '.pdf');
        $result2 = $this->sendWhatsappApi($postFields);
        if (isset(json_decode($result2)->error)){
            $file = public_path('pdf_to_send/') . 'ecard-' . $dataPdf['id'] . '.pdf';
            if (file_exists($file)) {
                unlink($file);
            }
            $this->sendNotificationEmail($card, $user[0],"Tu regalo no se pudo enviar por whatsapp, por favor intenta nuevamente a través de tu cuenta de Goldenpack o comunícate con soporte al cliente", "Error en envío de Whatsapp", false);
            $card->digital_wp_delivery_date = null;
            $card->digital_recipient_phone = null;
            $card->save();
            return false;
        }
        \Log::debug('API response: ' . $result2);

        $card->digital_wp_sent = 1;
        $card->digital_date_wp_sent = Carbon::now();
        $card->save();
        return true;
    }

    public function sendNotificationEmail($card, $dest, $message, $title, $success){
        $template = New NotificationMail($card, $message, $title, $success);
        try {
            Mail::to($dest)->send($template);
            return true;
        } catch (\Exception $e){
            return false;
        }
    }

    public function sendWhatsappApi($postFields) {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => ENV('WHATSAPP_API_URL'),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $postFields,
            CURLOPT_HTTPHEADER => array(
                'Authorization: Bearer ' . env("WHATSAPP_API_PROD") ,
                'Content-Type: application/json'
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    /**
     * Compose the body of the message to send to whatsapp api
     * @return string
     */
    private function composeMediaWpMessage($tel, $receiver, $sender, $filename, $mediaPath) {
        $array = [
            "messaging_product"=>"whatsapp",
            "to"=>$tel,
            "type"=>"template",
            "template"=>[
                "name"=>"send_gift",
                "language"=>[
                    "code"=>"es_AR"
                ],
                "components"=>[
                    [
                        "type"=>"header",
                        "parameters"=>[
                            [
                                "type"=>"document",
                                "document"=>[
                                    "filename"=>$filename,
                                    "link"=>$mediaPath
                                ]
                            ]
                        ]
                    ],
                    [
                        "type"=>"body",
                        "parameters"=>[
                            [
                            "type"=>"text",
                            "text"=>$receiver
                            ],
                            [
                                "type"=>"text",
                                "text"=>$sender
                            ]
                        ]
                    ]
                ]
            ]
        ];

        return json_encode($array);
    }

}
