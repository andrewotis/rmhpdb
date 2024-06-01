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

            redirect('/account')->with(['message' => 'Successfully updated account info!']);
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
            redirect('/account')->with(['message' => 'Successfully updated privacy settings!']);
        }
    }

    public function store(Request $request) {
        $account = $request->input('account');
        $credentials = $request->input('credentials');
        $categories = $request->input('categories');
        $sectors = $request->input('sectors');
        
        $maxreg = User::max('registration_number');

        // create the user
        $user = User::create([
            'first_name' => $account['first_name'],
            'last_name' => $account['last_name'],
            'address' => $account['address'],
            'address2' => $account['address2'],
            'registration_number' => $maxreg + 1,
            'city' => $account['city'],
            'state' => $account['state'],
            'zip' => $account['zip'],
            'country' => $account['country'],
            'company' => $account['company'],
            'phone_number' => $account['phone_number'],
            'email' => $account['email'],
            'password' => Hash::make($account['password'])
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

        return to_route('login');
    }

    public function checkEmail(Request $request) {
        $user = User::where('email', $request->input('email'))->get();
        return ($user->count() == 0) ? 1 : 0;
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
        
        return Inertia::render('SearchResults', [
            'auth' => Auth::user(),
            'users' => $users,
            'categories' => HazardCategory::all(),
            'sectors' => Sector::all(),
            'credentials' => Credential::all()
        ]);
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
