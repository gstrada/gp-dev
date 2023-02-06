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
<div class="modal model-bg-light fade product-popup modal-fullscreen" id="card-popup-{{$card->number}}"
     tabindex="-1" role="dialog">
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
                            <form method="POST" action="{{ route('frontend.card.send') }}" enctype="multipart/form-data" onsubmit="setSpinner({{ $card->id }}, 'mail')">
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
                                        <input type="email" class="form-control h-auto mb-3"
                                               name="email" placeholder="Email de destino"
                                               value="{{ $card->digital_recipient_email }}" required>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input id="cc-field-mail-{{ $card->id }}" type="checkbox" onclick="showCC({{ $card->id }}, 'mail')"  class="custom-logo form-check-input" value=""> Enviar copias (opcional).
                                            </label>
                                        </div>
                                        <div id="cc-field-div-mail-{{ $card->id }}" class="col-12"
                                             style="display:none; padding: 0px;">
                                            <input id="cc-mail-{{ $card->id }}" name="ccField" type="text"
                                                   class="form-control h-auto mb-3" value="" placeholder="Agregar direcciones de mail separadas por ;">
                                            <div id="{{ $card->id }}cc-alert">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-12">
                                        <input type="text" class="form-control h-auto mb-3"
                                               name="subject" placeholder="Asunto"
                                               value="{{ $card->digital_recipient_message_title }}">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                                        <textarea class="form-control pt-3" rows="3" name="message"
                                                                  placeholder="Mensaje">{{ $card->digital_recipient_message_body }}</textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input id="custom-logo-mail-{{ $card->id }}" type="checkbox" onclick="showCustomLogo({{ $card->id }}, 'mail')"  class="custom-logo form-check-input" value=""> Agregar logo
                                                personalizado al encabezado.
                                            </label>
                                        </div>
                                        <div id="custom-logo-file-div-mail-{{ $card->id }}" class="col-12"
                                             style="display:none">
                                            <label for="">Máximo 300Kb. Archivos extensión jpg, png.</label>
                                            <input id="custom_logo_file_mail_{{ $card->id }}" name="custom_logo_file"
                                                   type="file" class="" value="" onchange="changeCustomLogo({{ $card->id }}, 'mail')">
                                            <input id="customFile-mail-{{ $card->id }}" name="customFile" type="hidden"
                                                   class="" value="">
                                            <div id="{{ $card->id }}mail-alert">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-check" style=" margin-bottom: 5px">
                                            <label class="form-check-label">
                                                <input id="custom-logo-mail-{{ $card->id }}" type="checkbox" onclick="showTemplatesDiv({{ $card->id }}, 'mail')"  class="custom-logo form-check-input" value=""> Usar plantilla temática.
                                            </label>
                                        </div>
                                        <div id="templates-div-mail-{{ $card->id }}" class="col-12"
                                             style="display:none;">
                                            <div id="div_plant_sel" style="display: none; margin-bottom: 5px">
                                                <span id="span_plant_sel">Plantilla seleccionada: </span>
                                                <br>
                                            </div>
                                            <button type="button" class="btn btn--primary btn--rounded"  data-toggle="modal" data-target="#templatesModal" style="width: 250px">
                                                Seleccionar plantilla
                                            </button>
                                            <input type="hidden" id="templateSelected"  name="templateSelected" value="default"/>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-12">
                                        <input type="text" name="delivery_date"
                                               class="form-control h-auto mb-3"
                                               placeholder="Fecha de envío"
                                               value=""
                                               style="background-color: transparent!important"/>
                                    </div>
                                </div>
                                <div class="product--meta-action clearfix mb-0">
                                    <div class="mb-40 text-center">
                                        <button type="submit" class="btn btn--primary btn--rounded" id="submit_mail{{ $card->id }}">
                                            @if($card->digital_email_sent)
                                                Reenviar
                                            @else
                                                @if($card->delivery_date)
                                                    Reprogramar
                                                @else
                                                    Enviar
                                                @endif
                                            @endif
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- The Modal -->
<div class="modal model-bg-light fade product-popup modal-fullscreen" id="templatesModal">
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
                    <div class="col-md-3 col-sm-12">
                        <label for="">Cumpleaños</label>
                        <img id="birthday" class="sample" border="0" style="position: relative; margin: auto;display: block; width: 100%;height: auto" src="{{ asset('assets/images/background/birthday.png') }}" alt="" onclick="selectTemplate(this.id)"/>
                    </div>
                    <div class="col-md-3 col-sm-12">
                        <label for="">Aniversario</label>
                        <img id="anniversary" class="sample" border="0" style="position: relative;margin: auto;display: block; width: 100%;height: auto" src="{{ asset('assets/images/background/anniversary.png') }}" alt="" onclick="selectTemplate(this.id)"/>
                    </div>
                    <div class="col-md-3 col-sm-12">
                        <label for="">Navidad</label>
                        <img id="christmas" class="sample" border="0" style="position: relative; margin: auto;display: block; width: 100%;height: auto" src="{{ asset('assets/images/background/christmas.png') }}" alt="" onclick="selectTemplate(this.id)"/>
                    </div>
                    <div class="col-md-3 col-sm-12">
                        <label for="">San Valentín</label>
                        <img id="valentine" class="sample" border="0" style="position: relative; margin: auto;display: block; width: 100%;height: auto" src="{{ asset('assets/images/background/valentine.png') }}" alt="" onclick="selectTemplate(this.id)"/>
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
    function selectTemplate(id) {
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
        $('#templateSelected').val(id)
        $('#div_plant_sel').css('display', 'block')
        $('#span_plant_sel').html(`Plantilla seleccionada: ${templName}`)
        $('#templatesModal').modal('hide')
    }
</script>
