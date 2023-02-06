@extends('layouts.app')

@section('scripts')

    <script>

        $(document).ready(function(){
            $('input[type=text][name=quantity]').change(function() {
                let target = $(this).data('target');
                $('#'+target).submit();
            });

            let billing_country_id = $('select[name="billing_country_id"]');
            let billing_state_id = $('select[name="billing_state_id"]');
            let billing_city_id =  $('select[name="billing_city_id"]');
            let shipping_country_id = $('select[name="shipping_country_id"]');
            let shipping_state_id = $('select[name="shipping_state_id"]');
            let shipping_city_id =  $('select[name="shipping_city_id"]');
            let use_billing_for_shipping =  $('#use_billing_for_shipping');
            let shipping_diferent_than_billing = false;
            let totalPrice = parseFloat('{{ $userCartTotal }}');


            loadChainedAddresser(billing_country_id, billing_state_id, '{{ route('frontend.location.get_states') }}',  'Selecioná una Provincia' ,{{old('billing_state_id', $latest_data->billing_state_id)}});
            loadChainedAddresser(billing_state_id, billing_city_id, '{{ route('frontend.location.get_cities') }}', 'Selecioná una Ciudad' ,{{old('billing_city_id', $latest_data->billing_city_id)}});
            loadChainedAddresser(shipping_country_id, shipping_state_id, '{{ route('frontend.location.get_states') }}', 'Selecioná una Provincia', {{old('shipping_state_id', $latest_data->shipping_state_id)}});
            loadChainedAddresser(shipping_state_id, shipping_city_id, '{{ route('frontend.location.get_cities') }}', 'Selecioná una Ciudad' ,{{old('shipping_city_id', $latest_data->shipping_city_id)}});


            billing_country_id.change();
            shipping_country_id.change();

            use_billing_for_shipping.change(function(event) {
                var checkbox = event.target;
                if (checkbox.checked) {
                    shipping_diferent_than_billing = false;
                    $('#shipping_form').hide();
                } else {
                    shipping_diferent_than_billing = true;
                    $('#shipping_form').show();
                }
            });


            function loadChainedAddresser(obj, target, route, default_title, default_value){
                obj.on('change', function() {
                    let id = this.value;
                    if(id && id !== 'null' && id !== '-1'){
                        $.ajax({
                            type    : "GET",
                            url       : route + '/' + id,
                            success : function(data) {
                                target.html('');
                                $('#shipping_block').hide();
                                $('#payment_block').hide();
                                $('#total_price').html('$' + totalPrice);
                                target.append($('<option></option>').attr('value', '-1').attr('disabled', 'disabled').attr('selected', 'selected').text(default_title));
                                $.each(data.result, function (key, entry) {
                                    if(default_value === entry.id){
                                        target.append($('<option></option>').attr('value', entry.id).attr('selected','selected').text(entry.name));
                                    }else{
                                        target.append($('<option></option>').attr('value', entry.id).text(entry.name));
                                    }
                                });
                                target.change();
                            }
                        });
                    }
                });
            }

            billing_city_id.on('change', function() {
                let id = billing_city_id.val();
                let rel_id = billing_state_id.val();
                if(id && id !== 'null' && id !== '-1' && rel_id) {
                    @if(!$all_items_are_digital)
                    if(!shipping_diferent_than_billing){
                        $.ajax({
                            type: "GET",
                            url: '{{ route('frontend.shipping.get_carriers_for_checkout') }}' + '/' + rel_id + '/' + id,
                            success: function (data) {
                                $('#shipping_block').show();
                                $('#shipping_methods').html('');
                                let default_value = '{{ old('shipping_method') }}';
                                $.each(data.result, function (key, entry) {
                                    if(default_value === entry.id){
                                        let block = '<div class="input-radio mt-2 mb-2">\n' +
                                            '                                            <label class="label-radio">' + entry.name + ' <span class="ml-3 font-weight-bold">' + (entry.price > 0 ? '$ ' +  entry.price : 'GRATIS') + '</span>\n' +
                                            '                                                <input type="radio" name="shipping_method" class="shipping_method" checked value="' + entry.id + '" data-price="' + entry.price + '">\n' +
                                            '                                                <span class="radio-indicator"></span>\n' +
                                            '                                            </label>\n' +
                                            '                                            <div class="ml-4 pl-3"><small >' + (entry.description ? entry.description : '') + '<small></div>\n' +

                                            '                                        </div>';
                                        $('#shipping_methods').append(block);
                                    }else{
                                        let block = '<div class="input-radio mt-2 mb-2">\n' +
                                            '                                            <label class="label-radio">' + entry.name + ' <span class="ml-3 font-weight-bold">' + (entry.price > 0 ? '$ ' +  entry.price : 'GRATIS') + '</span>\n' +
                                            '                                                <input type="radio" name="shipping_method" class="shipping_method" value="' + entry.id + '" data-price="' + entry.price + '">\n' +
                                            '                                                <span class="radio-indicator"></span>\n' +
                                            '                                            </label>\n' +
                                            '                                            <div class="ml-4 pl-3"><small >' + (entry.description ? entry.description : '') + '<small></div>\n' +
                                            '                                        </div>';
                                        $('#shipping_methods').append(block);
                                    }
                                });
                            },
                        });
                    }
                    @endif
                    $.ajax({
                        type: "GET",
                        url: '{{ route('frontend.payment.get_payment_methods_for_checkout') }}' + '/' + rel_id + '/' + id,
                        success: function (data) {
                            @if($all_items_are_digital)
                                $('#payment_block').show();
                            @endif
                            // $('#payment_block').show();
                            $('#payment_methods').html('');
                            let default_value = '{{ old('shipping_method') }}';
                            $.each(data.result, function (key, entry) {
                                if(default_value === entry.id){
                                    let block = '<div class="input-radio mt-2 mb-2">\n' +
                                        '                                            <label class="label-radio">' + entry.name + '\n' +
                                        '                                                <input type="radio" name="payment_method" class="payment_method" value="' + entry.id + '" checked>\n' +
                                        '                                                <span class="radio-indicator"></span>\n' +
                                        '                                            </label>\n' +
                                        '                                        </div>';
                                    $('#payment_methods').append(block);
                                }else{
                                    let block = '<div class="input-radio mt-2 mb-2">\n' +
                                        '                                            <label class="label-radio">' + entry.name + '\n' +
                                        '                                                <input type="radio" name="payment_method" class="payment_method" value="' + entry.id + '">\n' +
                                        '                                                <span class="radio-indicator"></span>\n' +
                                        '                                            </label>\n' +
                                        '                                        </div>';
                                    $('#payment_methods').append(block);
                                }
                            });
                        },
                    });
                }
            });
            billing_city_id.change();

            shipping_city_id.on('change', function() {

                let id = shipping_city_id.val();
                let rel_id = shipping_state_id.val();
                if(id && id !== 'null' && id !== '-1' && rel_id){
                    @if(!$all_items_are_digital)
                    if(shipping_diferent_than_billing) {
                        $.ajax({
                            type: "GET",
                            url: '{{ route('frontend.shipping.get_carriers_for_checkout') }}' + '/' + rel_id + '/' + id,
                            success: function (data) {
                                $('#shipping_block').show();
                                $('#shipping_methods').html('');
                                let default_value = '{{ old('shipping_method') }}';
                                $.each(data.result, function (key, entry) {
                                    console.log(entry);
                                    if(default_value === entry.id){
                                        let block = '<div class="input-radio mt-2 mb-2">\n' +
                                            '                                            <label class="label-radio">' + entry.name + ' <span class="ml-3 font-weight-bold">' + (entry.price > 0 ? '$ ' +  entry.price : 'GRATIS') + '</span>\n' +
                                            '                                                <input type="radio" name="shipping_method" class="shipping_method" checked value="' + entry.id + '"  data-price="' + entry.price + '">\n' +
                                            '                                                <span class="radio-indicator"></span>\n' +
                                            '                                            </label>\n' +
                                            '                                            <div class="ml-4 pl-3"><small >' + (entry.description ? entry.description : '') + '<small></div>\n' +
                                            '                                        </div>';

                                        $('#shipping_methods').append(block);
                                    }else{
                                        let block = '<div class="input-radio mt-2 mb-2">\n' +
                                            '                                            <label class="label-radio">' + entry.name + ' <span class="ml-3 font-weight-bold">' + (entry.price > 0 ? '$ ' +  entry.price : 'GRATIS') + '</span>\n' +
                                            '                                                <input type="radio" name="shipping_method" class="shipping_method" value="' + entry.id + '"  data-price="' + entry.price + '">\n' +
                                            '                                                <span class="radio-indicator"></span>\n' +
                                            '                                            </label>\n' +
                                            '                                            <div class="ml-4 pl-3"><small >' + (entry.description ? entry.description : '') + '<small></div>\n' +
                                            '                                        </div>';

                                        $('#shipping_methods').append(block);
                                    }
                                });
                            },
                        });
                    }
                    @endif
                    $.ajax({
                        type: "GET",
                        url: '{{ route('frontend.payment.get_payment_methods_for_checkout') }}' + '/' + rel_id + '/' + id,
                        success: function (data) {
                            $('#payment_methods').html('');
                            let default_value = '{{ old('payment_method') }}';
                            $.each(data.result, function (key, entry) {
                                if(default_value === entry.id) {
                                    let block = '<div class="input-radio mt-2 mb-2">\n' +
                                        '                                            <label class="label-radio">' + entry.name  + '\n' +
                                        '                                                <input type="radio" name="payment_method" class="payment_method" value="' + entry.id + '" checked>\n' +
                                        '                                                <span class="radio-indicator"></span>\n' +
                                        '                                            </label>\n' +
                                        '                                        </div>';
                                    $('#payment_methods').append(block);
                                }else{
                                    let block = '<div class="input-radio mt-2 mb-2">\n' +
                                        '                                            <label class="label-radio">' + entry.name  + '\n' +
                                        '                                                <input type="radio" name="payment_method" class="payment_method" value="' + entry.id + '">\n' +
                                        '                                                <span class="radio-indicator"></span>\n' +
                                        '                                            </label>\n' +
                                        '                                        </div>';
                                    $('#payment_methods').append(block);
                                }
                            });
                        },
                    });
                }

            });

            shipping_city_id.change();

            $('body').on('click', '.shipping_method', function(event) {
                let price = parseFloat($(this).data('price'));
                if(price > 0){
                    $('#shipping_price').html('$' + price);
                }else{
                    $('#shipping_price').html('GRATIS')
                }
                $('#total_price').html('$' + (totalPrice + price));
                $('#payment_block').show();
            });

            $('body').on('click', '.payment_method', function(event) {
                $('#pay_button').show();
            });
            @if(old('billing_city_id',  $latest_data->billing_city_id) or old('shipping_city_id',  $latest_data->shipping_city_id))
                $('#shipping_block').show();
                $('#payment_block').show();
                $('#pay_button').show();
            @endif


        });
    </script>

