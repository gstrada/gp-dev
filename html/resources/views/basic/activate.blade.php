@extends('layouts.app')
@section('content')
    <section id="page-title" class="page-title mt-0">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="title title-1 text-center">
                        <div class="title--content">
                            <div class="title--heading">
                                <h1>Activá tu código</h1>
                                <h5>para abrir tu regalo <br> y conocer las experiencias disponibles para elegir</h5>
                            </div>
                        </div>
<!--                         <div class="clearfix"></div>
                        <ol class="breadcrumb breadcrumb-bottom">
                            <li><a href="{{ route('home') }}">Goldenpack</a></li>
                        </ol> -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="about-gallery" class="about about-2 about-gallery-2 pt-0 pb-0">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="about--text mt-0 text-center">
                        <p>Para activar tu <span> código </span> es necesario tener una cuenta <span>Goldenpack</span></p>
                    </div>
                </div>
                <!-- .col-lg-12 end -->
            </div>
            <!-- .row end -->
            <div class="row feature-1">
                <div class="col-sm-12 col-md-6 col-lg-6 text-center">
                    <a href="{{ route('redirect', 'login') }}">
                    <div class="feature-panel">
                        <div class="feature--content pl-0">
                            <i class="fa fa-user fa-3x mb-3 text-theme"></i>
                            <h3>Ingresá</h3>
                            <p>con tus datos</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 text-center">
                    <a href="{{ route('redirect', 'register') }}">
                    <div class="feature-panel">
                        <div class="feature--content pl-0">
                            <i class="fa fa-user-plus fa-3x mb-3 text-theme"></i>
                            <h3>Creá tu cuenta</h3>
                            <p>Goldenpack</p>
                        </div>
                    </div>
                    </a>
                </div>
            </div>
        </div>
        <!-- .container end -->
    </section>
@endsection
