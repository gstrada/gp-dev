@extends('layouts.app')

@section('content')

    <section id="page-title" class="page-title mt-0">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="title title-1 text-center">
                        <div class="title--content">
                            <div class="title--heading">
                                <h1>Contacto</h1>
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
    <section id="contact1" class="contact contact-1 pt-50 pb-110">
        <div class="container">
            <div class="row">
                <!-- contact panel #1 -->
                <div class="col-sm-12 col-md-12 col-lg-4">
                    <div class="contact-panel">
                        <div class="contact--icon">T</div>
                        <div class="contact--content">
                            <h3>Teléfono</h3>
                            <ul class="list-unstyled mb-0">
                                <li><a href="tel:08004447225">0800 444 7225 (PACK)</a></li>
                                <li><a href="tel:+03515893374">0351 589 3374</a></li>
                            </ul>
                        </div>
                        <div class="contact--content mt-1">
                            <h3>WhatsApp</h3>
                            <ul class="list-unstyled mb-0">
                                <li><a href="https://api.whatsapp.com/send?phone=5491135047000&text=Hola!">Wapp Argentina: +54 9 11 3504-7000</a></li>
                                <li><a href="https://api.whatsapp.com/send?phone=5493512525555&text=Hola!">Wapp Córdoba: +54 9 351 252-5555</a></li>

                            </ul>
                        </div>
                        <!-- .contact-content end -->
                    </div>
                </div>
                <!-- .contact-panel end -->
                <!-- contact panel #2 -->
                <div class="col-sm-12 col-md-12 col-lg-4">
                    <div class="contact-panel">
                        <div class="contact--icon">d</div>
                        <div class="contact--content">
                            <h3>Oficina Comercial</h3>
                            <ul class="list-unstyled mb-0">
                                <li>Luis de Tejeda 3933 , PB. Timbre 4.</li>
                                <li>Córdoba, Argentina</li>
                            </ul>
                        </div>
                        <!-- .contact-content end -->
                    </div>
                </div>
                <!-- .contact-panel end -->
                <!-- contact panel #3 -->
                <div class="col-sm-12 col-md-12 col-lg-4">
                    <div class="contact-panel">
                        <div class="contact--icon">E</div>
                        <div class="contact--content">
                            <h3>EMAIL</h3>
                            <ul class="list-unstyled mb-0">
                                <li><a href="mailto:info@goldenpack.com.ar">info@goldenpack.com.ar</a></li>
                            </ul>
                        </div>
                        <!-- .contact-content end -->
                    </div>
                </div>
                <!-- .contact-panel end -->
            </div>
            <!-- .row end -->
        </div>
        <!-- .container end -->
    </section>

@endsection
