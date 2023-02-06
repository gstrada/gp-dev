<?php

/*
|--------------------------------------------------------------------------
| Hook Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['prefix' => 'mp'], function () {
    Route::get('redirect', 'Mercadopago\MPController@redirect');
    Route::get('notify', 'Mercadopago\MPController@onNotify');
    Route::post('notify', 'Mercadopago\MPController@onNotify');
    Route::get('success', 'Mercadopago\MPController@onSuccess');
    Route::get('pending', 'Mercadopago\MPController@onPending');
    Route::get('failure', 'Mercadopago\MPController@onFailure');
    Route::get('error', 'Mercadopago\MPController@onFailure');
});
