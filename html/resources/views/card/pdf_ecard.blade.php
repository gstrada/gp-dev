<style>
    @page {
        margin-top: 0.5cm;
        margin-bottom: 0.5cm;
        }
    footer {
        position: fixed;
        bottom: 0cm;
        left: 0cm;
        right: 0cm;
        text-align: center;
        }
    hr {
        height: 0.003em;
        background-color:grey;
        border: 0;
        }
</style>
<div class="" id="card-popup-pdf-{{$number}}" align="center" style="margin-top:-10px">
            <div >
                <div >
                    <div >
                        <div class="">
                            <div class="">
                                <div class="">
                                    <a href="https://goldenpack.com.ar" style="display: block; border: 0px !important;">
                                        <img border="0" style="display: block; width: auto; height: auto; max-height: 80px;" src="{{ $custom_logo == '' ? public_path('assets/images/logo/logo-dark.png') : public_path('user_logos/' . $custom_logo) }}" alt=""/>
                                    </a>
                                </div>
                            </div>
                            <br>
                            <div class="">
                                <div class="">
                                    <span style="color: #1d4370; font-size: 25px ;text-transform:uppercase;font-family: Georgia, sans-serif; line-height: 26px;font-style:italic; text-align: center;">
                                    @if($digital_recipient_name != '')
                                        {{ $digital_recipient_name }}
                                    @endif
                                    </span>
                                </div>
                                <div class="" style="margin-top:3px">
                                    <span style="color: #000000; font-size: 18px; font-family: Verdana, sans-serif; line-height: 22px;text-transform:uppercase; text-align: center;">
                                               Recibiste un regalo Golden Pack de parte de {{ $sender_name }}.
                                    </span>
                                </div>
                                <div class="" >
                                    <span style="color: #000000; font-size: 16px; font-family: Verdana, sans-serif; line-height: 22px;text-transform:uppercase; text-align: center;">
                                        ¡ESTE PACK ESTÁ REPLETO DE EMOCIÓN, ELEGÍ LA EXPERIENCIA <br/> QUE QUIERAS DISFRUTAR!<br/>
                                    </span>
                                </div>
                                <div class=""  style="margin-top:10px">
                                    @if($digital_recipient_message_body != '')
                                        <span style="color: #000000; font-size: 14px; font-family: Verdana, sans-serif; line-height: 20px;text-align: center;">
                                            {{ $digital_recipient_message_body }}
                                        </span>
                                    @endif
                                </div>
                                <div class=""  style="margin-top:50px">
                                    <div class="">
                                        <div class="" style="width:100%; text-align: center;">
                                            @if($orderItemPackSku != "")
                                                <div class=""  style="margin: auto; width:200px; height: 200px;background-size: cover;background-image: url('{{ public_path($orderItemPackPicture) }}');"  align="center">
                                                    <br>
                                                    <br>
                                                    <a href="{{ route('frontend.packs.show', $orderItemPackSku) }}" target="_blank"  class="button_link" style="height: 100%;width: 100%;font-size: 70px; text-decoration: none;padding: 30px;text-align: justify">&nbsp;
                                                    </a>
                                                </div>
                                                <!-- <div class="" >
                                                    <p style="margin-top: 2px;padding-top:2px; text-align: center;">
                                                        {{ $orderItemPackShortDescription }}
                                                    </p>
                                                </div> -->

                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <div class=""  style="margin-top:10px">
                                    <div class="">
                                        <div class="">
                                            @if($orderItemProductSku != "")
                                                <div class=""  style="margin: auto; width:200px; height: 200px;background-size: cover;background-image: url('{{ public_path($orderItemProductPicture) }}');"  align="center">
                                                    <br>
                                                    <br>
                                                    <a href="{{ route('frontend.products.show', $orderItemProductSku) }}" target="_blank"  class="button_link" style="height: 100%;width: 100%;font-size: 70px; text-decoration: none;padding: 30px;text-align: justify">&nbsp;
                                                    </a>
                                                </div>
                                                <div class=""  style="margin-top:3px">
                                                    <p style="margin-top: 5px;padding-top:5px; text-align: center;">
                                                        <!--{{ $orderItemProductShortDescription }}-->
                                                    </p>
                                                </div>
                                            @endif
                                        </div>
                                    </div>
                                </div>

                                <br/>

                                @if($sender_name != "")
                                    <div class="" align="center">
                                        <span style="color: #000000; font-size: 15px; font-family: Verdana, sans-serif; line-height: 18px; text-align: center;">
                                            Activá tu código para conocer las experiencias disponibles para elegir de este pack, y confirmar recepción del regalo a {{ $sender_name }} <br/>
                                        </span>
                                    </div>
                                @endif

                                <br/>

                                <div class=""  style="margin-top:5px; width:100%;"  align="center">
                                    <a href="{{ route('frontend.card.activate', $code) }}" target="_blank" style="margin:auto; padding: 10px;width:280px;display: block;text-decoration: none;text-align: center;font-weight: bold;font-size: 14px;font-family: Arial, sans-serif;color: #ffffff;background: #1d4370;border: 1px solid #1d4370;-moz-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px;line-height:17px;text-transform:uppercase;letter-spacing: 1px;" class="button_link">
                                        activar código
                                    </a>
                                </div>
                                <br/>
                                <div class=""  style="margin-top:10px; text-align:center;">
                                    <span style="color: #222222; font-size: 14px; font-family: Verdana, sans-serif; line-height: 10px;">
                                        Tu Código para utilizarlo es
                                    </span>
                                </div>
                                <div class=""  style="margin-top:5px; width: 100%" align="center">
                                    <span style="margin:auto; padding: 20px;width:350px;display: block;text-decoration: none;border:0;text-align: center;font-weight: bolder;font-size: 20px;font-family: Arial, sans-serif;color: #FFF;background: #a98d02;line-height:17px;">
                                        {{ \App\Helpers\CardHelper::formatCardNumber($code)}}
                                    </span>
                                </div>
                                <div class=""  style="margin-top:10px">
                                    <span style="color: #222222; font-size: 14px; font-family: Verdana, sans-serif; line-height: 20px;">
                                        <strong>CVV: {{ $cvv }}</strong>
                                    </span>
                                </div>
                                <div class=""  style="margin-top:10px">
                                    <span style="color: #222222; font-size: 14px; font-family: Verdana, sans-serif; line-height: 20px; text-align:right">
                                        Válido Desde: <strong>{{  Carbon\Carbon::parse($valid_from)->format('d/m/Y')  }}</strong><br>
                                        Hasta: <strong>{{  Carbon\Carbon::parse($valid_thru)->format('d/m/Y')  }}</strong>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
