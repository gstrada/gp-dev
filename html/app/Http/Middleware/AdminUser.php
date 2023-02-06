<?php

namespace App\Http\Middleware;

use Closure;

class AdminUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $request->user();
        if(!$user){
            return $this->sendUnauthenticatedResponse($request);
        }
        if(!$user->enabled || !$user->is_admin){
            return $this->sendUnauthenticatedResponse($request);
        }
        return $next($request);
    }

    private function sendUnauthenticatedResponse($request){
        return $request->expectsJson()
            ? response_json(__('No tienes permisos suficientes para acceder'), 403)
            : redirect()->guest(route('profile'));
    }
}
