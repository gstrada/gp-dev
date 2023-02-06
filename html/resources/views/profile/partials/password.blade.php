<h6>Tu Clave</h6>
<form method="POST" action="{{ route('profile.update.password') }}">
    @csrf
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="form-group">
                <label for="password">Clave</label>
                <input id="password" placeholder="Clave" type="password" class="form-control" name="password" required autocomplete="new-password">
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="form-group mb-40">
                <label for="name">Confirmá tu clave</label>
                <input id="password-confirm" placeholder="Confirmá tu clave" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-12 mb-40 text-center">
            <button type="submit" class="btn btn--primary btn--rounded">
                Actualizá
            </button>
        </div>
    </div>
</form>
