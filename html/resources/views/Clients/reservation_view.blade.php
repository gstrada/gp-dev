@extends('layouts.app')

@section('content')

    @include([
        'reservation' => $reservation,
    ])
@endsection
