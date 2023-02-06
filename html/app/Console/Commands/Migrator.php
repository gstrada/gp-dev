<?php

namespace App\Console\Commands;

use App\Helpers\Helper;
use App\Models\Catalog\Category;
use App\Models\Catalog\Pack;
use App\Models\Catalog\PackProduct;
use App\Models\Catalog\Product;
use App\Models\Catalog\ProductAddress;
use App\Models\Catalog\ProductPicture;
use App\Models\Location\City;
use App\Models\Location\State;
use App\Models\ServiceProvider\Provider;
use App\Models\ServiceProvider\ProviderAddress;
use App\Models\User\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class Migrator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:migrator';

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
//        $this->migrateUsers();
//        $this->migrateCategories();
//        $this->migratePacks();
//        $this->migrateProviders();
//        $this->migrateProducts();
//        $this->fixRoles();
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
    }

    public function fixRoles(){
        $user = User::where('email', 'patosmack@gmail.com')->first();
        if($user){
            $user->is_admin = 1;
            $user->admin_role = 'admin';
            $user->save();
        }
        $user = User::where('email', 'santiagocolome@goldenpack.com.ar')->first();
        if($user){
            $user->is_admin = 1;
            $user->admin_role = 'admin';
            $user->save();
        }
        $user = User::where('email', 'marianocolome@goldenpack.com.ar')->first();
        if($user){
            $user->is_admin = 1;
            $user->admin_role = 'admin';
            $user->save();
        }
        $user = User::where('email', 'info@goldenpack.com.ar')->first();
        if($user){
            $user->is_admin = 1;
            $user->admin_role = 'editor';
            $user->save();
        }
    }

    public function migrateUsers(){

        $states = State::with('cities')->get();

        $users = DB::connection('mysql_old')->table('users')
            ->select('users.id', 'users.email', 'users.password', 'user_infos.firstname', 'user_infos.lastname', 'user_infos.gender', 'user_infos.phone', 'user_infos.social_number', 'user_infos.birthday', 'user_infos.discount')
            ->leftJoin('user_infos', 'user_infos.user_id', '=', 'users.id')->get();

        $bar = $this->output->createProgressBar(count($users));
        $bar->start();

        foreach ($users as $user) {
            $address = $users = DB::connection('mysql_old')->table('user_addresses')
                ->select('country', 'state', 'city', 'zipcode', 'address', 'street_number', 'floor', 'dpto', 'phone', 'detail')
                ->where('user_id','=', $user->id)
                ->first();

            $user_city_id = null;
            if($address) {
                $user_state_name = Helper::normalizeString($address->state);
                $user_city_name = Helper::normalizeString($address->city);

                $user_state = null;
                $user_city = null;

                foreach ($states as $state) {
                    $state_name = Helper::normalizeString($state->name);
                    if (strtolower($user_state_name) === strtolower($state_name)) {
                        $user_state = $state;
                        break;
                    }
                }

                if($user_state){
                    foreach ($user_state->cities as $city) {
                        $city_name = Helper::normalizeString($city->name);
                        if (strtolower($user_city_name) === strtolower($city_name)) {
                            $user_city_id = $city->id;
                            break;
                        }
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

            $newUser = User::where('email', '=', $user->email)->first();
            if(!$newUser){
                $newUser = new User();
                $newUser->email = $user->email;
                $newUser->password = $user->password;
            }

            $newUser->name = $user->firstname;
            $newUser->lastname = $user->lastname;
            $newUser->city_id = $user_city_id;
            $newUser->gender = $user->gender;
            $newUser->birthday = $user->birthday;

            $full_address = null;
            if($address){
                $full_address = $address->address;
                if($address->street_number){
                    $full_address .= ' ' . $address->street_number;
                }
                if($address->floor){
                    $full_address .= ' ' . $address->floor;
                }
                if($address->dpto){
                    $full_address .= ' ' . $address->dpto;
                }

                $newUser->shipping_zip_code = $address->zipcode;
                $newUser->shipping_address = $full_address;
                $newUser->shipping_note = $address->detail;
                $newUser->billing_address = $full_address;
            }

            $newUser->billing_social_name = $user->social_number ? $user->firstname : null;
            $newUser->billing_social_number = $user->social_number;
            $newUser->discount = $user->discount;
            $newUser->save();

            $bar->advance();
        }
        $bar->finish();
    }

    public function migrateCategories(){
        $categories = DB::connection('mysql_old')->table('categories')
            ->select('categories.id', 'name',  'keyword', 'enabled')
            ->join('category_trs', 'category_trs.category_id', '=', 'categories.id')->get();


        $bar = $this->output->createProgressBar(count($categories));
        $bar->start();
        foreach ($categories as $category) {
            $newCategory = Category::where('friendly_url', '=', $category->keyword)->first();
            if(!$newCategory){
                $newCategory = new Category();
                $newCategory->friendly_url = $category->keyword;
            }
            $newCategory->name = $category->name;
            $newCategory->enabled = $category->enabled;
            $newCategory->save();
            $bar->advance();
        }
        $bar->finish();
    }

    public function migratePacks(){

        $categories = Category::all()->pluck('id', 'friendly_url')->toArray();
        $category_colors = Category::all()->pluck('color', 'friendly_url')->toArray();

        $products = DB::connection('mysql_old')->table('products')
            ->select(
                'products.category_id',
                'products.max_price',
                'products.image',
                'products.max_price',
                'product_trs.name',
                'product_trs.description',
                'product_trs.short_description',
                'product_trs.name_id',
                'product_trs.name',
                'category_trs.keyword',
                'products.enabled'
            )
            ->join('product_trs', 'product_trs.product_id', '=', 'products.id')
            ->join('category_trs', 'category_trs.category_id', '=', 'products.category_id')->get();

        $bar = $this->output->createProgressBar(count($products));
        $bar->start();
        foreach ($products as $product) {
            $category_id = null;
            $category_color = null;
            foreach ($categories as $category_keyword => $da_category_id) {
                if (strtolower($category_keyword) === strtolower($product->keyword)) {
                    $category_id = $da_category_id;
                    break;
                }
            }
            foreach ($category_colors as $category_keyword => $da_category_color) {
                if (strtolower($category_keyword) === strtolower($product->keyword)) {
                    $category_color = $da_category_color;
                    break;
                }
            }

            $newPack = Pack::where('sku', '=', $product->name_id)->first();
            if(!$newPack){
                $newPack = new Pack();
                $newPack->sku = $product->name_id;
                $newPack->friendly_url = $product->name_id;
            }
            $newPack->category_id = $category_id;
            $newPack->name = $product->name;
            $newPack->color = $category_color;
            $newPack->short_description = $product->short_description;
            $newPack->description = $product->description;
            $newPack->physical_price = $product->max_price;
            $newPack->digital_price = $product->max_price;
            $newPack->card_price = $product->max_price;
            $newPack->enabled = $product->enabled;
            $newPack->online_only = 0;
            $newPack->featured = 0;

            $img_path = 'old/'. $product->image;
            if(File::exists(public_path($img_path))){
                $uploadBasepath =  rtrim('packs', '/\\') . '/';
                $file_name = basename($img_path);
                if(!File::exists( public_path($uploadBasepath .$file_name))) {
                    if (File::copy(public_path($img_path), public_path($uploadBasepath . $file_name))) {
                        $newPack->picture = $uploadBasepath . $file_name;
                    }
                }else{
                    $newPack->picture = $uploadBasepath . $file_name;
                }
            }
            $newPack->save();

            $bar->advance();
        }
        $bar->finish();

        Pack::where('id', '<=',20)->update(['featured' => 1]);

    }

    public function migrateProviders(){

        $states = State::with('cities')->get();

     //   $users = User::all()->pluck('id', 'email')->toArray();

        $providers = DB::connection('mysql_old')->table('provider_infos')
            ->select(
                'users.email',
                'provider_infos.user_id',
                'provider_infos.company_name',
                'provider_infos.tax_number',
                'provider_infos.website',
                'provider_infos.description',
                'provider_infos.state',
                'provider_infos.city',
                'provider_infos.zipcode',
                'provider_infos.address',
                'provider_infos.street_number',
                'provider_infos.floor',
                'provider_infos.dpto',
                'provider_infos.phone',
                'provider_infos.fax',
                'provider_infos.google_map_url',
                'provider_infos.contact_name',
                'provider_infos.contact_address',
                'provider_infos.contact_phone',
                'provider_infos.contact_email',
                'provider_infos.contact_email_alternative',
                'provider_infos.bank_name',
                'provider_infos.bank_holder_name',
                'provider_infos.bank_holder_tax_code',
                'provider_infos.bank_acc_number',
                'provider_infos.bank_acc_transfer_number',
                'provider_infos.internal_contact_name',
                'provider_infos.internal_contact_address',
                'provider_infos.internal_contact_phone',
                'provider_infos.internal_contact_email',
                'provider_infos.internal_contact_email_alter',
                'provider_infos.enabled'

            )
            ->leftJoin('users', 'provider_infos.user_id', '=', 'users.id')->orderBy('provider_infos.id')->get();

        $bar = $this->output->createProgressBar(count($providers));
        $bar->start();
        foreach ($providers as $provider) {

            $full_address = $provider->address;
            if($provider->street_number){
                $full_address .= ' ' . $provider->street_number;
            }
            if($provider->floor){
                $full_address .= ' ' . $provider->floor;
            }
            if($provider->dpto){
                $full_address .= ' ' . $provider->dpto;
            }

            if(!$full_address){
                $full_address = $provider->contact_address;
            }

            if(!$full_address){
                $full_address = $provider->internal_contact_address;
            }

            $sku = Helper::slug($provider->company_name);
            if($provider->user_id){
                $sku = $provider->user_id;
            }

            $newProvider = Provider::where('sku', '=', $sku)->first();
            if(!$newProvider){
                $newProvider = new Provider();
                $newProvider->sku = $sku;
            }
            $newProvider->name = $provider->company_name;
            $newProvider->description = $provider->description;
            $newProvider->internal_contact_name = $provider->internal_contact_name;
            $newProvider->internal_contact_address = $provider->internal_contact_address;
            $newProvider->internal_contact_phone = $provider->internal_contact_phone;
            $newProvider->internal_contact_email = $provider->internal_contact_email;
            $newProvider->internal_contact_alternative_email = $provider->internal_contact_email_alter;

            $newProvider->social_name = $provider->company_name ? $provider->company_name : $provider->brand;
            $newProvider->social_number = $provider->tax_number ? $provider->tax_number : $provider->bank_holder_tax_code;

            $newProvider->bank_name = $provider->bank_name;
            $newProvider->bank_account_holder = $provider->bank_holder_name;
            $newProvider->bank_account_social_number = $provider->bank_holder_tax_code;
            $newProvider->bank_account_number = $provider->bank_acc_number;
            $newProvider->bank_account_identifier = $provider->bank_acc_transfer_number;
            $newProvider->enabled = $provider->enabled;

            if($newProvider->save() && $full_address){

                if($provider->email){
                    $usr = User::where('id', '=', $sku)->first();
                    if($usr){
                        $usr->provider_id = $newProvider->id;
                        $usr->provider_role = 'admin';
                        $usr->save();
                    }else{
                        $usr = User::where('email', '=', $provider->email)->first();
                        if($usr) {
                            $usr->provider_id = $newProvider->id;
                            $usr->provider_role = 'admin';
                            $usr->save();
                        }
                    }
                }

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
            }

//            $this->info($user_city);
//            dd($normalize_full_address);

            if (!$user_city_id) {
                $default_state = State::where('name', 'Córdoba')->first();
                if($default_state){
                    $default_city = City::where('state_id', $default_state->id)->where('name', 'CORDOBA')->first();
                    if($default_city){
                        $user_city_id = $default_city->id;
                    }
                }
            }


            if($user_city){

                $newProviderAddress = ProviderAddress::where('address', '=', $full_address)
                    ->where('city_id', '=', $user_city_id)
                    ->where('provider_id', '=', $newProvider->id)
                    ->first();
                if(!$newProviderAddress){
                    $newProviderAddress = new ProviderAddress();
                    $newProviderAddress->address = $full_address;
                    $newProviderAddress->provider_id = $newProvider->id;
                    $newProviderAddress->city_id = $user_city_id;
                }

                $newProviderAddress->phone = $provider->phone ? $provider->phone : $provider->contact_phone;
                $newProviderAddress->email = $provider->contact_email ? $provider->contact_email : $provider->email;
                $newProviderAddress->website = $provider->website;
                $newProviderAddress->embedded_map = $provider->google_map_url;

                $lat = null;
                $lon = null;

                if($provider->google_map_url){
                    $url = $provider->google_map_url;
                    if (strpos(strtolower($provider->google_map_url) , strtolower('iframe')) !== false) {
                        $first_part = substr($url, 0, strpos($url, '!2d'));
                        $url = str_replace($first_part, '', $url);
                        $lon_str = substr($url, 0, strpos($url, '!3d'));
                        $lon = str_replace('!2d', '', $lon_str);
                        $url = str_replace($lon_str, '', $url);
                        $lat_str = substr($url, 0, strpos($url, '!3m2'));
                        if (strpos(strtolower($lat_str) , strtolower('!2m3')) !== false) {
                            $lat_str = substr($lat_str, 0, strpos($lat_str, '!2m3'));
                        }
                        $lat = str_replace('!3d', '', $lat_str);
                        if(strlen(trim($lat)) == 0){
                            $lat = null;
                            $lon = null;
                        }
                        if(strlen(trim($lon)) == 0){
                            $lat = null;
                            $lon = null;
                        }
                    }else{
                        $first_part = substr($url, 0, strpos($url, '@'));
                        $url = str_replace($first_part, '', $url);
                        $url = str_replace('@', '', $url);
                        list($lat, $lon) = explode(',', $url, 3);
                    }
                    $newProviderAddress->lat = $lat;
                    $newProviderAddress->lon = $lon;
                }
                $newProviderAddress->save();
            }

            $bar->advance();
        }
        $bar->finish();
    }

    public function migrateProducts(){

        $categories = Category::all()->pluck('id', 'friendly_url')->toArray();

        $products = DB::connection('mysql_old')->table('provider_services')
            ->select(
                'provider_services.id',
                'provider_services.provider_id',
                'provider_services.category_id',
                'provider_services.name',
                'provider_services.foot_note',
                'provider_services.golden_discount',
                'provider_services.max_people',
                'provider_services.enabled',
                'provider_services.visible',
                'category_trs.keyword'
            )
            ->join('category_trs', 'category_trs.category_id', '=', 'provider_services.category_id')->orderBy('provider_services.id')->get();

        $bar = $this->output->createProgressBar(count($products));
        $bar->start();
        foreach ($products as $product) {
            $category_id = null;
            $category_color = null;
            foreach ($categories as $category_keyword => $da_category_id) {
                if (strtolower($category_keyword) === strtolower($product->keyword)) {
                    $category_id = $da_category_id;
                    break;
                }
            }
            $provider = Provider::where('sku', '=', $product->provider_id)->first();

            $items = DB::connection('mysql_old')->table('provider_service_items')
                ->select(
                    'name',
                    'qty',
                    'price',
                    'provider_price'
                )
                ->where('service_id', '=', $product->id)
                ->orderBy('id')->get();

            $short_description = null;
            $details = null;
            $internal_price = 0;
            foreach ($items as $item){
                $number = $this->numberTranslate($item->qty);
                if(!$short_description){
                    $short_description =  ucfirst(mb_strtolower(trim($item->name)));
                }else{
                    $short_description .=  ', ' .  ucfirst(mb_strtolower(trim($item->name)));
                }
                $details .=  '<li>' . ucfirst(mb_strtolower(trim($number . ' ' . $item->name))) . '</li>';
                $internal_price += $item->price;
            }
            $details = '<ul>' . $details . '</ul>';
            $tips = $product->foot_note;
            $internal_benefit_discount = $product->golden_discount;
            $recommended_people = $product->max_people;

            $pictures = DB::connection('mysql_old')->table('provider_service_pictures')
                ->select(
                    'image'
                )
                ->where('service_id', '=', $product->id)
                ->orderBy('id')->get();

            $first = 0;

            $product_picture = null;
            $product_pictures = [];

            foreach ($pictures as $picture){
                if($first == 0) {
                    $first = 1;
                    $img_path = 'old/'. $picture->image;
                    if(File::exists(public_path($img_path))){
                        $uploadBasepath =  rtrim('products', '/\\') . '/';
                        $file_name = basename($img_path);
                        if(!File::exists( public_path($uploadBasepath .$file_name))) {
                            if (File::copy(public_path($img_path), public_path($uploadBasepath . $file_name))) {
                                $product_picture = $uploadBasepath . $file_name;
                            }
                        }else{
                            $product_picture = $uploadBasepath . $file_name;
                        }
                    }
                }else{
                    $img_path = 'old/'. $picture->image;
                    if(File::exists(public_path($img_path))){
                        $uploadBasepath =  rtrim('product_pictures', '/\\') . '/';
                        $file_name = basename($img_path);
                        if(!File::exists( public_path($uploadBasepath .$file_name))) {
                            if (File::copy(public_path($img_path), public_path($uploadBasepath . $file_name))) {
                                $product_pictures[] = $uploadBasepath . $file_name;
                            }
                        }else{
                            $product_pictures[] = $uploadBasepath . $file_name;
                        }
                    }

                }

            }


            $enabled = 0;
            if($product->visible){
                $enabled = $product->enabled;
            }

            $newProduct = Product::where('sku', '=', $product->id)->first();
            if(!$newProduct){
                $newProduct = new Product();
                $newProduct->sku = $product->id;
                $newProduct->friendly_url =  Helper::slug($product->name) . '-' . $product->id;
            }

            $newProduct->category_id = $category_id;
            $newProduct->provider_id = $provider ? $provider->id : null;
            $newProduct->name = $product->name;
            $newProduct->short_description = $short_description;
            $newProduct->details = $details;
            $newProduct->tips = $tips;
            $newProduct->recommended_people = $recommended_people;
            $newProduct->internal_price = $internal_price;
            $newProduct->internal_benefit_discount = $internal_benefit_discount;
            $newProduct->picture = $product_picture;
            $newProduct->available_for_sale = 0;
            $newProduct->featured = 0;
            $newProduct->enabled = $enabled;
            $newProduct->online_only = 0;
            $newProduct->approved = 0;
            $newProduct->featured = 0;

            if($newProduct->save()){
                foreach ($product_pictures as $pic){
                    $newPicture = ProductPicture::where('product_id', '=', $newProduct->id)->where('path', '=', $pic)->first();
                    if(!$newPicture){
                        $newPicture = new ProductPicture();
                        $newPicture->product_id = $newProduct->id;
                        $newPicture->path = $pic;
                        $newPicture->save();
                    }
                }
            }

            if($provider){
                $provider_addresses = ProviderAddress::where('provider_id', '=', $provider->id)->get();
                foreach ($provider_addresses as $provider_address){
                    $newAddress = ProductAddress::where('product_id', '=', $newProduct->id)->where('provider_address_id', '=', $provider_address->id)->first();
                    if(!$newAddress){
                        $newAddress = new ProductAddress();
                        $newAddress->product_id = $newProduct->id;
                        $newAddress->provider_address_id = $provider_address->id;
                        $newAddress->save();
                    }
                }
            }



            $provider_service_products = DB::connection('mysql_old')->table('provider_service_products')
                ->select(
                    'product_trs.name_id'
                )
                ->where('service_id', '=', $product->id)
                ->join('product_trs', 'product_trs.product_id', '=', 'provider_service_products.product_id')->get();

            if(count($provider_service_products) > 0){
                foreach ($provider_service_products as $provider_service_product){
                    $package = Pack::where('sku', '=', $provider_service_product->name_id)->first();
                    if($package){
                        $packProduct = PackProduct::where('product_id', '=', $newProduct->id)->where('pack_id', '=', $package->id)->first();
                        if(!$packProduct){
                            $packProduct = new PackProduct();
                            $packProduct->product_id = $newProduct->id;
                            $packProduct->pack_id = $package->id;
                            $packProduct->save();
                        }
                    }

                }
            }


            $bar->advance();
        }
        $bar->finish();
    }


    private function numberTranslate($number){
        $number = (int)$number;
        $translated = '';
        switch ($number){
            case 1:
            default:
                $translated = '';
                break;
            case 2:
                $translated = 'Dos';
                break;
            case 3:
                $translated = 'Tres';
                break;
            case 4:
                $translated = 'Cuatro';
                break;
            case 5:
                $translated = 'Cinco';
                break;
            case 6:
                $translated = 'Seis';
                break;
            case 7:
                $translated = 'Siete';
                break;
            case 8:
                $translated = 'Ocho';
                break;
            case 9:
                $translated = 'Nueve';
                break;
            case 10:
                $translated = 'Diez';
                break;
            case 11:
                $translated = 'Once';
                break;
            case 12:
                $translated = 'Doce';
                break;
            case 13:
                $translated = 'Trece';
                break;
            case 14:
                $translated = 'Catorce';
                break;
            case 15:
                $translated = 'Quince';
                break;
        }

        return $translated;
    }


}
