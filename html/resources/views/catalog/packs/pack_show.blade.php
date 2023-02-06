@extends('layouts.app')
{{--@section('scripts')--}}

{{--    <script>--}}
{{--        $( document ).ready(function() {--}}

{{--            $('input[type=radio][name=delivery_method]').change(function() {--}}
{{--                let price = $(this).data('price');--}}
{{--                $('#product-price').html('$ ' + price);--}}
{{--            });--}}

{{--        });--}}
{{--    </script>--}}

{{--@endsection--}}

@section('content')
@php
    session(['show_whatsapp_button' => false])
@endphp

    @include('catalog.partials.detail_item', [
       'disable_purchase' => true,
       'detail_item' => $pack,
       'detail_item_includes' => $included_products,
       'type' => 'pack',
       'related_target_route' => 'frontend.products.show',
       'show_detail_item_price' => false,
       'show_wp_btn' => 'false',
   ])

{{--    <section id="product-detalis1" class="product-detalis product-detalis-1 pb-90 mtop-100">--}}
{{--        <div class="container-fluid">--}}
{{--            <div class="row">--}}
{{--                <div class="col-sm-12 col-md-12 col-lg-6">--}}
{{--                    @if($pack->picture)--}}
{{--                        <div class="carousel owl-carousel carousel-dots product-carousel" data-slide="1" data-slide-rs="1" data-autoplay="true" data-nav="false" data-dots="false" data-space="0" data-loop="true" data-speed="800">--}}
{{--                            <div class="product--img-item">--}}
{{--                                <img src="{{ asset($pack->picture) }}" alt="product" title="{{ $pack->name }}" />--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    @endif--}}
{{--                    <!-- .carousel end -->--}}
{{--                </div>--}}
{{--                <!-- .col-lg-6 end -->--}}
{{--                <div class="col-sm-12 col-md-12 col-lg-6 col-content">--}}

{{--                    <div class="row">--}}
{{--                        <div class="col-md-12">--}}
{{--                            <div class="mb-30">--}}
{{--                                <ol class="breadcrumb">--}}
{{--                                    <li><a href="{{ url('') }}">GoldenPack</a></li>--}}
{{--                                    @if($pack->category)--}}
{{--                                        <li><a href="{{ route('frontend.categories', $pack->category->friendly_url ?: $pack->category->id) }}">{{ $pack->category->name }}</a></li>--}}
{{--                                    @endif--}}
{{--                                </ol>--}}
{{--                            </div>--}}
{{--                            <div class="product--title">--}}
{{--                                <h3>{{ $pack->name }}</h3>--}}
{{--                            </div>--}}
{{--                            --}}{{--                    <div class="product--rating">--}}
{{--                            --}}{{--                        <i class="fa fa-star active"></i>--}}
{{--                            --}}{{--                        <i class="fa fa-star active"></i>--}}
{{--                            --}}{{--                        <i class="fa fa-star active"></i>--}}
{{--                            --}}{{--                        <i class="fa fa-star"></i>--}}
{{--                            --}}{{--                        <i class="fa fa-star"></i>--}}
{{--                            --}}{{--                    </div>--}}
{{--                            --}}{{--                    <div class="product--review">03 Customer Review</div>--}}
{{--                            <div class="product--price" id="product-price">$ {{ \App\Helpers\PriceHelper::getDigitalPrice($pack) }}</div>--}}
{{--                            <!-- .product-price end -->--}}
{{--                            <div class="product--desc-tabs tabs">--}}
{{--                                <!-- Nav tabs -->--}}
{{--                                <ul class="nav nav-tabs" role="tablist">--}}
{{--                                    <li><a href="#product--desc-tabs-1" role="tab" data-toggle="tab" class="active">DESCRIPCIÓN</a></li>--}}
{{--                                    --}}{{--                            <li><a href="#product--desc-tabs-2" role="tab" data-toggle="tab">SHIPPING</a></li>--}}
{{--                                    --}}{{--                            <li><a href="#product--desc-tabs-3" role="tab" data-toggle="tab">RETURN</a></li>--}}
{{--                                </ul>--}}
{{--                                <div class="tab-content">--}}
{{--                                    <div role="tabpanel" class="tab-pane fade show active" id="product--desc-tabs-1">--}}
{{--                                        <div class="product--desc">--}}
{{--                                            {!! $pack->description !!}--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                    <div role="tabpanel" class="tab-pane fade" id="product--desc-tabs-2">--}}
{{--                                        <div class="product--desc">--}}
{{--                                            <p>Sed id interdum urna. Nam ac elit a ante commodo tristique. tum vehicula a hendrerit ac nisi. hendrerit ac nisi Lorem ipsum dolor sit perdiet nibh vel magna lacinia ultrices. Sed id interdum urna.</p>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                    <div role="tabpanel" class="tab-pane fade" id="product--desc-tabs-3">--}}
{{--                                        <div class="product--desc">--}}
{{--                                            <p>Our brand promise is simple: to provide powerful digital marketing solutions to small businesses that are looking to build success online</p>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                </div>--}}
{{--                            </div>--}}

