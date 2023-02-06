<header id="navbar-spy" class="header">
    <nav id="primary-menu" class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <a class="navbar-brand" href="https://goldenpack.com.ar">
                <img class="logo" src="{{ asset('assets/images/logo/logo-dark.png') }}" alt="logo">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                @auth
                    <div class="bag">
                    <i class="icon-bag font-18"></i>
                    <label class="module-label">{{ $userCartCount }}</label>
                </div>
                @endauth
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav mr-auto">
                    @if(Route::currentRouteName() !== 'frontend.packs.show' && Route::currentRouteName() !== 'frontend.products.show')
                    <li class="@if(Route::currentRouteName() === 'home') active @endif">
                        <a href="{{ route('home') }}" class="menu-item">Home</a>
                    </li>
                    @else
                        <li class="has-dropdown mega-dropdown active">
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle menu-item">&nbsp;</a>
                        </li>
                    @endif
                    @include('layouts.partials.menuPacks')
                    @include('layouts.partials.menuCategories')
                    <li>
                        <a href="{{ route('landing.empresas') }}" class="menu-item"><small>Soluciones a Empresas</small></a>
                    </li>
                </ul>
                @if(Route::currentRouteName() !== 'frontend.packs.show' && Route::currentRouteName() !== 'frontend.products.show')
                <div class="module-container">
{{--                    <div class="module module-search pull-left">--}}
{{--                        <div class="module-icon search-icon">--}}
{{--                            <i class="lnr lnr-magnifier"></i>--}}
{{--                            <span class="title">Buscá</span>--}}
{{--                        </div>--}}
{{--                        <div class="module-content module--search-box">--}}
{{--                            <form class="form-search">--}}
{{--                                <input type="text" class="form-control" placeholder="Buscá...">--}}
{{--                                <button type="submit"><span class="fa fa-arrow-right"></span></button>--}}
{{--                            </form>--}}
{{--                        </div>--}}
{{--                    </div>--}}
                    <div class="vertical-divider pull-left mr-30"></div>
                    <div class="module pull-left">
                        <div class="module-icon">
                            <a href="{{ route('frontend.card.activate') }}">
                                Activá tu Código
                            </a>
                        </div>
                    </div>
                    @guest
                        <div class="module pull-left">
                            <div class="module-icon">
                                <a href="{{ route('login') }}">
                                    Ingresá
                                </a>
                            </div>
                        </div>
                        @if (Route::has('register'))
                            <div class="module pull-left">
                                <div class="module-icon">
                                    <a href="{{ route('register') }}">
                                        Registrate
                                    </a>
                                </div>
                            </div>
                        @endif
                    @else
                        <div class="module pull-left">
                            <div class="module-icon">
                                <a href="{{ route('profile') }}">
                                    Tu cuenta
                                </a>
                            </div>
                        </div>
                        <div class="module pull-left">
                            <div class="module-icon">
                                <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    Salir
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>
                            </div>
                        </div>
                        @include('layouts.partials.cart')
                    @endguest
                </div>
                @endif
            </div>
        </div>
    </nav>
</header>
