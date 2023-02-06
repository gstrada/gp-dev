<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class ActivityLog
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
        $response = $next($request);
        $user = $request->user();
        if(!$user){
            $user = Auth::user();
        }

        $dont_track = [
            '/oauth/token',
            '/favicon.ico',
        ];

        $props = $request->all();
        $props['ip'] = $this->getIp();
            if ($user) {
                //if(!is_excluded_for_tracking($user)){
                    if(!in_array($request->getPathInfo(), $dont_track,false)) {
                        try {
                            activity($request->getPathInfo())
                                ->causedBy($user)
                                ->withProperties($props)
                                ->log('activity');
                        } catch (\Exception $exception) {

                        }
                    }
                //}
            } else {
                if(!in_array($request->getPathInfo(), $dont_track)) {
                    try {
                        activity($request->getPathInfo())
                            ->withProperties($props)
                            ->log('unauthenticated_access');
                    } catch (\Exception $exception) {

                    }
                }
            }
        return $response;
    }

    private function getIp(){
        foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key){
            if (array_key_exists($key, $_SERVER) === true){
                foreach (explode(',', $_SERVER[$key]) as $ip){
                    $ip = trim($ip); // just to be safe
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false){
                        return $ip;
                    }
                }
            }
        }
    }
}
