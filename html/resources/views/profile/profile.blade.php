@extends('layouts.app')

@section('content')
    <section id="page-title" class="page-title mt-0">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="title title-1 text-center">
                        <div class="title--content">
                            <div class="title--heading">
                                <h1>Tu cuenta</h1>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <ol class="breadcrumb breadcrumb-bottom">
                            <li><a href="{{ route('home') }}">Goldenpack</a></li>
                            <li class="active">Perfil</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="blog" class="blog blog-grid-2 pt-0">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-3">
                    <div class="sidebar">
                        <div class="widget widget-share mb-40">
                            <span class="share--title">seguinos : </span>
                            <a href="https://www.facebook.com/goldenpackargentina/"><i class="fa fa-facebook"></i></a>
                            <a href="https://www.instagram.com/golden.pack/"><i class="fa fa-instagram"></i></a>
                        </div>
                        <div class="widget widget-categories">
                            <div class="widget--title">
                                <h3>Menú</h3>
                            </div>
                            <div class="widget--content">
                                <ul class="list-unstyled">
                                    @if(Auth::user()->admin_role == 'admin')
                                        <li>
                                            <a href="{{ route('backend.reservations') }}">Reservas</a>
                                        </li>
                                    @endif
                                    <li>
                                        <a href="{{ route('profile.epacks') }}" @if(isset($type) && $type === 'epacks') class="footer-active" @endif>Tus epacks</a>
                                    </li>
                                    <li>
                                        <a href="{{ route('profile.data') }}"  @if(isset($type) && $type === 'data') class="footer-active" @endif>Tus datos</a>
                                    </li>
                                    <li>
                                        <a href="{{ route('profile.orders') }}" @if(isset($type) && $type === 'orders') class="footer-active" @endif>Tus pedidos</a>
                                    </li>
                                    <li>
                                        <a href="{{ route('profile.password') }}" @if(isset($type) && $type === 'password') class="footer-active" @endif>Tu Clave</a>
                                    </li>
                                    @if(\Illuminate\Support\Facades\Auth::user() and \Illuminate\Support\Facades\Auth::user()->is_admin)
                                    <li>
                                        <a href="{{ route('profile.swap.user.view') }}" @if(isset($type) && $type === 'swap_user') class="footer-active" @endif>Intercambiá usuarios</a>
                                    </li>
                                    @endif
                                </ul>
                            </div>
                        </div>
{{--                        <div class="widget widget-recent-posts">--}}
{{--                            <div class="widget--title">--}}
{{--                                <h3>Mirá!</h3>--}}
{{--                            </div>--}}
{{--                            <div class="widget--content">--}}
{{--                                @foreach($featuredPacks as $featuredPack)--}}
{{--                                    <div class="entry">--}}
{{--                                        <a href="{{ route('frontend.packs', $featuredPack->sku) }}">--}}
{{--                                            <img src="{{ asset($featuredPack->picture) }}" alt="{{ $featuredPack->name }}" style="height: auto">--}}
{{--                                        </a>--}}
{{--                                        <div class="entry-desc">--}}
{{--                                            <div class="entry-title">--}}
{{--                                                <a href="{{ route('frontend.packs', $featuredPack->sku) }}">Pack {{ $featuredPack->name }}</a>--}}
{{--                                            </div>--}}
{{--                                            <div class="entry-meta">--}}
{{--                                                <a href="{{ route('frontend.packs', $featuredPack->sku) }}">Conocé más!</a>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                @endforeach--}}
{{--                            </div>--}}
{{--                        </div>--}}
                    </div>
                </div>
                <!-- .col-lg-3 end -->
                <div class="col-sm-12 col-md-12 col-lg-9">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-12">
                            @if(isset($type))
                                @include('profile.partials.' . $type)
                            @else
                                @include('profile.partials.epacks')
                            @endif
                        </div>
                    </div>
                </div>
                <!-- .col-lg-9 end -->
            </div>
            <!-- .row end -->
        </div>
    </section>
@endsection
