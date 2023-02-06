<?php

namespace App\Http\Controllers\ApiRetail\Auth;

use App\Models\User\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $notifications = $user->notifications()->whereOpened(0)->get();
        return response_json('OK', 200, $notifications);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function count()
    {
        $user = Auth::user();
        $count = $user->notifications()->whereOpened(0)->count();
        return response_json('OK', 200, $count);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function countStream()
    {
//        $user = Auth::user();
//        $count = $user->notifications()->whereOpened(0)->count();
//        $response = new StreamedResponse(function() use ($request) {
//            while(true) {
//                echo 'data: ' . json_encode(Stock::all()) . "\n\n";
//                ob_flush();
//                flush();
//                usleep(200000);
//            }
//        });
//        $response->headers->set('Content-Type', 'text/event-stream');
//        $response->headers->set('X-Accel-Buffering', 'no');
//        $response->headers->set('Cach-Control', 'no-cache');
//        return $response;

    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $notification_id = $request->get('id', null);
        $notification = Notification::whereUserId($user->id)->whereId($notification_id)->first();
        if($notification){
            $notification->viewed = 1;
            $notification->opened = 1;
            $notification->save();
        }
        return response_json('OK', 200);
    }

}
