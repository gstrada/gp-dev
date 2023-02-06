<?php

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'Auth\LoginController@login');
    //Route::post('register', 'Auth\RegisterController@register');
});
