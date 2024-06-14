<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserMeta;
use App\Models\Credential;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\AdminSetting;
use App\Models\HazardCategory;
use App\Models\Sector;
use App\Http\SendEmail;
use App\Models\RegistrationToken;
use Carbon\Carbon;

class UserController extends Controller {
    public function update(Request $request) {
        $data = $request->input('data');
        $user = User::find($data['id']);

        // account update:
        if($request->input('key') == 'account') {
            // make sure they're not updating to an email address that already exists
            $check = User::where('id', "!=", $data['id'])->where('email', $data['email'])->get();
            if($check->count()) {
                return redirect('/account')->withErrors(['error' => 'Email is already in use']);
            }

            $user->update([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'company' => $data['company'],
                'address' => $data['address'],
                'address2' => $data['address2'],
                'city' => $data['city'],
                'state' => $data['state'],
                'zip' => $data['zip'],
                'country' => $data['country'],
                'phone_number' => $data['phone_number'],
                'email' => $data['email'],
            ]);

            return redirect('/account')->with(['message' => 'Successfully updated account info!']);
        }

        // password update:
        if($request->input('key') == 'password') {
            $credentials = [
                'email' => $data['email'],
                'password' => $data['current_password']
            ];
            if (Auth::once($credentials)) {
                $user->password = Hash::make($data['new_password']);
                $user->save();
                return redirect('/logout');
            } else {
                return redirect('/account')->withErrors(['error' => 'Incorrect password']);
            }
        }

        // privacy settings update:
        if($request->input('key') == 'privacy') {
            $deleted = DB::table('user_meta')->where('user_id', $data['id'])->where('type', 'privacy_setting')->delete();
            foreach($data as $key => $val) {
                if($key == 'id') continue;
                UserMeta::create([
                    'user_id' => $data['id'],
                    'type' => 'privacy_setting',
                    'key' => $key,
                    'value' => 'true'
                ]);
            }
            return redirect('/account')->with(['message' => 'Successfully updated privacy settings!']);
        }
    }

    public function register(Request $request) {
        // first, make sure the email address isn't already registered
        $user = User::where('email', $request->input('email'))->get();
        if($user->count() > 0) {
            return redirect('/register')->withErrors(['error' => 'This email address has already been taken.']);
        }

        // check to see if a token record already exists
        $token_record = RegistrationToken::where('email', $request->input('email'))->get();

        if($token_record->count() > 0) {
            $token_record = $token_record->first();
            $token_record->token =  md5($request->input('first_name') . ' ' . $request->input('last_name') . ' ' . $request->input('email') . time());
            $token_record->created_at = Carbon::now();
            $token_record->save();
        } else {
            // create the registration record
            $token_record = RegistrationToken::create([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'email' => $request->input('email'),
                'token' => md5($request->input('first_name') . ' ' . $request->input('last_name') . ' ' . $request->input('email') . time()),
                'created_at' => Carbon::now()
            ]);
        }

        if(SendEmail::verifyRegistration($token_record)) {
            redirect('/register')->with(['message' => 'A verification email has been sent to ' . $request->input('email') . '. Please click the link in the email to verify.']);
        } else {
            return redirect('/register')->withErrors(['error' => 'There was a problem sending the email']);
        }
    }

    public function verifyToken($token) {
        $token_record = RegistrationToken::where('token', $token)->get();

        if($token_record->count() == 0) {
            return redirect('/register')->withErrors(['error' => 'Invalid registration token. Please restart registration process.']);
        } else {
            $token_record = $token_record->first();
        }
        
        $now = Carbon::now();
        $then = new Carbon($token_record->created_at);
        
        // how long has it been?
        $diff = $then->diffInHours($now);
        
        if($diff > 12) {
            return redirect('/register')->withErrors(['error' => 'Registration token has expired. Please send a new one below.']);
        } else {
            return Inertia::render('Register', [
                'auth' => Auth::user(),
                'initial' => false,
                'tokenRecord' => $token_record,
                'credentials' => Credential::all(),
                'categories' => HazardCategory::all(),
                'sectors' => Sector::all()
            ]);
        }
    }

