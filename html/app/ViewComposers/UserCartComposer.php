<?php
namespace App\ViewComposers;

use App\Helpers\CartHelper;
use App\Models\Catalog\Category;
use App\Models\Order\Cart;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;

class UserCartComposer {
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */

    public function compose(View $view)
    {
        $user = Auth::user();
        if($user){
            $userCartItems = Cart::with(['discount', 'pack' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }],['product' => function ($q) {
                $q->where('enabled', 1)->where('removed', 0);
            }])->where('user_id', $user->id)->get();
            $userCartCount = 0;
            $userCartTotal = 0;
            $appliedDiscount = null;
            foreach ($userCartItems as $userCart){
                $userCartCount += $userCart->quantity;
                $userCartTotal += CartHelper::getCartItemPrice($userCart);
                if(!$appliedDiscount){
                    $appliedDiscount = $userCart->discount;
                }
            }
            $userCartTotalOriginal = $userCartTotal;
            if($appliedDiscount){
                $userCartTotal = $userCartTotal - (($userCartTotal * $appliedDiscount->rate)) / 100;
            }

            $view->with(compact('userCartItems', 'userCartCount', 'userCartTotalOriginal', 'userCartTotal', 'appliedDiscount'));
        }
    }

}
