<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ViewComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

        View::composer(['*'], 'App\ViewComposers\MenuCategoryComposer');
        View::composer(['*'], 'App\ViewComposers\UserCartComposer');

        //View::composer(['home', 'brands', 'magazine', 'catalog.*'], 'App\Http\ViewComposers\BrandComposer');

    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
