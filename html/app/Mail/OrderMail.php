<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $containsDigital;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order, $containsDigital)
    {
        $this->order = $order;
        $this->containsDigital = $containsDigital;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $from_email = env('MAIL_USERNAME');
        $from_name = env('MAIL_FROM_NAME');
        $order = $this->order;
        $containsDigital = $this->containsDigital;
        $title = ' Detalle de tu Pedido';
        return $this->view('pdf.order', compact('order', 'containsDigital'))->from($from_email, $from_name)->subject($title);
    }
}
