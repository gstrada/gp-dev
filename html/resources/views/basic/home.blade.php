@extends('layouts.app')

@section('styles')

@endsection

@section('scripts')
    @if($slider)
        {!! $slider->slider_js !!}
    @endif
@endsection

@section('content')
    @if($slider)
    <section class="pt-0 pb-20">
        <div class="container-fluid">
            <div class="col-12">
                {!! $slider->slider_div !!}
            </div>
        </div>
    </section>
    @endif
{{--@dd(\URL::to('/'))--}}
    <section id="page-title" class="page-title page-title-hero pt-sm-5 pt-0">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-7">
                    <div class="title title-6">
                        <div class="title--content">
                            <div class="title--heading d-none d-md-inline-block">
                                <h1>Golden<span class="d-inline">Pack</span></h1>
                            </div>
                            <div class="title--desc">
                                <p>Provee <strong class="text-black">regalos</strong> originales a través
                                    de <strong class="text-black">experiencias y momentos inolvidables.</strong>
                                    Todas nuestras cajas regalo están repletas de emoción
                                    y quien la recibe podrá <strong class="text-black">elegir</strong> la <strong class="text-black">experiencia</strong> que desee.</p>
                                <p class="mt-10">En un mundo en el que todos corremos detrás del tiempo,
                                    <strong class="text-black">vivir experiencias</strong> en lugar de obsequiar bienes materiales
                                    parece más que nunca <strong class="text-black">la mejor elección.</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
                @if(isset($menuCategories) && Route::currentRouteName() !== 'frontend.packs.show' && Route::currentRouteName() !== 'frontend.products.show')
                    <div class="col-sm-12 col-md-12 col-lg-5 clearfix mt-20">
                        <div class="cat--links">
                            <ul class="list-unstyled mb-0 clearfix d-none d-lg-block ">
                                <li class="ml-2 mr-2 pb-3">
                                    <p class="m-0 p-0"><strong class="text-theme">Explorá</strong></p>
                                </li>
                                @foreach($menuCategories as $datum_category)
                                    <li class="ml-2 mr-2">
                                        <a href="{{ route('frontend.categories', $datum_category->friendly_url ?: $datum_category->id) }}">{{ $datum_category->name }}</a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </section>

   <!--  CyberMonday -->
<!--     <section id="page-title" class="page-title page-title-hero pt-sm-5 pt-0">
        <div class="container">
            <div class="title--desc">
                                <h4>¡Cyber Monday! Hasta 30% de descuento</h4>
            </div>
            </div>
    </section> -->



    @include('layouts.partials.featured_packs', ['featuredPacks' => $featuredPacks])


    <section id="feature1" class="feature feature-1 pb-30 pt-20">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 mb-30-xs">
                    <div class="heading heading-4 mb-40">
                        <h2 class="heading--title">¿COMO FUNCIONA?</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-4 col-lg-4">
                    <div class="feature-panel">
                        <div class="feature--icon">
                            <i>1</i>
                        </div>
                        <div class="feature--content">
                            <h3>Seleccioná el pack</h3>
                            <p>que quieras regalar y su presentación con packaging físico o digital.</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4">
                    <div class="feature-panel">
                        <div class="feature--icon">
                            <i>2</i>
                        </div>
                        <div class="feature--content">
                            <h3>El agasajado elige</h3>
                            <p>una experiencia dentro de una amplia diversidad de opciones.</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4">
                    <div class="feature-panel">
                        <div class="feature--icon">
                            <i>3</i>
                        </div>
                        <div class="feature--content">
                            <h3>Disfruta la experiencia</h3>
                            <p>presentando su tarjeta o código E-Pack.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="feature1" class="feature feature-1 pb-50 pt-20">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12">
                    <video poster="{{ asset('assets/images/previewvideo1.jpg') }}" width="100%" height="auto" style="width: 100% !important;height: 100%!important;" controls>
                        <source src="{{ asset('assets/videos/video_gp.mp4') }}" type="video/mp4" >
                    </video>
                </div>
            </div>
        </div>
    </section>

    <!-- Tipos de presentaciones del regalo -->

    <section id="feature1" class="feature feature-1 pb-30 pt-20">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-9 col-lg-9 mb-30-xs">
                    <div class="heading heading-4 mb-40">
                        <h2 class="heading--title">TIPOS DE PRESENTACIONES DEL REGALO</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="feature-panel">
                        <div class="feature--icon">
                            <i>1</i>
                        </div>
                        <div class="feature--content">
                            <h3>Presentación Física</h3>
                            <p>Elegante caja y tarjeta para entregar con un abrazo</p>
                        </div>
                        <div>
                            <img src="{{ asset('assets/images/mock-up-packaging-01.jpg') }}" alt="imagen packaging fisico" style="width:50%; left:50%; transform: translate(-50%); position:relative">
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="feature-panel">
                        <div class="feature--icon">
                            <i>2</i>
                        </div>
                        <div class="feature--content">
                            <h3>Presentación Digital</h3>
                            <p>Envía tu regalo digitalmente por e-mail o compartilo <br> por Whats App junto a un sticker :P</p>
                        </div>
                        <div>
                            <img src="{{ asset('assets/images/mock-up-digital-01.jpg') }}" alt="imagen pack digital" style="width:50%; left:50%; transform: translate(-50%); position:relative">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>




    <!-- Manifiesto -->

    <section id="feature1" class="feature feature-1 pb-30 pt-20">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 mb-30-xs">
                    <div class="heading heading-4 mb-40">
                        <h2 class="heading--title">MANIFIESTO</h2>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-6">
                        <div class="title title-6">
                            <div class="title--content">
                                <div class="title--desc">
                                    <p>Nuestros regalos no se envuelven, <strong class="text-black">envuelven en una nueva experiencia a quien los recibe.</strong> Se guardan en la memoria y se convierten en uno de esos recuerdos que, como un buen vino, mejoran con el tiempo.</p>
                                    <p>Creemos que los regalos tienen que <strong class="text-black">sorprender.</strong> Realmente sorprender, hasta el punto de demostrar todo lo que uno no sabía que era capaz de hacer.</p>
                                    <p>Te invitamos a ser parte de esta nueva forma de regalar porque las cosas lindas se pueden estropear, pero <strong class="text-black">los momentos bien vividos no tienen fecha de caducidad.</strong></p>
                                </div>
                            </div>
                        </div>
                </div>

                <div class="col-sm-12 col-md-12 col-lg-5 clearfix">
                    <video poster="{{ asset('assets/images/previewparacaidas.jpg') }}" width="100%" height="100%" style="width: 85% !important;height: 85%!important; margin-left:7%" controls>
                        <source src="{{ asset('assets/videos/manifiestogp.mp4') }}" type="video/mp4" >
                    </video>
                </div>

            </div>

        </div>
    </section>

<!-- Ahora cuotas -->

    <section id="feature1" class="feature feature-1 pb-30 pt-20">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 mb-30-xs">
                    <div class="title--desc">

                        <img style="height: 132px; width: 160px;" src="{{ asset('assets/images/ahoracuotas.jpg') }}" alt="ahora3y6">
                        <p>Regalá experiencias en 3 y 6 cuotas <strong class="text-black">sin interés</strong></p>

                    </div>
                </div>
            </div>
        </div>
    </section>

@endsection