{{--                            <div class="product--composer">--}}
{{--                                <span class="full_title">¿Cómo lo querés enviar?</span>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}

{{--                    <div class="row mt-20 mb-25">--}}
{{--                        @if($pack->digital_price && \App\Helpers\PriceHelper::getDigitalPrice($pack) > 0)--}}
{{--                            <div class="col-md-12 mb-15">--}}
{{--                                <div class="input-checkbox inline-block">--}}
{{--                                    <label class="label-checkbox">--}}
{{--                                        <span class="font-weight-bold">Pack digital por Email</span>--}}
{{--                                        <input type="radio" value="digital_price" name="delivery_method" @if(old('delivery_method', 'digital_price') === 'digital_price') checked @endif data-price="{{ \App\Helpers\PriceHelper::getDigitalPrice($pack) }}">--}}
{{--                                        <span class="check-indicator"></span>--}}
{{--                                        <p class="p-0 m-0 font-12">Este producto es digital y se envia por correo electrónico.</p>--}}
{{--                                    </label>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        @endif--}}
{{--                        @if($pack->physical_price && \App\Helpers\PriceHelper::getFisicalPrice($pack) > 0)--}}
{{--                            <div class="col-md-12 mb-15">--}}
{{--                                <div class="input-checkbox inline-block">--}}
{{--                                    <label class="label-checkbox">--}}
{{--                                        <span class="font-weight-bold">Pack Físico  <span class="ml-3 font-12 font-weight-normal">{{ \App\Helpers\PriceHelper::getFisicalPriceDiferenceWithDigital($pack) }}</span></span>--}}
{{--                                        <input type="radio" value="physical_price" name="delivery_method" @if(old('delivery_method', 'digital_price') === 'physical_price') checked @endif data-price="{{  \App\Helpers\PriceHelper::getFisicalPrice($pack) }}">--}}
{{--                                        <span class="check-indicator"></span>--}}
{{--                                        <p class="p-0 m-0 font-12">Este producto llega con una presentación física y se envia por correo postal.</p>--}}

{{--                                    </label>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        @endif--}}
{{--                        @if($pack->card_price && \App\Helpers\PriceHelper::getCardPrice($pack) > 0)--}}
{{--                            <div class="col-md-12 mb-15">--}}
{{--                                <div class="input-checkbox inline-block">--}}
{{--                                    <label class="label-checkbox ">--}}
{{--                                        <span class="font-weight-bold">Pack Físico con Tarjeta <span class="ml-3 font-12 font-weight-normal">{{ \App\Helpers\PriceHelper::getCardPriceDiferenceWithDigital($pack) }}</span></span>--}}
{{--                                        <input type="radio" value="card_price" name="delivery_method" @if(old('delivery_method', 'digital_price') === 'card_price') checked @endif data-price="{{ \App\Helpers\PriceHelper::getCardPrice($pack) }}">--}}
{{--                                        <span class="check-indicator"></span>--}}
{{--                                        <p class="p-0 m-0 font-12">Este producto llega con una tarjeta física, la cual se presentará al comercio elegido y se envia por correo postal.</p>--}}
{{--                                    </label>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        @endif--}}
{{--                    </div>--}}

{{--                  <div class="row">--}}
{{--                      <div class="col-md-12">--}}
{{--                          <div class="product--meta">--}}

{{--                              <!-- .product-meta-select end -->--}}
{{--                              <ul class="product--meta-info list-unstyled">--}}
{{--                                  <li>Disponibilidad:<span>En stock</span></li>--}}
{{--                                  <li>SKU:<span>{{ $pack->sku }}</span></li>--}}
{{--                              </ul>--}}
{{--                              <div class="product--meta-action">--}}
{{--                                  <div class="select-order">--}}
{{--                                      <div class="product-quantity">--}}
{{--                                          <input class="minus" type="button" value="-">--}}
{{--                                          <input type="text" id="quantity" name="quantity" min="1" max="9999" step="1"  value="1" class="qty" readonly="">--}}
{{--                                          <input class="plus" type="button" value="+">--}}
{{--                                      </div>--}}
{{--                                  </div>--}}
{{--                                  <a href="page-cart.html" class="btn btn--primary btn--rounded">Agregar al carrito</a>--}}
{{--                                  <a href="#" class="fav"><i class="ti-heart"></i></a>--}}
{{--                                  <a href="#" class="compare" data-toggle="modal" data-target="#compare-popup"><i class="ti-control-shuffle"></i></a>--}}
{{--                              </div>--}}
{{--                          </div>--}}

{{--                          <div class="product--desc-tabs tabs">--}}
{{--                              <!-- Nav tabs -->--}}
{{--                              <ul class="nav nav-tabs" role="tablist">--}}
{{--                                  <li><a href="#product--desc-tabs-1" role="tab" data-toggle="tab" class="active">Métodos de pago</a></li>--}}
{{--                              </ul>--}}
{{--                              <div class="tab-content">--}}
{{--                                  <div role="tabpanel" class="tab-pane fade show active" id="product--desc-tabs-1">--}}
{{--                                      <div class="product--desc">--}}
{{--                                          <img src="{{ asset('assets/images/payment_methods.png') }}" class="img-fluid" alt="Métodos de Pago">--}}
{{--                                      </div>--}}
{{--                                  </div>--}}
{{--                              </div>--}}
{{--                          </div>--}}


{{--                          --}}{{--                    <div class="product--share">--}}
{{--                          --}}{{--                        <span class="share--title">share</span>--}}
{{--                          --}}{{--                        <a class="share-facebook" href="#"><i class="fa fa-facebook"></i></a>--}}
{{--                          --}}{{--                        <a class="share-twitter" href="#"><i class="fa fa-twitter"></i></a>--}}
{{--                          --}}{{--                        <a class="share-google-plus" href="#"><i class="fa fa-pinterest-p"></i></a>--}}
{{--                          --}}{{--                        <a class="share-linkedin" href="#"><i class="fa fa-linkedin"></i></a>--}}
{{--                          --}}{{--                    </div>--}}
{{--                      </div>--}}
{{--                  </div>--}}

{{--                </div>--}}
{{--                <!-- .col-lg-6 end -->--}}
{{--            </div>--}}
{{--            <!-- .row end -->--}}
{{--        </div>--}}
{{--        <!-- .container end -->--}}
{{--    </section>--}}

{{--    <section id="category7" class="category category-3 pt-2 pb-80">--}}
{{--        <div class="container">--}}
{{--            @if(count($included_products) > 0)--}}
{{--                <div class="row">--}}
{{--                    <div class="col-sm-12 col-md-12 col-lg-12">--}}
{{--                        <div class="category-num pull-left pull-none-xs mb-20">--}}
{{--                            <h1 class="font-18">Experiencias incluidas en este pack</h1>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--                <div class="row mb-30">--}}
{{--                    @foreach($included_products as $datum_product)--}}
{{--                        @include('catalog.partials.list_item', ['list_item_datum' => $datum_product, 'show_price' => false, 'target_route' => 'frontend.products'])--}}
{{--                    @endforeach--}}
{{--                </div>--}}
{{--            @endif--}}
{{--        </div>--}}
{{--    </section>--}}
@endsection
