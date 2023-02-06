@extends('layouts.app')

@section('scripts')
    <script>
        window.onload=function(){
            var pos=window.name || 0;
            window.scrollTo(0,pos);
        }
        window.onunload=function(){
            window.name=self.pageYOffset || (document.documentElement.scrollTop+document.body.scrollTop);
        }

        $( document ).ready(function() {
            $('#state-id').val($("#state").val())

            $('#state').change(function() {
                $(this).closest("form").submit();
            });
            $('#city').change(function() {
                $(this).closest("form").submit();
            });
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
                                <h1>Información</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="about-gallery" class="about about-2 about-gallery-2 pt-0 pb-0">
        <div class="container">
            <div class="row feature-1  justify-content-center mb-20">
                <div class="col-sm-12 col-md-6 col-lg-6 ">
                    <h6 class="center-block text-center">De tu Código</h6>
                    <ul class="list-unstyled mb-0">
                        @if($card->custom_number)
                            <li>Código Tarjeta: <strong class="text-black font-16 bold pl-3">{{ $card->custom_number }}</strong></li>
                        @else
                            <li>Código: <strong class="text-black font-16 bold pl-3">{{ \App\Helpers\CardHelper::formatCardNumber($card->number) }}</strong></li>
                        @endif
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
                        <p class="mt-20 text-center text-md-left">Comunicate con anticipación con el prestador seleccionado para realizar la reserva. De ser necesario, contactate con el WhatsApp de Golden Pack. </p>
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
                        @if($show_city_filter > 0)
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label for="billing_country_id">Fitrar por Ciudad</label>
                                    <form method="POST" id="city_form" data-ajax="false" action="{{ route('frontend.card.link.check') }}">
                                        @csrf
                                        <input type="hidden" name="number" value="{{ $card->number }}" required/>
                                        <input type="hidden" name="state-id" id="state-id" value=""/>
                                        <div class="select--box">
                                            <i class="fa fa-caret-down"></i>
                                            <select id="city" name="city" class="form-control">
                                                @if($available_in_cities->count() > 1)
                                                    <option value="-1" selected>Todas las ciudades</option>
                                                @endif
                                                @foreach($available_in_cities as $city)
                                                    <option value="{{ $city->id }}" @if(isset($city_id) && (int)$city_id === $city->id) selected @endif>{{ $city->name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        @endif
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
                            @include('catalog.partials.list_item', ['list_item_datum' => $datum, 'show_price' => false, 'target_route' => 'frontend.products.show', 'disable_purchase' => true])
                        @endif
                    @endforeach
                </div>
                {{--                @endif--}}
            </div>
        </section>
    @endif

@endsection
