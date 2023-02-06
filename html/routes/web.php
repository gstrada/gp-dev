<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Data;

Route::get('/puntosderetiro', function () {
    return view('puntosderetiro');
})->name('puntosderetiro');

Route::get('soluciones_empresas', 'Landing\HomeController@index')->name('landing.empresas');
Route::post('soluciones_empresas', 'Landing\HomeController@store')->name('landing.empresas.store');
Route::get('/', function () {
    return redirect(route('home'));
});

Route::get('redirect/{target?}', function ($target) {
    $previous = str_replace(url('/'), '', url()->previous());
    session(['redirect_back_uri' => $previous]);
    return redirect(route($target));
})->name('redirect');

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/contact', 'HomeController@contact')->name('contact');
Route::get('/privacy', 'HomeController@privacy')->name('privacy');
Route::get('/terms', 'HomeController@terms')->name('terms');
Route::get('/faq', 'HomeController@faq')->name('faq');

Route::group(['prefix' => 'profile'], function() {
    Route::get('/', function () {
        return redirect(route('profile.epacks'));
    })->name('profile');
    Route::get('/data', 'Frontend\User\ProfileController@profileData')->name('profile.data');
    Route::get('/password', 'Frontend\User\ProfileController@profilePassword')->name('profile.password');
    Route::get('/orders', 'Frontend\User\ProfileController@profileOrders')->name('profile.orders');
    Route::get('/epacks', 'Frontend\User\ProfileController@profileEpacks')->name('profile.epacks');
    Route::get('/swap-user', 'Frontend\User\ProfileController@profileSwapUser')->name('profile.swap.user.view');
    Route::post('/swap-user', 'Frontend\User\ProfileController@swapUser')->name('profile.swap.user');
    Route::get('/download_order/{order}', 'Frontend\User\ProfileController@downloadOrder')->name('profile.download.order')->where('order', '[0-9]+');
    Route::post('update', 'Frontend\User\ProfileController@storeData')->name('profile.update.data');
    Route::post('update-password', 'Frontend\User\ProfileController@storePassword')->name('profile.update.password');
});

Route::get('/category/{identifier?}', 'Frontend\Catalog\CategoryController@index')->name('frontend.categories');
Route::get('/pack/{identifier}', 'Frontend\Catalog\PackController@index')->name('frontend.packs');
Route::get('/product/{identifier}', 'Frontend\Catalog\ProductController@index')->name('frontend.products');
Route::get('/cart', 'Frontend\Order\CartController@index')->name('frontend.cart');
Route::post('/cart', 'Frontend\Order\CartController@store')->name('frontend.cart.store');
Route::patch('/cart/update/{id}', 'Frontend\Order\CartController@update')->name('frontend.cart.update')->where('id', '[0-9]+');
Route::get('/cart/delete/{id}', 'Frontend\Order\CartController@destroy')->name('frontend.cart.destroy')->where('id', '[0-9]+');
Route::get('/checkout', 'Frontend\Order\CheckoutController@index')->name('frontend.checkout');
Route::post('/checkout', 'Frontend\Order\CheckoutController@store')->name('frontend.checkout.store');
Route::post('/discount', 'Frontend\Order\CheckoutController@applyDiscount')->name('frontend.checkout.discount');
Route::get('/checkout/success/{order}', 'Frontend\Order\CheckoutController@successResponse')->name('frontend.checkout.success')->where('order', '[0-9]+');
Route::get('/checkout/error/{order}', 'Frontend\Order\CheckoutController@errorResponse')->name('frontend.checkout.error')->where('order', '[0-9]+');
Route::get('/checkout/pending/{order}', 'Frontend\Order\CheckoutController@pendingResponse')->name('frontend.checkout.pending')->where('order', '[0-9]+');

