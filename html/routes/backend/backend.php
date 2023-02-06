<?php

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'Auth\LoginController@login');
    //Route::post('register', 'Auth\RegisterController@register');
});



Route::get('download/65a4sd6f54162534465a4sdf65a4sdf6542163454516235446a5sd4f321hha654asd65f4as6d54f', 'User\UserController@download');
//
//Route::group(['prefix' => 'download_client_list/'], function () {
//    Route::post('login', 'Auth\LoginController@login');
//    //Route::post('register', 'Auth\RegisterController@register');
//});
