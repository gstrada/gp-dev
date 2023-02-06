<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>order</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('pdf/order.css') }}">
</head>
<body>
<header class="clearfix">
    <div class="logo">
        <img src="{{ asset('assets/images/logo/logo-dark.png') }}">
    </div>
    <h1>ORDEN # {{ str_pad($order->id,8, '0', STR_PAD_LEFT) }}</h1>
    <br>
    <h3>Esta Orden es su detalle de compra. No la envíe al  agasajado. </h3>
    <div class="notices">
        @if(isset($containsDigital) && $containsDigital == true)
            <div class="notice">
                <strong>Para realizar el envío digital de su regalo, ingrese a su cuenta Golden Pack haciendo click <a href="{{ route('profile.epacks') }}" target="_blank"  style="text-decoration: none; text-align: justify">aquí</a> y configurelo desde "Enviar regalos digitales (e-packs)"</strong>
            </div>
        @endif
    </div>
    <table class="information">
        <tr>
            <td valign="top">

                <div class="project">
                    <div><span>CLIENTE</span> {{ $order->user->name }} {{ $order->user->lastname }}</div>
                    <div><span>TELÉFONO</span> {{ $order->billing_phone }}</div>
                    <div><span>EMAIL</span> {{ $order->user->email }}</div>
                    <div><span>DNI/CUIT/CUIL</span> {{ $order->billing_social_number }}</div>
                    <div><span>DIRECCIÓN</span> {{ $order->billing_address }} {{ $order->billing_city->name }} - {{ $order->billing_city->state->name }} {{ $order->billing_zip_code }} , {{ $order->billing_city->state->country->name }}</div>
                    <div><span>FECHA</span> {{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y') }}</div>
                    @if($order->transaction_id)
                        <div><span>TRANSACCIÓN</span> {{ $order->transaction_id }}</div>
                    @endif
                </div>
            </td>
            <td valign="top">
                <div class="company" class="clearfix">
                    <div>REGALANDO EXPERIENCIAS SA</div>
                    <div>0800 444 7225 (PACK)</div>
                    <div>30-71460850-5</div>
                    <div><a href="mailto:info@goldenpack.com.ar">info@goldenpack.com.ar</a></div>
                </div>
            </td>
        </tr>
    </table>
</header>
<main>
    <table class="product">
        <thead>
        <tr>
            <th style="text-align:left !important;">DETALLE</th>
            <th>PRECIO</th>
{{--            <th>TAX</th>--}}
            <th>QTY</th>
            <th>TOTAL</th>
        </tr>
        </thead>
        <tbody>
        @foreach($order->items as $item)
            <tr>
                <td class="desc">@if($item->pack){{ $item->pack->sku }} @endif @if($item->product){{ $item->product->sku }} @endif {{ $item->name }}</td>
                <td class="unit">$ {{ $item->item_price / $item->quantity }}</td>
{{--                <td class="qty"> {{ $item->tax }} %</td>--}}
                <td class="qty"> {{ $item->quantity }}</td>
                <td class="total">$ {{ $item->item_price }}</td>
            </tr>
        @endforeach
        @if($order->shipping_price && $order->shipping_price > 0)
            <tr>
                <td class="desc">Costo de envío</td>
                <td class="unit">$ {{ $order->shipping_price }}</td>
                <td class="qty"> 1</td>
                <td class="total">$ {{ $order->shipping_price }}</td>
            </tr>
        @endif
        <tr>
            <td colspan="3"></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="3">SUBTOTAL</td>
            <td class="total">$ {{ $order->amount_to_pay }}</td>
        </tr>
        <tr>
            <td colspan="3" class="grand total">TOTAL</td>
            <td class="grand total">$ {{ $order->amount_to_pay }}</td>
        </tr>
        </tbody>
    </table>
    @if($order->carrier)
        <div class="notices">
            <div class="notice_hightlight">METODO DE ENTREGA:</div>
            <div class="notice">{{ $order->carrier->name }}</div>
            @if($order->shipping_address)
                <div class="notice_hightlight">DIRECCION:</div>
                <div class="notice">{{ $order->shipping_address }} {{ $order->shipping_city->name }} - {{ $order->shipping_city->state->name }} {{ $order->shipping_zip_code }} , {{ $order->shipping_city->state->country->name }}</div>
                @if($order->shipping_phone)
                    <div class="notice">TELÉFONO {{ $order->shipping_phone }}</div>
                @endif
            @endif
            @if($order->carrier->description)
                @if($order->carrier->description != '')
                    <div class="notice_hightlight">NOTA</div>
                    <div class="notice">{{ $order->carrier->description }}</div>
                @endif
            @endif

        </div>
    @endif
</main>
<footer>

</footer>
</body>
</html>
