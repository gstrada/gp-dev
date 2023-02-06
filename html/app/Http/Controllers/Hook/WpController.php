<?php
namespace App\Http\Controllers\Hook;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Frontend\Card\CardController;

class WpController extends Controller
{

    /**
     * Create a new controller instance.
     * @return void
     */
    public function __construct()
    {

    }
    public function sendWhatsappWebhook(Request $request){
//        \Log::debug('WP API Response: ' . json_encode($request->get('entry')[0]['changes'][0]['value']['statuses']));
        if(isset($request->get('entry')[0]['changes'][0]['value']['messages'][0]['from'])){
            \Log::debug('WP API Response: ' . $request->get('entry')[0]['changes'][0]['value']['messages'][0]['from']);
            $sender = $request->get('entry')[0]['changes'][0]['value']['messages'][0]['from'];
            $postFields = $this->composeWpMessage($sender);
            $oCardCtrl = new CardController();
            $oCardCtrl->sendWhatsappApi($postFields);
        }

        return "success";
    }
    public function getWhatsappWebhook(Request $request){
        \Log::debug('WP API Response: ' . $_GET['hub_challenge']);
        return $_GET['hub_challenge'];
    }

    /**
     * Compose the body of the message to send to whatsapp api
     * @return string
     */
    private function composeWpMessage($tel) {
        $array = [
            "messaging_product"=>"whatsapp",
            "to"=>$tel,
            "type"=>"template",
            "template"=>[
                "name"=>"auto_response",
                "language"=>[
                    "code"=>"es_AR"
                ]
            ]
        ];

        return json_encode($array);
    }
}
