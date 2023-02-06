@extends('layouts.no_footer')
@section('styles')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://npmcdn.com/tootik@1.0.2/css/tootik.min.css">
    <link rel="stylesheet" href="{{  asset('css/manage_ecard.css')  }}">
@endsection

@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://npmcdn.com/flatpickr/dist/l10n/es.js"></script>
@endsection

@section('content')
    <style>
        th, td { white-space: nowrap; }
        .table-dtble {
            width: 100% !important;
            margin: 0px !important
        }
    </style>
<div class="container-fluid">
    <h3>Reservas</h3>
    <input type="hidden" name="thru" id="thru" value="2">
</div>
<div class="container-fluid" style="width: 100% !important; margin: auto !important">
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
            <a onclick="changeThru(2, 'filter')" class="nav-link active" data-toggle="tab" href="#home">A través de GoldenPack</a>
        </li>
        <li class="nav-item">
            <a onclick="changeThru(1, 'filter_pv')" class="nav-link" data-toggle="tab" href="#menu1">A través del prestador</a>
        </li>
    </ul>
</div>
<!-- Tab panes -->
<div class="tab-content container-fluid">
    <div id="home" class="container-fluid tab-pane active"><br>
        <br>
        <div class="col-lg-2 col-sm-12" style="padding-left: 0px">
            <select style="width: 250px !important; height: 35px !important" name="filter" id="filter" onchange="filterTable(this.value, 'filter')">
                <option value="all" selected>Todas</option>
                <option value="new" >Nuevas</option>
                <option value="pending">Pendientes</option>
                <option value="in_process">En proceso</option>
                <option value="cancelled">Canceladas</option>
                <option value="used">Usadas</option>
            </select>
        </div>
        <br>
        <table class="table table-striped table-bordered table-dtble" style="width:100%;" id="reservations-table">
            <thead>
            <tr>
                <th style="color: white !important" class="text-center">Nombre Apellido</th>
                <th style="color: white !important" class="text-center">Cel contacto</th>
                <th style="color: white !important" class="text-center">Prestador</th>
                <th style="color: white !important" class="text-center">Fecha Pedido reserva</th>
{{--                <th style="color: white !important" class="text-center">Hora reserva</th>--}}
                <th style="color: white !important" class="text-center">Estado</th>
                <th style="color: white !important" class="text-center">Código</th>
                <th style="color: white !important" class="text-center">Código Corto</th>
                <th style="color: white !important" class="text-center">Acciones</th>
            </tr>
            </thead>
        </table>
        <br>
    </div>
    <div id="menu1" class="container-fluid tab-pane fade"><br>
        <br>
        <div class="col-lg-2 col-sm-12" style="padding-left: 0px">
            <select style="width: 250px !important; height: 35px !important" name="filter_pv" id="filter_pv" onchange="filterTable(this.value, 'filter_pv')">
                <option value="all" selected>Todas</option>
                <option value="new" >Nuevas</option>
                <option value="pending">Pendientes</option>
                <option value="in_process">En proceso</option>
                <option value="cancelled">Canceladas</option>
                <option value="used">Usadas</option>
            </select>
        </div>
        <br>
        <table class="table table-striped table-bordered table-dtble" style="width:100%" id="reservations-pv-table">
            <thead>
            <tr>
                <th style="color: white !important" class="text-center">Nombre Apellido</th>
                <th style="color: white !important" class="text-center">Cel contacto</th>
                <th style="color: white !important" class="text-center">Prestador</th>
                <th style="color: white !important" class="text-center">Fecha Pedido reserva</th>
{{--                <th style="color: white !important" class="text-center">Hora reserva</th>--}}
                <th style="color: white !important" class="text-center">Estado</th>
                <th style="color: white !important" class="text-center">Código</th>
                <th style="color: white !important" class="text-center">Código Corto</th>
                <th style="color: white !important" class="text-center">Acciones</th>
            </tr>
            </thead>
        </table>
        <br>
    </div>
