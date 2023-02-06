<?php

namespace App\Http\Controllers\Frontend\Order;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Pack;
use App\Models\Catalog\Product;
use App\Models\Order\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
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
    public function index()
    {
        return view('order.cart.user_cart');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        $product_id = $request->get('product_id');
        $pack_id = $request->get('pack_id');
        $quantity = (int)$request->get('quantity', 0);
        $delivery_method = $request->get('delivery_method');
        $allowed_delivery_methods = [
            'digital_price' => 'digital',
            'physical_price' => 'physical',
            'card_price' => 'card'
        ];

        if(!array_key_exists($delivery_method, $allowed_delivery_methods)){
            return redirect()->back()->withErrors(['El Método de envío seleccionado no es válido']);
        }
        if(!$quantity || $quantity <= 0){
            return redirect()->back()->withErrors(['La cantidad debe ser mayor 1']);
        }

        if($pack = Pack::find($pack_id)){
            $delivery_type = $allowed_delivery_methods[$delivery_method];
            $cart = Cart::where('pack_id', $pack_id)->where('user_id', $user->id)->where('delivery_type', $delivery_type)->first();
            if($cart){
                $cart->quantity = $cart->quantity + $quantity;
            }else{
                $cart = new Cart();
                $cart->pack_id = $pack_id;
                $cart->user_id = $user->id;
                $cart->quantity = $quantity;
                $cart->delivery_type = $delivery_type;
            }
            $cart->save();
            return redirect()->back()->withSuccess('El Pack fue agregado correctamente a tu carrito');
        }else if($product = Product::find($product_id)){
            $delivery_type = $allowed_delivery_methods[$delivery_method];
            $cart = Cart::where('product_id',$product_id)->where('user_id', $user->id)->where('delivery_type', $delivery_type)->first();
            if($cart){
                $cart->quantity = $cart->quantity + $quantity;
            }else{
                $cart = new Cart();
                $cart->product_id = $product_id;
                $cart->user_id = $user->id;
                $cart->quantity = $quantity;
                $cart->delivery_type = $delivery_type;
            }
            $cart->save();
            return redirect()->back()->withSuccess('El Pack fue agregado correctamente a tu carrito');
        }
        return redirect()->back()->withErrors(['El Producto no fue encontrado, intente nuevamente']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $cart = Cart::find($id);
        $quantity = (int)$request->get('quantity', 0);
        if(!$quantity || $quantity <= 0){
            return redirect()->back()->withErrors(['La cantidad debe ser mayor 1']);
        }
        if($cart) {
            $cart->quantity = $quantity;
            if($cart->save()){
                return redirect()->back();
            }
        }
        return redirect()->back()->withErrors(['El Carrito no fue actualizado, intente nuevamente']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = Auth::user();
        if($cart = Cart::where('id', $id)->where('user_id', $user->id)->first()){
            if($cart->delete()){
                return redirect()->back()->withSuccess('El Item fue eliminado correctamente del carrito');
            }
        }
        return redirect()->back()->withErrors(['El Item del carrito no fue encontrado, intente nuevamente']);
    }
}
