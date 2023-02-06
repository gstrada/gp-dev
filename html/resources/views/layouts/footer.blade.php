<footer id="footerParallax" class="footer footer-2 footer-4">
    <div class="container">
        <div class="footer-widget">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-5ths widget--logo text-center-xs">
                    <div class="widget--content">
                        <div class="widget--logo-img">
                            <img src="{{ asset('assets/images/logo/logo-light.png') }}" alt="logo">
                        </div>
                    </div>
                    <div class="footer--copyright">
                        <span>&copy; @php echo date('Y') @endphp <a href="{{ url('/') }}">Goldenpack</a><br/> <small>Todos los derechos reservados</small></span>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-5ths text-center-xs widget--contact-info">
                    <div class="widget--content">
                        <ul class="list-unstyled">
                            <!-- <li class="text-white">Luis de Tejeda 3933</li>
                            <li><small>PB. Oficina 2</small></li>
                            <li><small>Córdoba, Argentina</small></li> -->
                            <li><a href="info@goldenpack.com.ar" class="text-white">info@goldenpack.com.ar</a></li>
                            <li><a href="tel:0800 444 7225" class="text-white">0800 444 7225 (PACK)</a></li>
                            <li><a href="https://api.whatsapp.com/send?phone=5491135047000&text=Hola!" class="text-white">WhatsApp Argentina: +5491135047000</a></li>
                            <li><a href="https://api.whatsapp.com/send?phone=5493512525555&text=Hola!" class="text-white">WhatsApp Córdoba: +5493512525555</a></li>
                            <li ><a href="https://goldenpack.com.ar/puntosderetiro" class="footer-active">Puntos de Retiro</a></li>
                            <li></br></li>                        
                            <!-- <li><p class="footer-active"><br>Puntos de Retiro</p></li>
                            <li><p class="text-white">
                                    Blackpool Cerro<br>
                                    <small>Manuel E. Pizarro 2095, Córdoba  <br>Lun. a Vier: 09:00 a 17:30 hs <br>Sáb: 09:00 a 13:00 hs</small>
                                </p>
                            </li>
                            <li><p class="text-white">
                                    Blackpool Centro<br>
                                    <small>Deán Funes 395, Córdoba  <br>Lun. a Vier: 09:00 a 17:00 hs <br>Sáb: 09:00 a 13:00 hs</small>
                                </p>
                            </li> -->
                        </ul>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-5ths text-center-xs widget--links">
                    <div class="widget--content">
                        <ul class="list-unstyled">
                            <li><a href="{{ route('contact') }}">Contacto </a></li>
                            <li><a href="{{ route('privacy') }}">Políticas de privacidad</a></li>
                            <li><a href="{{ route('terms') }}">Términos y condiciones</a></li>
                            <li><a href="{{ route('faq') }}">Preguntas Frecuentes</a></li>
                            <li ><a href="{{ route('landing.empresas') }}" class="text-white">Soluciones a empresas</a></li>
                            <li ><a href="https://prestador.goldenpack.com.ar" class="footer-active">Acceso a Prestador</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-5ths text-center-xs widget--newsletter">
                    <div class="widget--content">
{{--                        <h3>GET 20% OFF</h3>--}}
                        <p>Subscribite a nuestra newsletter</p>
                        <form class="mailchimp form--newsletter">
                            <input type="email" class="form-control" placeholder="Ingresá tu email" required>
                            <button type="submit"><i class="fa fa-chevron-right"></i></button>
                            <div class="subscribe-alert"></div>
                        </form>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-5ths text-center-xs widget--social">
                    <div class="widget--content">
                        <div class="social--icons">
                            <span>Seguinos</span>
                            <a class="facebook" href="https://www.facebook.com/goldenpackargentina/">
                                <i class="fa fa-facebook"></i>
                            </a>
                            <a class="instagram" href="https://www.instagram.com/golden.pack/">
                                <i class="fa fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
