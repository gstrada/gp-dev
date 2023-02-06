@extends('layouts.app')

@section('content')

    @include('catalog.partials.detail_item', [
        'disable_purchase' => false,
       'detail_item' => $pack,
       'detail_item_includes' => $included_products,
       'type' => 'pack',
       'related_target_route' => 'frontend.products',
       'show_detail_item_price' => false,
        'show_wp_btn' => 'false',
   ])

@endsection
