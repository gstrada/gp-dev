@extends('layouts.app')

@section('scripts')

@endsection

@section('content')
    <section id="page-title" class="page-title  mt-30">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="title title-1 text-center">
                        <div class="title--content">
                            <div class="title--heading">
                                <h3>No pudimos procesar tu pago</h3>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <ol class="breadcrumb breadcrumb-bottom">
                            <li class="active text-uppercase">Tu pago fue cancelado, o rechazado</li>
                        </ol>
                    </div>
                    <!-- .title end -->
                </div>
                <!-- .col-lg-12 end -->
            </div>
            <!-- .row end -->
        </div>
        <!-- .container end -->
    </section>

    <section class="mt-0 pt-20">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h6 class="text-center">Puedes utilizar otro medio de pago y completar tu compra!</h6>
                    <p class="text-center mb-15"><a class="btn btn--primary btn--rounded w-auto pl-5 pr-5" href="{{ route('frontend.checkout') }}">pagar con otro método</a></p>
                </div>
            </div>
        </div>
    </section>
@endsection