</div>
<footer>
    <div class=""  style="margin-top:10px">
        <hr>
        <span style="font-size: 12px; line-height:18px; color: #000000;font-family: Georgia, sans-serif;font-style:italic;">
            Encontranos en las redes sociales
        </span>
    </div>
    <div class=""  style="margin-top:10px">
        <a style="color:black;font-size:12px;border-width:0;Margin: 0 auto;display: inline-block;vertical-align: middle;" href="https://www.facebook.com/goldenpackargentina/" target="_blank">
            <img src="{{ public_path("assets/images/icons/logofacebook.png") }}" alt="Facebook" width="36" style="border-width:0;Margin: 0 auto;"/>
        </a>
        <a style="color:black;font-size:12px;border-width:0;Margin: 0 auto;display: inline-block;vertical-align: middle;" href="https://www.instagram.com/golden.pack/" target="_blank">
            <img src="{{ public_path("assets/images/icons/logoinstagram.png") }}" alt="Instagram" width="36" style="border-width:0;Margin: 0 auto;"/>
        </a>
    </div>
    <hr>
    <div class=""  style="margin-top:10px">
        <a href="{{ URL::to('privacy') }}" style="font-size:14px;text-transform:uppercase;color: #918e89;">politica de privacidad</a>&nbsp;&nbsp;&nbsp;<a href="{{ URL::to('terms') }}" style="font-size:14px;text-transform:uppercase;color: #918e89;">terminos y condiciones</a>
    </div>
    <div class=""  style="margin-top:10px">
        <span style="text-align:center;color: #918e89;font-size:10px;line-height:12px;font-family: Arial, sans-serif; padding: 10px;">
            Si recibiste este código por error, o si tiene alguna consulta sobre el producto o servicio, favor de contactar a nuestro centro de atención al cliente por correo a <a href="mailto:info@goldenpack.com.ar" style="color: #918e89;">info@goldenpack.com.ar</a> o por WhatsApp al <a href="https://api.whatsapp.com/send?phone=5491135047000&text=Hola!" style="color: #918e89;">1135047000</a> o también nos puede llamar por teléfono al
            <br/> <a href="tel:08004447225" style="color: #918e89;">0800 444 7225 (PACK)</a>
            <br/>
            <br/>
            <img border="0" style="display: block; width: 50px;height: auto" src="{{ public_path('assets/images/logo/isologo.png') }}" alt=""/>
        </span>
    </div>
</footer>
