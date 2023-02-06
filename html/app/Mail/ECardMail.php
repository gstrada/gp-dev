<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ECardMail extends Mailable
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
        $title = $card->name . ' Recibiste un Epack!';
        if($card->digital_recipient_message_title){
            $title = $card->digital_recipient_message_title;
        }
        return $this->view('emails.newEmail', compact('card'))->from($from_email, $from_name)->subject($title);
//        return $this->view('emails.old_ecard', compact('card'))->from($from_email, $from_name)->subject($title);
    }
}
