<?php

namespace App\Http\Controllers\Provider\Auth;

use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{

    use ThrottlesLogins;

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return 'email';
    }

    public function login(Request $request){

        $validator = Validator::make($request->all(), [
            'email'       => 'required|string|email',
            'password'    => 'required|string',
        ]);

        if ($validator->fails()) {
            return response_json('El email y la clave son requeridos', 401);
        }

        $player_id = request('player_id', null);
        $email = request('email', null);
        $password = request('password', null);

        $tmpUser = User::whereEmail($email)->first();
        if($tmpUser){
            if ($tmpUser->enabled === 0){
                return response_json('Tu cuenta se encuentra en deshabilitada, en caso de ser un error, contactenos', 401);
            }elseif ($tmpUser->is_provider === 0) {
                return response_json('Tu cuenta no puede acceder a esta area, Muchas Gracias!', 401);
            }
        }

        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            return $this->sendLockoutResponse($request);
        }

        if(Auth::attempt(['email' => $email, 'password' => $password, 'is_provider' => 1, 'enabled' => 1])){
            $user = Auth::user();
            if($player_id){
                User::wherePlayerId($player_id)->where('id', '!=', $user->id)->update([
                    'player_id' => null,
                ]);
                $user->player_id = $player_id;
                $user->save();
            }
            $tokenResult = $user->createToken(env('PASSPORT_TOKEN_NAME'));
            $token = $tokenResult->token;
            $token->expires_at = Carbon::now()->addWeeks(1);
            $token->save();
            return $this->sendAuthorizedResponse($tokenResult, $user);
        }
        return response_json('No fue posible iniciar sesión, intente nuevamente', 401);
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->player_id = null;
        if($user->save()){
            $request->user()->token()->revoke();
            return response_json('Tu sesión se ha cerrado correctamente');
        }
        return response_json('Tu sesión no se ha cerrado correctamente, intente nuevamente', 401);
    }

    /**
     * Redirect the user after determining they are locked out.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendLockoutResponse(Request $request)
    {
        $seconds = $this->limiter()->availableIn(
            $this->throttleKey($request)
        );
        return response_json('Demasiados intentos de acceso. vuelva en '.$seconds.' segundos.' ,429);
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
        return response_json('OK', 200, [
            'user' => $user,
            'access_token' => $tokenResult->accessToken,
            'token_type'   => 'Bearer',
            'expires_at'   => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
        ]);
    }
}
