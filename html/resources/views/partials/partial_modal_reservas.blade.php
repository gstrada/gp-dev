<div class="modal model-bg-light fade product-popup modal-fullscreen-reserva"
     id="card-popup-reserva" tabindex="-1" role="dialog" >
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="max-width: 600px;  width: 100%; margin: auto">
            <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <div class="product-detalis product-detalis-3 product-detalis-10 pt-0 pb-0">
                    <div class="row">
                        <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                <div class="">
                                    <a href="https://goldenpack.com.ar" style="display: block; border: 0px !important;">
                                        <img border="0" style="display: block; width: 100px;height: auto" src="{{ asset('assets/images/logo/logo-dark.png') }}" alt=""/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-12">
                            <hr>
                            <div class="product--title">
                                <div class="mt-10 text-center" id="div-codigo" style="display: block">
                                    <span style="font-size: 16px">Para realizar tu reserva por favor ingresa el código de tu regalo.</span>
                                    <div class="mt-10" style="width: 100%; margin: auto">
                                        <input type="text" class="form-control h-auto mb-3 text-center" onfocus="clearAlert()" name="number" id="number" placeholder="" value="" required="">
                                    </div>
                                </div>
                                <div class="mt-10 text-center" id="div-cvv" style="display: none; width: 250px; margin: auto">
                                    <span style="font-size: 16px">Por favor ingresa el CVV.</span>
                                    <div class="mt-10" >
                                        <input type="text" class="form-control h-auto mb-3 text-center" onfocus="clearAlert()" name="cvv" id="cvv" value="" required="">
                                    </div>
                                </div>
                                <div class="mt-10 text-center" id="div-product-name" style="display: none">
                                    <span style="font-size: 16px">Estás por realizar una reserva en:.</span>
                                    <br>
                                    <span id="item_name" style="font-size: 20px">{{  $detail_item->name  }}</span>
                                </div>
                                <div class="mt-10 text-center" id="div-pack-name" style="display: none">
                                    <span style="font-size: 16px">El pack de tu regalo es:</span>
                                    <br>
                                    <span id="pack_name" style="font-size: 20px"></span>
                                </div>
                                <div class="mt-10 text-center" id="div-cant-valid" style="display: none">
                                    <span style="font-size: 16px">Recuerda que tu regalo es válido hasta: @if($detail_item->recommended_people === 1) 1 persona @else {{ $detail_item->recommended_people }} personas @endif.</span>
                                </div>
                                <div  id="div-reservation-date"  class="mt-10 text-center" style="display:none; width: 250px; margin: auto">

                                        <span class="input-group-addon" id="sizing-addon2" style="font-size: 16px"> <i class="fa fa-male" style="font-size: 16px"></i> Cantidad de personas</span>
                                        <select id="cant-personas" class="form-control h-auto mb-3" style="width: 120px; margin: auto; text-align: center">
                                            @for($i = 1; $i <= $detail_item->recommended_people; $i++)
                                                @if($i == $detail_item->recommended_people)
                                                    <option selected value="{{ $i }}">{{ $i }} &#9660;</option>
                                                @else
                                                    <option value="{{ $i }}">{{ $i }} &#9660;</option>
                                                @endif
                                            @endfor
                                        </select>
                                    <span>Elegir fecha para la reserva</span>
                                    <div class="input-group">
                                        <span class="input-group-addon" id="sizing-addon2"> <i class="fa fa-calendar" style="display:inline-block;"></i></span>
                                        <input type="text" name="reservation_date"
                                               class="form-control h-auto mb-3"
                                               value="" id="reservation_date"
                                               style="background-color: transparent!important; text-align: center !important" />
                                    </div>
                                    <span>Elegir hora para la reserva</span>
                                    <div class="input-group">
                                        <span class="input-group-addon" id="sizing-addon2"> <i class="fa fa-clock-o" style="display:inline-block;"></i></span>
                                        <input type="text" name="reservation_time"
                                               class="form-control h-auto mb-3"
                                               value="" id="reservation_time"
                                               style="background-color: transparent!important; text-align: center !important" />
                                    </div>
                                </div>
                                <div class="mt-10 text-center" id="div-nombre" style="display: none; width: 80%; margin: auto">
                                    <span style="font-size: 16px">Escribe el nombre y apellido para la reserva.</span>
                                    <div class="mt-10" >
                                        <input type="text" class="form-control h-auto mb-3 text-center" onfocusin="" name="nombre" id="nombre" value="" required="">
                                    </div>
                                </div>
                                <div class="mt-10 text-center" id="div-cel" style="display: none; width: 80%; margin: auto">
                                    <span style="font-size: 16px">Ingresa un nº celular para confirmar la reserva.</span>
                                    <div class="mt-10" >
                                        <input type="number" class="form-control h-auto mb-3 text-center" onfocusin="" name="cel" id="cel" value="" required="">
                                    </div>
                                </div>
                                <div class="mt-10 text-center" id="div-obs" style="display: none; width: 80%; margin: auto">
                                    <span style="font-size: 16px">Observaciones.</span>
                                    <div class="mt-10" >
                                        <input type="text" class="form-control h-auto mb-3 text-center" onfocusin="" name="obs" id="obs" value="" required="">
                                        @if($detail_item->addresses)
                                            <input type="hidden" name="prov_id" id="prov_id" value="{{ isset($detail_item->addresses[0]) ? $detail_item->addresses[0]->city->state_id : '' }}">
                                        @endif
                                    </div>
                                </div>
                                <div id="alert-error" class="alert-warning"  style="display: none">
                                </div>
                                <div class="mt-20 text-center" id="div-comprobar" style="display: block">
                                    <button id="btn-comprobar" type="button" class="btn btn--primary btn--rounded w-auto pr-5 pl-5" onclick="comprobarCodigo()">Comprobar</button>
                                </div>
                                <div class="mt-20 text-center" id="div-activar" style="display: none">
                                    <a href="" type="button" class="btn btn--primary btn--rounded w-auto pr-5 pl-5" id="btn-activar">Activar</a>
                                </div>
                                <div class="mt-20 text-center" id="div-reservar" style="display: none">
                                    <div>La reserva se iniciará a través de un mensaje de Whatsapp, la misma está sujeta a disponibilidad y debes esperar la confirmación</div>
                                    <br>
                                    <button type="button" class="btn btn--primary btn--rounded w-auto pr-5 pl-5" id="btn-inic-res"  onclick="reservar({{$detail_item}})">Iniciar Reserva</button>
                                </div>
                            </div>
                        </div>
                    <!-- .row end -->
                    </div>
                <!-- .modal-body end -->
                </div>
        <!-- .modal-content end -->
            </div>
    <!-- .modal-dialog end -->
        </div>
    </div>
