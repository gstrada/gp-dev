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
                                <h3>¡Tu Pago fué aprobado!</h3>
                            </div>
                        </div>

<!--                         <div class="clearfix"></div>
                        <ol class="breadcrumb breadcrumb-bottom">
                            <li class="active text-uppercase">Procesamos correctamente tu pago</li>
                        </ol> -->

                    </div>

                    <!-- .title end -->
                </div>
                <!-- .col-lg-12 end -->
            </div>
            <!-- .row end -->
        </div>
        <!-- .container end -->
    </section>

    <section class="mt-0 pt-0">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    @if($all_items_are_physical)
                        <h6 class="text-center mt-0 pt-0 pb-0 mb-2">¡Estamos preparando tu pedido!</h6>
                        <h6 class="text-center font-13 pb-0 mt-40 mb-0">Ya puedes acercarte al punto de retiro seleccionado</h6>
                        <h6 class="text-center font-13 pb-0 mt-40 mb-0">o aguardar por la entrega al domicilio indicado.</h6>


<!--                    <h6 class="text-center font-13 pb-0 mt-40 mb-0">La dirección de entrega es</h6>
                        <h6 class="text-center font-13 mt-4">{{ $shipping_address }}</h6> -->
                    @else
                        @if(!$all_items_are_digital)
                            <p class="text-center mt-0 pt-0 pb-2 mb-2">¡Estamos preparando tu pedido!</p>

                            <h6 class="text-center font-13 pb-0 mt-40 mb-0">Ya puedes acercarte al punto de retiro seleccionado</h6>
                            <h6 class="text-center font-13 pb-0 mt-40 mb-0">o aguardar por la entrega al domicilio indicado.</h6>

                        @else
                            <h6 class="text-center mt-0 pt-0 pb-2 mb-2">A continuacion necesitamos que configures los datos de entrega para</h6>
                            <h6 class="text-center mt-0 pt-0 pb-2 mb-2">tus regalos digitales</h6>

                            <div class="text-center w-auto mt-30">
                            <a href="{{ route('frontend.card.manage', $order->id) }}" class="btn btn--secondary btn--rounded w-auto pl-5 pr-5">Configurar productos digitales</a>
                            </div>

                        @endif

                            <p class="text-center mt-0 pt-0 pb-2 mb-2 mt-10 font-11">Recordá que tus productos digitales los podes configurar en cualquier momento desde <a href="{{ route('profile') }}"> TU CUENTA</a></p>
                    @endif
                </div>
            </div>
        </div>
    </section>
@endsection
