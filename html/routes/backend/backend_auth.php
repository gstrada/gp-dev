<?php

Route::group(['prefix' => 'auth'], function() {
    Route::get('logout', 'Auth\LoginController@logout');
    Route::get('profile', 'Auth\ProfileController@profile');
});

Route::group(['prefix' => 'location/countries'], function() {
    Route::get('/', 'Location\CountryController@index');
    Route::get('show/{item}', 'Location\CountryController@show')->where('id', '[0-9]+');
    Route::post('/store', 'Location\CountryController@store');
    Route::post('/remove', 'Location\CountryController@remove');
    Route::post('/update', 'Location\CountryController@update');

    Route::get('/json', 'Location\CountryController@getCountries');
});

Route::group(['prefix' => 'location/states'], function() {
    Route::get('{id}', 'Location\StateController@index')->where('id', '[0-9]+');
    Route::get('show/{item}', 'Location\StateController@show')->where('id', '[0-9]+');
    Route::post('/store', 'Location\StateController@store');
    Route::post('/remove', 'Location\StateController@remove');
    Route::post('/update', 'Location\StateController@update');
    Route::get('/json/{id}', 'Location\StateController@getStates')->where('id', '[0-9]+');
});

Route::group(['prefix' => 'location/cities'], function() {
    Route::get('{id}', 'Location\CityController@index')->where('id', '[0-9]+');
    Route::get('show/{item}', 'Location\CityController@show')->where('id', '[0-9]+');
    Route::post('/store', 'Location\CityController@store');
    Route::post('/remove', 'Location\CityController@remove');
    Route::post('/update', 'Location\CityController@update');
    Route::get('/json/{id}', 'Location\CityController@getCities')->where('id', '[0-9]+');
});

Route::group(['prefix' => 'payment/methods'], function() {
    Route::get('/', 'Payment\PaymentMethodController@index');
    Route::get('/{item}', 'Payment\PaymentMethodController@show');
    Route::post('/store', 'Payment\PaymentMethodController@store');
    Route::post('/remove', 'Payment\PaymentMethodController@remove');
    Route::post('/update', 'Payment\PaymentMethodController@update');
});

Route::group(['prefix' => 'payment/states'], function() {
    Route::get('{id}', 'Payment\PaymentMethodStateController@index')->where('id', '[0-9]+');
    Route::get('show/{item}', 'Payment\PaymentMethodStateController@show');
    Route::post('/store', 'Payment\PaymentMethodStateController@store');
    Route::post('/remove', 'Payment\PaymentMethodStateController@remove');
    Route::post('/update', 'Payment\PaymentMethodStateController@update');
});

Route::group(['prefix' => 'payment/cities'], function() {
    Route::get('{id}', 'Payment\PaymentMethodCityController@index')->where('id', '[0-9]+');
    Route::get('show/{item}', 'Payment\PaymentMethodCityController@show');
    Route::post('/store', 'Payment\PaymentMethodCityController@store');
    Route::post('/remove', 'Payment\PaymentMethodCityController@remove');
    Route::post('/update', 'Payment\PaymentMethodCityController@update');
});

Route::group(['prefix' => 'shipping/carriers'], function() {
    Route::get('/', 'Shipping\CarrierController@index');
    Route::get('/{item}', 'Shipping\CarrierController@show');
    Route::post('/store', 'Shipping\CarrierController@store');
    Route::post('/remove', 'Shipping\CarrierController@remove');
    Route::post('/update', 'Shipping\CarrierController@update');
});

Route::group(['prefix' => 'shipping/states'], function() {
    Route::get('{id}', 'Shipping\CarrierStateController@index')->where('id', '[0-9]+');
    Route::get('show/{item}', 'Shipping\CarrierStateController@show');
    Route::post('/store', 'Shipping\CarrierStateController@store');
    Route::post('/remove', 'Shipping\CarrierStateController@remove');
    Route::post('/update', 'Shipping\CarrierStateController@update');
});

Route::group(['prefix' => 'shipping/cities'], function() {
    Route::get('{id}', 'Shipping\CarrierCityController@index')->where('id', '[0-9]+');
    Route::get('show/{item}', 'Shipping\CarrierCityController@show');
    Route::post('/store', 'Shipping\CarrierCityController@store');
    Route::post('/remove', 'Shipping\CarrierCityController@remove');
    Route::post('/update', 'Shipping\CarrierCityController@update');
});

Route::group(['prefix' => 'service_provider/providers'], function() {
    Route::get('/', 'ServiceProvider\ProviderController@index');
    Route::get('/show/{item}', 'ServiceProvider\ProviderController@show');
    Route::post('/store', 'ServiceProvider\ProviderController@store');
    Route::post('/logo', 'ServiceProvider\ProviderController@updateLogo');
    Route::post('/remove', 'ServiceProvider\ProviderController@remove');
    Route::post('/update', 'ServiceProvider\ProviderController@update');
    Route::get('/json', 'ServiceProvider\ProviderController@getJsonProviders');
});