</div>
<script>
    var table
    var tablePv
    buttons =  [ {
        text: 'Descargar como excel',
        title: 'test',

    }];
    let dTurl = '{!! route('backend.reservations.list', [":status", ":thru"]) !!}'
    let thruVal = $("#thru").val()
    dTurl = dTurl.replace(':thru',thruVal);
    dTurl = dTurl.replace(':status','all');
    $(document).ready((function() {
        table = $('#reservations-table').DataTable({
            processing: false,
            serverSide: false,
            scrollX: true,
            language: {
                processing    : "Procesando...",
                search        : "Buscar&nbsp;:",
                lengthMenu    : "Mostrar _MENU_ registros",
                info          : "Mostrando reservas _START_ a _END_ de _TOTAL_ reservas",
                infoEmpty     : "Mostrando 0 a 0 de 0 elementos",
                infoFiltered  : "(filtrado de _MAX_ elementos total)",
                infoPostFix   : "",
                loadingRecords: "Cargando...",
                zeroRecords   : "No hay registros para mostrar",
                emptyTable    : "No hay registros para mostrar",
                paginate      : {
                    first   : "Primero",
                    previous: "Anterior",
                    next    : "Siguiente",
                    last    : "Último"
                },
                aria          : {
                    sortAscending : ": Click para orden creciente",
                    sortDescending: ": Click para orden decreciente"
                }
            },
            ajax: {url: dTurl,dataSrc:""},
            columns: [
                { data: 'nombre_apellido' },
                { data: 'contact_phone' },
                { data: 'prestador' },
                { data: 'created_at' },
                // { data: 'reservation_date' },
                // { data: 'reservation_hour' },
                { data: 'status' },
                { data: 'card_number' },
                { data: "custom_number", render: function(data, type, row) {return (row.custom_number !== "null") ? row.custom_number: "" ;}},
                { data     : "id", width: "60px", render: function(data, type, row)
                    {
                        return '<div class="col-12">' +
                            "<input type='hidden' id='datos-"+row.id+"' value='"+JSON.stringify(row)+"'/>" +
                            '<button type="button" id="' + row.id +
                            '" data-toggle="modal"  data-target="#popup-reserva-detalle"  onclick="fill_modal(id)" title="Mostrar detalle"><i class="fa fa-eye"></>Detalle</button></div></div>';
                    },
                    className: "text-center", sortable: false
                }
            ]
        });

        tablePv = $('#reservations-pv-table').DataTable({
            processing: false,
            serverSide: false,
            scrollX: true,
            language: {
                processing    : "Procesando...",
                search        : "Buscar&nbsp;:",
                lengthMenu    : "Mostrar _MENU_ registros",
                info          : "Mostrando reservas _START_ a _END_ de _TOTAL_ reservas",
                infoEmpty     : "Mostrando 0 a 0 de 0 elementos",
                infoFiltered  : "(filtrado de _MAX_ elementos total)",
                infoPostFix   : "",
                loadingRecords: "Cargando...",
                zeroRecords   : "No hay registros para mostrar",
                emptyTable    : "No hay registros para mostrar",
                paginate      : {
                    first   : "Primero",
                    previous: "Anterior",
                    next    : "Siguiente",
                    last    : "Último"
                },
                aria          : {
                    sortAscending : ": Click para orden creciente",
                    sortDescending: ": Click para orden decreciente"
                }
            },
            ajax: {url: dTurl,dataSrc:""},
            columns: [
                { data: 'nombre_apellido' },
                { data: 'contact_phone' },
                { data: 'prestador' },
                { data: 'created_at' },
                // { data: 'reservation_date' },
                // { data: 'reservation_hour' },
                { data: 'status' },
                { data: 'card_number' },
                { data: "custom_number", render: function(data, type, row) {return (row.custom_number !== "null") ? row.custom_number: "" ;}},
                { data     : "id", width: "60px", render: function(data, type, row)
                    {
                        return '<div class="col-12">' +
                            "<input type='hidden' id='datos-"+row.id+"' value='"+JSON.stringify(row)+"'/>" +
                            '<button type="button" id="' + row.id +
                            '" data-toggle="modal"  data-target="#popup-reserva-detalle"  onclick="fill_modal(id)" title="Mostrar detalle"><i class="fa fa-eye"></>Detalle</button></div></div>';
                    },
                    className: "text-center", sortable: false
                }
            ]
        });
    }));
    var datos
    function fill_modal(id){
        let objDatos = JSON.parse($('#datos-' + id).val())
        console.log(objDatos)
        $('#res_number').val(id)
        $('#card_number').val(objDatos.card_number)
        $('#custom_number').val(objDatos.custom_number !== 'null' ? objDatos.custom_number : '' )
        $('#cvv').val(objDatos.cvv !== 'null' ? objDatos.cvv : '')
        $('#fecha_pedido').val(moment(objDatos.reservation_date, 'YYYY-MM-DD').format('DD/MM/YYYY') + ' ' + moment(objDatos.reservation_hour, 'HH:mm:ss').format('HH:mm'))
        $('#tel_contacto').val(objDatos.contact_phone)
        $('#prestador').val(objDatos.prestador)
        $('#loc_prestador').val(objDatos.localidad_prestador)
        $('#pack').val(objDatos.pack)
        $('#q_personas').val(objDatos.q_personas)
        $('#status').val(objDatos.status)
        $('#a_nombre').val(objDatos.nombre_apellido)
        $('#obs').html(objDatos.observations)
        $('#fecha_solic').val(moment(objDatos.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'))
        $('#fecha_canjeado').val(objDatos.date_activated != null ? moment(objDatos.date_activated, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') : '')
        $('#prestador_canje').val(objDatos.used_on)
        $('#responsable').val(objDatos.responsable)
        $('#comm').val(objDatos.comments)
    }

    function filterTable(filterValue, nameSelect) {
        let thruInput = $("#thru")
        let newUrl = '{!! route('backend.reservations.list', [":status", ":thru"]) !!}'
        let thruVal = thruInput.val()
        let stVal = $("#" + nameSelect).val()
        newUrl = newUrl.replace(':thru',thruVal);
        newUrl = newUrl.replace(':status',stVal);
        table.ajax.url(newUrl).load()
        table.draw();
        tablePv.ajax.url(newUrl).load()
        tablePv.draw();
    }

    function update_reservation() {
        let thruInput = $("#thru")
        const form = new FormData();
        form.append("id", $("#res_number").val())
        form.append("status", $("#status").val())
        form.append("responsable", $("#responsable").val())
        form.append("comments", $("#comm").val())
        $.ajax({
            type: "post",
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            url: '{{ route("backend.reservation.update") }}',
            data: form,
            processData: false,
            contentType: false,
        }).then(function (response) {
            $('#popup-reserva-detalle').modal('hide')
            if(thruInput.val() == 2) {
                table.ajax.reload(null,false);
            } else {
                tablePv.ajax.reload(null,false);
            }

        });
    }
    function changeThru(newVal, nameSelect) {
        console.log(nameSelect)
        let thruInput = $("#thru")
        thruInput.val(newVal)
        let newUrl = '{!! route('backend.reservations.list', [":status", ":thru"]) !!}'
        let thruVal = thruInput.val()
        let stVal = $("#" + nameSelect).val()
        newUrl = newUrl.replace(':thru',thruVal);
        newUrl = newUrl.replace(':status',stVal);
        table.ajax.url(newUrl).load()
        table.draw();
        tablePv.ajax.url(newUrl).load()
        tablePv.draw();
    }

</script>
@include("partials/partial_modal_reserva_detalle")
@endsection
