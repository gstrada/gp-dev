<?php

namespace App\Http\Controllers\Landing;

use App\Models\Company;
use App\Models\Manufacturer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        $manufacturers = Manufacturer::enabled()->get();
        $manufacturers = [];
        return view('companies.index', compact('manufacturers'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $contact_company = $request->get('company', null);
        $contact_name = $request->get('name', null);
        $contact_email = $request->get('email', null);
        $contact_phone = $request->get('phone', null);
        $contact_message = $request->get('message', null);

        if(!$contact_company or !$contact_email or !$contact_message){
            return redirect(route('frontend.companies'))->withInput()->with('error', 'La empresa, el email y un mensaje son requeridos');
        }

        $company_name = 'GoldenPack';
        $email = 'comercial@goldenpack.com.ar';

        $subject = 'Empresa - Solicitud de Contacto';

        $content = "<p>Empresa: <strong>$contact_company</strong></p>";
        if($contact_name){
            $content .= "<p>Nombre de la Persona: <strong>$contact_name</strong></p>";
        }
        $content .= "<p>Email: <strong>$contact_email</strong></p>";
        if($contact_phone){
            $content .= "<p>Télefono: <strong>$contact_phone</strong></p>";
        }
        if($contact_message){
            $content .= "<p>Mensaje: <strong>$contact_message</strong></p>";
        }

        Mail::send(array('html' => 'emails.company_contact'), array('title'=> $subject, 'content' => $content), function($message) use ($email,$company_name,$subject){
            $message->to($email, $company_name)->subject($subject);
        });

        return redirect(route('landing.empresas'))->with('flash', 'Los datos fueron enviados correctamente, en breve nos contactaremos, muchas gracias');
    }
}
