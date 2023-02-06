@auth()
<div class="module module-cart pull-left">
    <div class="module-icon cart-icon">
        <i class="icon-bag"></i>
        <span class="title">Carrito</span>
        <label class="module-label">{{ $userCartCount }}</label>
    </div>
    <div class="module-content module-box cart-box">
        <div class="cart-overview">
            <ul class="list-unstyled">
                @foreach($userCartItems as $userCart)
                    @if($userCart->pack || $userCart->product)
                        <li>
                            <img class="img-fluid" src="{{ $userCart->pack ? asset($userCart->pack->picture) : asset($userCart->product->picture) }}" alt="product" />
                            <div class="product-meta">
                                <h5 class="product-title">{{ $userCart->pack ?  $userCart->pack->name : $userCart->product->name }}</h5>
                                <p class="product-qunt font-12 mb-1">Cantidad:  <span class="font-weight-bold">{{ $userCart->quantity }}</span></p>
                                <p class="font-weight-normal font-12 mb-1">Tipo:  <span class="font-weight-bold">{{ $userCart->typeName }}</span></p>
                                <p class="product-price">$ {{ \App\Helpers\CartHelper::getCartItemPrice($userCart) }}</p>
                            </div>
                            <a class="cart-cancel" href="{{ route('frontend.cart.destroy', $userCart->id) }}"><i class="lnr lnr-cross"></i></a>
                        </li>
                    @endif
                @endforeach
            </ul>
        </div>
        @if($userCartCount > 0)
        <div class="cart-total">
            <div class="total-desc">
                Sub total
            </div>
            <div class="total-price">
                $ {{ $userCartTotal }}
            </div>
        </div>
        <div class="clearfix">
        </div>
        <div class="cart--control">
            <a class="btn btn--white btn--bordered btn--rounded" href="{{ route('frontend.cart') }}">ver carrito</a>
            <a class="btn btn--primary btn--rounded" href="{{ route('frontend.checkout') }}">continuar</a>
        </div>
        @else
            <div class="cart-total mb-15">
                <div class="total-desc">
                    Tu carrito esta vacio
                </div>
            </div>
            <div class="clearfix">
            </div>
            <div class="cart--control">
                <a class="btn btn--primary btn--rounded w-100" href="#">Explorá GoldenPack</a>
            </div>
        @endif
    </div>
</div>
@endauth
