<?php

namespace App\Http\Controllers\Frontend\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Category;
use App\Models\Catalog\Pack;
use App\Models\Catalog\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
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
    public function index($identifier = null)
    {

        $packs_query = Pack::where('enabled', '=', 1)->where('removed', '=', 0)->where('available_for_sale', '=', 1);
        $products_query = Product::where('enabled', '=', 1)->where('removed', '=', 0)->where('available_for_sale', '=', 1);
        $category = null;
        if($identifier){
            $category = Category::where(function ($query) use ($identifier){
                $query->where('id', '=', $identifier)->orWhere('friendly_url', '=', $identifier);
            })->where('enabled', '=', 1)->where('removed', '=', 0)->firstOrFail();

            $packs_query = $packs_query->where('category_id', '=', $category->id);
            $products_query = $products_query->where('category_id', '=', $category->id);
        }
        $packs = $packs_query->orderBy('name', 'DESC')->get();

        $products = $products_query->orderBy('name', 'DESC')->get();

        $item_count = count($packs) + count($products);
        return view('catalog.categories.category_list', compact('category', 'packs', 'products', 'item_count'));
    }
}
