<!doctype html>
<html dir="ltr" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
{{--    <meta http-equiv='cache-control' content='no-cache'>--}}
{{--    <meta http-equiv='expires' content='0'>--}}
{{--    <meta http-equiv='pragma' content='no-cache'>--}}
    <title>Golden Pack | Regalos de Experiencias | Regalos Empresariales</title>

    <link rel="apple-touch-icon" sizes="57x57" href="{{ asset('assets/favicon/apple-icon-57x57.png') }}">
    <link rel="apple-touch-icon" sizes="60x60" href="{{ asset('assets/favicon/apple-icon-60x60.png') }}">
    <link rel="apple-touch-icon" sizes="72x72" href="{{ asset('assets/favicon/apple-icon-72x72.png') }}">
    <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('assets/favicon/apple-icon-76x76.png') }}">
    <link rel="apple-touch-icon" sizes="114x114" href="{{ asset('assets/favicon/apple-icon-114x114.png') }}">
    <link rel="apple-touch-icon" sizes="120x120" href="{{ asset('assets/favicon/apple-icon-120x120.png') }}">
    <link rel="apple-touch-icon" sizes="144x144" href="{{ asset('assets/favicon/apple-icon-144x144.png') }}">
    <link rel="apple-touch-icon" sizes="152x152" href="{{ asset('assets/favicon/apple-icon-152x152.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('assets/favicon/apple-icon-180x180.png') }}">
    <link rel="icon" type="image/png" sizes="192x192"  href="{{ asset('assets/favicon/android-icon-192x192.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('assets/favicon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('assets/favicon/favicon-96x96.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('assets/favicon/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('assets/favicon/manifest.json') }}">
    <meta name="msapplication-TileColor" content="#a98d02">
    <meta name="msapplication-TileImage" content="{{ asset('assets/favicon/ms-icon-144x144.png') }}">
    <meta name="theme-color" content="#a98d02">
{{--    <script src="https://kit.fontawesome.com/c7d14ef3bf.js" crossorigin="anonymous"></script>--}}


    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i%7CMontserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i%7CPlayfair+Display:400,400i" rel="stylesheet">

{{--    <link href="{{ asset('assets/css/external.css?v=' . time()) }}" rel="stylesheet">--}}
{{--    <link href="{{ asset('assets/css/style.min.css?v=' . time()) }}" rel="stylesheet">--}}

    <link href="{{ asset('assets/css/external.css')}}" rel="stylesheet">
    <link href="{{ asset('assets/css/style.min.css')}}" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
    <!--[if lt IE 9]>
    <script src="{{ asset('assets/js/html5shiv.js') }}"></script>
    <script src="{{ asset('assets/js/respond.min.js') }}"></script>
    <![endif]-->
    <script src="https://cdn.embluemail.com/pixeltracking/pixeltracking.js?code=825e4a2c9442ccc34545f05c0d978aff"></script>

    @yield('styles')


