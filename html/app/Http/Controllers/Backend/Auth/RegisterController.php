<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Helpers\Helper;
use App\Helpers\VerificationHelper;
use App\Models\Seller\ExternalSeller;
use App\Models\User\User;
use App\Models\User\UserInformation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Spatie\LaravelImageOptimizer\Facades\ImageOptimizer;


class RegisterController extends Controller
{
    protected static $uploadPath = 'users/';

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'social_number' => 'required|numeric',
            'phone' => 'required|numeric',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'password_confirmation' => 'required|same:password',
        ],[
            'name.required' => 'El Nombre es requerido',
            'social_number.required' => 'El CUIT/CUIL es requerido',
            'social_number.numeric' => 'El CUIT/CUIL debe contener solo números',
            'phone.numeric' => 'El Teléfono debe contener solo números',
            'phone.required' => 'El Teléfono es requerido',
            'email.required' => 'El Email es requerido',
            'email.email' => 'El Email tiene un formato incorrecto',
            'email.unique' => 'El Email ya existe en la base de datos',
            'password.required' => 'La Clave es requerida',
            'password_confirmation.same' => 'La Clave y la confirmación no coinciden',
        ]);
        if ($validator->fails()) {
            return response_json($validator->errors()->first(), 401);
        }
        $input = $request->except('logo', 'verified', 'enabled', 'removed', 'phone_verified');

        $email = null;
        if(isset($input['email']) && $input['email']){
            $email = $input['email'];
        }

        $phone = null;
        if(isset($input['phone']) && $input['phone']){
            $phone = $input['phone'];
        }

//        if(!$phone || !Helper::validArgentinianPhoneNumber($phone)){
//            return response_json( 'El Número de teléfono tiene un formato incorrecto', 401);
//        }

        $input['password'] = bcrypt($input['password']);
        $player_id = request('player_id', null);
        if($player_id){
            User::wherePlayerId($player_id)->update([
                'player_id' => null,
            ]);
        }
        $input['player_id'] = $player_id;
        $input['verified'] = 0;

        $input['seller_id'] = null;
        if(isset($input['seller_code']) && $input['seller_code']){
            $seller = ExternalSeller::where('seller_code', '=', $input['seller_code'])->first();
            if($seller){
                $input['seller_id'] = $seller->id;
            }else{
                return response_json('El código de vendedor no existe', 401);
            }
        }

        $user = User::create($input);
        if ($request->hasFile('logo')) {
            $uploadBasepath =  rtrim(static::$uploadPath, '/\\') . '/';
            $attachment_file_name = Str::random(4). '_' . $request->file('logo')->getClientOriginalName();
            $attachment_file_name = str_replace(' ', '', $attachment_file_name);
            $request->file('logo')->move(public_path($uploadBasepath), $attachment_file_name);
            $user->logo = $uploadBasepath . $attachment_file_name;

            $width = 600;
            $height = 600;
            $img = Image::make(public_path($user->logo));
            if ($img->width() > $width) {
                $img->resize($width, null, function ($constraint) {
                    $constraint->aspectRatio();
                });
            }
            if ($img->height() > $height) {
                $img->resize(null, $height, function ($constraint) {
                    $constraint->aspectRatio();
                });
            }
            $img->resizeCanvas($width, $height, 'center', false, '#ffffff');
            $img->save(public_path($user->logo));
            ImageOptimizer::optimize(public_path($user->logo));
        }else{
            if($user->logo and !File::exists(public_path($user->logo))){
                $user->logo = null;
            }
        }

        $valid_udid = false;
        $udid = null;
        do{
            $udid = Helper::generate_uuid();
            if(!User::select('id')->whereUdid($udid)->first()){
                $valid_udid = true;
            }

        } while($valid_udid === false);
        $user->udid = $udid;

        $verify_by_default = (int)env('AUTOMATICALLY_VERIFY_RETAIL_USERS_ON_REGISTER', 0);
        if($verify_by_default === 1){
            $user->verified = 1;
        }
        $user->valid_membership = 0;

        $user->phone_verified = 1;

        $information = [];
//        if(isset($input['phone']) && $input['phone']){
//            $information['phone'] = $input['phone'];
//        }
        if(isset($input['segments']) && $input['segments']){
            $information['segments'] = $input['segments'];
        }
        if(isset($input['state']) && $input['state']){
            $information['state'] = $input['state'];
        }
        if(isset($input['city']) && $input['city']){
            $information['city'] = $input['city'];
        }
        if(isset($input['street_name']) && $input['street_name']){
            $information['street_name'] = $input['street_name'];
        }
        if(isset($input['street_number']) && $input['street_number']){
            $information['street_number'] = $input['street_number'];
        }
        if(isset($input['zip_code']) && $input['zip_code']){
            $information['zip_code'] = $input['zip_code'];
        }
        if(isset($input['website']) && $input['website']){
            $information['website'] = $input['website'];
        }

        if($user->save()){
            $user->assignRole('retail');

            if(count($information) > 0){
                $information['user_id'] = $user->id;
                UserInformation::create($information);
            }
            if($user->verified){
                $tokenResult = $user->createToken(env('PASSPORT_TOKEN_NAME'));
                $token = $tokenResult->token;
                if ($request->remember_me) {
                    $token->expires_at = Carbon::now()->addWeeks(1);
                }
                $token->save();
                return $this->sendAuthorizedResponse($tokenResult, $user);
            }else{
                $response = [
                    'udid' => $udid,
                    'phone' => $phone,
                    'email' => $email,
                ];
                return response_json('Tu cuenta fue creada correctamente, nuestro equipo  verificará y se contactará una ves finalizado el proceso', 204, $response);
            }
        }



//        $user_verified = false;
//        if($user->verified){
//            $user_verified = true;
//        }
//        $user_is_workshop = false;
//
//        if($user->save()){
//            $user->assignRole('retail');
//            if(VerificationHelper::autoApproveRetailAccount($user)){
//                $user_verified = true;
//            }else{
//                if(VerificationHelper::autoApproveWorkshopAccount($user)){
//                    $user_verified = true;
//                    $user_is_workshop = true;
//                }
//            }
//            if(count($information) > 0){
//                $information['user_id'] = $user->id;
//                UserInformation::create($information);
//            }
//        }
//        $response = [
//            'udid' => $udid,
//            'phone' => $phone,
//            'email' => $email,
//        ];
//        if($user_verified){
//            if(!$user_is_workshop){
//                return response_json('Tu cuenta fue creada con exito, a partir de ahora puedes ingresar con tus credenciales', 204, $response);
//            }else{
//                return response_json('Tu cuenta fue creada con exito como Taller, para acceder ingresá al PlayStore o AppStore y descargá la App de Buscapartes', 204, $response);
//            }
//        }else{
//            return response_json('Tu cuenta fue creada correctamente, nuestro equipo  verificará y se contactará una ves finalizado el proceso', 204, $response);
//        }
    }



    /**
     * Redirect the user after determining they are locked out.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendAuthorizedResponse($tokenResult, $user)
    {
        return response_json('Tu cuenta fue creada con exito, gracias por confiar en Buscapartes', 200, [
            'user' => $user->getContent(),
            'access_token' => $tokenResult->accessToken,
            'token_type'   => 'Bearer',
            'expires_at'   => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
        ]);
    }

}
