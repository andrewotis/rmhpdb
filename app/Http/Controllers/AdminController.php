<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdminSetting;
use App\Models\Credential;
use App\Models\HazardCategory;
use App\Models\Sector;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller {
    public function viewAdminPage() {
        if(Auth::user() == null or Auth::user()->type != 'admin') {
            return redirect('/login');
        }
        return Inertia::render('Admin', [
            'auth' => Auth::user(),
            'settings' => AdminSetting::all(),
            'credentials' => Credential::all(),
            'sectors' => Sector::all(),
            'categories' => HazardCategory::all(),
        ]);
    }

    public function addRecipient(Request $request) {
        AdminSetting::create([
            'type' => 'feedback_recipient',
            'key' => 'email_address',
            'value' => $request->input('email')
        ]);
    }

    public function addCredential(Request $request) {
        Credential::create([
            'credential' => $request->input('credential'),
            'description' => $request->input('description')
        ]);
    }

    public function deleteRecipient($email) {
        $setting = AdminSetting::where('type', 'feedback_recipient')->where('key', 'email_address')->where('value', $email);
        $setting->delete();
    }

    public function updateSettings(Request $request) {
        if(Auth::user() == null or Auth::user()->type != 'admin') {
            return redirect('/login');
        }
        foreach($request->input() as $key => $val) {
            $changed = false;
            $row = AdminSetting::where('type', 'privacy')->where('key', $key)->first();
            
            if($val == false && $row->value == 'true') {
                $changed = true;
            } elseif($val == true && $row->value == 'false') {
                $changed = true;
            }

            $row->value = $val ? 'true' : 'false';
            // only save if it was updated
            if($changed) $row->save();
        }

        return Inertia::render('SettingsUpdated', [
            'auth' => Auth::user()
        ]);
    }
}
