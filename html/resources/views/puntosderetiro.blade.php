@extends('layouts.app')

@section('content')

    <section id="page-title" class="page-title mt-0">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="title title-1 text-center">
                        <div class="title--content">
                            <div class="title--heading">
                                <h1>Puntos de Retiro</h1>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <ol class="breadcrumb breadcrumb-bottom">
                            <li><a href="{{ route('home') }}">Goldenpack</a></li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="pt-0">
        <div class="container">

            <div class="container">
                <p class="text-center"><strong>Recomendamos realizar la compra online y seleccionar el punto de retiro para el pack físico.</strong></br>Recordá que realizamos envíos a todo el país y que también podes hacer tu regalo de modo digital.</p>
            </div>

            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col">
                    <div class="card h-100">
                    <H5 class="card-header footer-active">Córdoba</H5>
                    <div class="card-body">
                        <h5 class="card-title">Blackpool Cerro</h5>
                        <p class="card-text">Manuel E. Pizarro 2095, Córdoba  <br><small>Lun. a Vier: 09:00 a 17:30 hs <br>Sáb: 09:00 a 13:00 hs</small></p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Acepta Tarjeta de Crédito</li>
                        <li class="list-group-item">Acepta Efectivo</li>
                        <li class="list-group-item">Activo</li>
                        <li class="list-group-item"><a target="_blank" href="https://goo.gl/maps/oKB2yBdYxTFQ22ZCA">Ver ubicación</a></li>
                    </ul>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <H5 class="card-header footer-active">Córdoba</H5>
                    <div class="card-body">
                        <h5 class="card-title">Blackpool Centro</h5>
                        <p class="card-text">Deán Funes 395, Córdoba  <br><small>Lun. a Vier: 09:00 a 17:00 hs <br>Sáb: 09:00 a 13:00 hs</small></p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Acepta Tarjeta de Crédito</li>
                        <li class="list-group-item">Acepta Efectivo</li>
                        <li class="list-group-item">Activo</li>
                        <li class="list-group-item"><a target="_blank" href="https://goo.gl/maps/wXqh65wQDaBB1Rd7A">Ver ubicación</a></li>
                    </ul>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <H5 class="card-header footer-active">BuenosAires</H5>
                    <div class="card-body">
                        <h5 class="card-title">It's My Freedom</h5>
                        <p class="card-text">Hondoras 4755, CABA </br></p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">No acepta pagos, solo válido para retiros de ecommerce</li>
                        <li class="list-group-item">Apertura en noviembre</li>
                        <li class="list-group-item"><a target="_blank" href="https://goo.gl/maps/YhFnfnB1VRkL31Uw7">Ver ubicación</a></li>
                    </ul>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <H5 class="card-header footer-active">Rosario</H5>
                    <div class="card-body">
                        <h5 class="card-title">Kamchatka</h5>
                        <p class="card-text">Rioja 1071, Rosario </br></p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">No acepta pagos, solo válido para retiros de ecommerce</li>
                        <li class="list-group-item">Apertura en noviembre</li>
                        <li class="list-group-item"><a target="_blank" href="https://goo.gl/maps/41tSYwx5hHh5Gw3M8">Ver ubicación</a></li>
                    </ul>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <H5 class="card-header footer-active">Mendoza</H5>
                    <div class="card-body">
                        <h5 class="card-title">BAC</h5>
                        <p class="card-text">Alpatacal 3055, Mendoza</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">No acepta pagos, solo válido para retiros de ecommerce</li>
                        <li class="list-group-item">Apertura en noviembre</li>
                        <li class="list-group-item"><a target="_blank" href="https://goo.gl/maps/Q72zeXquFVbbEQEL6">Ver ubicación</a></li>
                    </ul>
                    </div>
                </div>
            </div>



        </div>
    </section>

@endsection