</div>
<script>
    var card_result = {}
    function clearAlert(){
        $('#alert-error').html('');
        if($('#alert-error').css('display') === 'block') {
            $('#alert-error').css('display', 'none');
        }
    }

    function setSpinner(){
        $('#btn-inic-res').html('<i style=" font-size:16px" class="fa fa-refresh fa-spin"></i>&nbsp;Iniciando Reserva')
    }

    function comprobarCodigo() {

        let inputNumber = $('#number')
        let inputCVV = $('#cvv')

        clearAlert()
        // if(checkPreviousReservation(inputNumber.val()) === 1) {
        //     $('#alert-error').css('display', 'block');
        //     $('#alert-error').html('El código ingresado ya tiene una reserva asociada. Por favor, revise que su reserva anterior haya sido cancelada antes de realizar una nueva solicitud de reserva.');
        //     // $('#alert-error').html('El código ingresado ya tiene una reserva asociada');
        //     //return false;
        // }
        if($('#div-cvv').css('display') == 'block' && inputCVV.val() !== "") {
            checkCvv(inputCVV.val())
            return false
        }

        number = inputNumber.val()
        if(number === '') {
            alert('Debes ingresar el código')
            return false
        }
        const codeForm = new FormData();
        codeForm.append("number", number);
        $.ajax({
            type: "post",
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            url: '{{ route("frontend.card.check_code_for_reservation") }}',
            data: codeForm,
            processData: false,
            contentType: false,
        }).then(function (response) {
            if(response.code !== '200'){
                $('#alert-error').css('display', 'block');
                $('#alert-error').html(response.message);
                return false
            }
            card_result = response.result

            // if(checkPack() === 0) {
            //     $('#alert-error').css('display', 'block');
            //     $('#alert-error').html('El código de tu regalo no corresponde a la experiencia seleccionada.<br> Revisar las experiencias incluidas en tu pack.');
            //     return false
            // }

            if(response.result.used === 1){
                $('#alert-error').css('display', 'block');
                $('#alert-error').html('Tu código ya ha sido usado. <br>Lugar de uso: ' + card_result.used_on_product.name + '<br>Fecha de uso: ' + moment(response.result.date_used).format("DD-MM-YYYY"));
                return false
            }

            if(moment().format() > moment().format(response.result.valid_thru)){
                $('#alert-error').css('display', 'block');
                $('#alert-error').html('Tu código ya no es válido. <br>Fecha de vencimiento: ' + moment(response.result.valid_thru).format("DD-MM-YYYY"));
                return false
            }

            if(response.result.activated === 0){
                $('#alert-error').css('display', 'block');
                // $('#div-cvv').css('display','none');
                $('#alert-error').html('Tu código aún no ha sido activado.<br> Debes para poder solicitar una reserva');
                $('#div-activar').css('display', 'block');
                var url = "{{ route('frontend.card.activate', ['temp']) }}";
                url = url.replace('temp', number);
                $('#btn-activar').prop('href', url);
                $('#div-comprobar').css('display', 'none');
                return false
            }
            if(response.result.cvv !== null) {
                $('#div-cvv').css('display', 'block');
            } else {
                noCVV()
            }
        })
    }

    function checkPack(){
        let bladeValue = $("#pack-name").val()
        if(card_result.order_item.pack.sku !== bladeValue.replace(/ /g, "")){
            return 0
        }
        return 1
    }

    function checkPreviousReservation(number){
        let result = 0
        const codeForm = new FormData();
        codeForm.append("number", number);
        $.ajax({
            type: "post",
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            url: '{{ route("frontend.card.check_previous_reservation") }}',
            data: codeForm,
            processData: false,
            contentType: false,
            async:false,
            success: function (response) {
                if(response.result !== ''){
                    result = 1;
                }
            }
        });
        return result;
    }

    function checkCvv(cvv) {
        let pack_name = card_result.order_item.pack.name !== undefined ? card_result.order_item.pack.name : '';
        if(card_result.cvv != cvv) {
            $("#alert-error").css("display", "block");
            $("#alert-error").html("El CVV no es válido");
            $('#cvv').val('')
        } else {
            $("#div-product-name").css("display", "block")
            $("#div-pack-name").css("display", "block")
            $("#pack_name").html(pack_name)
            $("#div-cant-valid").css("display", "block")
            $("#div-reservar").css("display", "block")
            $("#div-cel").css("display", "block")
            $("#div-obs").css("display", "block")
            $("#div-nombre").css("display", "block")
            $("#div-reservation-date").css("display", "block")
            $("#div-codigo").css("display", "none")
            $("#div-activar").css("display", "none")
            $("#div-comprobar").css("display", "none")
            $("#div-cvv").css("display", "none")
            $('#cvv').val('')
        }
    }

    function noCVV() {
        let pack_name = card_result.order_item.pack.name !== undefined ? card_result.order_item.pack.name : '';
        $("#div-product-name").css("display", "block")
        $("#div-pack-name").css("display", "block")
        $("#pack_name").html(pack_name)
        $("#div-cant-valid").css("display", "block")
        $("#div-reservar").css("display", "block")
        $("#div-cel").css("display", "block")
        $("#div-obs").css("display", "block")
        $("#div-nombre").css("display", "block")
        $("#div-reservation-date").css("display", "block")
        $("#div-codigo").css("display", "none")
        $("#div-activar").css("display", "none")
        $("#div-comprobar").css("display", "none")
        $("#div-cvv").css("display", "none")
        $('#cvv').val("")
    }

    function reservar(item) {
        clearAlert()
        setSpinner()
        let reservation_date = $("#reservation_date").val();
        let reservation_hour = $("#reservation_time").val();
        let card_code = card_result.custom_number === null ? card_result.number : card_result.custom_number
        const codeForm = new FormData();
        codeForm.append("reservation_method", item.metodo_reserva);
        codeForm.append("name", $("#nombre").val());
        codeForm.append("phone", $("#cel").val());
        codeForm.append("number", card_result.number);
        codeForm.append("custom_number", card_result.custom_number);
        codeForm.append("cvv", card_result.cvv);
        codeForm.append("pack", card_result.order_item.pack.name);
        codeForm.append("prestador", $("#item-name").html());
        codeForm.append("prov_id", $('#prov_id').val());
        codeForm.append("cant_people", $("#cant-personas").val());
        codeForm.append("reservation_date", reservation_date);
        codeForm.append("reservation_hour", reservation_hour);
        codeForm.append("observations", $("#obs").val());

        $.ajax({
            type: "post",
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            url: '{{ route("frontend.card.save_reservation") }}',
            data: codeForm,
            processData: false,
            contentType: false,
            async: false,
            success: function (response) {
                if(response.code !== '200'){
                    $('#alert-error').css('display', 'block');
                    $('#alert-error').html(response.message);
                    $('#btn-inic-res').html('Iniciar Reserva')
                    return false
                }
            }
        });
        $("#card-popup-reserva").modal('hide')
        $('#btn-inic-res').html('Iniciar Reserva')
        let url
        if(item.metodo_reserva == 2){
            url = "https://wa.me/541135047000/?text=Hola%20%2C%20tengo%20un%20regalo%20%2A" + card_result.order_item.pack.name +
                    "%2A%20de%20Golden%20Pack." +
                    "%0AQuisiera%20hacer%20una%20reserva%20en%3A%20%2A" + $("#item_name").html() + "%2A" +
                    "%0AA%20nombre%20de%3A%20%2A" + $("#nombre").val() + "%2A" +
                    "%0AFecha%3A%20%2A" + reservation_date + " " + reservation_hour + "%2A" +
                    "%0ACantidad%20de%20personas%3A%20%2A" + $("#cant-personas").val() + "%2A" +
                    "%0AObservaciones%3A%20%2A" + $("#obs").val() + "%2A" +
                    "%0A%0AMi%20c%C3%B3digo%20de%20regalo%20es%3A%20%2A" + card_code + "%2A" +
                    "%0A%0AMe%20confirmas%20por%20favor%20cuando%20la%20reserva%20se%20encuentre%20confirmada%3F" +
                    "%0AGracias."
        } else {
            url = "https://wa.me/"+item.num_wp_reserva+"/?text=Hola%20%2C%20tengo%20un%20regalo%20%2A" + card_result.order_item.pack.name +
                "%2A%20de%20Golden%20Pack." +
                "%0AQuisiera%20hacer%20una%20reserva%20en%3A%20%2A" + $("#item_name").html() + "%2A" +
                "%0AA%20nombre%20de%3A%20%2A" + $("#nombre").val() + "%2A" +
                "%0AFecha%3A%20%2A" + reservation_date + " " + reservation_hour + "%2A" +
                "%0ACantidad%20de%20personas%3A%20%2A" + $("#cant-personas").val() + "%2A" +
                "%0AObservaciones%3A%20%2A" + $("#obs").val() + "%2A" +
                "%0A%0AMe%20confirmas%20por%20favor%20la%20reserva%20para%20compartirte%20mi%20c%C3%B3digo%20de%20Golden%20Pack%3F" +
                "%0AGracias."
        }
        window.open(url, '_blank');
    }
</script>