@endsection

@section('content')
    <section id="checkout" class="shop shop-cart checkout pt-30">
        <div class="container">
            <form method="POST" action="{{ route('frontend.checkout.store') }}">
                @csrf
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                        <div class="cart-shiping">
                            <div class="cart--shiping-text">
                                <p>Completá los datos de facturación @if(!$all_items_are_digital) y envío @endif para conocer las formas de pago</p>
                                <p><small><strong>¿No lográs ver las formas de envío? Actualizá los datos de tu ciudad.</strong></small></p>
                                <h3>Datos de Facturación</h3>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label for="name">Nombre</label>
                                        <input type="text" class="form-control" id="name" name="name" value="{{ old('name', $latest_data->name) }}" required>
                                    </div>
                                </div>
                                <!-- .col-lg-6 end -->
                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label for="lastname">Apellido</label>
                                        <input type="text" class="form-control" id="lastname" name="lastname" value="{{ old('lastname', $latest_data->lastname) }}" required>
                                    </div>
                                </div>
                                <!-- .col-lg-6 end -->
                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label for="billing_social_number">DNI / CUIT</label>
                                        <input type="text" class="form-control" id="billing_social_number" name="billing_social_number" value="{{ old('billing_social_number', $latest_data->billing_social_number) }}" required>
                                    </div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label for="billing_social_name">Razón Social (Opcional)</label>
                                        <input type="text" class="form-control" id="billing_social_name" name="billing_social_name" value="{{ old('billing_social_name', $latest_data->billing_social_name) }}">
                                    </div>
                                </div>
                                <!-- .col-lg-6 end -->

                                <div class="col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <label for="billing_country_id">País</label>
                                        <div class="select--box">
                                            <i class="fa fa-caret-down"></i>
                                            <select id="billing_country_id" name="billing_country_id" class="form-control">
                                                @foreach($countries as $country)
                                                    <option value="{{ $country->id }}" @if(old('billing_country_id', $latest_data->billing_country_id) === $country->id) selected @endif>{{ $country->name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-12 col-lg-12">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="billing_state_id">Provincia</label>
                                                <div class="select--box">
                                                    <i class="fa fa-caret-down"></i>
                                                    <select id="billing_state_id" name="billing_state_id" class="form-control"></select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="billing_city_id">Ciudad</label>
                                                <div class="select--box">
                                                    <i class="fa fa-caret-down"></i>
                                                    <select id="billing_city_id" name="billing_city_id" class="form-control"></select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="billing_address">Dirección</label>
                                        <input type="text" class="form-control" id="billing_address" name="billing_address" value="{{ old('billing_address', $latest_data->billing_address) }}">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="billing_zip_code">Código Postal</label>
                                                <input type="text" class="form-control" id="billing_zip_code" name="billing_zip_code" value="{{ old('billing_zip_code', $latest_data->billing_zip_code) }}">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="billing_phone">Teléfono</label>
                                                <input type="text" class="form-control" id="billing_phone" name="billing_phone" value="{{ old('billing_phone', $latest_data->billing_phone) }}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- .col-lg-12 end -->
                            </div><!-- .row end -->

                            @if(!$all_items_are_digital)

                                <div class="cart--shiping-text">
                                    <h3>Datos de Envío <small class="font-10">Solo para productos físicos</small></h3>
                                </div>
                                <div class="row">
                                    <!-- .col-lg-12 end -->
                                    <div class="col-sm-12 col-md-12 col-lg-12">
                                        <div class="input-checkbox">
                                            <label class="label-checkbox" style="text-transform:none ">Usar los datos de facturación como destino del envío
                                                <input type="checkbox" id="use_billing_for_shipping" value="1" name="use_billing_for_shipping"  @if(old('use_billing_for_shipping', 1) === 1) checked @endif>
                                                <span class="check-indicator"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-12 col-lg-12" id="shipping_form" style="display: none;">
                                        <div class="row">
                                            <div class="col-sm-12 col-md-12 col-lg-12">
                                                <div class="form-group">
                                                    <label for="country">País</label>
                                                    <div class="select--box">
                                                        <i class="fa fa-caret-down"></i>
                                                        <select id="shipping_country_id" name="shipping_country_id" class="form-control">
                                                            @foreach($countries as $country)
                                                                <option value="{{ $country->id }}" @if(old('shipping_country_id', $latest_data->shipping_country_id) === $country->id) selected @endif>{{ $country->name }}</option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 col-md-12 col-lg-12">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="shipping_state_id">Provincia</label>
                                                            <div class="select--box">
                                                                <i class="fa fa-caret-down"></i>
                                                                <select id="shipping_state_id" name="shipping_state_id" class="form-control"></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="shipping_city_id">Ciudad</label>
                                                            <div class="select--box">
                                                                <i class="fa fa-caret-down"></i>
                                                                <select id="shipping_city_id" name="shipping_city_id" class="form-control"></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label for="shipping_address">Dirección</label>
                                                    <input type="text" class="form-control" id="shipping_address" name="shipping_address" value="{{ old('shipping_address', $latest_data->shipping_address) }}">
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="shipping_zip_code">Código Postal</label>
                                                            <input type="text" class="form-control" id="shipping_zip_code" name="shipping_zip_code" value="{{ old('shipping_zip_code', $latest_data->shipping_zip_code) }}">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="shipping_phone">Teléfono</label>
                                                            <input type="text" class="form-control" id="shipping_phone" name="shipping_phone" value="{{ old('shipping_phone', $latest_data->shipping_phone) }}">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="shipping_note">Nota para el repartidor</label>
                                            <textarea class="form-control pt-3 pb-3 pl-5 pr-5" id="shipping_note"  name="shipping_note" rows="2">{{ old('shipping_note', $latest_data->shipping_note) }}</textarea>
                                        </div>
                                    </div>
                                </div>
                            @endif
                        </div>
                        <!-- .cart-shiping end -->
                    </div>
                    <!-- .col-lg-6 end -->
                    <div class="col-sm-12 col-md-6 col-lg-5 offset-lg-1">
                        <div class="cart-total-amount">
                            <h4>Tu Pedido</h4>
                            <div class="cart--products">
                                <h6>Productos</h6>
                                <div class="clearfix"></div>
                                <ul class="list-unstyled">
                                    @foreach($userCartItems as $userCart)
                                        @if($userCart->pack || $userCart->product)
                                            <li>{{ $userCart->pack ?  $userCart->pack->name : $userCart->product->name }} {{ $userCart->typeName }} ({{ $userCart->quantity }})<span class="price">$ {{ \App\Helpers\CartHelper::getCartItemPrice($userCart) }}</span></li>
                                        @endif
                                    @endforeach
                                </ul>
                            </div>
                            @if($appliedDiscount)
                                <div class="cart--subtotal">
                                    <h6>Descuento</h6>
                                    <span class="price">{{ $appliedDiscount->rate }} %</span>
                                </div>
                            @endif
                            <div class="cart--subtotal">
                                <h6>Subtotal</h6>
                                <span class="price">$ {{ $userCartTotal }} @if($userCartTotalOriginal != $userCartTotal)<del><small> $ {{ $userCartTotalOriginal }} </small></del>@endif </span>
                            </div>
                            @if(!$all_items_are_digital)
                                <div class="cart--shipping" id="shipping_block"  style="display: none">
                                    <div class="clearfix">
                                        <h6>Forma de envío</h6>
                                        <span class="price" id="shipping_price"></span>
                                    </div>
                                    <fieldset class="mb-10 mt-10" id="shipping_methods"></fieldset>
                                </div>
                            @else
                                <div class="cart--shipping">
                                    <div class="clearfix">
                                        <h6>Forma de envío</h6>
                                        <span class="price">$ 0</span>
                                    </div>
                                    <fieldset class="mb-10 mt-10">
                                        <div class="input-radio mt-2 mb-2">
                                            <label class="label-radio">E-Pack Digital por email o WhatsApp
                                                <input type="radio" value="" checked>
                                                <span class="radio-indicator"></span>
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>
                            @endif



                            <div class="cart--total" >
                                <div class="clearfix">
                                    <h6>Total</h6>
                                    <span class="price" id="total_price">$ {{ $userCartTotal }}</span>
                                </div>
                            </div>



                            <div class="cart--total" >
                                <div class="clearfix">
                                    <button type="button" class="btn btn-outline-secondary btn--rounded btn--block" data-toggle="modal" data-target="#discount-popup">
                                        Tengo un código de descuento
                                    </button>
                                </div>
                            </div>



                            <div class="cart--payment" id="payment_block"  style="display: none">
                                <div class="clearfix">
                                    <h6>Métodos de pago</h6>
                                </div>
                                <fieldset class="mb-10 mt-10" id="payment_methods"></fieldset>
                                <button type="submit" class="btn btn--primary btn--rounded btn--block" style="display: none" id="pay_button" onclick="setSpinnerOn()">Pagar ahora</button>
                            </div>

                            @if(!$all_items_are_physical)
                                <p>Al finalizar el proceso de compra podrá configurar los envíos de productos digitales</p>
                            @endif
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>

    <div class="modal model-bg-light fade product-popup modal-fullscreen" id="discount-popup" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <form method="POST" action="{{ route('frontend.checkout.discount') }}">
                    @csrf

                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="product-detalis product-detalis-3 product-detalis-10 pt-0 pb-0">
                        <div class="row">
                            <!-- .col-lg-7 end -->
                            <div class="col-sm-12 col-md-12">
                                <div class="product--title">
                                    <h3>Ingresá tu código de descuento</h3>
                                </div>
                                <div class="product--review">Este descuento aplicará al total de tu pedido</div>

                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="code">Código de Descuento</label>
                                    <input type="text" class="form-control" id="code" name="code" value="" placeholder="Ingresá tu código">
                                </div>
                            </div>
                            <div class="col-md-6 offset-md-3">
                                <div class="form-group">
                                    <button type="submit" class="btn btn--primary btn--rounded btn--block" id="pay_button">Aplicar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                </form>
            </div>
        </div>
    </div>
    <script>
        function setSpinnerOn() {
            $("#pay_button").html('<i style=" font-size:16px" class="fa fa-refresh fa-spin"></i>&nbsp;Procesando')
        }
    </script>
@endsection
