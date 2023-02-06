<div class="modal model-bg-light fade product-popup modal-fullscreen"
     id="card-popup-masiveDl" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <div class="product-detalis product-detalis-3 product-detalis-10 pt-0 pb-0">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-6">
                            <div class="">
                                <a href="https://goldenpack.com.ar" style="display: block; border: 0px !important;">
                                    <img border="0" style="display: block; width: 100px;height: auto" src="{{ asset('assets/images/logo/logo-dark.png') }}" alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <label>Envío masivo de regalos digitales:</label>
                        </div>
                        <div class="col-12">
                            <ol>
                                <li>Descargar plantilla de Excel modelo</li>
                                <li>Completar con datos de los agasajados, fecha y modalidad de envío (e-mail, Whatsapp o descarga de voucher PDF)</li>
                                <li>Subir archivo actualizado nuevamente a la web para continuar el proceso</li>
                            </ol>
                        </div>
                    </div>
                    <div id="send_loading" style="display: none">
                        <div class="row" style="text-align: center; display: flex; justify-content: center">
                            <i class="fa fa-refresh fa-spin fa-3x"></i>
                        </div>
                        <div class="row" style="text-align: center; display: flex; justify-content: center">
                            <span>Enviando...</span>
                        </div>
                    </div>
                    <div class="row" style="text-align: center; display: flex; justify-content: center">
                        <div id="template_excel" class="col-md-12 col-xs-12 col-lg-4" style="display: block">
                            <a href="{{ route('frontend.card.download_pdf_all', [$cardsIds])}}" target="_blank" class="btn btn--primary btn--rounded"
                               style="font-size:10px; width:95%" onclick="toggleExcel('template_excel')">
                                <i class="fa fa-file-pdf-o" style="font-size:14px"></i>
                                Descargar plantilla excel
                            </a>
                        </div>

                    </div>
                    <div class="row" style="text-align: center; display: flex; justify-content: center">
                        <div id="upload_excel" class="col-md-12 col-xs-12 col-lg-4" style="display:none">
                            <div>
                                <label for="upload-template"><strong>Seleccionar excel para cargar</strong></label>
                                <br>
                                <input id="upload-template" name="upload-template"
                                       type="file" class="" value="" onchange="validateType(this.id)">

                                <div id="masivo-excel-ms-alert">
                                </div>
                            </div>
                            <br>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input id="custom-logo-{{$order->id}}" type="checkbox" onclick="showCustomLogo({{$order->id}}, 'ms')"  class="custom-logo form-check-input" value=""> Agregar logo
                                    personalizado al encabezado.
                                </label>
                            </div>
                            <br>
                            <div id="custom-logo-file-div-ms-{{$order->id}}" class="col-12"
                                 style="display:none">
                                <label for="">Máximo 300Kb. Archivos extensión jpg, png.
                                    Ancho 125px, alto 50px.</label>
                                <input id="custom_logo_file_ms_{{$order->id}}" name="custom_logo_file"
                                       type="file" class="" value="" onchange="changeCustomLogo({{$order->id}}, 'ms')">
                                <input id="customFile-ms_{{$order->id}}" name="customFile" type="hidden"
                                       class="" value="">
                                <div id="{{$order->id}}ms-alert">
                                </div>
                            </div>
                            <br>
                            <button href="#" target="_blank" class="btn btn--primary btn--rounded"
                                    style="font-size:10px; width:95%" onclick="submit_masive_form({{$order->id}})">
                                <i class="fa fa-file-pdf-o" style="font-size:14px"></i>
                                Cargar y enviar
                            </button>
                        </div>
                    </div>
                    <div class="row" style="text-align: center; display: flex; justify-content: center">
                        <div id="send_alert">
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
