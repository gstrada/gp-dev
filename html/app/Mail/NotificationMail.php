<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $card;
    public $mensaje;
    public $title;
    public $success;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($card, $message, $title, $success)
    {
        $this->card = $card;
        $this->mensaje = $message;
        $this->title = $title;
        $this->success = $success;
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
        $title = $this->title;
        return $this->view('emails.notification')->from($from_email, $from_name)->subject($title);
    }
}
