<?php
namespace App\ViewComposers;

use App\Models\Catalog\Category;
use Illuminate\Contracts\View\View;

class MenuCategoryComposer {
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $menuCategories = Category::with(['packs' => function ($q) {
            $q->where('enabled', 1)->where('removed', 0)->where('featured', 1);
            }])
            ->where('enabled', 1)
            ->where('visible_on_menu', 1)
            ->where('removed', 0)
            ->orderBy('order', 'DESC')->get();


        $menuCategories = $menuCategories->reverse();
        $view->with('menuCategories',$menuCategories);
    }

}
