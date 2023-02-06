<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>order</title>
    {!! Html::style('pdf/order.css') !!}
</head>
<body>
<header class="clearfix">
    <div class="logo">
        <img src="{{ asset($company->logo) }}">
    </div>
    <h1>ORDEN {{ $order_id }}</h1>
    <table class="information">
        <tr>
            <td valign="top">

                <div class="project">
                    <div><span>CLIENTE</span> {{ $data->billing_firstname }} {{ $data->billing_lastname }}</div>
                    <div><span>DNI</span> {{ $data->billing_social_number }}</div>
                    <div><span>DIRECCIÓN</span> {{ $data->billing_address }} {{ $data->billing_city }} - {{ $data->billing_state }} {{ $data->billing_zipcode }} , {{ $data->billing_country }}</div>
                    <div><span>FECHA</span> {{ $data->created_at }}</div>
                    @if($data->transaction_id)
                        <div><span>TRANSACCIÓN</span> {{ $data->transaction_id }}</div>
                    @endif
                    <div><span>&nbsp;</span></div>
                    <div><span>VENDEDOR</span> {{ $user->userInfo->firstname }}, {{ $user->userInfo->lastname }}</div>
                    <div><span>ID</span> {{ str_pad($user->id, 5, "0", STR_PAD_LEFT) }}</div>
                </div>
            </td>
            <td valign="top">
                <div class="company" class="clearfix">
                    <div>{{ $company->name }}</div>
                    <div>{{ $company->address }} {{ $company->city }}<br /> {{ $company->state }} {{ $company->zipcode }}, {{ $company->country }}</div>
                    <div>{{ $company->phone }}</div>
                    <div>{{ $company->tax }}</div>
                    <div><a href="mailto:{{ $company->info_email }}">{{ $company->info_email }}</a></div>
                </div>
            </td>
        </tr>
    </table>
</header>
<main>
    <table class="product">
        <thead>
        <tr>
            <th class="desc">DETALLE</th>
            <th>PRECIO</th>
            <th>TAX</th>
            <th>QTY</th>
            <th>TOTAL</th>
        </tr>
        </thead>
        <tbody>

        <?php
            $total = 0;
            $totalWithoutTax = 0;
            $productTax = array();
            $productByTax = array();
        ?>

        @foreach($data->items as $item)
            <tr>
                <td class="desc">{{ $item->description }}</td>
                <td class="unit">$ {{ Price::formatPrice(Price::tax(($item->price),$item->tax)) }}</td>
                <td class="qty"> {{ $item->tax }} %</td>
                <td class="qty"> {{ $item->quantity }}</td>
                <td class="total">$ {{ Price::formatPrice($item->price) }}</td>
            </tr>
            <?php
                $total = $total + ($item->price);
                $totalWithoutTax = $totalWithoutTax + Price::tax(($item->price),$item->tax);

                $item_tax_id = $item->tax;
                if(!in_array($item_tax_id, $productTax)){
                    array_push($productTax, $item_tax_id);
                    $productByTax[$item_tax_id] = 0;
                }

                $tmpTotalTax = $productByTax[$item_tax_id];

                $productByTax[$item_tax_id] =  $tmpTotalTax + ($item->price) - Price::tax(($item->price),$item->tax);
            ?>
        @endforeach

        <tr>
            <td colspan="4"></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="4">SUBTOTAL</td>
            <td class="total">{{ Price::formatPrice($totalWithoutTax) }}</td>
        </tr>
        @foreach($productTax as $tax)
            <tr>
                <td colspan="4">TAX {{ $tax }}%</td>
                <td class="total">{{ Price::formatPrice($productByTax[$tax]) }}</td>
            </tr>
        @endforeach
        <tr>
            <td colspan="4" class="grand total">TOTAL</td>
            <td class="grand total">$ {{ Price::formatPrice($total) }}</td>
        </tr>
        </tbody>
    </table>
    <div class="notices">
        <div class="notice_hightlight">METODO DE ENTREGA: ENVIO A DOMICILIO</div>
        <div class="notice">LA ORDEN SERÁ ENTREGADA EN LA SIGUIENTE DIRECCIÓN</div>
        <div class="notice_hightlight">{{ $data->shipping_address }} {{ $data->shipping_city }} {{ $data->shipping_state }} {{ $data->shipping_zipcode }}, {{ $data->shipping_country }}</div>
        <div class="notice">{{ $data->shipping_detail }}</div>
    </div>
</main>
<footer>

</footer>
</body>
</html>
