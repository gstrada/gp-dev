<?php

Route::group(['prefix' => 'auth'], function() {
    Route::get('logout', 'Auth\LoginController@logout');
    Route::get('profile', 'Auth\ProfileController@profile');

    Route::post('profile/logo', 'Auth\ProfileController@updateLogo');
    Route::post('profile/phone', 'Auth\ProfileController@updatePhone');
    Route::post('profile/website', 'Auth\ProfileController@updateWebsite');
    Route::post('profile/password', 'Auth\ProfileController@updatePassword');
    Route::post('profile/email', 'Auth\ProfileController@updateEmail');
    Route::post('profile/name', 'Auth\ProfileController@updateName');
    Route::post('profile/lastname', 'Auth\ProfileController@updateLastName');

    Route::post('profile/address', 'Auth\ProfileController@updateAddress');
});

Route::group(['prefix' => 'card'], function() {
    Route::get('/histories', 'Card\CardHistoryController@index');
//    Route::get('/{item}', 'Card\PaymentMethodController@show');
    Route::post('/validate', 'Card\CardValidateController@validateCard');
    Route::post('/exchange', 'Card\CardValidateController@exchangeCard');
    Route::get('/payment/pending-cards', 'Card\CardPaymentController@index');
    Route::get('/payment/request-info', 'Card\CardPaymentController@requestPaymentInfo');
    Route::post('/payment/request', 'Card\CardPaymentController@requestPayment');
    Route::get('/payment/history', 'Card\CardPaymentHistoryController@index');



//    Route::post('/remove', 'Card\PaymentMethodController@remove');
//    Route::post('/update', 'Card\PaymentMethodController@update');
});

Route::group(['prefix' => 'catalog/products'], function() {
    Route::get('/', 'Catalog\ProductController@index');
    Route::get('/show/{item}', 'Catalog\ProductController@show');
});


