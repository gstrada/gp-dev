<?php

namespace App\Http\Controllers;

use App\Models\Catalog\Pack;
use App\Models\Location\City;
use App\Models\ServiceProvider\ProviderAddress;
use App\Models\Theme\RevolutionSlider;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $slider = RevolutionSlider::whereValid(1)->whereProcessed(1)->whereEnabled(1)->first();
        $featuredPacks = Pack::where('enabled', '=', 1)->where('removed', '=', 0)->where('featured', '=', 1)->where('available_for_sale', '=', 1)->get();
        return view('basic.home', compact('featuredPacks', 'slider'));
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function contact()
    {
        return view('basic.contact');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function privacy()
    {
        return view('basic.privacy');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function terms()
    {
        return view('basic.terms');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function faq()
    {
        return view('basic.faq');
    }
}
