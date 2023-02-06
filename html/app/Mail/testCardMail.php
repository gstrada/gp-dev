<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Card\Card;

class testCardMail extends Mailable
{
    use Queueable, SerializesModels;

    public $card;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($card)
    {
        $this->card = $card;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        $from_email = 'notificaciones@goldenpack.com.ar';
        $from_name = 'Goldenpack';
        $card = $this->card;
        $title =  ' Recibiste un Epack!';
        return $this->view('emails.newEmail', compact('card'))->from($from_email, $from_name)->subject($title);
    }
}
