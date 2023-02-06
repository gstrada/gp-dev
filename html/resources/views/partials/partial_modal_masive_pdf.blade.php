<div class="modal model-bg-light fade product-popup modal-fullscreen"
     id="card-popup-masive-pdf" tabindex="-1" role="dialog">
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
                    <div class="row"  style="text-align: center; display: flex; justify-content: center">
{{--                        @if($countNoMessage>0)--}}
                            <div class="col-12" id="label-no-content" style="display:block">
                                <label>Descargue la plantilla excel y revise o actualice los datos de envío</label>
                            </div>
                            <div class="col-12" id="label-upload" style="display:none">
                                <label id="lblProcessing">Una vez completados los datos por favor cargue el archivo para actualizar los mismos</label>
                            </div>
{{--                        @endif--}}
                    </div>
                    <div id="send_pdf_loading" style="display: none">
                        <div class="row" style="text-align: center; display: flex; justify-content: center">
                            <i class="fa fa-refresh fa-spin fa-3x"></i>
                        </div>
                        <div class="row" style="text-align: center; display: flex; justify-content: center">
                            <span id="spanProcessing">Procesando...</span>
                        </div>
                    </div>
                    <div class="row" style="text-align: center; display: flex; justify-content: center">
                        <div id="template_pdf" class="col-md-12 col-xs-12 col-lg-4" style="display: block">
                            <a href="{{ route('frontend.card.download_pdf_data', [$cardsIds])}}" target="_blank" class="btn btn--primary btn--rounded"
                               style="font-size:10px; width:95%" onclick="togglePdf('template_pdf')">
                                <i class="fa fa-file-pdf-o" style="font-size:14px"></i>
                                Descargar plantilla excel
                            </a>
                        </div>

                    </div>
                    <div class="row" style="text-align: center; display: flex; justify-content: center">
                        <div id="upload_excel_pdf" class="col-md-12 col-xs-12 col-lg-4" style="display:none">
                            <div>
                                <label for="upload_template_pdf_{{$order->id}}"><strong>Seleccionar excel para cargar</strong></label>
                                <br>
                                <input id="upload_template_pdf" name="upload-template-pdf"
                                       type="file" class="" value="" onchange="validateTypeForPdf(this.id)"  accept=".xls,.xlsx">
                                <div id="masivo-excel-pdf-alert">
                                </div>
                            </div>
                            <br>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input id="custom-logo-{{$order->id}}" type="checkbox" onclick="showCustomLogo({{$order->id}}, 'pdf')"  class="custom-logo form-check-input" value=""> Agregar logo
                                    personalizado al encabezado.
                                </label>
                            </div>
                            <br>
                            <div id="custom-logo-file-div-pdf-{{$order->id}}" class="col-12"
                                 style="display:none">
                                <label for="">Máximo 300Kb. Archivos extensión jpg, png.
                                    Ancho 125px, alto 50px.</label>
                                <input id="custom_logo_file_pdf_{{$order->id}}" name="custom_logo_file"
                                       type="file" class="" value="" onchange="changeCustomLogo({{$order->id}}, 'pdf')">
                                <input id="customFile-pdf_{{$order->id}}" name="customFile" type="hidden"
                                       class="" value="">
                                <div id="{{$order->id}}pdf-alert">
                                </div>
                            </div>
                            <br>
                            <button href="#" target="_blank" class="btn btn--primary btn--rounded"
                                    style="font-size:10px; width:95%" onclick="process({{$order->id}})">
{{--                                    style="font-size:10px; width:95%" onclick="submit_masive_pdf({{$order->id}}, {{$cards}})">--}}
                                <i class="fa fa-file-pdf-o" style="font-size:14px"></i>
                                Procesar y descargar zip
                            </button>
                        </div>
                    </div>
                    <div class="row" style="text-align: center; display: flex; justify-content: center">
                        <div id="send_alert_pdf">
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
