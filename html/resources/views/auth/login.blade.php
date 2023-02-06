@extends('layouts.app')

@section('content')
    <section id="page-title" class="page-title mt-0">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="title title-1 text-center">
                        <div class="title--content">
                            <div class="title--heading">
                                <h1>¡Iniciá sesión!</h1>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <ol class="breadcrumb">
                            <li><a href="{{ url('/') }}">GoldenPack</a></li>
                            <li class="active">Ingresá a tu cuenta</li>
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
                        <h4>Ingresá a Goldenpack</h4>
                        <p>Accedé a tu cuenta para regalar experiencias y momentos inolvidables</p>
                    </div>
                    <!-- .register-title end -->
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                <div class="form-group">
                                    <input id="email" type="email" placeholder="Email" class="form-control" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                                    @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                <div class="form-group">
                                    <input id="password" type="password" placeholder="Clave" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12 mb-20">
                                <div class="input-checkbox inline-block">
                                    <label class="label-checkbox">Manteneme conectado
                                        <input type="checkbox" checked="checked" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                        <span class="check-indicator"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12 mb-15 text-center">
                                @if (Route::has('password.request'))
                                    <a class="forget--password" href="{{ route('password.request') }}">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                @endif
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12 mb-30 text-center">
                                <button type="submit" class="btn btn--primary btn--rounded">
                                    Ingresá
                                </button>
                            </div>

                            <div class="col-sm-12 col-md-12 col-lg-12 mb-15 text-center">
                                <a class="forget--password font-15" href="{{ route('register') }}">
                                    ¿No tenés cuenta? Creá una ahora!


                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
