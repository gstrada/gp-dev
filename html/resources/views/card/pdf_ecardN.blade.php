<style type="text/css">
    @page {
        margin-top: 0cm;
        margin-bottom: 0cm;
        margin-left: 0cm;
        margin-right: 0cm;

    }
    body {
        font-family: Verdana, sans-serif;
        font-size:14px;
        color: #A6ACAF;
        Margin: 0;
        padding: 0;
        min-width: 100%;
        font-family: Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        background-color:#FFFFFF;
        text-align: center;
    }
    .link {
        text-decoration: none;
        width: 300px !important;
        line-height: 36px;
        min-width: 300px;
        height: 45px !important;
        border-radius: 25px !important;
        border: 0;
        background-color: #696969;
        color: #FFFFFF;
        font-size: 18px;
        font-weight: bold;
        padding: 15px 25px 15px 25px !important;
    }
    .div-container {
        margin: auto;
        width:100%;
        background-color:#FFFFFF;
        text-align: center;
    }
    .inner {
        padding: 10px;
    }
    p {
        Margin: 0;
        padding-bottom: 10px;
    }
    .h1 {
        font-size: 21px;
        font-weight: bold;
        Margin-top: 15px;
        Margin-bottom: 5px;
        font-family: Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
    }
    .h2 {
        font-size: 18px;
        font-weight: bold;
        Margin-top: 10px;
        Margin-bottom: 5px;
        font-family: Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
    }
    .div-header {
        width:100%;
        height:220px;
        background:url({{ asset('assets/images/background/' . $templateCard .'_header.png') }});
        background-size: cover;
        background-repeat: no-repeat;
        font-size:13px;
        color: #A6ACAF;
        margin: auto;
        padding-top: 20px;
        padding-right: 30px !important;
    }
    .div-footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background:url({{ asset('assets/images/background/' . $templateCard .'_footer.png') }});
        background-size: cover;
        background-repeat: no-repeat;
        font-size:13px;
        color: #A6ACAF;
        margin: auto;
        padding-top: 10px;
        padding-right: 10px;
        padding-left: 10px;
        padding-bottom: 10px;
    }
    .logo-empresa {
        width:80%;
        min-height:80px;
        background-color:white;
        margin: auto;
        padding-top: 15px
    }
    .div-dest {
        width:90%;
        min-height:50px;
        background-color:white;
        margin: auto;
    }
    .img-logo-empresa {
        margin: auto;
        display: block;
        width: 30%;
        height: auto
    }
    .div-description {
        color: grey;
        width:50%;
        height: 300px;
        min-height:80px;
        background-color:white;
        margin-left: auto;
        font-family: Verdana, sans-serif;
        font-size: 1.1em;
        float: left;
        border-top:1px solid #B7950B !important;
        border-bottom:1px solid #B7950B !important;
        /*display: grid;*/
        /*grid-template-columns: 67% 33%;*/
    }
