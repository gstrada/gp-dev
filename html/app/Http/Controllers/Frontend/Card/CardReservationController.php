<?php

namespace App\Http\Controllers\Frontend\Card;

use App\Http\Controllers\Controller;
use App\Models\Reservation\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CardReservationController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return false|\Illuminate\Http\JsonResponse|string
     */
    public function getReservations($status = null, $thru = null)
    {
        if(is_null($status)){
            $status = 'all';
        }
        switch($status) {
            case 'all':
                return(json_encode( Reservation::where('reservation_method', $thru)->get()));
            default:
                return(json_encode( Reservation::where('status', $status)->where('reservation_method', $thru)->get()));
        }

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function show()
    {
        if(Auth::user()->admin_role != 'admin'){
            return redirect('/');
        }
        return view('card.reservations');
    }


    public function update_reservation(Request $request)
    {

        $id = $_POST['id'];
        $status = $_POST['status'];
        $responsable = $_POST['responsable'];
        $comments = $_POST['comments'];
        $reservation = Reservation::find($id);
        $reservation->responsable = $responsable;
        $reservation->comments = $comments;
        $reservation->status = $status;
        $reservation->save();

        return response_json('OK', 200, true);

    }

}


