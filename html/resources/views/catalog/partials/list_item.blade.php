@if(isset($list_item_datum))
    <div class="col-6 col-sm-6 col-md-6 col-lg-3">
        <div class="category-item">
            <div class="category--img">
                <img src="{{ asset($list_item_datum->picture) }}" alt="{{ $list_item_datum->name }}" class="img-fluid" />
                @if($list_item_datum->created_at &&  \Carbon\Carbon::parse($list_item_datum->created_at)->diffInDays(\Carbon\Carbon::now()->subDays(env('NEW_BADGE_DAYS', 30)), false) <= 0  )<span class="featured-item">nuevo</span> @endif
            </div>
            <div class="category--content">
                <div class="category--title">
                    @if(isset($target_route))
                        <h3><a href="{{ route($target_route, $list_item_datum->friendly_url ?: $list_item_datum->id) }}">{{ $list_item_datum->name }}</a></h3>
                        <span>{{ $list_item_datum->city_name  }}</span>
                    @endif
                </div>
                @if(isset($show_price) && $show_price === true)
                    <div class="category--price mt-3">
                        <span>$ {{ \App\Helpers\PriceHelper::getMinPrice($list_item_datum) }} @if($list_item_datum->discount && $list_item_datum->discount > 0)<small><del>$ {{ \App\Helpers\PriceHelper::getMinPrice($list_item_datum, false) }}</del></small>@endif</span>
                    </div>
                @endif
                <div class="category--sub-title mt-3">
                    @if(isset($target_route))
                        <h5><a href="{{ route($target_route, $list_item_datum->friendly_url ?: $list_item_datum->id) }}">{{ \App\Helpers\Helper::trimText($list_item_datum->short_description, 85) }}</a></h5>
                    @endif
                </div>
            </div>
            <div class="category--hover">
                <div class="category--action">
                    <div class="category--action-content">
                        <div class="category--action-icons">
                            {{--                            <a data-toggle="modal" data-target="#product-popup"><i class="ti-search"></i></a>--}}
                            {{--                            <a href="#"><i class="ti-heart"></i></a>--}}
                            {{--                            <a href="#" class="compare" data-toggle="modal" data-target="#compare-popup"><i class="ti-control-shuffle"></i></a>--}}
                        </div>
                        <div class="category--hover-info">
                            <div class="category--title">
                                @if(isset($target_route))
                                    <h3><a href="{{ route($target_route, $list_item_datum->friendly_url ?: $list_item_datum->id) }}">{{ $list_item_datum->name }}</a></h3>
                                @endif
                            </div>
                            @if(isset($show_price) && $show_price === true)
                                <div class="category--price">
                                    <span>$ {{ \App\Helpers\PriceHelper::getMinPrice($list_item_datum) }} @if($list_item_datum->discount && $list_item_datum->discount > 0)<small><del>$ {{ \App\Helpers\PriceHelper::getMinPrice($list_item_datum, false) }}</del></small>@endif</span>
                                </div>
                            @endif
                        </div>
                        @if(isset($target_route))
                            <div class="d-flex justify-content-center">
                                <a href="{{ route($target_route, $list_item_datum->friendly_url ?: $list_item_datum->id) }}" class="btn btn--primary btn--rounded"><i class="icon-bag"></i>Ver detalles</a>
                            </div>
                        @endif
                    </div>

                </div>
            </div>
        </div>
    </div>
@endif
