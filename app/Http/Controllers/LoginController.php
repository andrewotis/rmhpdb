<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller {
    public function viewLogin() {
        return Inertia::render('NewLogin');
    }

    public function authenticate(Request $request) {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            
            return Auth::user()->type == 'admin' 
                ?
                    redirect('/')
                        :
                            redirect('/account');
        }
 
        return back()->withErrors([
            'error' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request) {
        Auth::logout();
    
        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
    
        return redirect('/login')->with(['message' => "You have been successfully logged out."]);
    }
}

