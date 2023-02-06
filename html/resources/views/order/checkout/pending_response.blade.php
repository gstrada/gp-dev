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
                                <h3>Tu pago fue procesado</h3>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <ol class="breadcrumb breadcrumb-bottom">
                            <li class="active text-uppercase">Estamos a la espera de confirmación del pago</li>
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
                    @if($order && $order->payment && $order->payment->success_description)
                        <div class="text-center">
                            {!! $order->payment->success_description !!}
                        </div>
                    @endif
                    <p class="text-center mt-0 pt-0 pb-2 mb-2 mt-10 font-11">Recordá que podés ver el estado de tu pedido en cualquier momento desde <a href="{{ route('profile') }}"> TU CUENTA</a></p>
                </div>
            </div>
        </div>
    </section>
@endsection
