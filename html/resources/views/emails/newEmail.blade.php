<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    <!--[if mso]>
    <noscript>
    <xml>
        <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        table, td, div, h1, p {font-family: Arial, sans-serif;}
        /*table, td {border:2px solid #000000 !important;}*/
        .text {
            font-size:14px;
            color: #A6ACAF;
        }
        .p-message {
            font-size:18px;
            padding: 0 70px 0 70px;
            color: #A6ACAF;
            text-align: center
        }
        .div-pack {
            width:40%;
            padding:0;
            vertical-align:top;
        }
        .div-text-pack {
            width:60%;
            padding:0;
            vertical-align:top;
            height: 100%;
            font-size:18px;
            color: #A6ACAF;
        }
        .tr_head {
            height: 210px;
        }
        .btn_fb {
            width: 45px;
        }
        .btn_ig {
            width: 45px;
        }
        .td_header {
            padding:5px 10px 10px 5px;
            background:url({{ asset('assets/images/background/'. $card->template .'_header.png') }});
            background-size: cover;
            background-repeat: no-repeat;
            font-size:13px;
            color: #A6ACAF;
        }
        .sm_buttons {
            text-align: right !important;
            padding-bottom: 100px
        }
        .bg_footer {
            padding:5px 10px 10px 5px;
            background:url({{ asset('assets/images/background/'. $card->template .'_footer.png') }});
            background-size: cover;
            background-repeat: no-repeat;
            font-size:13px;
            color: #A6ACAF;
        }
        @media only screen and (max-width: 600px) {
            .sm_buttons {
                text-align: right !important;
                padding-bottom: 70px
            }
            .td_header {
                background-size: cover;
            }
            .p-message {
                padding: 0 20px 0 20px;
            }
            .div-pack {
                width:80%;
                display:inline-block;
                margin: auto
            }
            .div-text-pack {
                width:80%;
                display:inline-block;
            }
            .btn_fb {
                width: 35px;
            }
            .btn_ig {
                width: 35px;
            }
            .header {
                position: relative !important;
                top: 0 !important;
                height:auto;display:inline;
            }
            .tr_head {
                height: 150px;
                width: 100%;
            }
        }
    </style>
