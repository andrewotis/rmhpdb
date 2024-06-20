<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PasswordReset;
use App\Models\User;
use App\Http\SendEmail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class PasswordResetController extends Controller {
    public function forgot() {
        return Inertia::render('ForgotPassword');
    }

    protected function generateResetTokenHash(User $user) {
        return md5($user->id . $user->email . "passwordreset" . time());
    }

    public function requestResetEmail(Request $request) {
        $user = User::where('email', $request['email'])->first();
        if($user !== null) {
            $reset = PasswordReset::where('user_id', $user->id)->first(); // if they already requested a reset
            if($reset !== null) {
                $reset->reset_token = $this->generateResetTokenHash($user);
                $reset->save();
                SendEmail::forgotPassword($reset, $user);
            } else {
                $reset = PasswordReset::create([
                    'user_id' => $user->id,
                    'reset_token' => $this->generateResetTokenHash($user)
                ]);
                SendEmail::forgotPassword($reset, $user);
            }
        }

        return redirect('/account/password/forgot')->with(['message' => 'Thanks! If the email provided matches our records, we\'ll send you a reset link.']);
    }

    public function viewReset($token) {
        $reset = PasswordReset::where('reset_token', $token)->first();
        if($reset == null) {
            return redirect('/account/password/forgot')->withErrors(['error' => 'Invalid password reset link. Please try again.']);
        }

        $now = Carbon::now();
        $then = new Carbon($reset->created_at);

        $diff = $then->diffInHours($now);

        if($diff > 12) {
            return redirect('/account/password/forgot')->withError(['error' => 'The password reset link has expired. Please try again.']);
        } else {
            $user = User::find($reset->user_id);
            return Inertia::render('ResetPassword', [
                'user' => $user,
                'token' => $token
            ]);
        }
    }

    public function reset(Request $request) {
        $reset = PasswordReset::where('reset_token', $request->input('token'))->first();
        $user = User::find($reset->user_id);
        $user->password = Hash::make($request->input('password'));
        $user->save();
        $reset->delete(); // delete the reset token record
        return redirect('/login')->with(['message' => 'Password successfully reset. Please log in.']);
    }
}
