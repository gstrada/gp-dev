@extends('layouts.app')
@section('styles')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://npmcdn.com/tootik@1.0.2/css/tootik.min.css">
    <link rel="stylesheet" href="/path/to/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css" />
@endsection

@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://npmcdn.com/flatpickr/dist/l10n/es.js"></script>
    <script>
        window.onload=function(){
            var pos=window.name || 0;
            window.scrollTo(0,pos);
        }
        window.onunload=function(){
            window.name=self.pageYOffset || (document.documentElement.scrollTop+document.body.scrollTop);
        }

        $( document ).ready(function() {
            var URLactual = window.location;
            if(URLactual.href.includes('/product/')){
                $("#div-reserva-info").css("display", "none")
            } else {
                $("#div-reserva-info").css("display", "block")
            }

            $('input[name="reservation_date"]').flatpickr(
                {
                    altInput     : true,
                    altFormat    : "d/m/Y",
                    dateFormat   : "Y-m-d",
                    locale       : "es",
                    altInputClass: "form-control h-auto mb-3 bg-transparent text-center",
                    minDate      : Date.now()
                }
            );
            $('input[name="reservation_time"]').flatpickr(
                {
                    noCalendar: true,
                    enableTime: true,
                    dateFormat: 'H:i',
                    time_24hr: true,
                }
            );
            const modal_name = $("#hidden-modal-name").val()

            $('#' + modal_name).on('show.bs.modal', function () {
                document.getElementById("number").focus()
            })

            $('#' + modal_name).on('hidden.bs.modal', function () {
                const flatpickr = $("#reservation_date").flatpickr();
                flatpickr.clear();
                $('#div-activar').css('display', 'none');
                $("#number").val("")
                $("#cel").val("")
                $("#nombre").val("")
                $("#obs").val("")
                $('#reservation_date').val('');
                $('#reservation_time').val('');
                $('#div-codigo').css('display', 'block');
                $('#div-comprobar').css('display', 'block');
                $('#div-cvv').css('display', 'none');
                $('#div-obs').css('display', 'none');
                $('#div-cel').css('display', 'none');
                $('#div-nombre').css('display', 'none');
                $('#div-reservar').css('display', 'none');
                $('#div-reservation-date').css('display', 'none');
                $('#div-product-name').css('display', 'none');
                $('#div-pack-name').css('display', 'none');
                $('#pack_name').html('');
                $("#div-cant-valid").css('display', 'none');
                $('#alert-error').css('display', 'none');
                $('#alert-error').html('');
            })

            $('#number').on('keyup', function () {
                $("#cvv").val("")
                $('#div-cvv').css('display', 'none');
                $('#alert-error').css('display', 'none');
                $('#alert-error').html('');
            })

            $('#number').on('change', function () {
                $("#cvv").val("")
                $('#div-cvv').css('display', 'none');
                $('#alert-error').css('display', 'none');
                $('#alert-error').html('');
            })

            $('input[type=radio][name=delivery_method]').change(function() {
                let price = $(this).data('price');
                let priceoriginal = $(this).data('priceoriginal');
                $('#product-price').html('$ ' + price);
                if(price != priceoriginal){
                    $('#product-price-original').html('$ ' + priceoriginal);
                }
            });
            $('#state').change(function() {
                let base_url = '{{ route(Route::currentRouteName(), $identifier) }}';
                let value = $(this).val();
                if(value == '-1'){
                    window.location.replace(base_url);
                }else{
                    sessionStorage.scrollPos = $(window).scrollTop();
                    window.location.replace(base_url + '?state=' + value);
                }
            });
            let init = function () {
                $(window).scrollTop(sessionStorage.scrollPos || 0)
                sessionStorage.scrollPos = null;
            };
            //window.onload = init;
            $('#state-id').val($("#state").val())

            $('#city').change(function() {
                let base_url = '{{ route(Route::currentRouteName(), $identifier) }}';
                let valueState = $('#state').val();
                let value = $(this).val();
                if(value == '-1'){
                    window.location.replace(base_url + '?state=' + valueState);
                }else{
                    sessionStorage.scrollPos = $(window).scrollTop();
                    window.location.replace(base_url + '?state=' + valueState + '&city=' + value);
                }
            });
        });
    </script>