</head>
<body style="margin:0;padding: 10px 0 10px 0;">
<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
    <tr>
        <td align="center" style="padding:0;">
            <table role="presentation" style="width:702px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                <tr class="tr_head">
                    <td align="center" class="td_header">
                        <div class="sm_buttons">
                            <a style="" href="https://www.facebook.com/goldenpackargentina/" target="_blank">
                                <img src="{{ asset("assets/images/icons/logo_fb_blanco.png") }}" width="36" style="border-width:0;Margin: 0 auto;"/>
                            </a>
                            <a style="" href="https://www.instagram.com/golden.pack/" target="_blank">
                                <img src="{{ asset("assets/images/icons/logo_insta_blanco.png") }}" width="36" style="border-width:0;Margin: 0 auto;"/>
                            </a>
                        </div>
                    </td>
                </tr>
{{--                @dd($card->digital_custom_logo)--}}
                <tr>
                    <td align="center" style="padding:0 0 0 0;">
                        @if(!is_null($card->digital_custom_logo))
                            <img border="0" style="display: block; width: auto; height: auto; max-height: 80px;" src="{{ asset('user_logos/mail_') . $card->digital_custom_logo }}" alt=""/>
                        @else
                            <img border="0" style="display: block; width: auto; height: auto; max-height: 80px;" src="{{ asset('assets/images/logo/logo-dark.png') }}" alt=""/>
                        @endif
                        <br>
                        <h2 style="color: #000000; margin-top: 0px">{{ strtoupper($card->digital_recipient_name) }}</h2>
                        <p class="p-message">
                            {{--                            Texto de mensaje personalizado para el regalo--}}
                            @if($card->digital_recipient_message_body)
                                <span>{{ $card->digital_recipient_message_body }}</span>
                            @endif
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding:0;" align="center">
                        <table role="presentation" style="width:90%;border-collapse:collapse;border:0;border-spacing:0;">
                            <tr align="center">
                                <td class="div-text-pack" align="center" style=" border:1px solid #B7950B !important;">
                                    <table role="presentation" style="width: 95%;">
                                        <tr>
                                            <td>
                                                ¡Recibiste un regalo Golden Pack!
                                            </td>
                                        </tr>
                                        <tr><td style="line-height:50%;height:50%;mso-line-height-rule:exactly;">&nbsp;</td></tr>
                                        <tr>
                                            <td>
                                                De parte de <strong>{{ strtoupper($card->sender_name) }}</strong>
                                            </td>
                                        </tr>
                                        <tr><td style="line-height:300%;height:300%;mso-line-height-rule:exactly;">&nbsp;</td></tr>
                                        <tr>
                                            <td>
                                                <span>Activá tu código para conocer
                                                    todas las experiencias disponibles
                                                    para elegir en este pack.
                                                </span>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                {{--                                <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>--}}
                                <td class="div-pack" style=" border:1px solid #B7950B !important;">
                                    @if($card->orderItem->pack)
                                        <img border="0" style="margin: auto;display: block; width: 100%;height: auto" src="{{ asset($card->orderItem->pack->picture) }}" alt="{{ $card->orderItem->pack->name }}"/>
                                    @endif
                                    @if($card->orderItem->product)
                                        <img border="0" style="margin: auto;display: block; width: 100%;height: auto" src="{{ asset($card->orderItem->product->picture) }}" alt=""/>
                                    @endif
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  class="text" align="center" style="padding:0 0 0 0;">
                        <br>
                        <div style="">
                            <span>TU CODIGO ES:</span>
                        </div>
                        <div style="">
                            @if($card->custom_number)
                                <input type="button" value="{{ $card->custom_number }}" style="min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: darkgoldenrod; color: #FFFFFF; font-size: 18px; font-weight: bold">
                            @else
                                <input type="button" value="{{ $card->number }}" style="min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: darkgoldenrod; color: #FFFFFF; font-size: 18px; font-weight: bold">
                            @endif
                        </div>
                        @if($card->cvv)
                            <div style="">
                                <span>CVV {{ $card->cvv }}</span>
                            </div>
                        @endif
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding:0 0 0 0;">
                        <br>
                        <div style="">
                            @if($card->custom_number)
                                <a href="{{ route('frontend.card.activate', $card->custom_number) }}" target="_blank" style="text-decoration: none">
                                    <input type="button" value="ACTIVAR CÓDIGO" style="min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: #696969; color: #FFFFFF; font-size: 18px; font-weight: bold">
                                </a>
                            @else
                                <a href="{{ route('frontend.card.activate', $card->number) }}" target="_blank" style="text-decoration: none">
                                    <input type="button" value="ACTIVAR CÓDIGO" style="min-width: 300px; height: 45px; border-radius: 25px; border: 0; background-color: #696969; color: #FFFFFF; font-size: 18px; font-weight: bold">
                                </a>
                            @endif
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="text" align="center" style="padding:0 0 0 0;">
                        <br>
                        <div style="">
                            <span>Pack válido <strong>desde {{ date("d/m/Y", strtotime($card->valid_from)) }} hasta {{ date("d/m/Y", strtotime($card->valid_thru)) }}</strong></span>
                        </div>
                        <br>
                    </td>
                </tr>
                <tr>
                    <td align="center" class="bg_footer">
                        <div class="" align="center" style="color: #FFFFFF;">
                            <span style="width: 80%;"><a href="" style="text-decoration-color:#FFFFFF; color: #FFFFFF"> POLÍTICA DE PRIVACIDAD</a> | <a href="" style="text-decoration-color:#FFFFFF; color: #FFFFFF"> TÉRMINOS Y CONDICIONES</a></span>
                            <br>
                            <br>
                            <span style="width: 80%; text-decoration: none">Si recibiste este código por error o si tiene alguna consulta sobre el producto o servicio, favor de contactar a nuestro centro de
atención al cliente por correo a info@goldenpack.com.ar o por WhatsApp al 1135047000 o también nos puede llamar por
teléfono al 0800 444 7225 (PACK).</span>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>

</html>
