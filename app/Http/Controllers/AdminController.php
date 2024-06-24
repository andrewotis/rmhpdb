<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdminSetting;
use App\Models\Credential;
use App\Models\HazardCategory;
use App\Models\Sector;
use App\Models\User;
use App\Models\RegistrationToken;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\PasswordGenerator;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Http\SendEmail;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller {
    protected function checkAdmin() {
        if(Auth::user() == null or !Auth::user()->is_admin) {
            return redirect('/login')->withErrors(['error' => 'Your account does not have administrative priveleges.']);
        }
    }

    public function viewAdminPage() {
        $this->checkAdmin();

        return Inertia::render('Admin', [
            'auth' => Auth::user(),
            'users' => User::with(['credentials', 'privacySettings', 'sectors', 'categories'])->get(),
            'adminSettings' => AdminSetting::all(),
            'credentials' => Credential::all(),
            'sectors' => Sector::all(),
            'categories' => HazardCategory::all(),
        ]);
    }

    public function updateAdminAccount(Request $request) {
        $this->checkAdmin();

        $input = $request->input();
        $auth = User::find(Auth::user()->id);

        if($input['email'] !== $auth->email) {
            // make sure email doesn't exist
            $check = User::where('email', $input['email'])->count();
            if($check > 0) {
                return redirect('/admin')->withErrors(['error' => 'This email address already exists in the system']);
            } else {
                $auth->email = $input['email'];
                $auth->save();
            }
        }
        if($input['password'] !== null) {
            $auth->password = Hash::make($input['password']);
            $auth->save();
        }
        redirect('/admin')->with(['message' => 'Admin account was successfully updated']);
    }

    public function createAdmin(Request $request) {
        $this->checkAdmin();

        // check if email is taken?
        $check = User::where('email', $request->input('email'))->count();
        if($check > 0) {
            return redirect('/admin')->withErrors(['error' => 'This email address already exists in the system']);
        }

        // check to see if a token record already exists
        $token_record = RegistrationToken::where('email', $request->input('email'))->get();

        if($token_record->count() > 0) {
            $token_record = $token_record->first();
            $token_record->token =  md5($request->input('first_name') . ' ' . $request->input('last_name') . '_admin_' . $request->input('email') . time());
            $token_record->created_at = Carbon::now();
            $token_record->save();
        } else {
            // create the registration record
            $token_record = RegistrationToken::create([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'email' => $request->input('email'),
                'type' => 'admin',
                'token' => md5($request->input('first_name') . ' ' . $request->input('last_name') . '_admin_' . $request->input('email') . time()),
                'created_at' => Carbon::now()
            ]);
        }

        if(SendEmail::verifyRegistration($token_record)) {
            redirect('/admin')->with(['message' => 'A verification email has been sent to ' . $request->input('email') . '. This user must click the link and continue admin registration.']);
        } else {
            return redirect('/admin')->withErrors(['error' => 'There was a problem sending the email']);
        }
    }

    public function registerAdmin(Request $request) {
        Log::error("In registerAdmin");
        $input = $request->input();
        $token_record = RegistrationToken::where('token', $input['token'])->first();

        $user = User::create([
            'first_name' => $token_record->first_name,
            'last_name' => $token_record->last_name,
            'email' => $token_record->email,
            'active' => true,
            'phone_number' => $input['phone_number'],
            'password' => Hash::make($input['password'])
        ]);

        $user->type = 'admin';
        $user->save();

        $token_record->delete();
        Log::error("About to redirect to /login");
        return redirect()->route('login')->with(['message' => 'Registration successful. Please log in to continue.']);
    }

    public function resetUserPassword($user_id) {
        $this->checkAdmin();
        
        $password = PasswordGenerator::makePassword(10);
        $user = User::find($user_id);
        $user->password = Hash::make($password);
        $user->save();
        return redirect('/admin')->with(['message' => 'User ' . $user->email . ' password updated to "' .$password. '" (without the quotes)']);
    }

    public function updateUserStatus($user_id) {
        $this->checkAdmin();
        
        $user = User::find($user_id);
        $user->active = !$user->active;
        $user->save();
        $message = "User {$user->email} has been ";
        $message .= $user->active ? 'enabled' : 'disabled';
        return redirect('/admin')->with(['message' => $message]);
    }

    public function addRecipient(Request $request) {
        Log::error("We made it to addRecipient...");
        $this->checkAdmin();

        // check if address is already there
        $setting = AdminSetting::where('type', 'feedback_recipient')->where('key', 'email_address')->where('value', $request->input('email'))->count();
        if($setting > 0) {
            return redirect('/admin')->withErrors(['error' => 'This email address is already configured to receive feedback submissions.']);
        }

        AdminSetting::create([
            'type' => 'feedback_recipient',
            'key' => 'email_address',
            'value' => $request->input('email')
        ]);
        return redirect('/admin')->with(['message' => 'Email address '.$request->input('email').' successfully configured to receive feedback submissions']);
    }

    public function addCredential(Request $request) {
        $this->checkAdmin();

        Credential::create([
            'credential' => $request->input('credential'),
            'description' => $request->input('description')
        ]);

        return redirect('/admin')->with(['message' => 'Credential successfully added.']);
    }

    public function addSector(Request $request) {
        $this->checkAdmin();

        Sector::create([
            'number' => $request->input('number'),
            'nora_sector_group' => $request->input('nora_sector_group'),
            'naics_code' => $request->input('naics_code')
        ]);

        return redirect('/admin')->with(['message' => 'Sector successfully added.']);
    }

    public function addCategory(Request $request) {
        $this->checkAdmin();

        HazardCategory::create([
            'number' => $request->input('number'),
            'category' => $request->input('category')
        ]);

        return redirect('/admin')->with(['message' => 'Category successfully added.']);
    }

    protected function strToBool($str) {
        return filter_var($str, FILTER_VALIDATE_BOOLEAN);
    }

    public function updatePrivacySettings(Request $request) {
        $this->checkAdmin();
        foreach($request->input(['settings']) as $k => $v) {
            $setting = AdminSetting::where('type', 'privacy')->where('key', $k)->first();
            $setting_bool = $this->strToBool($setting->value);
            $input_bool = $this->strToBool($v);
            if($setting_bool !== $input_bool) {     // maintain integrity of updated_at in these records
                $setting->value = $v ? "true" : "false";
                $setting->save();
            }
        }

        return redirect('/admin')->with(['message' => 'Successfully updated privacy settings.']);
    }

    public function deleteRecipient($id) {
        $this->checkAdmin();

        $setting = AdminSetting::find($id);
        $email = $setting->value;
        $setting->delete();

        return redirect('/admin')->with(['message' => 'Email address '.$email.' successfully removed from receiving feedback submissions']);
    }
}
