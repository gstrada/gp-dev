<?php

namespace App\Http\Controllers\Frontend\User;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Pack;
use App\Models\Order\Order;
use App\Models\Order\OrderItem;
use App\Models\User\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Barryvdh\DomPDF\Facade as PDF;

class ProfileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function profileData()
    {

        $user = Auth::user();
        $featuredPacks = Pack::where('enabled', '=', 1)->where('removed', '=', 0)->where('featured', '=', 1)->where('available_for_sale', '=', 1)->inRandomOrder()->limit(3)->get();
        $type = 'data';
        return view('profile.profile', compact('user', 'featuredPacks', 'type'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeData(Request $request)
    {
        $email = $request->get('email');
        $name = $request->get('name');
        $lastname = $request->get('lastname');
        $user = Auth::user();

        if(!$email){
            return redirect()->back()->withErrors(['El Email es Requerido']);
        }
        if(!$name){
            return redirect()->back()->withErrors(['El Nombre es Requerido']);
        }
        if(!$lastname){
            return redirect()->back()->withErrors(['El Apellido es Requerido']);
        }
        if($user->email != $email){
            if($tmpUser = User::whereEmail($email)->first()){
                return redirect()->back()->withErrors(['El Email ya existe en nuestra base de datos']);
            }
        }

        $user->email = $email;
        $user->name = $name;
        $user->lastname = $lastname;
        if($user->save()){
            return redirect()->back()->withSuccess('Tus datos se modificaron correctamente');
        }
        return redirect()->back()->withErrors(['No pudimos actualizar tus datos, intentá nuevamente mas tarde']);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function profilePassword()
    {
        $user = Auth::user();
        $featuredPacks = Pack::where('enabled', '=', 1)->where('removed', '=', 0)->where('featured', '=', 1)->where('available_for_sale', '=', 1)->inRandomOrder()->limit(3)->get();
        $type = 'password';
        return view('profile.profile', compact('user', 'featuredPacks', 'type'));
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function profileSwapUser()
    {
        $user = Auth::user();
        if($user->is_admin){
            $featuredPacks = Pack::where('enabled', '=', 1)->where('removed', '=', 0)->where('featured', '=', 1)->where('available_for_sale', '=', 1)->inRandomOrder()->limit(3)->get();
            $type = 'swap_user';
            return view('profile.profile', compact('user', 'featuredPacks', 'type'));
        }
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function swapUser(Request $request)
    {
        $email = $request->get('email');
        $user = Auth::user();
        if(!$user->is_admin){
            return redirect(route('profile.data'))->withErrors(['No tenés permisos suficientes para este area']);
        }
        $account = User::whereEmail($email)->first();
        if(!$account){
            return redirect()->back()->withErrors(['El Email no existe']);
        }
        if($account->is_admin){
            return redirect()->back()->withErrors(['No es posible intercambiar esta cuenta']);
        }
        Auth::loginUsingId($account->id);
        return redirect(route('profile.data'))->withSuccess('El Usuario fue intercambiado correctamente');


    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storePassword(Request $request)
    {
        $password = $request->get('password');
        $password_confirmation = $request->get('password_confirmation');
        $user = Auth::user();
        if(!$password){
            return redirect()->back()->withErrors(['La Clave es Requerida']);
        }
        if(!$password_confirmation){
            return redirect()->back()->withErrors(['La Confirmación de Clave es Requerida']);
        }
        if($password !== $password_confirmation){
            return redirect()->back()->withErrors(['Las Claves no coinciden']);
        }
        $user->password = Hash::make($password);
        if($user->save()){
            return redirect()->back()->withSuccess('Tu Clave se modificó correctamente');
        }
        return redirect()->back()->withErrors(['No pudimos actualizar tu clave, intentá nuevamente mas tarde']);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function profileOrders()
    {
        $user = Auth::user();
        $featuredPacks = Pack::where('enabled', '=', 1)->where('removed', '=', 0)->where('featured', '=', 1)->where('available_for_sale', '=', 1)->inRandomOrder()->limit(3)->get();
        $type = 'orders';
        $orders = Order::with('items', 'payment')->where('user_id', '=', $user->id)->orderBy('created_at', 'DESC')->get();
        foreach ($orders as $order){
            $order->has_digital = false;
            if($order->approved){
                if($order->items()->where('delivery_type', '=', 'digital')->first()){
                    $order->has_digital = true;
                }
            }
        }
        return view('profile.profile', compact('user', 'featuredPacks', 'type', 'orders'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function profileEpacks()
    {
 //        $oneCartNoDigital = OrderItem::with(['pack' => function ($q) {
//            $q->where('enabled', 1)->where('removed', 0);
//        }], ['product' => function ($q) {
//            $q->where('enabled', 1)->where('removed', 0);
//        }])->where('order_id', '=', $order->id)->where('user_id', $user->id)->where('delivery_type', '!=', 'digital')->first();
//        $all_items_are_digital = !$oneCartNoDigital;
//
//        $last_order_information = Order::where('user_id', '=', $user->id)->orderBy('created_at', 'DESC')->first();


        $user = Auth::user();
        $featuredPacks = Pack::where('enabled', '=', 1)->where('removed', '=', 0)->where('featured', '=', 1)->where('available_for_sale', '=', 1)->inRandomOrder()->limit(3)->get();
        $type = 'epacks';
        $orders = Order::with('items', 'payment')
            ->where('user_id', '=', $user->id)
            ->where('approved', '=', 1)
            ->where('rejected', '=', 0)
            ->whereHas('items', function($q){
                $q->where('delivery_type', '=', 'digital');
            })
            ->orderBy('created_at', 'DESC')->get();
        foreach ($orders as $order){
            $order->has_digital = false;
            if($order->approved){
                if($order->items()->where('delivery_type', '=', 'digital')->first()){
                    $order->has_digital = true;
                }
            }
        }
        return view('profile.profile', compact('user', 'featuredPacks', 'type', 'orders'));

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function downloadOrder(Order $order)
    {
        $user = Auth::user();
        if($order->user_id === $user->id){
            $pdf = PDF::loadView('pdf.order', compact('order'));
            return $pdf->download('order.pdf');
        }
        return redirect(route('home'))->withErrors(['Esta orden no fué encontrada']);
    }

    //profile.download.order
}