Route::group(['prefix' => 'service_provider/addresses'], function() {
    Route::get('{id}', 'ServiceProvider\ProviderAddressController@index')->where('id', '[0-9]+');
    Route::get('show/{item}', 'ServiceProvider\ProviderAddressController@show');
    Route::post('/store', 'ServiceProvider\ProviderAddressController@store');
    Route::post('/remove', 'ServiceProvider\ProviderAddressController@remove');
    Route::post('/update', 'ServiceProvider\ProviderAddressController@update');

    Route::get('provider/json/{id}', 'ServiceProvider\ProviderAddressController@getJsonAddressFromProviders');

});

Route::group(['prefix' => 'service_provider/users'], function() {
    Route::get('{id}', 'ServiceProvider\ProviderUserController@index')->where('id', '[0-9]+');
    Route::post('/store', 'ServiceProvider\ProviderUserController@store');
    Route::post('/remove', 'ServiceProvider\ProviderUserController@remove');
});



Route::group(['prefix' => 'catalog/discounts'], function() {
    Route::get('/', 'Catalog\DiscountController@index');
    Route::get('/show/{item}', 'Catalog\DiscountController@show');
    Route::post('/store', 'Catalog\DiscountController@store');
    Route::post('/remove', 'Catalog\DiscountController@remove');
    Route::post('/update', 'Catalog\DiscountController@update');
    Route::get('/json', 'Catalog\DiscountController@getJsonDiscounts');
});


Route::group(['prefix' => 'catalog/categories'], function() {
    Route::get('/', 'Catalog\CategoryController@index');
    Route::get('/show/{item}', 'Catalog\CategoryController@show');
    Route::post('/store', 'Catalog\CategoryController@store');
    Route::post('/picture', 'Catalog\CategoryController@updatePicture');
    Route::post('/remove', 'Catalog\CategoryController@remove');
    Route::post('/update', 'Catalog\CategoryController@update');
    Route::get('/json', 'Catalog\CategoryController@getJsonCategories');
});

Route::group(['prefix' => 'catalog/packs'], function() {
    Route::get('/', 'Catalog\PackController@index');
    Route::get('/show/{item}', 'Catalog\PackController@show');
    Route::post('/store', 'Catalog\PackController@store');
    Route::post('/picture', 'Catalog\PackController@updatePicture');
    Route::post('/remove', 'Catalog\PackController@remove');
    Route::post('/update', 'Catalog\PackController@update');
});


Route::group(['prefix' => 'catalog/products'], function() {
    Route::get('/', 'Catalog\ProductController@index');
    Route::get('/show/{item}', 'Catalog\ProductController@show');
    Route::post('/store', 'Catalog\ProductController@store');
    Route::post('/picture', 'Catalog\ProductController@updatePicture');
    Route::post('/remove', 'Catalog\ProductController@remove');
    Route::post('/update', 'Catalog\ProductController@update');

    Route::get('provider/json/{id}', 'Catalog\ProductController@getJsonProductsFromProviders');
});

Route::group(['prefix' => 'catalog/pack_products'], function() {
    Route::get('{id}', 'Catalog\PackProductController@index')->where('id', '[0-9]+');
    Route::post('/store', 'Catalog\PackProductController@store');
    Route::post('/remove', 'Catalog\PackProductController@remove');
});

Route::group(['prefix' => 'catalog/product_addresses'], function() {
    Route::get('{id}', 'Catalog\ProductAddressController@index')->where('id', '[0-9]+');
    Route::post('/store', 'Catalog\ProductAddressController@store');
    Route::post('/remove', 'Catalog\ProductAddressController@remove');
});

Route::group(['prefix' => 'catalog/product_picture'], function() {
    Route::get('{id}', 'Catalog\ProductPictureController@index')->where('id', '[0-9]+');
    Route::post('/store', 'Catalog\ProductPictureController@store');
    Route::post('/remove', 'Catalog\ProductPictureController@remove');
});

Route::group(['prefix' => 'sales'], function() {
    Route::get('list', 'Order\OrderController@index');
    Route::post('set/status', 'Order\OrderController@setStatus');
});

Route::group(['prefix' => 'slider'], function() {
    Route::get('list', 'Theme\SliderController@index');
    Route::post('store', 'Theme\SliderController@store');
});


///api/backend/card/card_edit

Route::group(['prefix' => 'card/provider_request'], function() {
    Route::get('/', 'Card\HistoryController@index');
    Route::get('show/{item}', 'Card\HistoryController@show');
//    Route::post('/store', 'Card\HistoryController@store');
//    Route::post('/remove', 'Card\HistoryController@remove');
    Route::post('/update', 'Card\HistoryController@update');
});


Route::group(['prefix' => 'clients'], function() {
    Route::get('/', 'User\UserController@index');
//    Route::get('show/{item}', 'Card\HistoryController@show');
////    Route::post('/store', 'Card\HistoryController@store');
////    Route::post('/remove', 'Card\HistoryController@remove');
//    Route::post('/update', 'Card\HistoryController@update');
});

Route::group(['prefix' => 'card'], function() {
    Route::post('find/', 'Card\CardController@find');
    Route::post('find-by-order-id/', 'Card\CardController@findByOrderId');
    Route::get('/reservations', 'Card\CardReservationController@getReservations');
//    Route::get('/reservas', 'Card\CardReservationController@show');
    Route::post('update/', 'Card\CardController@update');

    Route::get('histories/', 'Card\CardController@getReservations');
    Route::get('histories/show/{item}', 'Card\CardController@historyShow');
    Route::post('histories/update', 'Card\CardController@historyUpdate');
});