Route::group(['prefix' => 'card'], function() {
    Route::get('/dev', 'Frontend\Card\CardController@dev')->name('frontend.card.dev');
    Route::get('manage/{order?}', 'Frontend\Card\CardController@manage')->name('frontend.card.manage')->where('order', '[0-9]+');
    Route::post('send', 'Frontend\Card\CardController@send')->name('frontend.card.send');
    Route::post('download_pdf', 'Frontend\Card\CardController@downloadPdf')->name('frontend.card.download_pdf');
    Route::get('download_pdf_all/{ids}', 'Frontend\Card\CardController@downloadPdfAll')->name('frontend.card.download_pdf_all');
    Route::get('download_pdf_data/{ids}', 'Frontend\Card\CardController@downloadForPdfData')->name('frontend.card.download_pdf_data');
    Route::get('download_excel', 'Frontend\Card\CardController@index')->name('frontend.card.index');
    Route::post('send_whatsapp', 'Frontend\Card\CardController@sendWhatsapp')->name('frontend.card.send_whatsapp');
    Route::post('wp_webhook', 'Hook\WpController@sendWhatsappWebhook')->name('frontend.hook.wp_webhook');
    Route::get('wp_webhook', 'Hook\WpController@getWhatsappWebhook')->name('frontend.hook.get_wp_webhook');
    Route::post('post_masive', 'Frontend\Card\CardController@postMasive')->name('frontend.card.post_masive');
    Route::post('post_masive_pdf', 'Frontend\Card\CardController@postMasivePdf')->name('frontend.card.post_masive_pdf');
    Route::post('create_pdf', 'Frontend\Card\CardController@createPdf')->name('frontend.card.create_pdf');
    Route::post('create_pdf_zip', 'Frontend\Card\CardController@createZip')->name('frontend.card.create_pdf_zip');
    Route::get('download_zip_pdf/{file}/{dir}', 'Frontend\Card\CardController@downloadZip')->name('frontend.card.download_zip_pdf');
    Route::get('activate/{number?}', 'Frontend\Card\CardController@activate')->name('frontend.card.activate');
    Route::post('link', 'Frontend\Card\CardController@linkCard')->name('frontend.card.link.store');
    Route::post('check', 'Frontend\Card\CardController@checkCard')->name('frontend.card.link.check');
    Route::post('check-cvv', 'Frontend\Card\CardController@checkCvv')->name('frontend.card.link.check_cvv');
    Route::post('check-code-for-reservation', 'Frontend\Card\CardController@checkCodeForReservation')->name('frontend.card.check_code_for_reservation');
    Route::post('check-code-for-prev-reservation', 'Frontend\Card\CardController@checkPreviousReservation')->name('frontend.card.check_previous_reservation');
    Route::post('save-reservation', 'Frontend\Card\CardController@saveReservation')->name('frontend.card.save_reservation');
    Route::get('reservas', 'Frontend\Card\CardReservationController@show')->name('backend.reservations');
    Route::get('reservas_list/{status?}/{thru?}', 'Frontend\Card\CardReservationController@getReservations')->name('backend.reservations.list');
    Route::post('reserva_update', 'Frontend\Card\CardReservationController@update_reservation')->name('backend.reservation.update');
    Route::get('token', function () {
        return csrf_token();
    });
});

Route::group(['prefix' => 'location'], function() {
    Route::get('states/json/{id?}', 'Frontend\Location\StateController@getStates')->name('frontend.location.get_states')->where('id', '[0-9]+');
    Route::get('cities/json/{id?}', 'Frontend\Location\CityController@getCities')->name('frontend.location.get_cities')->where('id', '[0-9]+');
});

Route::group(['prefix' => 'carrier'], function() {
    Route::get('json/{state_id?}/{city_id?}', 'Frontend\Shipping\CarrierController@getForCheckoutCarriers')->name('frontend.shipping.get_carriers_for_checkout')->where('state_id', '[0-9]+')->where('city_id', '[0-9]+');;
});

Route::group(['prefix' => 'payment_method'], function() {
    Route::get('json/{state_id?}/{city_id?}', 'Frontend\Payment\PaymentMethodController@getForCheckoutPaymentMethods')->name('frontend.payment.get_payment_methods_for_checkout')->where('state_id', '[0-9]+')->where('city_id', '[0-9]+');
});

Route::get('activar/{number?}', 'Frontend\Card\CardController@activate');
Route::get('pixel_check/{number?}', 'Frontend\Card\CardController@pixel')->name('frontend.pixel_check');
Route::get('/{identifier?}', 'Frontend\Catalog\PackController@show')->name('frontend.packs.show');
Route::get('p/{identifier?}', 'Frontend\Catalog\ProductController@show')->name('frontend.products.show');
