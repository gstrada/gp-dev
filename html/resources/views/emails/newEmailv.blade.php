<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <style type="text/css">
        * {
            -webkit-font-smoothing: antialiased;
        }
        body {
            Margin: 0;
            padding: 0;
            min-width: 100%;
            font-family: Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            background-color:#FFFFFF;
            text-align: center;
        }
        table {
            color: #333333;
            font-family: Arial, sans-serif;
        }
        img {
            border: 0;
        }
        .wrapper {
            width: 100%;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        .div-container {
            margin: auto;
            width:100%;
            -webkit-text-size-adjust:100%;
            -ms-text-size-adjust:100%;
            background-color:#FFFFFF;
            text-align: center;
        }

        .webkit {
            max-width: 600px;
        }
        .outer {
            Margin: 0 auto;
            width: 100%;
            max-width: 600px;
        }
        .full-width-image img {
            width: 100%;
            max-width: 600px;
            height: auto;
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
        .one-column .contents {
            text-align: left;
            font-family: Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .one-column p {
            font-size: 14px;
            Margin-bottom: 10px;
            font-family: Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .two-column {
            text-align: center;
            font-size: 0;
        }
        .two-column .column {
            width: 100%;
            max-width: 300px;
            display: inline-block;
            vertical-align: top;
        }
        .contents {
            width: 100%;
        }
        .two-column .contents {
            font-size: 14px;
            text-align: left;
        }
        .two-column img {
            width: 100%;
            max-width: 280px;
            height: auto;
        }
        .two-column .text {
            padding-top: 10px;
        }
        .three-column {
            text-align: center;
            font-size: 0;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .three-column .column {
            width: 100%;
            max-width: 200px;
            display: inline-block;
            vertical-align: top;
        }
        .three-column .contents {
            font-size: 14px;
            text-align: center;
        }
        .three-column img {
            width: 100%;
            max-width: 180px;
            height: auto;
        }
        .three-column .text {
            padding-top: 10px;
        }
        .img-align-vertical img {
            display: inline-block;
            vertical-align: middle;
        }

        .div-header {
            width:80%;
            min-height:50px;
            background-color:darkgoldenrod;
            margin: auto;
            padding-top: 10px;
            padding-right: 10px
        }

        .logo-empresa {
            width:50%;
            min-height:80px;
            background-color:white;
            margin: auto;
            padding-top: 15px
        }

        .div-dest {
            width:100%;
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
            width:48%;
            min-height:80px;
            background-color:white;
            margin: auto;
            font-family: Verdana, sans-serif;
            font-size: 1.1em;
            display: grid;
            grid-template-columns: 67% 33%;
        }

        @media only screen and (max-width: 600px) {
            .div-header {
                width:100%;
            }
            .logo-empresa {
                width:100%;
                min-height:50px;
            }
            .img-logo-empresa {
                width: 40%;
            }
            .div-description {
                color: grey;
                width:90%;
                min-height:80px;
                background-color:white;
                margin: auto;
                font-family: Verdana, sans-serif;
                font-size: 1.1em;
                display: grid;
                grid-template-columns: 100%;
            }
        }

    </style>
</head>
<body>
<div class="div-container" style="">
{{--   --}}
   <div class="div-header" align="right">
       <img src="{{ asset("assets/images/icons/logo_fb_blanco.png") }}" alt="Facebook" width="36" style="border-width:0;Margin: 0 auto;"/>
       <img src="{{ asset("assets/images/icons/logo_insta_blanco.png") }}" alt="Instagram" width="36" style="border-width:0;Margin: 0 auto;"/>
   </div>
{{--    <br>--}}
    <div class="logo-empresa">
{{--        <img border="0" class="img-logo-empresa" src="{{ asset('user_logos/44605_fcc.jpg') }}" alt=""/>--}}
        <img border="0" class="img-logo-empresa" src="{{ asset('user_logos/49882_logo_naranjax.png') }}" alt=""/>
    </div>
    <div class="div-dest">
        <h2 style="color: grey">GUILLERMO STRADA</h2>
    </div>
    <div style="color: grey; width:80%; min-height:80px; background-color:white; margin: auto; font-family: Verdana, sans-serif; font-size: 1.5em">
        <p>
            Felicitaciones! Ganaste el sorteo "Sorteo del viernes".
            Esperamos que lo disfrutes!
        </p>
    </div>
    <div class="div-description">
        <div style="padding: 10px">
            <div align="left" style="margin-bottom: 10px">
                <span>Recibiste un regalo ¡Golden Pack!</span>
            </div>
            <div align="left" style="margin-bottom: 10px">
                <span>De parte de NaranjaX</span>
            </div>
            <div align="left">
                <span>Activá tu código para conocer
                    todas las experiencias disponibles
                    para elegir en este pack. <br>Confirmar
                    recepción a NaranjaX.
                </span>
            </div>
        </div>
        <div style="margin: auto">
            <img border="0" style="margin: auto;display: block; width: 70%;height: auto" src="{{ asset('packs/8FWNnkTt9BRJreU92ZNPYC.jpg') }}" alt=""/>
        </div>
    </div>
    <br>
    <div style="">
        <span>TU CODIGO ES:</span>
    </div>
    <br>
    <div style="">
        <input type="button" value="123456789" style="min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: darkgoldenrod; color: #FFFFFF; font-size: 18px; font-weight: bold">
    </div>
    <div style="">
        <span>CVV 1435</span>
    </div>
    <br>
    <div style="">
            <input type="button" value="Activar código" style="min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: dimgrey; color: #FFFFFF; font-size: 18px; font-weight: bold">
    </div>

    <br>
    <div style="">
        <span>Pack válido <strong>desde 09/09/2022 hasta 09/03/2023</strong></span>
    </div>
    <br>
    <div class="div-header" align="center" style="color: #FFFFFF; padding-bottom: 10px">
        <span style="width: 80%">POLÍTICA DE PRIVACIDAD | TÉRMINOS Y CONDICIONES</span><br>
        <span style="width: 80%">Si recibiste este código por error o si tiene alguna consulta sobre el producto o servicio, favor de contactar a nuestro centro de
atención al cliente por correo a info@goldenpack.com.ar o por WhatsApp al 1135047000 o también nos puede llamar por
teléfono al 0800 444 7225 (PACK).</span>
    </div>
</div>

</body>

</html>
