@extends('layouts.app')

@section('content')
    <section id="category7" class="category category-3 mt-0 pt-40">

        <div class="container">
            @include('catalog.partials.list_filter')

            @if(count($packs) > 0)
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="category-num pull-left pull-none-xs mb-20">
                        <h1 class="font-18">Packs para regalar</h1>
                    </div>
                </div>
            </div>
            <div class="row mb-30">
                @foreach($packs as $datum_pack)
                @include('catalog.partials.list_item', ['list_item_datum' => $datum_pack, 'show_price' => true, 'target_route' => 'frontend.packs'])
                @endforeach
            </div>
            @endif

            @if(count($products) > 0)
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="category-num pull-left pull-none-xs mb-20">
                        <h1 class="font-18">Experiencias individuales</h1>
                    </div>
                </div>
            </div>
            <div class="row mb-30">
                @foreach($products as $datum_product)
                    @include('catalog.partials.list_item', ['list_item_datum' => $datum_product, 'show_price' => false, 'target_route' => 'frontend.products'])
                @endforeach
            </div>
            @endif

{{--            <div class="row">--}}
{{--                <div class="col-sm-12 col-md-12 col-lg-12 clearfix text--center">--}}
{{--                    <ul class="pagination">--}}
{{--                        <li><a href="#" aria-label="previous"><i class="fa fa-chevron-left"></i></a></li>--}}
{{--                        <li><a href="#">1</a></li>--}}
{{--                        <li class="active"><a href="#">2</a></li>--}}
{{--                        <li><a href="#">3</a></li>--}}
{{--                        <li><a href="#">4</a></li>--}}
{{--                        <li><a href="#">...</a></li>--}}
{{--                        <li><a href="#">10</a></li>--}}
{{--                        <li><a href="#">11</a></li>--}}
{{--                        <li><a href="#">12</a></li>--}}
{{--                        <li><a href="#" aria-label="Next"><i class="fa fa-chevron-right"></i></a></li>--}}
{{--                    </ul>--}}
{{--                </div>--}}
{{--            </div>--}}
        </div>
    </section>
@endsection
