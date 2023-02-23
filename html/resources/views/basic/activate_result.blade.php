@extends('layouts.app')



@section('scripts')

    <script>
        function play() {
            document.getElementById('myvideo').play();
        }
        $( document ).ready(function() {
            $('#videoModal').modal('toggle')

            $('#state').change(function() {
                $(this).closest("form").submit();
            });
            play()
            document.getElementById("myvideo").addEventListener('ended',myHandler,false);
            function myHandler(e) {
                $('#videoModal').modal('toggle')
            }
        });
    </script>
@endsection

@section('content')
    <style>
        .product-description {
            width: 25%;
            height: auto;
        }
        @media only screen and (max-width: 600px) {
            .product-description {
                width: 50%;
                height: auto;
            }
        }
    </style>
    <section id="page-title" class="page-title mt-0">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="title title-1 text-center pb-0">
                        <div class="title--content">
                            <div class="title--heading">
                                @if($already_activated == 0)
                                    <h1>Felicitaciones!</h1>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="about-gallery" class="about about-2 about-gallery-2 pt-0 pb-0">
        <input type="hidden" id="show_wp" value="false">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="about--text mt-0 text-center">
                        @if($already_activated == 0)
                            <p>Tu <span> código </span> fué <span>activado</span> correctamente. <span>Que lo disfrutes!</span></p>
                        @else
                            <h5>Tu código ya fué activado el día {{ \Carbon\Carbon::parse($card->date_activated)->format('d/m/Y') }}</h5>
                        @endif
                    </div>
                </div>
            </div>
            <div class="row feature-1  justify-content-center">
                <div class="col-sm-12 col-md-6 col-lg-6 ">
                    <h6 class="center-block text-center">Datos de tu Código</h6>
                    <ul class="list-unstyled mb-0">
                        @if($card->custom_number)
                            <li>Código Tarjeta: <strong class="text-black font-16 bold pl-3">{{ $card->custom_number }}</strong></li>
                        @else
                            <li>Código: <strong class="text-black font-16 bold pl-3">{{ \App\Helpers\CardHelper::formatCardNumber($card->number) }}</strong></li>
                        @endif
                        @if($card->cvv != "")
                            <li>CVV: <strong class="text-black font-16 bold pl-3">{{ $card->cvv }}</strong></li>
                        @endif
                        <li>Nombre: <strong class="text-black font-16 bold pl-3">{{ $card->name }}</strong></li>
                        <li>Apellido: <strong class="text-black font-16 bold pl-3">{{ $card->lastname }}</strong></li>
                        <li>Valido desde: <strong class="text-black font-16 bold pl-3">{{ \Carbon\Carbon::parse($card->valid_from)->format('d/m/Y') }}</strong></li>
                        <li>Valido hasta: <strong class="text-black font-16 bold pl-3">{{ \Carbon\Carbon::parse($card->valid_thru)->format('d/m/Y') }}</strong></li>
                    </ul>
                    <h6 class="center-block text-center font-12 mt-40 text-theme">Recordá informarle tu código al comercio adherido</h6>
                </div>
            </div>
            <div class="row" style="min-height: 100px !important;">
                <div class="col-sm-12 col-lg-12 col-md-12 text-center">
                    @if($card->orderItem->product != null)
                        <img class="img-responsive product-description" src="{{ asset($card->orderItem->product->picture) }}" alt="">
                    @endif
                    @if($card->orderItem->pack != null)
                        <img class="img-responsive product-description" src="{{ asset($card->orderItem->pack->picture) }}" alt="">
                    @endif
                </div>
                <div class="col-sm-12 col-lg-12 col-md-12 text-center">
                    <div style="width:50%; height: auto; margin: auto">
                        {!! $card->orderItem->pack->description !!}
                    </div>
                </div>
            </div>
            <br>
            <div class="row mt-30">
                <div class="col-md-12 d-flex justify-content-center">
                    {{--                    <p class="mt-20 mb-20 font-18 text-center text-md-left">Cómo usas tu Regalo?</p>--}}
                    <button class="btn btn--primary btn--rounded" data-toggle="collapse" data-target="#como_usar_collapse" style="width: 50em">Cómo usas tu Regalo?</button>
                </div>
                <br>
                <br>
                <div id="como_usar_collapse" class="collapse row mt-30">
                    <div class="col-md-4">
                        <img src="{{ asset('how_to_use/paso-1view.png') }}" class="img-fluid" style="width: 100%;height: auto">
                        <p class="mt-20 text-center text-md-left">Elegí una de las experiencias del presente catálogo.</p>
                    </div>
                    <div class="col-md-4">
                        <img src="{{ asset('how_to_use/paso-2view.png') }}" class="img-fluid" style="width: 100%;height: auto">
                        <p class="mt-20 text-center text-md-left">Realizá la reserva con anticipación, verificando la modalidad de reserva de la experiencia elegida. </p>
                    </div>
                    <div class="col-md-4">
                        <img src="{{ asset('how_to_use/3-Paso-para-link-productview.png') }}" class="img-fluid" style="width: 100%;height: auto">
                        <p class="mt-20 text-center text-md-left">Disfrutá de tu experiencia presentando el código digital desde tu teléfono o entregando la tarjeta física.</p>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </section>

    @if(isset($card_includes))
        <section id="category7" class="category category-3 pt-0 pb-80">
            <div class="container">
                {{--                @if(count($card_includes) > 0)--}}
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <div class="category-num pull-left pull-none-xs mb-20">
                            <h1 class="font-18">
                                Experiencias incluidas
                            </h1>
                        </div>
                    </div>
                    @if(isset($available_in_states))
                        <div class="col-sm-12 col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="billing_country_id">Fitrar por Provincia</label>
                                <form method="POST" data-ajax="false" action="{{ route('frontend.card.link.check') }}">
                                    @csrf
                                    <input type="hidden" name="number" value="{{ $card->number }}" required/>
                                    <div class="select--box">
                                        <i class="fa fa-caret-down"></i>
                                        <select id="state" name="state" class="form-control">
                                            <option value="-1" selected>Todas las provincias</option>
                                            @foreach($available_in_states as $state)
                                                <option value="{{ $state->id }}" @if(isset($state_id) && (int)$state_id === $state->id) selected @endif>{{ strtoupper($state->name) }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                        @if ($errors->any())
                            <div class="col-sm-12 col-md-6 offset-md-3">
                                @foreach ($errors->all() as $error)
                                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        {{ $error }}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                @endforeach
                            </div>
                        @endif
                    @endif
                </div>
                <div class="row mb-30">
                    @foreach($card_includes as $datum)
                        @if($datum->enabled && !$datum->removed)
                            @include('catalog.partials.list_item', [$card, 'list_item_datum' => $datum, 'show_price' => false, 'target_route' => 'frontend.products.show', 'disable_purchase' => true])
                        @endif
                    @endforeach
                </div>
                {{--                @endif--}}
            </div>
        </section>

    @endif
    <!-- CVV Modal -->
    <div class="modal fade" id="videoModal">
        <div class="modal-dialog modal-sm d-flex justify-content-center">
            <div class="modal-content col-sm-12 col-md-4 col-xs-12">
                <!-- Modal Header -->
                <div class="modal-header">
                    <div class="">
                        <a href="https://goldenpack.com.ar" style="display: block; border: 0px !important;">
                            <img border="0" style="display: block; width: 100px;height: auto" src="{{ asset('assets/images/logo/logo-dark.png') }}" alt=""/>
                        </a>
                    </div>
                    <button type="button" class="" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body" id="cvv-modal-body">
                    <div class="d-flex justify-content-center">
                        @if($card->orderItem->pack->category->friendly_url != "gastronomia"
                            || $card->orderItem->pack->category->friendly_url != "estadias"
                            || $card->orderItem->pack->category->friendly_url != "entretenimiento"
                            || $card->orderItem->pack->category->friendly_url != "bienestar"
                            || $card->orderItem->pack->category->friendly_url != "aventura"
                            || $card->orderItem->pack->category->friendly_url != "random")
                            <div id="myVideo" >
                                <div id="videoWrapper">
                                    <video id="myvideo"  style="width: 100%; height: auto">
                                        <source src="{{ asset('assets/videos/'.$card->orderItem->pack->category->friendly_url.'.mp4') }}" type="video/mp4">
                                        Your browser does not support html5 videos
                                    </video>
                                </div>
                            </div>
                        @else
                            <div id="myVideo" >
                                <div id="videoWrapper">
                                    <video id="myvideo"  style="width: 100%; height: auto">
                                        <source src="{{ asset('assets/videos/random.mp4') }}" type="video/mp4">
                                        Your browser does not support html5 videos
                                    </video>
                                </div>
                            </div>
                        @endif
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>
@endsection
