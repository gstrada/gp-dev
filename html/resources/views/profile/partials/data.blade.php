<h6>Tus Datos</h6>
<form method="POST" action="{{ route('profile.update.data') }}">
    @csrf
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="form-group">
                <label for="name">Nombre</label>
                <input id="name" placeholder="Nombre" type="text" class="form-control text-capitalize" name="name" value="{{ old('name', $user->name) }}" required autocomplete="name" autofocus>
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="form-group">
                <label for="lastname">Apellido</label>
                <input id="lastname" placeholder="Apellido" type="text" class="form-control text-capitalize" name="lastname" value="{{ old('lastname', $user->lastname) }}" required autocomplete="name" autofocus>
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" placeholder="Email" type="email" class="form-control" name="email" value="{{ old('email', $user->email) }}" required autocomplete="email">
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-12 mb-40 text-center">
            <button type="submit" class="btn btn--primary btn--rounded">
                Actualizá
            </button>
        </div>
    </div>
</form>
