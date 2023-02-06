<style>
    .modal { overflow: auto !important; }
    @media only screen and (min-width: 800px) {
        .sample:hover{
            z-index: 9995;
            -webkit-transform: scale(2);
            -ms-transform: scale(2);
            transform: scale(2);
            transition: 1s;
        }
    }
</style>
<div class="modal model-bg-light fade product-popup modal-fullscreen"
     id="card-popup-whatsapp{{$card->number}}" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <div class="product-detalis product-detalis-3 product-detalis-10 pt-0 pb-0">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-6">
                            <div class="products-gallery-carousel products-gallery-carousel-2">
                                <div class="owl-carousel products-slider" data-slider-id="1">
                                    <div class="product-img">
                                        @if($card->orderItem->pack)
                                            <img src="{{ asset($card->orderItem->pack->picture) }}"
                                                 alt="{{ $card->orderItem->pack->name }}"
                                                 style="width: 100%;height: auto"/>
                                        @endif
                                        @if($card->orderItem->product)
                                            <img src="{{ asset($card->orderItem->pack->product) }}"
                                                 alt="{{ $card->orderItem->product->name }}"
                                                 style="width: 100%;height: auto"/>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- .col-lg-7 end -->
                        <div class="col-sm-12 col-md-12 col-lg-6">
                            <div class="product--title">
                                @if($card->orderItem->pack)
                                    <h3>{{ $card->orderItem->pack->name }}</h3>
                                @endif
                                @if($card->orderItem->product)
                                    <h3>{{ $card->orderItem->product->name }}</h3>
                                @endif
                            </div>
                            <div class="product--review mb-0">
                                <p class="pb-0 mb-0">
                                    <strong>Número: </strong>{{ \App\Helpers\CardHelper::formatCardNumber($card->number) }}
                                </p>
                                <p class="pt-0 mt-0">
                                    <strong>CVV: </strong>{{ \App\Helpers\CardHelper::formatCardNumber($card->cvv) }}
                                </p>
                            </div>
                            <form method="POST" id="wPform"
                                  action="{{ route('frontend.card.send_whatsapp') }}"
                                  enctype="multipart/form-data"  onsubmit="setSpinner({{ $card->id }}, 'wp')">
                                <input type="hidden" name="card_id" value="{{ $card->id }}">
                                @csrf
                                <div class="row">
                                    <div class="col-12">
                                        <input type="text" class="form-control h-auto mb-3"
                                               name="sender_name" placeholder="Nombre del Remitente"
                                               value="{{ $card->sender_name }}" required>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                        <input type="text" class="form-control h-auto mb-3" name="name"
                                               placeholder="Nombre del destinatario"
                                               value="{{ $card->name }}" required>
                                    </div>
                                    <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                        <input type="text" class="form-control h-auto mb-3"
                                               name="lastname" placeholder="Apellido del destinatario"
                                               value="{{ $card->lastname }}">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <span>Teléfono del destinatario</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-1"
                                         style="padding-left: 20px;font-size: 25px;color: grey">
                                        <span class=" h-auto mb-3">+</span>
                                    </div>
                                    <div class="col-2" style="padding-left: 0px;">
                                        <input type="number" max-length="2"
                                               class="form-control h-auto mb-3" id="WPcountry"
                                               name="WPcountry" onblur="trimZero(this.value)"
                                               placeholder="54"
                                               value="{{is_null($card->digital_recipient_phone) ? '' : explode("-",$card->digital_recipient_phone)[0]}}"
                                               required>
                                    </div>
                                    <div class="col-1"
                                         style="max-width: 10px;padding-left: 0px;padding-right: 0px;padding-top:4px;font-size: 17px;color: grey">
                                        <span class=" h-auto mb-3">0</span>
                                    </div>
                                    <div class="col-3" style="padding-left: 10px;">
                                        <input type="number" class="form-control h-auto mb-3"
                                               id="WPcaract" name="WPcaract"
                                               onblur="trimZero(this.value)" placeholder="351"
                                               value="{{is_null($card->digital_recipient_phone) ? '' : explode("-",$card->digital_recipient_phone)[1]}}"
                                               required>
                                    </div>
                                    <div class="col-1"
                                         style="max-width: 10px;padding-left: 0px;padding-right: 0px;padding-top:4px;font-size: 17px;color: grey">
                                        <span class=" h-auto mb-3">15</span>
                                    </div>
                                    <div class="col-4">
                                        <input type="number" class="form-control h-auto mb-3"
                                               id="WPnumber" name="WPnumber"
                                               onblur="trimZero(this.value)" placeholder="123456"
                                               value="{{ is_null($card->digital_recipient_phone) ? '' : explode("-",$card->digital_recipient_phone)[2]}}"
                                               required>
                                    </div>
                                </div>
                                <div class="row" style="margin-top:-10px;">
                                    <div class="col-3" style=" text-align:center">
                                        <span>Caract. país</span>
                                    </div>
                                    <div class="col-4" style="padding-right:0px">
                                        <span>Caract. ciudad</span>
                                    </div>
                                    <div class="col-5" style="padding-left:0px; text-align:left">
                                        <span>Nº teléfono</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                                        <textarea class="form-control pt-3" rows="2" name="message"
                                                                  placeholder="Mensaje"></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input id="custom-logo-wp-{{ $card->id }}" type="checkbox" onclick="showCustomLogo({{ $card->id }}, 'wp')"  class="custom-logo form-check-input" value=""> Agregar logo
                                                personalizado al encabezado.
                                            </label>
                                        </div>
                                        <div id="custom-logo-file-div-wp-{{ $card->id }}" class="col-12"
                                             style="display:none">
                                            <label for="">Máximo 300Kb. Archivos extensión jpg, png.
                                                Ancho 125px, alto 50px.</label>
                                            <input id="custom_logo_file_wp_{{ $card->id }}" name="custom_logo_file"
                                                   type="file" class="" value="" onchange="changeCustomLogo({{ $card->id }}, 'wp')">
                                            <input id="customFile-wp-{{ $card->id }}" name="customFile" type="hidden"
                                                   class="" value="">
                                            <div id="{{ $card->id }}wp-alert">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input id="custom-send-wp-{{ $card->id }}" type="checkbox" onclick="showCustomSend({{ $card->id }}, 'wp')"  class="custom-send form-check-input" value="">
                                                Programar envío de mensaje
                                            </label>
                                        </div>
                                        <div  id="customSend-wp-div-{{ $card->id }}" class="col-12"
                                              style="display:none">
                                            <input type="text" name="delivery_date_wp"
                                                   class="form-control h-auto mb-3"
                                                   placeholder="Fecha de envío"
                                                   value="" id="customSend-wp-{{ $card->id }}"
                                                   style="background-color: transparent!important;" />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-check" style=" margin-bottom: 5px">
                                            <label class="form-check-label">
                                                <input id="custom-logo-wp-{{ $card->id }}" type="checkbox" onclick="showTemplatesDiv({{ $card->id }}, 'wp')"  class="custom-logo form-check-input" value=""> Usar plantilla temática.
                                            </label>
                                        </div>
                                        <div id="templates-div-wp-{{ $card->id }}" class="col-12"
                                             style="display:none;">
                                            <div id="div_plant_wp_sel" style="display: none; margin-bottom: 5px">
                                                <span id="span_plant_wp_sel">Plantilla seleccionada: </span>
                                                <br>
                                            </div>
                                            <button type="button" class="btn btn--primary btn--rounded"  data-toggle="modal" data-target="#templatesWpModal" style="line-height: 25px;font-size: 8px !important;height: 30px;width: 150px">
                                                Seleccionar plantilla
                                            </button>
                                            <input type="hidden" id="templateWpSelected"  name="templateWpSelected" value="default"/>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <!-- .product-meta-select end -->
                                <div class="product--meta-action clearfix mb-0">
                                    <div class="mb-40 text-center">
                                        <button type="submit" class="btn btn--primary btn--rounded"
                                                id="submit_wp{{ $card->id }}">
                                            Enviar Mensaje
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- .col-lg-6 end -->
                    </div>
                    <!-- .row end -->
                </div>
                <!-- .modal-body end -->
            </div><!-- The Modal -->
            <div class="modal model-bg-light fade product-popup modal-fullscreen" id="templatesWpModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <!-- Modal Header -->
                        <div class="modal-header">
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                <div class="">
                                    <a href="https://goldenpack.com.ar" style="display: block; border: 0px !important;">
                                        <img border="0" style="display: block; width: 100px;height: auto" src="{{ asset('assets/images/logo/logo-dark.png') }}" alt=""/>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body">
                            <h6>Selecciona la plantilla que desees haciendo click sobre ella</h6>
                            <div class="row">
                                <div class="col-md-3 col-sm-12" >
                                    <label for=""><strong>Cumpleaños</strong></label>
                                    <img id="birthday" class="sample" border="0" style="position: relative; margin: auto;display: block; width: 100%;height: auto" src="{{ asset('assets/images/background/birthday.png') }}" alt="" onclick="selectTemplateWp(this.id)"/>
                                    <br>
                                </div>
                                <div class="col-md-3 col-sm-12">
                                    <label for=""><strong>Aniversario</strong></label>
                                    <img id="anniversary" class="sample" border="0" style="position: relative;margin: auto;display: block; width: 100%;height: auto" src="{{ asset('assets/images/background/anniversary.png') }}" alt="" onclick="selectTemplateWp(this.id)"/>
                                    <br>
                                </div>
                                <div class="col-md-3 col-sm-12">
                                    <label for=""><strong>Navidad</strong></label>
                                    <img id="christmas" class="sample" border="0" style="position: relative; margin: auto;display: block; width: 100%;height: auto" src="{{ asset('assets/images/background/christmas.png') }}" alt="" onclick="selectTemplateWp(this.id)"/>
                                    <br>
                                </div>
                                <div class="col-md-3 col-sm-12">
                                    <label for=""><strong>San Valentín</strong></label>
                                    <img id="valentine" class="sample" border="0" style="position: relative; margin: auto;display: block; width: 100%;height: auto" src="{{ asset('assets/images/background/valentine.png') }}" alt="" onclick="selectTemplateWp(this.id)"/>
                                    <br>
                                </div>
                            </div>
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn--primary btn--rounded" data-dismiss="modal">
                                Cancelar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <script>
                function selectTemplateWp(id) {
                    let templName
                    switch (id) {
                        case 'birthday':
                            templName = 'Cumpleaños'
                            break
                        case 'anniversary':
                            templName = 'Aniversario'
                            break
                        case 'christmas':
                            templName = 'Navidad'
                            break
                        case 'valentine':
                            templName = 'San Valentín'
                            break
                    }
                    $('#templateWpSelected').val(id)
                    $('#div_plant_wp_sel').css('display', 'block')
                    $('#span_plant_wp_sel').html(`Plantilla seleccionada: ${templName}`)
                    $('#templatesWpModal').modal('hide')
                }
            </script>
        </div>
        <!-- .modal-content end -->
    </div>
    <!-- .modal-dialog end -->
</div>