@endsection
@section('content')
    @if(isset($detail_item))
        <section id="product-detalis1" class="product-detalis product-detalis-1 mt-0 pt-40">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-5">
                        @if($detail_item->picture)
                            <div class="carousel owl-carousel carousel-dots product-carousel" data-slide="1" data-slide-rs="1" data-autoplay="true" data-nav="false" data-dots="false" data-space="0" data-loop="true" data-speed="800">
                                <div class="product--img-item">
                                    <img src="{{ asset($detail_item->picture) }}" alt="product" title="{{ $detail_item->name }}" />
                                </div>
                                @if(isset($detail_item->pictures))
                                    @foreach($detail_item->pictures as $picture)
                                        <div class="product--img-item">
                                            <img src="{{ asset($picture->path) }}" alt="product" title="{{ $detail_item->name }}" />
                                        </div>
                                    @endforeach
                                @endif
                            </div>
                        @endif
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-7 col-content">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-30">
                                    <ol class="breadcrumb">
                                        <li><a href="{{ url('') }}">GoldenPack</a></li>
                                        @if($detail_item->category)
                                            <li><a href="{{ route('frontend.categories', $detail_item->category->friendly_url ?: $detail_item->category->id) }}">{{ $detail_item->category->name }}</a></li>
                                        @endif
                                    </ol>
                                </div>
                                <div class="product--title">
                                    <h3 id="item-name">{{ $detail_item->name }}</h3>
                                    <input type="hidden" id="pack-name" value="{{  substr($_SERVER["REQUEST_URI"],strripos($_SERVER["REQUEST_URI"],"-")+1)  }}">
                                </div>
                                @if(isset($type) && $type === 'product' && $detail_item->recommended_people && $detail_item->recommended_people > 0)
                                    <div class="product--composer">
                                        <span class="text">Recomendado para @if($detail_item->recommended_people === 1) 1 persona @else {{ $detail_item->recommended_people }} personas @endif</span>
                                    </div>
                                @endif
                                @if(isset($type) && $type === 'pack' && !$disable_purchase)
                                    <div class="product--price" ><span id="product-price">$ {{ \App\Helpers\PriceHelper::getDigitalPrice($detail_item) }}</span> <small><del id="product-price-original">@if($detail_item->discount && $detail_item->discount > 0)$ {{ \App\Helpers\PriceHelper::getDigitalPrice($detail_item, false) }}@endif</del></small></div>
                                @endif
                                <div class="product--desc-tabs tabs @if(isset($type) && $type === 'product') mt-30 @endif">
                                    <ul class="nav nav-tabs @if($disable_purchase) mt-40 @endif" role="tablist" >
                                        <li><a href="#product--desc-tabs-1" role="tab" data-toggle="tab" class="active">DESCRIPCIÓN</a></li>
                                    </ul>
                                    <div class="tab-content">
                                        <div role="tabpanel" class="tab-pane fade show active" id="product--desc-tabs-1">
                                            <div class="product--desc">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        {!! $detail_item->description ?: $detail_item->short_description !!}
                                                    </div>
                                                </div>
                                                @if(isset($type) && $type === 'product')
                                                    <div class="row">
                                                        <div class="col-md-12 mt-20">
                                                            <div class="product--composer">
                                                                <span class="full_title">¿Qúe Incluye?</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 mt-10" id="details">
                                                            {!! $detail_item->details !!}
                                                        </div>
                                                        @if($detail_item->tips)
                                                            <div class="col-md-12">
                                                                <div class="product--composer">
                                                                    <span class="full_title">Tips</span>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12 mt-10">
                                                                {!! $detail_item->tips !!}
                                                            </div>
                                                        @endif
                                                        @if(isset($detail_item->addresses) && count($detail_item->addresses) > 0)
                                                            <div class="col-md-12" id="product--desc-tabs-2">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="product--composer">
                                                                            <span class="full_title">¿Dónde puedo usarlo?</span>
                                                                        </div>
                                                                    </div>
                                                                    @foreach($detail_item->addresses->where('removed',0) as $address)
                                                                        <div class="col-md-12 mt-10 ml-5 mr-5">
                                                                            <div class="product--composer">
                                                                                @if($address->city)
                                                                                    <span class="small_title">{{ $address->city->name }}</span>
                                                                                @endif
                                                                                @if($address->address)
                                                                                    <span class="text ml-3 mt-1"> <i class="fa fa-map-marker"></i> {!! $address->address !!}</span>
                                                                                @endif
                                                                                @if($address->phone)
                                                                                    <a href="tel:{{ $address->phone }}"><span class="text ml-3 mt-1"> <i class="fa fa-phone"></i> {!! $address->phone !!}</span></a>
                                                                                @endif
                                                                                @if($address->email)
                                                                                    <a href="mailto:{{$address->email}}"><span class="text ml-3 mt-1"> <i class="fa fa-envelope"></i> {{ $address->email }}</span></a>
                                                                                @endif
                                                                                @if($address->website)
                                                                                    <span class="text ml-3 mt-1"> <i class="fa fa-globe"></i> {{ $address->website }}</span>
                                                                                @endif
                                                                            </div>
                                                                        </div>
                                                                    @endforeach
                                                                </div>
                                                            </div>
                                                        @endif
                                                        <div id="div-reserva-info" style="display: none">
                                                            @if($detail_item->metodo_reserva)
                                                                <input type="hidden" id="hidden-modal-name" value="card-popup-reserva">
                                                                <div class="col-md-12 mt-10">
                                                                    <div class="product--composer">
                                                                        <span class="full_title">Modalidad de reserva en {{ $detail_item->name }}</span>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12 mt-10">
                                                                    @if($detail_item->metodo_reserva == '3')
                                                                        <div >{{ $detail_item->alternativa_reserva }}</div>

                                                                    @endif
                                                                    @if($detail_item->metodo_reserva == '2')
                                                                        <div ><strong style="font-size: 16px !important">{{ $detail_item->name }} requiere reserva a través del centro de atención de Golden Pack, con lo cual debes realizarla en el horario comercial de lunes a viernes de 9:00 a 18:00 hs.
                                                                                Completa el formulario para solicitar la reserva con una anticipación mínima de 24 hs hábiles y aguarda confirmación de disponibilidad.</strong>
                                                                            <br>
                                                                            (Para realizar la reserva es necesario tener acceso a WhatsApp, ya que los datos se envían por esta vía.)</div>
                                                                        <br>
                                                                            <a type="button" href="#" class="btn btn--primary btn--rounded w-auto pr-5 pl-5"  data-toggle="modal" data-target="#card-popup-reserva"  style="color: white !important"  onclick="">RESERVE AQUÍ</a>
{{--                                                                        <a href="#" class="target_link" data-toggle="modal" data-target="#card-popup-reserva"><span><i class="fa fa-arrow-right ml-51"></i> ABRIR FORMULARIO DE RESERVA</span></a>--}}
                                                                    @endif
                                                                    @if($detail_item->metodo_reserva == '1')
                                                                        <div ><strong style="font-size: 16px !important">Completa el formulario para solicitar la reserva de forma directa con el prestador {{ $detail_item->name }}.
                                                                            <br>
                                                                            Una vez solicitada, deberás aguardar la confirmación de tu reserva por parte del prestador.
                                                                            <br>
                                                                            </strong>
                                                                            (Para realizar la reserva es necesario tener acceso a WhatsApp, ya que los datos se envían por esta vía.)</div>
                                                                            <br>
                                                                            <a type="button" href="#" class="btn btn--primary btn--rounded w-auto pr-5 pl-5"  data-toggle="modal" data-target="#card-popup-reserva"  style="color: white !important"  onclick="">RESERVE AQUÍ</a>
{{--                                                                            <a href="#" class="target_link" data-toggle="modal" data-target="#card-popup-reserva"><span><i class="fa fa-arrow-right ml-51"></i> ABRIR FORMULARIO DE RESERVA</span></a>--}}
                                                                    @endif
                                                                </div>
                                                            @endif
                                                            @if($detail_item->foot_note)
                                                                <div class="col-md-12 mt-10">
                                                                    <div class="product--composer">
                                                                        <span class="full_title">Más info</span>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12 mt-10">
                                                                    {!! $detail_item->foot_note !!}
                                                                </div>
                                                            @endif
                                                        </div>
                                                    </div>
                                                @endif
                                            </div>
                                        </div>
{{--                                        @if(isset($detail_item->addresses) && count($detail_item->addresses) > 0)--}}
{{--                                            <div role="tabpanel" class="tab-pane fade show" id="product--desc-tabs-2">--}}
{{--                                                <div class="row">--}}
{{--                                                    <div class="col-md-12">--}}
{{--                                                        <div class="product--composer">--}}
{{--                                                            <span class="full_title">¿Dónde puedo usarlo?</span>--}}
{{--                                                        </div>--}}
{{--                                                    </div>--}}
{{--                                                    @foreach($detail_item->addresses->where('removed',0) as $address)--}}
{{--                                                        <div class="col-md-12 mt-10 ml-5 mr-5">--}}
{{--                                                            <div class="product--composer">--}}
{{--                                                                @if($address->city)--}}
{{--                                                                    <span class="small_title">{{ $address->city->name }}</span>--}}
{{--                                                                @endif--}}
{{--                                                                @if($address->address)--}}
{{--                                                                    <span class="text ml-3 mt-1"> <i class="fa fa-map-marker"></i> {!! $address->address !!}</span>--}}
{{--                                                                @endif--}}
{{--                                                                @if($address->phone)--}}
{{--                                                                    <a href="tel:{{ $address->phone }}"><span class="text ml-3 mt-1"> <i class="fa fa-phone"></i> {!! $address->phone !!}</span></a>--}}
{{--                                                                @endif--}}
{{--                                                                @if($address->email)--}}
{{--                                                                    <a href="mailto:{{$address->email}}"><span class="text ml-3 mt-1"> <i class="fa fa-envelope"></i> {{ $address->email }}</span></a>--}}
{{--                                                                @endif--}}
{{--                                                                @if($address->website)--}}
{{--                                                                    <span class="text ml-3 mt-1"> <i class="fa fa-globe"></i> {{ $address->website }}</span>--}}
{{--                                                                @endif--}}
{{--                                                            </div>--}}
{{--                                                        </div>--}}
{{--                                                    @endforeach--}}
{{--                                                </div>--}}
{{--                                            </div>--}}
{{--                                        @endif--}}
                                    </div>
                                </div>
{{--                                @dd($detail_item->addresses[0])--}}
                                @if($disable_purchase)
                                    <div class="row mt-30">
                                        <div class="col-md-12">
                                            <p class="mt-20 mb-20 font-18 text-center text-md-left">Cómo usas tu Regalo?</p>
                                        </div>
                                        <div class="col-md-4">
                                            <img src="{{ asset('how_to_use/paso-1view.png') }}" class="img-fluid" style="width: 100%;height: auto">
                                            <p class="mt-20 text-center text-md-left">Elegí una de las experiencias del presente catálogo.</p>
                                        </div>
                                        <div class="col-md-4">
                                            <img src="{{ asset('how_to_use/paso-2view.png') }}" class="img-fluid" style="width: 100%;height: auto">
                                            <p class="mt-20 text-center text-md-left">Realizá la reserva con anticipación, verificando la modalidad de reserva de la experiencia elegida.</p>
                                        </div>
                                        <div class="col-md-4">
                                            <img src="{{ asset('how_to_use/3-Paso-para-link-productview.png') }}" class="img-fluid" style="width: 100%;height: auto">
                                            <p class="mt-20 text-center text-md-left">Disfrutá de tu experiencia presentando el código digital desde tu teléfono o entregando la tarjeta física.</p>
                                        </div>
                                    </div>
                                @endif
                                @if(!$disable_purchase)
                                    @if(isset($type) && $type === 'pack')
                                        <div class="product--composer mt-30">
                                            <span class="full_title">¿Cómo lo querés enviar?</span>
                                        </div>
                                    @else
                                        <div class="product--composer mt-30 mb-10">
                                            <span class="full_title">Encontralo en: </span>
                                        </div>
                                        @foreach($included_in_packs as $datum)
                                            <div class="product--composer">
                                                <a href="{{ route($related_target_route, $datum->friendly_url ?: $datum->id) }}" class="target_link"><i class="fa fa-arrow-right ml-51"></i> Pack {{ $datum->name }} <span>desde ${{ \App\Helpers\PriceHelper::getMinPrice($datum) }}</span></a>
                                            </div>
                                        @endforeach
                                    @endif
                                @endif
                            </div>
                        </div>
                        @if(isset($type) && $type === 'pack' && !$disable_purchase)
                            <form method="post" action="{{ route('frontend.cart.store') }}">
                                @csrf
                                <input type="hidden" name="pack_id" value="{{ $detail_item->id }}">
                                <div class="row mt-20 mb-25">
                                    @if($detail_item->digital_price && \App\Helpers\PriceHelper::getDigitalPrice($detail_item) > 0)
                                        <div class="col-md-12 mb-15">
                                            <div class="input-checkbox inline-block">
                                                <label class="label-checkbox">
                                                    <span class="font-weight-bold">Pack Digital</span>
                                                    <input type="radio" value="digital_price" name="delivery_method" @if(old('delivery_method', 'digital_price') === 'digital_price') checked @endif data-price="{{ \App\Helpers\PriceHelper::getDigitalPrice($detail_item) }}" data-priceoriginal="{{ \App\Helpers\PriceHelper::getDigitalPrice($detail_item, false) }}">
                                                    <span class="check-indicator"></span>
                                                    <p class="p-0 m-0 font-12">Este producto es digital y se envía en el acto por correo electrónico o por WhatsApp o descargar en archivo pdf.</p>
                                                </label>
                                            </div>
                                        </div>
                                    @endif
                                    @if($detail_item->physical_price && \App\Helpers\PriceHelper::getFisicalPrice($detail_item) > 0)
                                        <div class="col-md-12 mb-15">
                                            <div class="input-checkbox inline-block">
                                                <label class="label-checkbox">
                                                    <span class="font-weight-bold">Pack Físico  <span class="ml-3 font-12 font-weight-normal">{{ \App\Helpers\PriceHelper::getFisicalPriceDiferenceWithDigital($detail_item) }}</span></span>
                                                    <input type="radio" value="physical_price" name="delivery_method" @if(old('delivery_method', 'digital_price') === 'physical_price') checked @endif data-price="{{  \App\Helpers\PriceHelper::getFisicalPrice($detail_item) }}" data-priceoriginal="{{ \App\Helpers\PriceHelper::getFisicalPrice($detail_item, false) }}">
                                                    <span class="check-indicator"></span>
                                                    <p class="p-0 m-0 font-12">Este producto se entrega en un packaging físico. Se envía por correo privado o retiro gratuito por punto de venta.</p>
                                                </label>
                                            </div>
                                        </div>
                                    @endif
                                    @if($detail_item->card_price && \App\Helpers\PriceHelper::getCardPrice($detail_item) > 0)
                                        <div class="col-md-12 mb-15">
                                            <div class="input-checkbox inline-block">
                                                <label class="label-checkbox ">
                                                    <span class="font-weight-bold">Pack Físico con Tarjeta <span class="ml-3 font-12 font-weight-normal">{{ \App\Helpers\PriceHelper::getCardPriceDiferenceWithDigital($detail_item) }}</span></span>
                                                    <input type="radio" value="card_price" name="delivery_method" @if(old('delivery_method', 'digital_price') === 'card_price') checked @endif data-price="{{ \App\Helpers\PriceHelper::getCardPrice($detail_item) }}" data-priceoriginal="{{ \App\Helpers\PriceHelper::getCardPrice($detail_item, false) }}">
                                                    <span class="check-indicator"></span>
                                                    <p class="p-0 m-0 font-12">¿Queres sumarle una tarjeta física para que tu agasajado presente al canjear su experiencia?<br/>Recomendado para personas mayores que no frecuenten uso de internet.</p>
                                                </label>
                                            </div>
                                        </div>
                                    @endif
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="product--meta">
                                            <ul class="product--meta-info list-unstyled">
                                                <li>Disponibilidad:<span>En stock</span></li>
                                                <li>SKU:<span>{{ $detail_item->sku }}</span></li>
                                            </ul>
                                            <div class="product--meta-action">
                                                <div class="select-order">
                                                    <div class="product-quantity">
                                                        <input class="minus" type="button" value="-">
                                                        <input type="text" id="quantity" name="quantity" min="1" max="9999" step="1"  value="1" class="qty" readonly="">
                                                        <input class="plus" type="button" value="+">
                                                    </div>
                                                </div>
                                                <button type="submit" class="btn btn--primary btn--rounded">Agregar al carrito</button>
                                            </div>
                                        </div>
                                        <div class="product--desc-tabs tabs">
                                            <ul class="nav nav-tabs" role="tablist">
                                                <li><a href="#product--desc-tabs-1" role="tab" data-toggle="tab" class="active">Métodos de pago</a></li>
                                            </ul>
                                            <div class="tab-content">
                                                <div role="tabpanel" class="tab-pane fade show active" id="product--desc-tabs-1">
                                                    <div class="product--desc">
                                                        <img src="{{ asset('assets/images/payment_methods.png') }}" class="img-fluid" alt="Métodos de Pago">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        @endif
                    </div>
                </div>
            </div>
        </section>
        @if(isset($detail_item_includes))
            <section id="category7" class="category category-3 pt-2 pb-80">
                <div class="container">
                    @if(count($detail_item_includes) > 0)
                        <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="category-num pull-left pull-none-xs mb-20">
                                    <h1 class="font-18">
                                        @if(isset($type))
                                            @if($type === 'product')
                                                Packs que incluyen esta experiencia
                                            @else
                                                Experiencias incluidas en este pack
                                            @endif
                                        @endif
                                    </h1>
                                </div>
                            </div>

                            @if(isset($available_in_states))
                                <div class="col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <label for="billing_country_id">Fitrar por Provincia</label>
                                        <div class="select--box">
                                            <i class="fa fa-caret-down"></i>
                                            <select id="state" name="state" class="form-control">
                                                <option value="-1" selected>Todas las provincias</option>
                                                @foreach($available_in_states as $state)
                                                    <option value="{{ $state->id }}" @if(isset($state_id) && (int)$state_id === $state->id) selected @endif>{{ strtoupper($state->name) }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                @if($show_city_filter > 0)
                                    <div class="col-sm-12 col-md-12 col-lg-12">
                                        <div class="form-group">
                                            <label for="billing_country_id">Fitrar por Ciudad</label>
                                            <form method="POST" id="city_form" data-ajax="false" action="">
                                                @csrf
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
                            @if(isset($related_target_route))
                                @foreach($detail_item_includes as $datum)
                                    @if($datum->enabled && !$datum->removed)
                                        @include('catalog.partials.list_item', ['list_item_datum' => $datum, 'show_price' => isset($show_detail_item_price) ? $show_detail_item_price : false, 'target_route' => $related_target_route])
                                    @endif
                                @endforeach
                            @endif
                        </div>
                    @endif
                </div>
            </section>
        @endif
    @endif
    <input type="hidden" id="show_wp" value="{{  isset($show_wp_btn) ? $show_wp_btn : ''  }}">
    @include("partials/partial_modal_reservas")
{{--    <script>--}}
{{--        let text = document.getElementById('details').innerHTML--}}
{{--        //text = text.replace(/<[^>]+>/g, '').trim()--}}
{{--        console.log(text)--}}
{{--    </script>--}}
@endsection
