@extends('layouts.app')

@section('styles')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://npmcdn.com/tootik@1.0.2/css/tootik.min.css">
    <link rel="stylesheet" href="{{  asset('css/manage_ecard.css')  }}">
@endsection
@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://npmcdn.com/flatpickr/dist/l10n/es.js"></script>
    <script src="{{  asset('js/manage_ecard.js')  }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"></script>
    <script>
        var exceldata = [];
        function submit_masive_form(order){
            $("#upload_excel").css("display","none");
            $("#send_loading").css("display","block");
            const form = new FormData();
            form.append("excel", $("#upload-template")[0].files[0]);
            if ($("#custom_logo_file_ms_" + order)[0].files[0] !== undefined){
                form.append("image", $("#custom_logo_file_ms_" + order)[0].files[0]);
            }
            form.append("order", order);
            var varHtml = ""
            $.ajax({
                type: "post",
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                url: '{{ route("frontend.card.post_masive") }}',
                data: form,
                processData: false,  // tell jQuery not to process the data
                contentType: false,
            }).then(function (response) {
                $("#send_loading").css("display","none");
                if (response.length == 0){
                    $("#send_alert").html('<div  class="alert alert-success"><strong>Proceso completado</strong></div>');
                } else {
                    response.forEach(function(val){
                        varHtml += '<br><div  class="alert alert-warning"><strong>' + val + '</strong></div>';
                    })
                    $("#send_alert").html(varHtml)
                }
            });
        }

        async function submitExcelAndImage(excel, image) {
            const form = new FormData();
            form.append("pdfs", excel);
            if (image !== undefined){
                form.append("image", image);
            }
        }

        async function createPdf(card){
            let form = new FormData();
            // form.append("pdfs", $("#upload_template_pdf_" + order)[0].files[0]);
            // if ($("#custom_logo_file_pdf_" + order)[0].files[0] !== undefined) {
            //     form.append("image", $("#custom_logo_file_pdf_" + order)[0].files[0]);
            // }
            form.append("card", card);
            $.ajax({
                type: "post",
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                url: '{{ route("frontend.card.create_pdf") }}',
                data: form,
                processData: false,  // tell jQuery not to process the data
                contentType: false,
            }).then(function (response) {
                console.log(response);
                return true;
                // $("#send_loading").css("display", "none");
                {{--var url = '{{ route("frontend.card.download_zip_pdf", [":file", ":dir"]) }}';--}}
                {{--url = url.replace(':file', response[0]);--}}
                {{--url = url.replace(':dir', response[1]);--}}
                {{--window.open(url, '_blank');--}}
                {{--$('#card-popup-masive-pdf').modal('hide');--}}
            });
            return false;
        }

        document.getElementById("upload_template_pdf").onchange = (evt) => {
            exceldata = []
            // (A) NEW FILE READER
            var reader = new FileReader();
            // (B) ON FINISH LOADING
            reader.addEventListener("loadend", (evt) => {
                // (B1) GET THE FIRST WORKSHEET
                var workbook = XLSX.read(evt.target.result, {
                        type: "binary"
                    }),
                    worksheet = workbook.Sheets[workbook.SheetNames[0]],
                    range = XLSX.utils.decode_range(worksheet["!ref"]);
                // (B2) READ CELLS IN ARRAY
                for (let row = range.s.r; row <= range.e.r; row++) {
                    let i = exceldata.length;
                    exceldata.push([]);
                    if (row > 1) {
                        for (let col = range.s.c; col <= range.e.c - 2; col++) {
                            let cell = worksheet[XLSX.utils.encode_cell({
                                r: row,
                                c: col
                            })];
                            exceldata[i].push(cell.v);
                        }
                    }
                }
                console.log(exceldata);
            });
            // (C) START - READ SELECTED EXCEL FILE
            reader.readAsArrayBuffer(evt.target.files[0]);
        };

        function createPdfs(order, i) {
            const form = new FormData();
            if ($("#custom_logo_file_pdf_" + order)[0].files[0] !== undefined){
                form.append("image", $("#custom_logo_file_pdf_" + order)[0].files[0]);
            }
            form.append("order", order);
            form.append("pack", exceldata[i][0]);
            form.append("number", exceldata[i][1]);
            form.append("cvv", exceldata[i][2]);
            form.append("sender", exceldata[i][3]);
            form.append("rec_name", exceldata[i][4]);
            form.append("rec_last_name", exceldata[i][5]);
            form.append("message", exceldata[i][6]);
            form.append("template", exceldata[i][7]);
            var varHtml = ""
            $.ajax({
                type: "post",
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                url: '{{ route("frontend.card.create_pdf") }}',
                data: form,
                destroy: true,
                processData: false,  // tell jQuery not to process the data
                contentType: false,
            }).then((data)=>{
                i = i + 1;
                $('#spanProcessing').html(`Procesando ${i-2} de ${exceldata.length - 2}`)
                if (i < exceldata.length)
                    createPdfs(order, i);
                // Ha llegado al final del array. Finaliza el proceso.
                else {
                    const form2 = new FormData();
                    form2.append("order", order);
                    $.ajax({
                        type: "post",
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                        url: '{{ route("frontend.card.create_pdf_zip") }}',
                        data: form2,
                        processData: false,  // tell jQuery not to process the data
                        contentType: false,
                    }).then(function (response) {
                        console.log(response)
                        var url = '{{ route("frontend.card.download_zip_pdf", [":file", ":dir"]) }}';
                        url = url.replace(':file', order + '.zip');
                        url = url.replace(':dir', order);
                        window.open(url, '_blank');
                        $('#card-popup-masive-pdf').modal('hide');
                    });
                    console.log('Fin del proceso');
                }
            })
        }


        {{--async function createPdfs(order) {--}}
        {{--    for(let i = 2; i < exceldata.length; i++) {--}}
        {{--        const form = new FormData();--}}
        {{--        if ($("#custom_logo_file_ms_" + order)[0].files[0] !== undefined){--}}
        {{--            form.append("image", $("#custom_logo_file_ms_" + order)[0].files[0]);--}}
        {{--        }--}}
        {{--        form.append("order", order);--}}
        {{--        form.append("pack", exceldata[i][0]);--}}
        {{--        form.append("number", exceldata[i][1]);--}}
        {{--        form.append("cvv", exceldata[i][2]);--}}
        {{--        form.append("sender", exceldata[i][3]);--}}
        {{--        form.append("rec_name", exceldata[i][4]);--}}
        {{--        form.append("rec_last_name", exceldata[i][5]);--}}
        {{--        form.append("message", exceldata[i][6]);--}}
        {{--        form.append("template", exceldata[i][7]);--}}
        {{--        var varHtml = ""--}}
        {{--        $.ajax({--}}
        {{--            type: "post",--}}
        {{--            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },--}}
        {{--            url: '{{ route("frontend.card.create_pdf") }}',--}}
        {{--            data: form,--}}
        {{--            processData: false,  // tell jQuery not to process the data--}}
        {{--            contentType: false,--}}
        {{--            async:false--}}
        {{--        }).then((data)=>{console.log(data)})--}}

        {{--            // $("#send_loading").css("display","none");--}}
        {{--            // if (response.length == 0){--}}
        {{--            //     $("#send_alert").html('<div  class="alert alert-success"><strong>Proceso completado</strong></div>');--}}
        {{--            // } else {--}}
        {{--            //     response.forEach(function(val){--}}
        {{--            //         varHtml += '<br><div  class="alert alert-warning"><strong>' + val + '</strong></div>';--}}
        {{--            //     })--}}
        {{--            //     $("#send_alert").html(varHtml)--}}
        {{--            // }--}}
        {{--        // });--}}
        {{--    }--}}
        {{--    return true--}}
        {{--}--}}

        async function process(order) {
            $('#lblProcessing').html(`Por favor no cierre ésta ventana`)
            var cont = 0
            var varHtml = ""
            if ($("#upload_template_pdf")[0].files.length === 0) {
                varHtml += '<br><div  class="alert alert-warning"><strong>Se debe cargar la plantilla en excel</strong></div>';
                $("#masivo-excel-pdf-alert").html(varHtml)
                return false
            } else {
                varHtml = ""
                $("#masivo-excel-pdf-alert").html(varHtml)
            }
            $("#upload_excel_pdf").css("display", "none");
            $("#send_pdf_loading").css("display", "block");
            createPdfs(order,2)
                // .then(()=>{
                {{--const form = new FormData();--}}
                {{--form.append("order", order);--}}
                {{--$.ajax({--}}
                {{--    type: "post",--}}
                {{--    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },--}}
                {{--    url: '{{ route("frontend.card.create_pdf_zip") }}',--}}
                {{--    data: form,--}}
                {{--    processData: false,  // tell jQuery not to process the data--}}
                {{--    contentType: false,--}}
                {{--}).then(function (response) {--}}
                {{--    console.log(response)--}}
                {{--    var url = '{{ route("frontend.card.download_zip_pdf", [":file", ":dir"]) }}';--}}
                {{--    url = url.replace(':file', order + '.zip');--}}
                {{--    url = url.replace(':dir', order);--}}
                {{--    window.open(url, '_blank');--}}
                {{--    $('#card-popup-masive-pdf').modal('hide');--}}
                {{--});--}}
            // })


        }

        async function submit_masive_pdf(order, cards) {
            console.log(cards)
            cards.forEach((card) => {
            })
            var varHtml = ""
            if ($("#upload_template_pdf_" + order)[0].files.length === 0) {
                varHtml += '<br><div  class="alert alert-warning"><strong>Se debe cargar la plantilla en excel</strong></div>';
                $("#masivo-excel-pdf-alert").html(varHtml)
                return
            } else {
                varHtml = ""
                $("#masivo-excel-pdf-alert").html(varHtml)
            }
            $("#upload_excel_pdf").css("display", "none");
            $("#send_pdf_loading").css("display", "block");
            var excelRows
            let file = $("#upload_template_pdf_" + order)[0].files[0];
            let reader = new FileReader();
            reader.onload = async function (e) {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: "array" });
                let worksheet = workbook.Sheets[workbook.SheetNames[0]];
                let sheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                //Read all rows from First Sheet into an JSON array.
                excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
            }
            reader.readAsBinaryString(file);
            console.log(excelRows)
            return false
            if(await submitExcelAndImage($("#upload_template_pdf_" + order)[0].files[0], $("#custom_logo_file_pdf_" + order)[0].files[0])){
                for (const card of cards) {
                    await createPdf(card);
                }
                var url = '{{ route("frontend.card.download_zip_pdf", [":file", ":dir"]) }}';
                url = url.replace(':file', response[0]);
                url = url.replace(':dir', response[1]);
                window.open(url, '_blank');
                $('#card-popup-masive-pdf').modal('hide');

            }
        }
    </script>
@endsection
@section('content')
    <section id="page-title" class="page-title  mt-30">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="title title-1 text-center">
                        <div class="title--content">
                            <div class="title--heading">
                                <h3>Enviá los productos!</h3>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <ol class="breadcrumb breadcrumb-bottom">
                            <li class="active text-uppercase">Orden de pedido
                                #{{ str_pad($order->id, 8, '0', STR_PAD_LEFT) }}</li>
                        </ol>
                        <br>
                        @if($cards->count() > 1)
                            <div class="clearfix">
                                <div style="display: flex; justify-content: center;">
                                    <a href="#" target="_blank" class="btn btn--primary btn--rounded ms-download"
                                       data-toggle="modal"
                                       data-target="#card-popup-masiveDl">
                                        <i class="fa fa-envelope-o" style="font-size:14px"></i>
                                        Envío masivo de regalos
                                    </a>
                                </div>
                                <br>
                                <div style="display: flex; justify-content: center;">
                                     <a href="#" target="_blank" class="btn btn--primary btn--rounded ms-download"
                                       data-toggle="modal"
                                       data-target="#card-popup-masive-pdf">
                                        <i class="fa fa-file-pdf-o" style="font-size:14px"></i>
                                        Descarga regalos como pdf
                                    </a>
                                </div>
                            </div>
                        @endif
                    </div>
                    <!-- .title end -->
                </div>
                <!-- .col-lg-12 end -->
            </div>
            <!-- .row end -->
        </div>
        <!-- .container end -->
    </section>
    <section id="wishlist" class="shop shop-cart wishlist pt-0 pb-60">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="cart-table wishlist">
                        <div class="row border-bottom pb-10 d-none d-md-flex">
                            <div class="col-md-6">
                                <p class="text-black"><strong>PRODUCTO</strong></p>
                            </div>
                            <div class="col-md-4">
                                <p class="text-black"><strong>ESTADO</strong></p>
                            </div>
                            <div class="col-md-2">
                                <p class="text-black"><strong>COMPARTIR</strong></p>
                            </div>
                        </div>
                        @foreach($cards as $card)
                            @if($card->orderItem->product or $card->orderItem->pack)
                                <div class="row mt-20 pb-20 border-bottom ">
                                    <div class="col-md-6">
                                        <div class="row">
                                            <div class="col-md-2">
                                                @if($card->orderItem->pack)
                                                    <img src="{{ asset($card->orderItem->pack->picture) }}"
                                                         alt="{{ $card->orderItem->pack->name }}"
                                                         style="width: 100%;height: auto"/>
                                                @endif
                                                @if($card->orderItem->product)
                                                    <img src="{{ asset($card->orderItem->product->product) }}"
                                                         alt="{{ $card->orderItem->product->name }}"
                                                         style="width: 100%;height: auto"/>
                                                @endif
                                            </div>
                                            <div class="col-md-10 pt-5 pt-sm-0">
                                                @if($card->orderItem->pack)
                                                    <h6>{{ $card->orderItem->pack->name }}</h6>
                                                @endif
                                                @if($card->orderItem->product)
                                                    <h6>{{ $card->orderItem->product->name }}</h6>
                                                @endif
                                                <p class="pb-0 mb-0">
                                                    <strong>Número: </strong>{{ \App\Helpers\CardHelper::formatCardNumber($card->number) }}
                                                </p>
                                                <p class="pt-0 mt-0">
                                                    <strong>CVV: </strong>{{ \App\Helpers\CardHelper::formatCardNumber($card->cvv) }}
                                                </p>
                                                @if($card->digital_wp_sent)
                                                    <p class="pt-0 pb-0 mt-0 mb-0">
                                                        <strong>Enviado por whatsapp</strong></p>
                                                @endif
                                                @if($card->digital_wp_sent && ($card->name or $card->lastname))
                                                    <p class="pt-0 mt-0 pb-0 mb-0">
                                                        <strong>Destinatario: </strong>{{ $card->name }} {{ $card->lastname }}
                                                    </p>
                                                @endif
                                                @if($card->digital_date_pdf_downloaded)
                                                <p class="pt-0 pb-0 mt-0 mb-0">
                                                    <strong>PDF descargado</strong></p>
                                                @endif
                                                @if($card->digital_date_pdf_downloaded && ($card->name or $card->lastname))
                                                    <p class="pt-0 mt-0 pb-0 mb-0">
                                                        <strong>Destinatario: </strong>{{ $card->name }} {{ $card->lastname }}
                                                    </p>
                                                @endif
                                                @if($card->digital_email_sent && $card->digital_recipient_email)
                                                    <p class="pt-0 pb-0 mt-0 mb-0">
                                                        <strong>Email: </strong>{{ $card->digital_recipient_email }}</p>
                                                @endif
                                                @if($card->digital_email_sent && ($card->name or $card->lastname))
                                                    <p class="pt-0 mt-0 pb-0 mb-0">
                                                        <strong>Destinatario: </strong>{{ $card->name }} {{ $card->lastname }}
                                                    </p>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 d-flex align-items-center justify-content-between">
                                        <p class="col-6" style="padding-left:0px; font-size: 14px">
                                            @if($card->used)
                                                Utilizado el {{ date_format(date_create($card->date_used), 'd/m/Y') }}
                                            @else
                                                @if($card->activated)
                                                    Activado el {{ date_format(date_create($card->date_activated), 'd/m/Y') }}
                                                @else
                                                    @if(!$card->digital_wp_sent && !$card->digital_email_sent && !$card->digital_email_delivery_date && is_null($card->digital_date_pdf_downloaded))
                                                        Listo para enviar<br>
                                                    @endif
                                                    @if($card->digital_wp_sent)
                                                        Enviado por whatsapp el {{ date_format(date_create($card->digital_date_wp_sent), 'd/m/Y') }}<br>
                                                    @else
                                                        @if($card->digital_wp_delivery_date)
                                                            Programado su envío por whatsapp <br> el {{ date_format(date_create($card->digital_wp_delivery_date), 'd/m/Y') }}<br>
                                                        @endif
                                                    @endif
                                                    @if($card->digital_date_pdf_downloaded)
                                                        PDF descargado el {{ date_format(date_create($card->digital_date_pdf_downloaded), 'd/m/Y') }}<br>
                                                    @endif
                                                    @if($card->digital_email_sent)
                                                        Enviado por email el {{ date_format(date_create($card->digital_date_email_sent), 'd/m/Y') }}<br>
                                                    @else
                                                        @if($card->digital_email_delivery_date)
                                                            Programado para enviar por email el {{ date_format(date_create($card->digital_email_delivery_date), 'd/m/Y') }}<br>
                                                        @endif
                                                    @endif
                                                @endif
                                            @endif
                                        </p>
                                        <div class="col-6" align="right" style="padding: 0">
                                            @if(!$card->used  && !$card->disabled)
                                                <div style="display: flex; justify-content: start; width: 90%">
                                                    <a href="#" class="btn btn--primary btn--rounded"
                                                       data-toggle="modal"
                                                       data-target="#card-popup-whatsapp{{$card->number}}"
                                                       style="font-size:10px; width:95%">
                                                        <i class="fa fa-whatsapp"
                                                           style="font-size:14px">&nbsp;&nbsp;</i>
                                                        Por Whatsapp
                                                    </a>
                                                    <button onmouseleave="toggleTooltip()"
                                                            onmouseover="showTooltip('wp','Configurar el envío del regalo a través del WhatsApp de Golden Pack.', {{ $card->id }});"
                                                            id="button-wp-{{ $card->id }}" class="button-wp"
                                                            onBlur="toggleTooltip()"
                                                            onclick="showTooltip('wp','Configurar el envío del regalo a través del WhatsApp de Golden Pack.', {{ $card->id }});">
                                                        <i style="font-size:20px" class="fa fa-question-circle"></i>
                                                    </button>
                                                </div>
                                                <br>
                                                <div style="display: flex; justify-content: start; width: 90%">
                                                    <a href="#" target="_blank" class="btn btn--primary btn--rounded"
                                                       data-toggle="modal"
                                                       data-target="#card-popup-pdf{{$card->number}}"
                                                       style="font-size:10px; width:95%">
                                                        <i class="fa fa-file-pdf-o" style="font-size:14px"></i>
                                                        Descargar PDF
                                                    </a>
                                                    <button onmouseleave="toggleTooltip()"
                                                            onmouseover="showTooltip('pdf','Descargar el regalo en archivo pdf y compartilo por tu WhatsApp o por donde prefieras.', {{ $card->id }});"
                                                            id="button-pdf-{{ $card->id }}" class="button-pdf"
                                                            onBlur="toggleTooltip()"
                                                            onclick="showTooltip('pdf','Descargar el regalo en archivo pdf y compartilo por tu WhatsApp o por donde prefieras.', {{ $card->id }});">
                                                        <i style="font-size:20px" class="fa fa-question-circle"></i>
                                                    </button>
                                                </div>
                                                <br>
                                                <div style="display: flex; justify-content: start; width: 90%">
                                                    <a href="#" class="btn btn--primary btn--rounded"
                                                       data-toggle="modal" data-target="#card-popup-{{$card->number}}"
                                                       style="font-size:10px; width:95%">
                                                        <i class="fa fa-envelope" style="font-size:18px"></i>
                                                        @if($card->digital_email_sent)
                                                            Reenviar email
                                                        @else
                                                            Configurar email
                                                        @endif
                                                    </a>
                                                    <button onmouseleave="toggleTooltip()"
                                                            onmouseover="showTooltip('mail','Enviar el regalo por e-mail desde una cuenta de Golden Pack.', {{ $card->id }});"
                                                            id="button-mail-{{ $card->id }}" class="button-mail"
                                                            onBlur="toggleTooltip()"
                                                            onclick="showTooltip('mail','Enviar el regalo por e-mail desde una cuenta de Golden Pack.', {{ $card->id }});">
                                                        <i style="font-size:20px" class="fa fa-question-circle"></i>
                                                    </button>
                                                </div>
                                            @endif
                                            <div class="tooltip_example" id="tooltip_example_{{ $card->id }}">
                                                <span id="tooltip-content-{{ $card->id }}"></span>
                                                <!--YOUR CONTENT TOOLTIP-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endif
                        @endforeach
                    </div>
                    <!-- .cart-table end -->
                </div>
                <!-- .col-lg-12 end -->
            </div>
            <!-- .row end -->
        </div>
        <!-- .container end -->
    </section>
    @foreach($cards as $card)
        @if($card->orderItem->product or $card->orderItem->pack)
            @if(!$card->used  && !$card->disabled)
                @include("partials/partial_email_dat")
                {{--Modal para datos del pdf a descargar--}}
                @include("partials/partial_pdf_dat")
                {{--Modal para datos del pdf a enviar por whatsapp--}}
                @include("partials/partial_wp_dat")
            @endif
        @endif
    @endforeach
    {{--Modal para descarga y envio masivo de regalos--}}
    @include("partials/partial_modal_masive_dl")
    @include("partials/partial_modal_masive_pdf")
@endsection

