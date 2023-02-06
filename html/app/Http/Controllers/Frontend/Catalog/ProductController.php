<?php

namespace App\Http\Controllers\Frontend\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Category;
use App\Models\Catalog\Pack;
use App\Models\Catalog\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($identifier)
    {
        $product = Product::with(['category', 'packs', 'pictures', 'provider', 'addresses', 'pictures' => function($q){
            $q->where('removed', '=', 0);
        }])->where(function ($query) use ($identifier){
            $query->where('id', '=', $identifier)->orWhere('sku', '=', $identifier)->orWhere('friendly_url', '=', $identifier);
        })->where('enabled', '=', 1)->where('removed', '=', 0)->where('invisible', '=', 0)->firstOrFail();

        $included_in_packs = $product->packs()
            ->wherePivot('enabled','=', '1')->wherePivot('removed','=', '0')
            ->where('packs.enabled', 1)
            ->where('packs.removed', 0)->get();

        return view('catalog.product.product_view', compact('product', 'included_in_packs', 'identifier'));
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function show($identifier)
    {
        $product = Product::with(['category', 'packs', 'pictures', 'provider', 'addresses'])->where(function ($query) use ($identifier){
            $query->where('id', '=', $identifier)->orWhere('sku', '=', $identifier)->orWhere('friendly_url', '=', $identifier);
        })->where('enabled', '=', 1)->where('removed', '=', 0)->where('invisible', '=', 0)
            ->firstOrFail();

//        $included_in_packs = $product->packs()
//            ->wherePivot('enabled','=', '1')->wherePivot('removed','=', '0')
//            ->where('packs.enabled', 1)
//            ->where('packs.removed', 0)->get();
        $included_in_packs = [];
        return view('catalog.product.product_show', compact('product', 'included_in_packs', 'identifier'));
    }
}
