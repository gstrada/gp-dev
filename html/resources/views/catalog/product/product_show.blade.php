@extends('layouts.app')

{{--@section('scripts')--}}
{{--    <script>--}}
{{--        $( document ).ready(function() {--}}
{{--            $('input[type=radio][name=delivery_method]').change(function() {--}}
{{--                let price = $(this).data('price');--}}
{{--                $('#product-price').html('$ ' + price);--}}
{{--            });--}}
{{--        });--}}
{{--    </script>--}}
{{--@endsection--}}

@section('content')

    @include('catalog.partials.detail_item', [
        'disable_purchase' => true,
        'detail_item' => $product,
        'detail_item_includes' => $included_in_packs,
        'type' => 'product',
        'related_target_route' => 'frontend.packs.show',
        'show_detail_item_price' => false,
        'show_wp_btn' => 'false',
   ])
@endsection
