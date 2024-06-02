<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdminController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\AdminSetting;
use App\Models\Credential;
use App\Models\HazardCategory;
use App\Models\Sector;

Route::get('/', function() {
    return Inertia::render('Index', [
        'auth' => Auth::user(),
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/account', function() {
        return Inertia::render('Account', [
            'auth' => Auth::user(),
            'privacySettings' => Auth::user()->privacySettings,
            'adminSettings' => AdminSetting::where('type', 'privacy')->get(),
        ]);
    });
    
    Route::post('/account', [UserController::class, 'update']);
    Route::post('/admin', [AdminController::class, 'updateSettings']);
    

    Route::get('/admin', function() {
        if(Auth::user() == null or Auth::user()->type != 'admin') {
            return redirect('/login');
        }
        return Inertia::render('Admin', [
            'auth' => Auth::user(),
            'settings' => AdminSetting::where('type', 'privacy')->get(),
        ]);
    });

});

Route::post('/users', [UserController::class, 'store']);

Route::post('/account/email', [UserController::class, 'checkEmail']);

Route::get('/login', function() {
    return Inertia::render('Login');
})->name('login');

Route::get('logout', [LoginController::class, 'logout']);

Route::post('login', [LoginController::class, 'authenticate']);

Route::post('search', [UserController::class, 'search']);
Route::get('search', function() {
    return Inertia::render('Index', [
        'auth' => Auth::user(),
    ]);
});

Route::get('/register', function() {
    return Inertia::render('Register', [
        'auth' => Auth::user(),
        'credentials' => Credential::all(),
        'categories' => HazardCategory::all(),
        'sectors' => Sector::all()
    ]);
});

