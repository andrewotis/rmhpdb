<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdminSetting;
use Mailjet\LaravelMailjet\Facades\Mailjet;
use Mailjet\Resources;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller {
    public function view() {
        return Inertia::render('ContactForm', [
            'auth' => Auth::user(),
        ]);
    }

    public function send(Request $request) {
        $honeypot = $request->input('verifyEmail');
        if($honeypot !== null) {
            return redirect('/');
        }
        
        if($this->sendFeedbackMailjet($request->input())) {
            $message = "Feedback sent successfully!";
        } else {
            $message = "There was a problem sending feedback.";
        }

        return redirect('/contact')->with(['message' => $message]);
    }

    protected function getRecipients() {
        $recipients = AdminSetting::select('value')
            ->where('type', 'feedback_recipient')
            ->where('key', 'email_address')
            ->get()
            ->toArray();
        
        $arr = [];
        foreach($recipients as $recipient) {
            $arr[] = $recipient['value'];
        }
        return $arr;
    }

    public function sendFeedbackMailjet($input) {
        $mj = Mailjet::getClient();
        $vars = [
            'name' => $input['name'],
            'phone' => $input['phone'],
            'email' => $input['email'],
            'message' => $input['message']
        ];

        $recipients = $this->getRecipients();
            $body = [
                'FromEmail' => "admin@andrew-otis.com",
                'FromName' => "Administrator",
                'Subject' => "Automated Message from andrew-otis.com",
                'MJ-TemplateID' => 6017725,
                'MJ-TemplateLanguage' => true,
                'Vars' => json_decode(json_encode($vars), true),
                'Recipients' => [
                    ['Email' => 'andrew.otis@gmail.com'],
                    ['Email' => 'deletersoftware@gmail.com'],
                ]
            ];

        $response = $mj->post(Resources::$Email, ['body' => $body]);

        return $response->success() ? true : false;
    }
}
