<style>
    .borderless {
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom: 1px solid rgba(0,0,0,.1);
        border-left-color: transparent;
        width: 100%
    }
    .input_detalle_4 {
        width: 65%;
    }
</style>
<div class="modal model-bg-light fade product-popup modal-fullscreen-reserva"
     id="popup-reserva-detalle" tabindex="-1" role="dialog" >
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="max-width: 500px;  width: 100%; margin: auto">
            <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <div class="product-detalis product-detalis-3 product-detalis-10 pt-0 pb-0">
                    <div class="row">
                        <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-5">
                                <div class="">
                                    <a href="https://goldenpack.com.ar" style="display: block; border: 0px !important;">
                                        <img border="0" style="display: block; width: 100px;height: auto" src="{{ asset('assets/images/logo/logo-dark.png') }}" alt=""/>
                                    </a>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                <h6 style=" padding-top: 0px; margin-top: 20px; margin-bottom: 0px;">Detalle de reserva</h6>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-12">
                            <hr>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="res_number" style="display: inline-block;">Nº Reserva</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text"  style="width: 100%" class=" borderless text-center" onfocusin="" name="res_number" id="res_number" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="card_number">Nº Regalo</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text"  style="width: 100%" class=" borderless text-center" onfocusin="" name="card_number" id="card_number" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="custom_number" style="display: inline-block;">Nº Corto</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text"  style="width: 100%" class=" borderless text-center" onfocusin="" name="custom_number" id="custom_number" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="cvv" style="display: inline-block;">CVV</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" style="width: 100%" class=" borderless text-center" onfocusin="" name="cvv" id="cvv" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="fecha_pedido" style="display: inline-block; white-space: nowrap">Fecha Reserva</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" style="width: 100%" class=" borderless text-center" onfocusin="" name="fecha_pedido" id="fecha_pedido" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="tel_contacto">Tel. Contacto</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" style="width: 100%" class=" borderless text-center" onfocusin="" name="tel_contacto" id="tel_contacto" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="prestador" style="display: inline-block;">Prestador</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" style="width: 100%" class=" borderless text-center" onfocusin="" name="prestador" id="prestador" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="loc_prestador" style="display: inline-block; white-space: nowrap">Loc. Prestador</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" style="width: 100%"  class="borderless text-center" onfocusin="" name="loc_prestador" id="loc_prestador" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="pack">Pack</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" style="width: 100%" class="borderless text-center" onfocusin="" name="pack" id="pack" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="q_personas" style="display: inline-block;">Q personas</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" style="width: 100%" class=" borderless text-center" onfocusin="" name="q_personas" id="q_personas" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="status" style="display: inline-block;">Estado</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <select style="margin-bottom: 0px;margin-top: 5px;width: 100%"  class="borderless text-center" onfocusin="" name="status" id="status" >
                                            <option value="new">Nueva</option>
                                            <option value="pending">Pendiente</option>
                                            <option value="in_process">En proceso</option>
                                            <option value="confirmed">Confirmada</option>
                                            <option value="cancelled">Cancelada</option>
                                            <option value="used">Utilizada</option>
                                        </select>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="a_nombre" style="display: inline-block;">Reservado a</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" class="borderless text-center" onfocusin="" name="a_nombre" id="a_nombre" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="obs">Observaciones</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <textarea style="width: 100%;" class="borderless" onfocusin="" name="obs" id="obs" value="" readonly> </textarea>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="fecha_solic" style="display: inline-block;">Solicitado</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" class=" borderless text-center" onfocusin="" name="fecha_solic" id="fecha_solic" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="fecha_canjeado" style="display: inline-block;">Canjeado</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" class=" borderless text-center" onfocusin="" name="fecha_canjeado" id="fecha_canjeado" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="prestador_canje" style="display: inline-block; white-space: nowrap">Prestador canje</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" class=" borderless text-center" onfocusin="" name="prestador_canje" id="prestador_canje" value="" readonly>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="responsable" style="display: inline-block;">Responsable</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" class=" borderless text-center" onfocusin="" name="responsable" id="responsable" value="">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12 col-md-3 col-lg-3" style="padding-left: 0px">
                                        <label for="comm">Comentarios</label>
                                    </div>
                                    <div class="col-sm-12 col-md-9 col-lg-9">
                                        <input type="text" class="borderless text-center" onfocusin="" name="comm" id="comm" value="">
                                    </div>
                                </div>
                            </div>
                            <br>
                        </div>
                    <!-- .row end -->
                    </div>
                    <div class="row text-center" id="">
                        <div class="col-lg-12 col-md-12 col-sm-12 text-center"  style="margin-top:10px"  align="center">
                            <a href="#" class="btn btn--primary btn--rounded"
                                onclick="update_reservation()"
                               style="font-size:10px; width:60%">
                                Guardar cambios
                            </a>
                        </div>
                    </div>
                <!-- .modal-body end -->
                </div>
        <!-- .modal-content end -->
            </div>
    <!-- .modal-dialog end -->
        </div>
    </div>
</div>
