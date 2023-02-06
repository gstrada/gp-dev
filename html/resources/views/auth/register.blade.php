@extends('layouts.app')

@section('content')
    <section id="page-title" class="page-title mt-0">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="title title-1 text-center">
                        <div class="title--content">
                            <div class="title--heading">
                                <h1>¡Creá tu cuenta!</h1>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <ol class="breadcrumb">
                            <li><a href="{{ url('/') }}">GoldenPack</a></li>
                            <li class="active">Registrate ahora</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="register-login" class="register-login pt-30 pb-150">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6 offset-md-3">
                    <div class="register-title">
                        <h4>¿No tenés cuenta?</h4>
                        <p>Registrate y descubrí la experiencia Goldenpack</p>
                    </div>
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                <div class="form-group">
                                    <input id="name" placeholder="Nombre" type="text" class="form-control text-capitalize" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                <div class="form-group">
                                    <input id="email" placeholder="Email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autocomplete="email">
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                <div class="form-group">
                                    <input id="password" placeholder="Clave" type="password" class="form-control" name="password" required autocomplete="new-password">
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                <div class="form-group mb-40">
                                    <input id="password-confirm" placeholder="Confirmá tu clave" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12 mb-40">
                                <div class="input-checkbox inline-block">
                                    <label class="label-checkbox">Acepto los términos, condiciones y póliticas de privacidad de este sitio web.
                                        <input type="checkbox" name="accept">
                                        <span class="check-indicator"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12 mb-15 text-center">
                                <a class="forget--password" href="{{ route('login') }}">
                                    ¿Ya tenés cuenta?
                                </a>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12 mb-40 text-center">
                                <button type="submit" class="btn btn--primary btn--rounded">
                                    Registrate
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </section>
@endsection
