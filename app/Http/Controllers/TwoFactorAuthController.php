<?php

namespace App\Http\Controllers;

use App\Models\UserCode;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;

class TwoFactorAuthController extends Controller
{
    /**
     * index method for 2fa
     *
     * @return response()
     */
    public function index()
    {
        return view('welcome')->with('user', auth()->user());
    }

    /**
     * validate sms
     *
     * @return response()
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required',
        ]);
  
        $exists = UserCode::where('user_id', auth()->user()->id)
                ->where('code', $validated['code'])
                ->where('updated_at', '>=', now()->subMinutes(5))
                ->exists();
  
        if ($exists) {
            $request->session()->put('user_2fa', auth()->user()->id);
            
            return redirect()->route('dashboard');
        }
  
        return response('You entered wrong OTP code.', 401);
    }
    /**
     * resend otp code
     *
     * @return response()
     */
    public function resend()
    {
        auth()->user()->generate_code();
  
        return back()
            ->with('success', 'We have resent OTP on your mobile number.');
    }
}
