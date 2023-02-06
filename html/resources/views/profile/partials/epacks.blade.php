<h6>Tus Epacks</h6>
<div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="entry-widget entry-comments clearfix">
            <div class="entry-widget-content">
                <ul class="comments-list">
                    @foreach($orders as $order)
                        <li class="comment-body">
                            <div class="comment">
                                <h6>ID DE PEDIDO: # {{ str_pad($order->id,8, '0', STR_PAD_LEFT) }}</h6>
                                <div class="date">Fecha: {{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y') }}</div>
                                <p style="max-width: 100%;margin-bottom: 4px" class="font-14">
                                    <span class="font-weight-bold  text-black">Status:</span> @if($order->shipped) Despachada @else @if($order->rejected) Rechazada @else @if($order->approved) Aprobada @else @if($order->processed) Procesada @else Pendiente @endif @endif @endif @endif
                                    @if($order->payment)
                                        | <span class="font-weight-bold text-black">Método de Pago:</span> {{ $order->payment->name }}
                                    @endif
                                    @if($order->payment)
                                        | <span class="font-weight-bold text-black">Total:</span> ${{ $order->amount_to_pay }}
                                    @endif
                                </p>
                                @if($order->shipped)
                                    <p style="max-width: 100%;margin-bottom: 4px" class="font-13">
                                        <span class="font-weight-bold  text-black">Envio:</span> Enviada el dia {{ \Carbon\Carbon::parse($order->date_shipped)->format('d/m/Y') }}
                                    </p>
                                @endif
                                @if($order->has_digital)
                                    <a class="reply mt-20" href="{{ route('frontend.card.manage', $order->id) }}">Enviar regalos digitales (e-packs)</a>
                                @endif
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</div>
