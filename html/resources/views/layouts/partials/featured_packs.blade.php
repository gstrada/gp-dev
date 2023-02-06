@if(count($featuredPacks) > 0)
<section id="products-carousel2" class="products-carousel products-carousel-2 pt-0 pb-0">
    <div class="container-fluid pr-0 pl-0">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
                <div class="carousel owl-carousel pt-0 pb-0" data-slide="4" data-slide-rs="2" data-autoplay="true" data-nav="true" data-dots="false" data-space="0" data-loop="true" data-speed="800">
                    @foreach($featuredPacks as $featuredPack)
                        <div class="product-item ml-5 mr-5">
                            <div class="product--img">
                                <img src="{{ asset($featuredPack->picture) }}" alt="{{ $featuredPack->name }}">
                            </div>
                            <div class="product--hover">
                                <div class="product--action">
                                    <div class="product--action-content" style="bottom: 30px">
                                        <h3><a href="{{ route('frontend.packs', $featuredPack->sku) }}">{{ $featuredPack->name }}</a></h3>
                                        <p class="font-11">{{ \App\Helpers\Helper::trimText( $featuredPack->short_description, 80)  }}</p>
                                        <a href="{{ route('frontend.packs', $featuredPack->sku) }}" class="btn btn--underlined">VER MAS</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</section>
@endif
