<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\SendEmail;

class FeedbackController extends Controller {
    public function view() {
        return Inertia::render('NewContact', [
            'auth' => Auth::user(),
        ]);
    }

    public function send(Request $request) {
        $honeypot = $request->input('verifyEmail');
        if($honeypot !== null) {
            return redirect('/');
        }
        
        if(Sendemail::sendFeedbackEmail($request->input())) {
            $message = "Feedback sent successfully!";
        } else {
            $message = "There was a problem sending feedback.";
        }

        return redirect('/contact')->with(['message' => $message]);
    }
}