    public function store(Request $request) {
        $input = $request->input();
        $token_record = RegistrationToken::where('token', $input['token'])->first();
        $maxreg = User::max('registration_number');
        $credentials = $request->input('credentials');
        $categories = $request->input('categories');
        $sectors = $request->input('sectors');

        $user = User::create([
            'first_name' => $token_record->first_name,
            'last_name' => $token_record->last_name,
            'address' => $input['address'],
            'address2' => $input['address2'],
            'registration_number' => $maxreg + 1,
            'city' => $input['city'],
            'state' => $input['state'],
            'zip' => $input['zip'],
            'country' => $input['country'],
            'company' => $input['company'],
            'phone_number' => $input['phone_number'],
            'email' => $token_record->email,
            'password' => Hash::make($input['password'])
        ]);

        // add creds
        foreach($credentials as $credential) {
            UserMeta::create([
                'user_id' => $user->id,
                'type' => 'credential',
                'key' => 'credential_id',
                'value' => $credential['value']
            ]);
        }

        // add categories
        foreach($categories as $category) {
            UserMeta::create([
                'user_id' => $user->id,
                'type' => 'category',
                'key' => 'category_id',
                'value' => $category['value']
            ]);
        }

        // add sectors
        foreach($sectors as $sector) {
            UserMeta::create([
                'user_id' => $user->id,
                'type' => 'sector',
                'key' => 'sector_id',
                'value' => $sector['value']
            ]);
        }

        // delete the registration token
        $token_record->delete();

        return redirect('/login')->with(['message' => 'Registration was successful. Please log in.']);
    }

    public function checkEmail(Request $request) {
        $user = User::where('email', $request->input('email'))->get();
        return ($user->count() == 0) ? 1 : 0;
    }

    public function ideaTwo() {
        $query = User::with('privacySettings')
            ->with('credentials')
            ->with('sectors')
            ->with('categories')
            ->where('active', 1)
            ->where('type', 'registered_mhp');

            $users = $this->hidePrivateFields($query->get()->toArray());

            return Inertia::render('IdeaTwo', [
                'auth' => Auth::user(),
                'users' => $users,
                'categories' => HazardCategory::all(),
                'sectors' => Sector::all(),
                'credentials' => Credential::all()
            ]);
    }

    public function browse() {
        $query = User::with('privacySettings')
            ->with('credentials')
            ->with('sectors')
            ->with('categories')
            ->where('active', 1)
            ->where('type', 'registered_mhp');

            $users = $this->hidePrivateFields($query->get()->toArray());

            return Inertia::render('Database', [
                'auth' => Auth::user(),
                'users' => $users,
                'categories' => HazardCategory::all(),
                'sectors' => Sector::all(),
                'credentials' => Credential::all()
            ]);
    }

    public function viewSearch() {
        // build arrays of distinct countries, cities, states
        $users = User::where('type', 'registered_mhp')->where('active', 1)->get();
        $countries = [];
        $cities = [];
        $states = [];
        foreach($users as $user) {
            $countries[] = $user->country;
            $cities[] = $user->city;
            $states[] = $user->state;
        }

        return Inertia::render('Search', [
            'auth' => Auth::user(),
            'countries' => array_unique($countries),
            'cities' => array_unique($cities),
            'states' => array_unique($states)
        ]);
    }

    public function search(Request $request) {
        $query = User::with('privacySettings')
            ->with('credentials')
            ->with('sectors')
            ->with('categories')
            ->where('active', 1)
            ->where('type', 'registered_mhp');
        
        if($request->input('first_name') != null) {
            $query->where('first_name', 'like', '%' . $request->input('first_name') . '%');
        }
        if($request->input('last_name') != null) {
            $query->where('last_name', 'like', '%' . $request->input('last_name') . '%');
        }
        if($request->input('city') != null) {
            $query->where('city', 'like', '%' . $request->input('city') . '%');
        }
        if($request->input('state') != null) {
            $query->where('state', 'like', '%' . $request->input('state') . '%');
        }
        if($request->input('country') != null) {
            $query->where('country', 'like', '%' . $request->input('country') . '%');
        }
        
        $users = $this->hidePrivateFields($query->get()->toArray());

        if(count($users) == 0) {
            return redirect('/search')->with(['message' => 'No results found. Please try your search again.']);
        } else {
            return Inertia::render('Database', [
                'auth' => Auth::user(),
                'users' => $users,
                'categories' => HazardCategory::all(),
                'sectors' => Sector::all(),
                'credentials' => Credential::all()
            ]);
        }
    }

    protected function hidePrivateFields($users) {
        $adminSettings = AdminSetting::where('type', 'privacy')->where('value', 'true')->get()->toArray();
        foreach($users as &$user) {
            foreach($user['privacy_settings'] as $setting) {
                // make sure the admin setting is configured
                $found = false;
                foreach($adminSettings as $adminSetting) {
                    if($adminSetting['key'] == $setting['key']) {
                        $found = true;
                    }
                }
                if($found) {
                    $user[$setting['key']] = '***PRIVATE***';
                }
            }
        }
        return $users;
    }

}
