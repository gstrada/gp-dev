<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ActivateECardMail extends Mailable
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

        $from_email = env('MAIL_USERNAME');
        $from_name = env('MAIL_FROM_NAME');
        $card = $this->card;
        $title = 'Activación de código Goldenpack';
        return $this->view('emails.activate_ecard', compact('card'))->from($from_email, $from_name)->subject($title);
    }
}
