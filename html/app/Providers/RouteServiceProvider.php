<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapWebRoutes();
        $this->mapHookRoutes();
        $this->mapApiBackendRoutes();
        $this->mapApiProviderRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiBackendRoutes()
    {

        Route::prefix('api/backend')
            ->middleware(['api'])
            ->namespace($this->namespace . '\Backend')
            ->group(base_path('routes/backend/backend.php'));

        Route::prefix('api/backend')
            ->middleware(['auth:api', 'admin_user'])
            ->namespace($this->namespace . '\Backend')
            ->group(base_path('routes/backend/backend_auth.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiProviderRoutes()
    {

        Route::prefix('api/provider')
            ->middleware(['api'])
            ->namespace($this->namespace . '\Provider')
            ->group(base_path('routes/provider/provider.php'));

        Route::prefix('api/provider')
            ->middleware(['auth:api', 'provider_user'])
            ->namespace($this->namespace . '\Provider')
            ->group(base_path('routes/provider/provider_auth.php'));
    }



    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapHookRoutes()
    {
        Route::prefix('hook')
            ->middleware('hook')
            ->namespace($this->namespace . '\Hook')
            ->group(base_path('routes/hook.php'));
    }
}
