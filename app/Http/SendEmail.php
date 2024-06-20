<?php
// a static class to make sending emails prettier and easier

namespace App\Http;

use App\Models\RegistrationToken;
use App\Models\PasswordReset;
use App\Models\User;
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

    public static function forgotPassword(PasswordReset $reset, User $user) {
        $mj = Mailjet::getClient();
        $vars = [
            'name' => $user->first_name . ' ' . $user->last_name,
            'link' => env('APP_URL') . '/account/password/forgot/' . $reset->reset_token
        ];
        
        $body = [
            'FromEmail' => "admin@andrew-otis.com",
            'FromName' => "Administrator",
            'Subject' => "Password reset link for RMHPdb",
            'MJ-TemplateID' => 6070504,
            'MJ-TemplateLanguage' => true,
            'Vars' => json_decode(json_encode($vars), true),
            'Recipients' => [
                ['Email' => $user->email]
            ]
        ];
        
        $response = $mj->post(Resources::$Email, ['body' => $body]);

        return $response->success() ? true : false;
    }
}
