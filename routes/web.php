<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FeedbackController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\AdminSetting;
use App\Models\Credential;
use App\Models\HazardCategory;
use App\Models\Sector;
use App\Models\User;

Route::get('/', function() {
    return Inertia::render('Home', [
        'auth' => Auth::user(),
    ]);
});

Route::get('/contact', [FeedbackController::class, 'view']);
Route::post('/contact', [FeedbackController::class, 'send']);

Route::get('/about', function() {
    return Inertia::render('About', [
        'auth' => Auth::user()
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/account', function() {
        $user = User::where('id', Auth::user()->id)->with(['credentials', 'privacySettings', 'sectors', 'categories'])->first();
        return Inertia::render('NewAccount', [
            'auth' => Auth::user(),
            'user' => $user,
            'credentials' => Credential::all(),
            'categories' => HazardCategory::all(),
            'sectors' => Sector::all(),
            'adminSettings' => AdminSetting::where('type', 'privacy')->get(),
        ]);
    });
    
    Route::put('/account', [UserController::class, 'update']);
    
    Route::post('/admin/feedback', [AdminController::class, 'addRecipient']);
    Route::delete('/admin/feedback/{email?}', [AdminController::class, 'deleteRecipient']);
    Route::post('/admin/credentials', [AdminController::class, 'addCredential']);
    Route::post('/admin', [AdminController::class, 'updateSettings']);
    Route::get('/admin', [AdminController::class, 'viewAdminPage']);
});

Route::post('/users', [UserController::class, 'store']);
Route::post('/account/email', [UserController::class, 'checkEmail']);

Route::get('/login', [LoginController::class, 'viewLogin'])->name('login');
Route::get('logout', [LoginController::class, 'logout']);
Route::post('login', [LoginController::class, 'authenticate']);

Route::post('/database/search', [UserController::class, 'search']);
Route::get('/database/search', [UserController::class, 'viewSearch']);
Route::get('/database', [UserController::class, 'browse']);


Route::get('/register/{token?}', [UserController::class, 'verifyToken']);
Route::post('/register', [UserController::class, 'register']);
Route::get('/register', function() {
    return Inertia::render('Home', [
        'auth' => Auth::user(),
        'register' => true,
    ]);
});