{{--    @if(env('GOOGLE_ANALITICS_CODE') && strlen(env('GOOGLE_ANALITICS_CODE')))--}}
{{--        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-57097696-1"></script>--}}
{{--        <script>--}}
{{--            window.dataLayer = window.dataLayer || [];--}}
{{--            function gtag(){dataLayer.push(arguments);}--}}
{{--            gtag('js', new Date());--}}

{{--            gtag('config', '{{ env('GOOGLE_ANALITICS_CODE') }}');--}}
{{--        </script>--}}

{{--    @endif--}}

{{--    @if(env('GOOGLE_TRACKING_CODE') && strlen(env('GOOGLE_TRACKING_CODE')))--}}
{{--        <script>--}}
{{--            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){--}}
{{--                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),--}}
{{--                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)--}}
{{--            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');--}}
{{--            ga('create', '{{ env('GOOGLE_TRACKING_CODE') }}', 'auto');--}}
{{--            ga('send', 'pageview');--}}
{{--        </script>--}}
{{--    @endif--}}


{{--    @if(env('GOOGLE_REMARKETING_CODE') && strlen(env('GOOGLE_REMARKETING_CODE')))--}}
{{--        <script type="text/javascript">--}}
{{--            /* <![CDATA[ */--}}
{{--            var google_conversion_id = {{ env('GOOGLE_REMARKETING_CODE') }};--}}
{{--            var google_custom_params = window.google_tag_params;--}}
{{--            var google_remarketing_only = true;--}}
{{--            /* ]]> */--}}
{{--        </script>--}}
{{--        <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">--}}
{{--        </script>--}}
{{--        <noscript>--}}
{{--            <div style="display:inline;">--}}
{{--                <img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/{{env('GOOGLE_REMARKETING_CODE')}}/?value=0&amp;guid=ON&amp;script=0"/>--}}
{{--            </div>--}}
{{--        </noscript>--}}

{{--    @endif--}}
{{--    @if(env('FACEBOOK_PIXEL_CODE') && strlen(env('FACEBOOK_PIXEL_CODE')))--}}

{{--        --}}

{{--        <script>--}}
{{--            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?--}}
{{--                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;--}}
{{--                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;--}}
{{--                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,--}}
{{--                document,'script','https://connect.facebook.net/en_US/fbevents.js');--}}

{{--            fbq('init', '{{env('FACEBOOK_PIXEL_CODE')}}');--}}
{{--            fbq('track', "PageView");</script>--}}
{{--        <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id={{env('FACEBOOK_PIXEL_CODE')}}&ev=PageView&noscript=1"/></noscript>--}}
{{--    @endif--}}

{{--<!-- Facebook Pixel Code -->--}}
{{--    <script>--}}
{{--        !function(f,b,e,v,n,t,s)--}}
{{--        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?--}}
{{--            n.callMethod.apply(n,arguments):n.queue.push(arguments)};--}}
{{--            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';--}}
{{--            n.queue=[];t=b.createElement(e);t.async=!0;--}}
{{--            t.src=v;s=b.getElementsByTagName(e)[0];--}}
{{--            s.parentNode.insertBefore(t,s)}(window, document,'script',--}}
{{--            'https://connect.facebook.net/en_US/fbevents.js');--}}
{{--        fbq('init', '831768370667745');--}}
{{--        fbq('track', 'PageView');--}}
{{--    </script>--}}
{{--    <noscript><img height="1" width="1" style="display:none"--}}
{{--                   src="https://www.facebook.com/tr?id=831768370667745&ev=PageView&noscript=1"--}}
{{--        /></noscript>--}}
{{--    <!-- End Facebook Pixel Code -->--}}


    <!-- Facebook Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '951301638828336');
    fbq('track', 'PageView');
    </script>
    <noscript>
    <img height="1" width="1"
    src="https://www.facebook.com/tr?id=951301638828336&ev=PageView
    &noscript=1"/>
    </noscript>
    <!-- End Facebook Pixel Code -->

    <!-- Facebook Verificacion de metaetiqueta de dominios en seguridad de marca -->
    <meta name="facebook-domain-verification" content="fd3sb1fibelqgsv5d0dwe2052dn51i" />

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-57097696-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-57097696-1');
        gtag('config', 'AW-953769570');

    </script>


    <!-- Agencia -->

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P2CNNG2');</script>
<!-- End Google Tag Manager -->


<!-- Propio -->

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NDD6L2F');</script>
<!-- End Google Tag Manager -->



</head>
<body>



<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P2CNNG2"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->


<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NDD6L2F"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->


{{--<div class="preloader">--}}
{{--    <div class="loader-eclipse">--}}
{{--        <div class="loader-content"></div>--}}
{{--    </div>--}}
{{--</div>--}}
<div id="wrapperParallax" class="wrapper clearfix">

    @include('layouts.header')

    @if ($errors->any())
        <div class="container mt-20">
            <div class="row">
                <div class="col-sm-12 col-md-6 offset-md-3">
                    @foreach ($errors->all() as $error)
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            {{ $error }}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    @endif

    @if (session()->has('success'))
        <div class="container mt-20">
            <div class="row">
                <div class="col-sm-12 col-md-6 offset-md-3">
                    @if(is_array(session()->get('success')))
                        @foreach (session()->get('success') as $message)
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                {{ $message }}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        @endforeach
                    @else
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            {{ session()->get('success') }}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    @endif
    @yield('content')
    <!-- Whatapp Button -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <a href="https://api.whatsapp.com/send?phone=5491135047000&text=Hola!" class="float" target="_blank" id="wp_button"
           style= "position:fixed;
	            width:60px;
	            height:60px;
	            bottom:40px;
	            right:10px;
    	        background-color:#25d366;
	            color:#FFF;
	            border-radius:50px;
    	        text-align:center;
                font-size:30px;
	            box-shadow: 2px 2px 3px #999;
                z-index:10000;
                display: none;">
            <i class="fa fa-whatsapp my-float" style="margin-top:16px;"></i>
        </a>
        <!-- End Whatapp Button -->
   @include('layouts.footer')

</div>

<script src="{{ asset('assets/js/jquery-3.3.1.min.js') }}"></script>
<script src="{{ asset('assets/js/plugins.js') }}"></script>
<script src="{{ asset('assets/js/functions.js') }}"></script>

@yield('scripts')
<script>
    $(document).ready(()=>{
        if($('#show_wp').val() !== 'false'){
            $('#wp_button').css('display', 'block');
        }
    })
</script>
</body>
</html>
