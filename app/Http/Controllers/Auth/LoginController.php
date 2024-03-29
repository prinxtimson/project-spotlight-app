<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Mail\AccountLocked;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if(is_null($user)){
            return response([
                'message' => 'invalid email'
            ], 401);
        }
    
        if(isset($user) && $user->login_attempt === 3){
            return response([
                'message' => 'you have exceed the login attempt, please reset your password'
            ], 401);
        }
             
        if (Auth::attempt($validated)) {
            $user->update([
                'login_attempt' => 0,
                'login_at' => Carbon::now()
            ]);

            $request->session()->regenerate();
            $token = auth()->user()->createToken('access_token')->plainTextToken;
            auth()->user()->generate_code();
  
            return redirect()->route('2fa.index')->with(['token' => $token]);
        }

        $user->update([
            'login_attempt' => $user->login_attempt + 1
        ]);

        $user->refresh();

        if($user->login_attempt == "3"){
            $passwordToken = Password::createToken($user);
            $url = env("APP_URL_ADMIN") . "/password/reset" . "/" . $passwordToken . "?email=" . $user->email;
            
            Mail::to($user)->send(new AccountLocked($url, $user->name));
        }
    
        return response(['message' =>'email or password is invalid, ' . (3 - $user->login_attempt) . ' more attempts left'], 400)
           ;
    }
}
