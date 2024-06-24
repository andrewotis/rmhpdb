<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller {
    public function viewLogin() {
        Log::error("In LoginController::viewLogin()");
        return Inertia::render('NewLogin', ['auth' => Auth::user()]);
    }

    public function authenticate(Request $request) {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            if(Auth::user()->active == false) {
                return back()->withErrors([ 'error' => 'This account has been disabled.' ]);
            }
            
            return Auth::user()->is_admin
                ?
                    redirect('/admin')
                        :
                            redirect('/account');
        }
 
        return back()->withErrors([ 'error' => 'The provided credentials do not match our records.' ]);
    }

    public function logout(Request $request) {
        Auth::logout();
    
        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
    
        return redirect('/login')->with(['message' => "You have been successfully logged out."]);
    }
}

