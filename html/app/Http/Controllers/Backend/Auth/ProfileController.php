<?php

namespace App\Http\Controllers\Backend\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProfileController extends Controller
{
    public function profile(Request $request){
        $user = $request->user();
        return response_json('OK', 200, $user);
    }
//
//    public function updateLogo(Request $request){
//        $user = $request->user();
//        $original_user_content = $user->getContent();
//        $old_logo = $user->logo;
//        if ($request->hasFile('attachment')) {
//            $attachment = $request->file('attachment');
//            $uploadBasepath =  rtrim('users', '/\\') . '/';
//            $attachment_file_name = Helper::stripString(Str::random(22)) . '.' .  $attachment->getClientOriginalExtension();
//            $attachment->move($uploadBasepath, $attachment_file_name);
//            $user->logo = $uploadBasepath .$attachment_file_name;
//            try{
//                $img = Image::make(file_get_contents(public_path($user->logo)));
//                $img->resize(600, null, function ($constraint) {
//                    $constraint->aspectRatio();
//                });
//                $img->save(public_path($user->logo), 80);
//                //ImageOptimizer::optimize(public_path($user->logo));
//                if(File::exists(public_path($old_logo))){
//                    File::delete(public_path($old_logo));
//                }
//                $user->save();
//            }catch (\Exception $exception){
//                if($user->logo and File::exists(public_path($user->logo))){
//                    File::delete(public_path($user->logo));
//                }
//                return response_json('El logo no fue modificado, intente nuevamente', 401, $original_user_content);
//            }
//        }
//        return response_json('OK', 200, $user->getContent());
//    }
//
//    public function updateSegments(Request $request){
//        $user = $request->user();
//        $original_user_content = $user->getContent();
//        $user_information = $user->information;
//        if(!$user_information){
//            $user_information = new UserInformation();
//            $user_information->user_id = $user->id;
//            $user_information->segments = [];
//        }
//        $segments = $request->get('segments', $user_information->segments);
//        $user_information->segments = $segments;
//        if($user_information->save()){
//            return response_json('OK', 200, $user->getContent());
//        }else{
//            return response_json('Tus segmentos no fueron guardados, intentá nuevamente', 401, $original_user_content);
//        }
//    }
//
//    public function updateEmail(Request $request){
//        $user = $request->user();
//        $original_user_content = $user->getContent();
//        $email = $request->get('email', $user->email);
//
//        if($email !== $user->email){
//            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//                return response_json('El email tiene un formato incorrecto', 401, $original_user_content);
//            }
//            if(User::whereEmail($email)->where('id', '!=', $user->id)->first()){
//                return response_json('El email que ingresaste ya existe en nuestra base de datos', 401, $original_user_content);
//            }
//        }
//        $user->email = $email;
//        if($user->save()){
//            return response_json('Tu email fue modificado correctamente', 200, $user->getContent());
//        }else{
//            return response_json('Tu email no fue modificado, intentá nuevamente', 401, $original_user_content);
//        }
//    }
//
//    public function updatePassword(Request $request){
//        $user = $request->user();
//        $original_user_content = $user->getContent();
//        $old_password = $request->get('old_password', null);
//        $password = $request->get('password', null);
//        $password_confirmation = $request->get('password_confirmation', null);
//        if($old_password && $password && $password_confirmation){
//            if (!Hash::check($old_password, $user->password)){
//                return response_json('La clave actual no coincide con nuestros registros', 401, $original_user_content);
//            }
//            if(strlen($password) < 6) {
//                return response_json('La clave debe tener más de 6 caracteres', 401, $original_user_content);
//            }
//            if($password !== $password_confirmation){
//                return response_json('La clave y la confirmación no coinciden', 401, $original_user_content);
//            }
//            $user->password = Hash::make($password);
//            if($user->save()){
//                return response_json('Tu clave fue modificada correctamente', 200, $user->getContent());
//            }
//        }
//        return response_json('Tu clave no fue modificada, intentá nuevamente', 401, $original_user_content);
//    }
//
//    public function updatePhone(Request $request){
//        $user = $request->user();
//        $original_user_content = $user->getContent();
//        $phone = $request->get('phone', $user->phone);
//        $user->phone = $phone;
//        if($user->save()){
//            return response_json('Tu teléfono fue modificado correctamente', 200, $user->getContent());
//        }else{
//            return response_json('Tu teléfono no fue modificado, intentá nuevamente', 401, $original_user_content);
//        }
//    }
//
//    public function updateName(Request $request){
//        $user = $request->user();
//        $original_user_content = $user->getContent();
//        $name = $request->get('name', $user->name);
//        $user->name = $name;
//        if($user->save()){
//            return response_json('Tu razón social fue modificada correctamente', 200, $user->getContent());
//        }else{
//            return response_json('Tu razón social no fue modificada, intentá nuevamente', 401, $original_user_content);
//        }
//    }
//
//    public function updateWebsite(Request $request){
//        $user = $request->user();
//        $original_user_content = $user->getContent();
//        $user_information = $user->information;
//        if(!$user_information){
//            $user_information = new UserInformation();
//            $user_information->user_id = $user->id;
//            $user_information->segments = [];
//        }
//        $website = $request->get('website', $user_information->website);
//        $user_information->website = $website;
//        if($user_information->save()){
//            return response_json('Tu sitio web fue modificado correctamente', 200, $user->getContent());
//        }else{
//            return response_json('Tu sitio web no fue modificado, intentá nuevamente', 401, $original_user_content);
//        }
//    }
//
//    public function updateAddress(Request $request){
//        $user = $request->user();
//        $original_user_content = $user->getContent();
//        $user_information = $user->information;
//        if(!$user_information){
//            $user_information = new UserInformation();
//            $user_information->user_id = $user->id;
//            $user_information->segments = [];
//        }
//        $state = $request->get('state', $user_information->state);
//        $city = $request->get('city', $user_information->city);
//        $street_name = $request->get('street_name', $user_information->street_name);
//        $street_number = $request->get('street_number', $user_information->street_number);
//        $zip_code = $request->get('zip_code', $user_information->zip_code);
//        $latitude = $request->get('latitude', $user_information->latitude);
//        $longitude = $request->get('longitude', $user_information->longitude);
//
//        $user_information->state = $state;
//        $user_information->city = $city;
//        $user_information->street_name = $street_name;
//        $user_information->street_number = $street_number;
//        $user_information->zip_code = $zip_code;
//        $user_information->latitude = $latitude;
//        $user_information->longitude = $longitude;
//
//        if($user_information->save()){
//            return response_json('Tu dirección fue modificada correctamente', 200, $user->getContent());
//        }else{
//            return response_json('Tu dirección no fue modificada, intentá nuevamente', 401, $original_user_content);
//        }
//    }
//
//    public function update(Request $request){
//
//        $user = $request->user();
//        $original_user_content = $user->getContent();
//        $user_information = $user->information;
//        if(!$user_information){
//            $user_information = new UserInformation();
//            $user_information->user_id = $user->id;
//            $user_information->segments = [];
//        }
//
//        $email = $request->get('email', $user->email);
//        $name = $request->get('name', $user->name);
//        $social_number = $request->get('social_number', $user->social_number);
//
//        $segments = $request->get('segments', $user_information->segments);
//        $state = $request->get('state', $user_information->state);
//        $city = $request->get('city', $user_information->city);
//        $street_name = $request->get('street_name', $user_information->street_name);
//        $street_number = $request->get('street_number', $user_information->street_number);
//        $zip_code = $request->get('zip_code', $user_information->zip_code);
//        $latitude = $request->get('latitude', $user_information->latitude);
//        $longitude = $request->get('longitude', $user_information->longitude);
//
//        $phone = $request->get('phone', $user->phone);
//
//        $website = $request->get('website', $user_information->website);
//
//        if($email !== $user->email){
//            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//                return response_json('El email tiene un formato incorrecto', 401, $original_user_content);
//            }
//            if(User::whereEmail($email)->where('id', '!=', $user->id)->first()){
//                return response_json('El email que tratas de utilizar ya existe en nuestra base de datos', 401, $original_user_content);
//            }
//        }
//
//        $password = $request->get('password', null);
//        $password_confirmation = $request->get('password_confirmation', null);
//        if($password && $password_confirmation){
//            if(strlen($password) < 6) {
//                return response_json('La clave debe tener más de 6 caracteres', 401, $original_user_content);
//            }
//            if($password !== $password_confirmation){
//                return response_json('La clave y la confirmación no coinciden', 401, $original_user_content);
//            }
//            $user->password = Hash::make($password);
//        }
//
//        $user->name = $name;
//        $user->email = $email;
//        $user->social_number = $social_number;
//
//        $user->phone = $phone;
//
//        $user_information->segments = $segments;
//        $user_information->state = $state;
//        $user_information->city = $city;
//        $user_information->street_name = $street_name;
//        $user_information->street_number = $street_number;
//        $user_information->zip_code = $zip_code;
//        $user_information->latitude = $latitude;
//        $user_information->longitude = $longitude;
//        $user_information->website = $website;
//
//        DB::beginTransaction();
//        if($user->save() && $user_information->save()){
//            DB::commit();
//            return response_json('OK', 200, $user->getContent());
//        }else{
//            DB::rollBack();
//            return response_json('Tus datos no fueron guardados, intentá nuevamente', 401, $original_user_content);
//        }
//    }

}