</style>
<body>
<div class="div-container" style="">
    {{--   --}}
    <div class="div-header" align="right">
        <a style="position: absolute; right: 50px; top: 40px" href="https://www.facebook.com/goldenpackargentina/" target="_blank">
            <img src="{{ asset("assets/images/icons/logo_fb_blanco.png") }}" width="36" style="border-width:0;Margin: 0 auto;"/>
        </a>
        <a style="position: absolute; right: 15px; top: 14px" href="https://www.instagram.com/golden.pack/" target="_blank">
            <img src="{{ asset("assets/images/icons/logo_insta_blanco.png") }}" width="36" style="padding-top: 30px; border-width:0;Margin: 0 auto;"/>
        </a>
    </div>
    {{--    <br>--}}
    <div class="logo-empresa">
        @if($custom_logo !== "")
            <img border="0" style="display: block; width: auto; height: auto; max-height: 80px;" src="{{ public_path('user_logos/' . $custom_logo) }}" alt=""/>
        @endif
        <h2 style="color: #000000">{{ strtoupper($recipient_name . " " . $recipient_last_name) }}</h2>
    </div>
{{--    <div class="div-dest">--}}
{{--        <h2 style="color: grey">GUILLERMO STRADA</h2>--}}
{{--    </div>--}}
    <div style="color: grey; width:90%; min-height:80px; background-color:white; margin: auto; font-family: Verdana, sans-serif; font-size: 18px">
        @if($digital_recipient_message_body != "")
            <p>
                {{ $digital_recipient_message_body }}
            </p>
        @endif
    </div>
    <div class="div-description">
        <div style="padding: 20px; font-size: 18px">
            <div align="left" style="margin-bottom: 10px">
                <span>¡Recibiste un regalo Golden Pack!</span>
            </div>
            <br>
            <div align="left" style="margin-bottom: 10px">
                <span>De parte de <strong>{{ $sender_name }}</strong></span>
            </div>
            <div align="left">
                <br>
                <br>
                <br>
                <br>
                <br>
                <span>Activá tu código para conocer
                    todas las experiencias disponibles
                    para elegir en este pack.
                </span>
            </div>
        </div>
    </div>
    <div style="width: 50%; height: 300px; float: left; border-top:1px solid #B7950B !important; border-bottom:1px solid #B7950B !important; margin: auto">
        <br>
        @if($orderItemPackPicture != "")
            <img border="0" style="margin: auto;display: block; width: 70%;height: auto;" src="{{ asset($orderItemPackPicture) }}" alt=""/>
        @else
            <img border="0" style="margin: auto;display: block; width: 70%;height: auto;" src="{{ asset($orderItemProductPicture) }}" alt=""/>
        @endif
    </div>
    <div style="width: 100%; clear: left;">
        <br>
        <span>TU CODIGO ES:</span>
    </div>
    <div style="">
        @if($number == "")
            <input type="text" value="{{ $code }}" style="line-height: 36px;min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: darkgoldenrod; color: #FFFFFF; font-size: 18px; font-weight: bold">
        @else
            <input type="button" value="{{ $number }}" style="line-height: 36px;min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: darkgoldenrod; color: #FFFFFF; font-size: 18px; font-weight: bold">
        @endif
    </div>
    @if($cvv != "")
        <div style="width: 100%;">
            <span>CVV: {{ $cvv }}</span>
        </div>
    @endif
    <br>
    <div style="text-align:center">
        @if($number != "")
            <a href="{{ route('frontend.card.activate', $number) }}" target="_blank" style="text-decoration: none; width: 50% !important; position: absolute; left: 25%;">
                <button style="position: relative; line-height: 36px;min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: #696969; color: #FFFFFF; font-size: 18px; font-weight: bold">
                    ACTIVAR CÓDIGO
                </button>
            </a>
        @else
            <a href="{{ route('frontend.card.activate', $code) }}" target="_blank" style="text-decoration: none; width: 50% !important; position: absolute; left: 25%;">
                <button style="position: relative; line-height: 36px;min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: #696969; color: #FFFFFF; font-size: 18px; font-weight: bold">
                    ACTIVAR CÓDIGO
                </button>
            </a>
        @endif
    </div>
    <div style=" position: absolute; bottom: 10%; left: 30%">
        <span>Pack válido <strong>desde {{ date("d/m/Y", strtotime($valid_from)) }} hasta {{ date("d/m/Y", strtotime($valid_thru)) }}</strong></span>
    </div>
    <br>
    <br>
    <div class="div-footer" align="center" style="color: #FFFFFF;">
        <span style="width: 80%;"><a href="" style="text-decoration-color:#FFFFFF; color: #FFFFFF"> POLÍTICA DE PRIVACIDAD</a> | <a href="" style="text-decoration-color:#FFFFFF; color: #FFFFFF"> TÉRMINOS Y CONDICIONES</a></span>
        <br>
        <br>
        <span style="padding: 20px 40px 20px 40px; margin-bottom: 20px; text-decoration: none">Si recibiste este código por error o si tiene alguna consulta sobre el producto o servicio, favor de contactar a nuestro centro de
atención al cliente por correo a info@goldenpack.com.ar o por WhatsApp al 1135047000 o también nos puede llamar por
teléfono al 0800 444 7225 (PACK).</span>
    </div>
{{--        <br>--}}
{{--        <div style="">--}}
{{--            <input type="button" value="123456789" style="min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: darkgoldenrod; color: #FFFFFF; font-size: 18px; font-weight: bold">--}}
{{--        </div>--}}
{{--        <div style="">--}}
{{--            <span>CVV 1435</span>--}}
{{--        </div>--}}
{{--        <br>--}}
{{--        <div style="">--}}
{{--            <input type="button" value="Activar código" style="min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: dimgrey; color: #FFFFFF; font-size: 18px; font-weight: bold">--}}
{{--        </div>--}}

{{--        <br>--}}
{{--    </div>--}}

{{--    <div style="">--}}
{{--        <span>Pack válido <strong>desde 09/09/2022 hasta 09/03/2023</strong></span>--}}
{{--    </div>--}}
{{--    <br>--}}
{{--    <div class="div-footer" align="center" style="color: #FFFFFF; padding-bottom: 10px">--}}
{{--        <span style="width: 80%">POLÍTICA DE PRIVACIDAD | TÉRMINOS Y CONDICIONES</span><br>--}}
{{--        <span style="width: 80%">Si recibiste este código por error o si tiene alguna consulta sobre el producto o servicio, favor de contactar a nuestro centro de--}}
{{--atención al cliente por correo a info@goldenpack.com.ar o por WhatsApp al 1135047000 o también nos puede llamar por--}}
{{--teléfono al 0800 444 7225 (PACK).</span>--}}
{{--    </div>--}}
</div>

</body>
