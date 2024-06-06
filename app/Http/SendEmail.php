<?php
// a static class to make sending emails prettier and easier

namespace App\Http;

use App\Models\RegistrationToken;
use Mailjet\LaravelMailjet\Facades\Mailjet;
use Mailjet\Resources;

class SendEmail {
    public static function verifyRegistration(RegistrationToken $token_record) {
        $mj = Mailjet::getClient();
        $vars = [
            'name' => $token_record->first_name . ' ' . $token_record->last_name,
            'link' => env('APP_URL') . '/register/' . $token_record->token
        ];
        
        $body = [
            'FromEmail' => "admin@andrew-otis.com",
            'FromName' => "Administrator",
            'Subject' => "Please verify your email for RMHPdb registration!",
            'MJ-TemplateID' => 6028553,
            'MJ-TemplateLanguage' => true,
            'Vars' => json_decode(json_encode($vars), true),
            'Recipients' => [
                ['Email' => $token_record->email]
            ]
        ];
        
        $response = $mj->post(Resources::$Email, ['body' => $body]);

        return $response->success() ? true : false;
    }
}
