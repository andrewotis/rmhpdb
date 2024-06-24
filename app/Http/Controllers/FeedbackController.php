<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\SendEmail;
use App\Models\AdminSetting;

class FeedbackController extends Controller {
    public function view() {
        return Inertia::render('NewContact', [
            'auth' => Auth::user(),
        ]);
    }

    protected function getRecipients() {
        $recipients = [];
        $settings = AdminSetting::where('type', 'feedback_recipient')->where('key', 'email_address')->get();
        foreach($settings as $setting) {
            $recipients[] = $setting->value;
        }
        return $this->formatRecipients($recipients);
    }

    protected function formatRecipients($recipients) {
        $formatted = [];
        foreach($recipients as $recipient) {
            array_push($formatted, ['Email' => $recipient]);
        }
        return $formatted;
    }

    public function send(Request $request) {
        $honeypot = $request->input('verifyEmail');
        if($honeypot !== null) {
            return redirect('/');
        }
        
        $recipients = $this->getRecipients();
        
        if(Sendemail::sendFeedbackEmail($request->input(), $recipients)) {
            $message = "Feedback sent successfully!";
        } else {
            $message = "There was a problem sending feedback.";
        }

        return redirect('/contact')->with(['message' => $message]);
    }
}
