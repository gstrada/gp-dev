@extends('layouts.app')

@section('scripts')

    <script>
        $(document).ready(function(){
            $('input[type=text][name=quantity]').change(function() {
                let target = $(this).data('target');
                $('#'+target).submit();
            });
        });
    </script>



@endsection

@section('content')
    <section id="shopcart" class="shop shop-cart pt-0 pb-60">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="cart-table table-responsive">
                        <table class="table">
                            <thead>
                            <tr class="cart-product">
                                <th class="cart-product-item">Nombre</th>
                                <th class="cart-product-price">Precio</th>
                                <th class="cart-product-quantity">Cantidad</th>
                                <th class="cart-product-total">Total</th>
                            </tr>
                            </thead>
                            <tbody>

                            @foreach($userCartItems as $userCart)
                                @if($userCart->pack || $userCart->product)
                                    <tr class="cart-product">
                                        <td class="cart-product-item">
                                            <div class="cart-product-img w-75 d-none d-md-block">
                                                <img src="{{ $userCart->pack ? asset($userCart->pack->picture) : asset($userCart->product->picture) }}" class="w-25" alt="product" />
                                            </div>
                                            <div class="cart-product-content">
                                                <div class="cart-product-name">
                                                    <h6>{{ $userCart->pack ? $userCart->pack->name : $userCart->product->name }}<br>
                                                    <span class="font-12">{{ $userCart->typeName }}</span></h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="cart-product-price">$ {{ \App\Helpers\CartHelper::getCartItemPrice($userCart, true) }}</td>
                                        <td class="cart-product-quantity">
                                            <div class="product-quantity">
                                                <form method="POST" action="{{ route('frontend.cart.update',$userCart->id) }}" id="qty_form_{{$userCart->id}}">
                                                    @method('PATCH')
                                                    @csrf
                                                    <input class="minus" type="button" value="-">
                                                    <input type="text" name="quantity"  value="{{ $userCart->quantity }}" data-target="qty_form_{{$userCart->id}}" class="qty" readonly="">
                                                    <input class="plus" type="button" value="+">
                                                </form>
                                            </div>
                                        </td>
                                        <td class="cart-product-total">
                                            <span>$ {{ \App\Helpers\CartHelper::getCartItemPrice($userCart) }}</span>
                                            <a href="{{ route('frontend.cart.destroy', $userCart->id) }}">
                                                <div class="cart-product-remove d-none d-md-block">x</div>
                                                <p  class="font-10 d-sm-block d-md-none text-black ">eliminar</p>
                                            </a>
                                        </td>
                                    </tr>
                                @endif
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                    <!-- .cart-table end -->
                    <div class="cart-product-action">
                        <div class="cart-copoun">
                            <div class="row clearfix">
                                <div class="col-sm-12 col-md-12 col-lg-6">
{{--                                    <h3>Tenés un código de descuento?</h3>--}}
{{--                                    <p>Ingresá el código para aplicar tu descuento!</p>--}}
{{--                                    <form class="form-inline">--}}
{{--                                        <input type="text" class="form-control" id="coupon" placeholder="Ingresá tu código">--}}
{{--                                        <button type="submit" class="btn btn--secondary  btn--rounded">Aplicar</button>--}}
{{--                                    </form>--}}
                                </div>
                                <!-- .col-lg-6 end -->
                                <div class="col-sm-12 col-md-12 col-lg-5 offset-lg-1">
                                    <div class="checkout--panel">
                                        <h4>Total del pedido</h4>
                                        <hr>
                                        <div class="total">
                                            <h6>TOTAL</h6>
                                            <span>$ {{ $userCartTotal }}</span>
                                        </div>
                                        <p>A continuación te solicitaremos los datos de facturación y envío</p>
                                        <a class="btn btn--primary btn--rounded btn--block" href="{{ route('frontend.checkout') }}">PROCEDER CON LA COMPRA</a>
                                    </div><!-- .checkout-panel end -->
                                </div>
                                <!-- .col-lg-6 end -->
                            </div>
                        </div>
                    </div>

                </div>
                <!-- .col-lg-12 end -->
            </div>
            <!-- .row end -->
        </div>
        <!-- .container end -->
    </section>
@endsection
