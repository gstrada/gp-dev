@extends('layouts.app')

@section('scripts')
    <script>
        function setSpinner(){
            $('#activar-modal').html('<i style=" font-size:16px" class="fa fa-refresh fa-spin"></i>&nbsp;Enviando')
        }
        function submit_activation_form(){
            number = $('#number').val()
            if(number === '') {
                $("#alert-container").show()
                return false
            }
            const cvvForm = new FormData();
            cvvForm.append("card-number", number);
            $.ajax({
                type: "post",
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                url: '{{ route("frontend.card.link.check_cvv") }}',
                data: cvvForm,
                processData: false,
                contentType: false,
            }).then(function (response) {
                if(response === 'true'){

                    askCvv(number)
                    return false
                } else {
                    $('#activar').html('<i style=" font-size:16px" class="fa fa-refresh fa-spin"></i>&nbsp;Enviando')
                    document.getElementById('form').submit();
                }
            })
        }
        function hideAlert() {
            $("#alert-container").hide()
        }
        function askCvv(number) {
            if(number === '') {
                $("#alert-container").show()
                return false
            }
            $('#cvv-modal-number').val(number)
            $('#cvvModal').modal('show'); // abrir
        }
        $(function(){
            $("#cvvModal").on('hide.bs.modal', function () {
                $('#cvv-modal-number').val("")
            });
            $('#cvv-modal-number').on('focus', function(){
                $(this).alert('close');
            })

        })
    </script>
@endsection

@section('scripts')

@endsection

@section('content')
    <section id="page-title" class="page-title mt-0">
        <input type="hidden" id="show_wp" value="false">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="title title-1 text-center">
                        <div class="title--content">
                            <div class="title--heading">
                                <h1>Activá tu código</h1>
                                <h5>para abrir tu regalo <br> y conocer las experiencias disponibles para elegir</h5>
                            </div>
                        </div>
                    <!--                        <div class="clearfix"></div>
                        <ol class="breadcrumb breadcrumb-bottom">
                            <li><a href="{{ route('home') }}">Goldenpack</a></li>
                        </ol> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="contact1" class="contact contact-1 pt-50 pb-110">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-12 col-lg-6 align-self-center">
                    <div class="row ">
                        <div class="col-12">
                            <form method="POST" data-ajax="false" id="form" action="{{ route("frontend.card.link.store") }}">
                                @csrf
                                <div data-role="fieldcontain">
                                    <div class="form-group text-center">
                                        <label for="number">Código o Número de Tarjeta</label>
                                        <input type="text" class="form-control h-auto mb-3 text-center" onfocusin="hideAlert()" name="number" id="number" placeholder="###### ###### ##########" value="{{ old('number', $number) }}" required>
                                    </div>
                                    <div id="alert-container" style="display: none">
                                        <div class="alert-warning d-flex justify-content-center align-items-center" id="myAlert" style="height: 3em; border-radius: 5px">
                                            <strong>El nº de tarjeta es obligatorio!</strong>
                                        </div>
                                    </div>
{{--                                    <div class="mt-30 text-center">--}}
{{--                                        <button type="submit" formaction="{{ route('frontend.card.link.check') }}" class="btn btn--secondary btn--rounded w-auto pr-5 pl-5">Verificar vigencia</button>--}}
{{--                                    </div>--}}
                                    <div class="mt-20 text-center">
                                        <button type="button" class="btn btn--primary btn--rounded w-auto pr-5 pl-5" onclick="submit_activation_form($('#form'))" id="activar">Activar</button>
                                        {{--<button type="submit" formaction="{{ route('frontend.card.link.store') }}" class="btn btn--primary btn--rounded w-auto pr-5 pl-5">Activar</button>--}}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- CVV Modal -->
    <div class="modal fade" id="cvvModal">
        <div class="modal-dialog modal-sm d-flex justify-content-center">
            <div class="modal-content col-sm-12 col-md-4 col-xs-12">
                <!-- Modal Header -->
                <div class="modal-header">
                    <div class="">
                        <a href="https://goldenpack.com.ar" style="display: block; border: 0px !important;">
                            <img border="0" style="display: block; width: 100px;height: auto" src="{{ asset('assets/images/logo/logo-dark.png') }}" alt=""/>
                        </a>
                    </div>
                    <button type="button" class="" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body" id="cvv-modal-body">
                    <div class="d-flex justify-content-center">
                        <span><strong>Por favor ingresa el código CVV</strong></span>
                    </div>
                    <br>
                    <form method="POST" data-ajax="false" id="cvv-modal-form" action="{{ route('frontend.card.link.store') }}" onsubmit="setSpinner()">
                        @csrf
                        <label for="number">Código o Número de Tarjeta</label>
                        <input readonly type="text" class="form-control h-auto mb-3 text-center" name="cvv-modal-number" id="cvv-modal-number" placeholder="" value="" required>
                        <br>
                        <label for="number">CVV</label>
                        <input required type="text" class="form-control h-auto mb-3 text-center" name="cvv-modal-cvv" id="cvv-modal-cvv" placeholder="" value="">
                        <div class="mt-30 text-center">
                            <button type="submit"  class="btn btn--primary btn--rounded w-auto pr-5 pl-5" id="activar-modal">Activar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
