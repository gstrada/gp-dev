<h6>Intercambiá Usuarios</h6>
<form method="POST" action="{{ route('profile.swap.user') }}">
    @csrf
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" placeholder="Email del usuario" type="email" class="form-control" name="email" value="{{ old('email', null) }}" required autofocus>
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-12 mb-40 text-center">
            <button type="submit" class="btn btn--primary btn--rounded">
                Intercambiá
            </button>
        </div>
    </div>
</form>
