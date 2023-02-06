@if(isset($menuCategories) && Route::currentRouteName() !== 'frontend.packs.show' && Route::currentRouteName() !== 'frontend.products.show')
    <li class="has-dropdown">
        <a href="#" data-toggle="dropdown" class="dropdown-toggle menu-item">Categorías</a>
        <ul class="dropdown-menu">
            @foreach($menuCategories as $datum_category)
                <li>
                    <a href="{{ route('frontend.categories', $datum_category->friendly_url ?: $datum_category->id) }}">{{ $datum_category->name }}</a>
                </li>
            @endforeach
        </ul>
    </li>
@endif
