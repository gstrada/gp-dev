@if(isset($menuCategories) && Route::currentRouteName() !== 'frontend.packs.show' && Route::currentRouteName() !== 'frontend.products.show')
<li class="has-dropdown mega-dropdown">
    <a href="#" data-toggle="dropdown" class="dropdown-toggle menu-item">Packs para Regalar</a>
    <ul class="dropdown-menu mega-dropdown-menu collections-menu">
        <li>
            <div class="container">
                <div class="row">
                    @foreach($menuCategories as $datum_category)
                    <div class="col-md-12 col-lg-2">
                        <div class="collection--menu-content">
                            <h5>{{ $datum_category->name }}</h5>
                            <ul>
                                @if($datum_category->packs)
                                @foreach($datum_category->packs as $datum_pack)
                                <li>
                                    <a href="{{ route('frontend.packs', $datum_pack->friendly_url ?: $datum_pack->id) }}">{{ $datum_pack->name }}</a>
                                </li>
                                @endforeach
                                @endif
                                @if(count($datum_category->packs) > 1)
                                <li class="d-none d-md-block d-lg-block d-xl-block">
                                    <a class="color-theme mt-10 mb-15" href="{{ route('frontend.categories', $datum_category->friendly_url ?: $datum_category->id) }}">ver todos</a>
                                </li>
                                @endif
                            </ul>
                        </div>
{{--                        @if($datum_category->picture)--}}
{{--                            <div class="flex">--}}
{{--                                <img src="{{ asset($datum_category->picture) }}" alt="img" style="width: 100%">--}}
{{--                            </div>--}}
{{--                        @endif--}}
                    </div>
                    @endforeach
                </div>
            </div>
        </li>
    </ul>
</li>
@endif
