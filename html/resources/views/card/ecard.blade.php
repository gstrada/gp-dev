
<div class="modal model-bg-light fade product-popup modal-fullscreen" id="card-popup-pdf-{{$card->number}}" tabindex="-1" role="dialog">
                <div >
                    <div >
                        <div >
                            <div class="">
                                <div class="">
                                    <div class="">
                                        <a href="https://goldenpack.com.ar" style="display: block; border: 0px !important;">
                                            <img border="0" style="display: block; width: 100px;height: auto" src="{{ public_path('assets/images/logo/logo-dark.png') }}" alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <br>
                                <div class="">
                                    <div class="">
                                        <span style="color: #db7447; font-size: 30px; font-family: Georgia, sans-serif; line-height: 26px;font-style:italic; text-align: center;">
                                        @if($card->digital_recipient_name)
                                            {{ $card->digital_recipient_name }}
                                        @endif
                                        </span>
                                    </div>
                                    <div class="" style="margin-top:10px">
                                        <span style="color: #000000; font-size: 18px; font-family: Verdana, sans-serif; line-height: 22px;text-transform:uppercase; text-align: center;">
                                                    Te enviaron un E-pack de Regalo.
                                        </span>
                                    </div>
                                    <div class="" >
                                        <span style="color: #000000; font-size: 16px; font-family: Verdana, sans-serif; line-height: 22px;text-transform:uppercase; text-align: center;">
                                            ¡ESTE PACK ESTÁ REPLETO DE EMOCIÓN, ELEGÍ LA EXPERIENCIA GOLDEN PACK QUE QUIERAS DISFRUTAR!<br/>
                                        </span>
                                    </div>
                                    <div class=""  style="margin-top:10px">
                                        @if($card->digital_recipient_message_title)
                                            <span style="color: #000000; font-size: 14px; font-family: Verdana, sans-serif; line-height: 20px;text-transform:none; text-align: center;">{{ $card->digital_recipient_message_title }}</span>
                                        @endif
                                    </div>
                                    <div class=""  style="margin-top:10px">
                                        <div class="">
                                            <div class="">
                                                @if($card->orderItem->pack)
                                                    <div class=""  style="margin-top:10px">
                                                        <a href="{{ route('frontend.packs.show', $card->orderItem->pack->sku) }}">
                                                            <img src="{{ public_path($card->orderItem->pack->picture) }}" alt="{{ $card->orderItem->pack->name }}" width="200" style="border-width:0;Margin: 0 auto;"/>
                                                        </a>
                                                    </div>
                                                    <div class=""  style="margin-top:10px">
                                                        <p style="margin-top: 20px;padding-top:20px; text-align: center;">
                                                            {{ $card->orderItem->pack->short_description }}
                                                        </p>
                                                    </div>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""  style="margin-top:10px">
                                        <div class="">
                                            <div class="">
                                                @if($card->orderItem->product)
                                                    <div class=""  style="margin-top:10px">
                                                        <a href="{{ route('frontend.products.show', $card->orderItem->product->sku) }}">
                                                            <img src="{{ asset($card->orderItem->product->picture) }}" alt="{{ $card->orderItem->product->name }}" width="200" style="border-width:0;Margin: 0 auto;"/>
                                                        </a>
                                                    </div>
                                                    <div class=""  style="margin-top:10px">
                                                        <p style="margin-top: 20px;padding-top:20px; text-align: center;">
                                                            {{ $card->orderItem->product->short_description }}
                                                        </p>
                                                    </div>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    @if($card->sender_name)
                                        <div class=""  align="center">
                                            <span style="color: #000000; font-size: 15px; font-family: Verdana, sans-serif; line-height: 18px;text-transform:uppercase; text-align: center;">
                                                Activá tu código para conocer las experiencias disponibles para elegir de este pack, y confirmar recepción del regalo a {{ $card->sender_name }} <br/>
                                            </span>
                                        </div>
                                    @endif
                                    <div class=""  style="margin-top:10px"  align="center">
                                        <a href="{{ route('frontend.card.activate', $card->number) }}" target="_blank" style="padding: 10px;width:280px;display: block;text-decoration: none;text-align: center;font-weight: bold;font-size: 14px;font-family: Arial, sans-serif;color: #ffffff;background: #db7447;border: 1px solid #db7447;-moz-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px;line-height:17px;text-transform:uppercase;letter-spacing: 1px;" class="button_link">
                                            activar código
                                        </a>
                                    </div>
                                    <div class=""  style="margin-top:10px">
                                        <span style="color: #222222; font-size: 14px; font-family: Verdana, sans-serif; line-height: 20px;">
                                            Tu Código para utilizarlo es
                                        </span>
                                    </div>
                                    <div class=""  style="margin-top:10px; width: 100%" align="center">
                                        <span style="padding: 20px;width:350px;display: block;text-decoration: none;border:0;text-align: center;font-weight: bolder;font-size: 20px;font-family: Arial, sans-serif;color: #FFF;background: #a98d02;line-height:17px;">
                                            {{ \App\Helpers\CardHelper::formatCardNumber($card->number)}}
                                        </span>
                                    </div>
                                    <div class=""  style="margin-top:10px">
                                        <span style="color: #222222; font-size: 14px; font-family: Verdana, sans-serif; line-height: 20px;">
                                            <strong>CVV: {{ $card->cvv }}</strong>
                                        </span>
                                    </div>
                                    <div class=""  style="margin-top:10px">
                                        <span style="color: #222222; font-size: 14px; font-family: Verdana, sans-serif; line-height: 20px; text-align:right">
                                            Válido Desde: <strong>{{  Carbon\Carbon::parse($card->valid_from)->format('d/m/Y')  }}</strong><br>
                                            Hasta: <strong>{{  Carbon\Carbon::parse($card->valid_thru)->format('d/m/Y')  }}</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
<!-- .modal-body end -->
                        </div>
                    </div>
<!-- .modal-content end -->
                </div>
<!-- .modal-dialog end -->
    </div>
