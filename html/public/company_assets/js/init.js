(function($) {
    "use strict";
    var win = $(window);
    /* SLIDER */
    $('.owl-slider--home').on('initialized.owl.carousel changed.owl.carousel', function(e) {
        if (!e.namespace) {
            return;
        }
        var carousel = e.relatedTarget;
        var owlCurrentSlide = (carousel.relative(carousel.current()) + 1);
        var owlCountSlides = ((carousel.items().length));
        if (owlCurrentSlide < 10) {
            owlCurrentSlide = ("0" + owlCurrentSlide);
        }
        if (owlCountSlides < 10) {
            owlCountSlides = ("0" + owlCountSlides);
        }
        $('.owl-numbers .owl-current').text(owlCurrentSlide);
        $('.owl-numbers .owl-all').text(owlCountSlides);
    }).owlCarousel({
        loop: true,
        margin: 0,
        autoplay: false,
        nav: true,
        dots: false,
        navText: ['Prev', 'Next'],
        paginationNumbers: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    /* REVIEWS CAROUSEL */
    $('.owl-carousel--reviews').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: false,
        autoplayTimeout: 6000,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    /* CONTENT SLIDER */
    $('.owl-slider--content').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 6000,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    /* OUR TEAM SLIDER */
    $('.owl-carousel--our-team').owlCarousel({
        loop: true,
        margin: 30,
        autoplay: false,
        autoplayTimeout: 6000,
        nav: true,
        navText: ['<span><i class="fa fa-chevron-left"></i></span>', '<span><i class="fa fa-chevron-right"></i></span>'],
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });
    /* PROGRESS BAR */
    if ($('.section-skills-bars')[0]) {
        var percentCount1 = $('#percentCount1').text();
        var percentCount2 = $('#percentCount2').text();
        var percentCount3 = $('#percentCount3').text();
        $.fn.isInViewport = function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();

            var viewportTop = win.scrollTop();
            var viewportBottom = viewportTop + win.height();

            return elementBottom > viewportTop && elementTop < viewportBottom;
        };
        win.on('resize scroll', function() {
            if ($('.section-skills-bars').isInViewport()) {
                $('#bar1').css('width', percentCount1);
                $('#bar2').css('width', percentCount2);
                $('#bar3').css('width', percentCount3);
            }
        });
    }
    /* ABOUT CAROUSEL */
    $('.owl-carousel--about').owlCarousel({
        loop: true,
        margin: 30,
        autoplay: false,
        autoplayTimeout: 6000,
        nav: true,
        navText: ['<span><i class="fa fa-chevron-left"></i></span>', '<span><i class="fa fa-chevron-right"></i></span>'],
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });
    /* STICKY HEADER */
    win.on('scroll', function() {
        var winTop = win.scrollTop();
        var sticky = $('.navbar-custom').outerHeight();
        if (winTop >= sticky) {
            $(".navbar-custom").addClass("navbar-fixed");
        } else {
            $(".navbar").removeClass("navbar-fixed");
        }
    });


    /* SMOOTH SCROLL */
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('[class="anchor"]')
        .on('click' , function(event) {
            if ( location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname ) {
                var trigger = this;
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1200, function() {
                        window.location.href = trigger.href;
                    });
                }
            }
        });
    $('.to-top').on('click', function(e) {
        $('html,body').animate({
            scrollTop: 0
        }, 1100);
        e.preventDefault();
    });
    /* MENU DROPDOWN */
    $('.navbar-nav .dropdown  > a').on('click hover', function(e) {
        if ((win.width() <= 1039) && (win.width() >= 768)) {
            e.preventDefault();
            //$(this).parent().children('ul').toggleClass('show');
            if (!$(this).parent().children('ul').hasClass('show')) {
                window.location = this.href;
            }
        }
    });
    $('.navbar-nav .dropdown  > a').on('click hover', function(e) {
        if ((win.width() > 1039)) {
            e.preventDefault();
            window.location = this.href;
        }
    });
    $('.navbar-nav .dropdown  > .dropdown-toggle').on('click hover', function(e) {
        if ((win.width() <= 767)) {
            e.preventDefault();
            $(this).parent().children('ul').toggleClass('show');
            if (!$(this).parent().children('ul').hasClass('show')) {
                window.location = this.href;
            }
        }
    });
    /* PRELOADER */
    setTimeout(function() {
        $('.loader').fadeOut();
        $('.page-load').fadeOut();
    }, 1200);
    win.scroll(function() {
        if (win.scrollTop() > 200) {
            $('.to-top').addClass('to-top-visible');
        } else {
            $('.to-top').removeClass('to-top-visible');
        }
    });
    /* GALLERY */
    var $container = $(".grid");
    if ($('.grid').length > 0) {
        $container.imagesLoaded(function() {
            $container.masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                percentPosition: true
            });
        });
    }
    var $grid = $('.gridfilter');
    if ($('.gridfilter').length > 0) {
        $container.imagesLoaded(function() {
            $grid.isotope({
                itemSelector: '.element-itemfilter'
            });
            $('.filters-button-group li').on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
            });
        });
    }
})(jQuery);