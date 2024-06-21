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
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller {
    public function update(Request $request) {
        // what has changed?
        $old = $request->input('old');
        $new = $request->input('new');

        // user values
        $keys = [ 'first_name', 'last_name', 'company', 'address_one', 'address_two', 'city', 'state', 'zip', 'country', 'phone_number', 'email' ];
        $user_modified = false;
        foreach($keys as $key) {
            if($old[$key] !== $new[$key]) $user_modified = true;
        }

        $user = Auth::user();

        if($user_modified) {
            // make sure they're not updating to an email address that already exists
            $check = User::where('id', "!=", $user->id)->where('email', $new['email'])->get();
            if($check->count()) {
                return redirect('/account')->withErrors(['error' => 'Email is already in use']);
            }

            $user->update([
                'first_name' => $new['first_name'],
                'last_name' => $new['last_name'],
                'company' => $new['company'],
                'address_one' => $new['address_one'],
                'address_two' => $new['address_two'],
                'city' => $new['city'],
                'state' => $new['state'],
                'zip' => $new['zip'],
                'country' => $new['country'],
                'phone_number' => $new['phone_number'],
                'email' => $new['email']
            ]);
        }

        // was the password updated?
        if($new['password'] !== null && ($new['password'] == $new['confirm_password'])) {
            $user->password = Hash::make($new['password']);
            $user->save();
        }

        // credentials
        if($old['credentials'] !== $new['credentials']) {
            // delete the existing credentials
            $deleted = DB::table('user_meta')->where('user_id', $user->id)->where('type', 'credential')->delete();
            foreach($new['credentials'] as $credential) {
                UserMeta::create([
                    'user_id' => $user->id,
                    'type' => 'credential',
                    'key' => 'credential_id',
                    'value' => $credential['value']
                ]);
            }
        }
        
        // sectors
        if($old['sectors'] !== $new['sectors']) {
            // delete the existing sectors
            $deleted = DB::table('user_meta')->where('user_id', $user->id)->where('type', 'sector')->delete();
            // add sectors
            foreach($new['sectors'] as $sector) {
                UserMeta::create([
                    'user_id' => $user->id,
                    'type' => 'sector',
                    'key' => 'sector_id',
                    'value' => $sector['value']
                ]);
            }
        }

        // hazard categories
        if($old['categories'] !== $new['categories']) {
            // delete the existing categories
            $deleted = DB::table('user_meta')->where('user_id', $user->id)->where('type', 'category')->delete();
            foreach($new['categories'] as $category) {
                UserMeta::create([
                    'user_id' => $user->id,
                    'type' => 'category',
                    'key' => 'category_id',
                    'value' => $category['value']
                ]);
            }
        }

        // privacy settings
        if($old['privacy_settings'] !== $new['privacy_settings']) {
            // delete the existing privacy settings
            $deleted = DB::table('user_meta')->where('user_id', $user->id)->where('type', 'privacy_setting')->delete();
            foreach($new['privacy_settings'] as $key => $val) {
                if($val == true) {
                    UserMeta::create([
                        'user_id' => $user->id,
                        'type' => 'privacy_setting',
                        'key' => $key,
                        'value' => 'true'
                    ]);
                }
            }
        }

        return redirect('/account')->with(['message' => 'Successfully updated account info!']);
    }

    public function register(Request $request) { 
        // first, make sure the email address isn't already registered
        $user = User::where('email', $request->input('email'))->get();
        if($user->count() > 0) {
            return redirect('/')->withErrors(['error' => 'This email address has already been taken.']);
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
            redirect('/')->with(['message' => 'A verification email has been sent to ' . $request->input('email') . '. Please click the link in the email to verify.']);
        } else {
            return redirect('/')->withErrors(['error' => 'There was a problem sending the email']);
        }
    }

    public function verifyToken($token) {
        $token_record = RegistrationToken::where('token', $token)->get();

        if($token_record->count() == 0) {
            return redirect('/')->withErrors(['error' => 'Invalid registration token. Please restart registration process.']);
        } else {
            $token_record = $token_record->first();
        }
        
        $now = Carbon::now();
        $then = new Carbon($token_record->created_at);
        
        // how long has it been?
        $diff = $then->diffInHours($now);
        
        if($diff > 12) {
            return redirect('/')->withErrors(['error' => 'Registration token has expired. Please restart your registration.']);
        } else {
            return Inertia::render('NewRegister', [
                'auth' => Auth::user(),
                'initial' => false,
                'tokenRecord' => $token_record,
                'credentials' => Credential::all(),
                'categories' => HazardCategory::all(),
                'sectors' => Sector::all(),
                'adminSettings' => AdminSetting::where('type', 'privacy')->get(),
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
        $privacy_settings = $request->input('privacy_settings');

        $user = User::create([
            'first_name' => $token_record->first_name,
            'last_name' => $token_record->last_name,
            'address_one' => $input['address_one'],
            'address_two' => $input['address_two'],
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

        // add privacy settings
        foreach($privacy_settings as $privacy_setting => $enabled) {
            if($enabled) {
                UserMeta::create([
                    'user_id' => $user->id,
                    'type' => 'privacy_setting',
                    'key' => $privacy_setting,
                    'value' => 'true'
                ]);
            }
        }

        // delete the registration token
        $token_record->delete();

        return redirect('/login')->with(['message' => 'Registration was successful. Please log in.']);
    }

    public function checkEmail(Request $request) {
        $user = User::where('email', $request->input('email'))->get();
        return ($user->count() == 0) ? 1 : 0;
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
        $query = User::select(["users.*"])
            ->with(['privacySettings', 'credentials', 'sectors', 'categories'])
            ->where('active', 1)
            ->where('users.type', 'registered_mhp');
        
        if($request->input('first_name') != null) {
            $query->where('first_name', 'like', '%' . $request->input('first_name') . '%')
                ->leftJoin('user_meta as um', function(JoinClause $join) {
                    $join
                        ->on('users.id', '=', 'um.user_id')
                        ->where('um.type', '=', 'privacy_setting')
                        ->where('um.key', '=', 'first_name')
                        ->where('um.value', '=', 'true');
                })
                ->whereNull('um.id');
        }
        if($request->input('last_name') != null) {
            $query->where('last_name', 'like', '%' . $request->input('last_name') . '%')
                ->leftJoin('user_meta as um1', function(JoinClause $join) {
                    $join
                        ->on('users.id', '=', 'um1.user_id')
                        ->where('um1.type', '=', 'privacy_setting')
                        ->where('um1.key', '=', 'last_name')
                        ->where('um1.value', '=', 'true');
                })
                ->whereNull('um1.id');
        }
        if($request->input('city') != null) {
            $query->where('city', 'like', '%' . $request->input('city') . '%')
                ->leftJoin('user_meta as um2', function(JoinClause $join) {
                    $join
                        ->on('users.id', '=', 'um2.user_id')
                        ->where('um2.type', '=', 'privacy_setting')
                        ->where('um2.key', '=', 'city')
                        ->where('um2.value', '=', 'true');
                })
                ->whereNull('um2.id');
        }
        if($request->input('state') != null) {
            $query->where('state', 'like', '%' . $request->input('state') . '%')
                ->leftJoin('user_meta as um3', function(JoinClause $join) {
                    $join
                        ->on('users.id', '=', 'um3.user_id')
                        ->where('um3.type', '=', 'privacy_setting')
                        ->where('um3.key', '=', 'state')
                        ->where('um3.value', '=', 'true');
                })
                ->whereNull('um3.id');
        }
        if($request->input('country') != null) {
            $query->where('country', 'like', '%' . $request->input('country') . '%')
                ->leftJoin('user_meta as um4', function(JoinClause $join) {
                    $join
                        ->on('users.id', '=', 'um4.user_id')
                        ->where('um4.type', '=', 'privacy_setting')
                        ->where('um4.key', '=', 'country')
                        ->where('um4.value', '=', 'true');
                })
                ->whereNull('um4.id');
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
