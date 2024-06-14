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

Route::get('/database', [UserController::class, 'browse']);

Route::get('/idea/1', function() {
    return Inertia::render('IdeaOne', [
        'auth' => Auth::user(),
    ]);
});

Route::get('/layout', function() {
    return Inertia::render('Home', [
        'auth' => Auth::user(),
    ]);
});

Route::get('/test', function() {
    return Inertia::render('Test', [
        'auth' => Auth::user(),
    ]);
});

Route::get('/idea/2', [UserController::class, 'ideaTwo']);

Route::get('/contact', [FeedbackController::class, 'view']);
Route::post('/contact', [FeedbackController::class, 'send']);

Route::middleware('auth')->group(function () {
    Route::get('/account', function() {
        return Inertia::render('Account', [
            'auth' => Auth::user(),
            'privacySettings' => Auth::user()->privacySettings,
            'adminSettings' => AdminSetting::where('type', 'privacy')->get(),
        ]);
    });
    
    Route::post('/account', [UserController::class, 'update']);
    
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

Route::post('search', [UserController::class, 'search']);
Route::get('search', [UserController::class, 'viewSearch']);

Route::post('/register', [UserController::class, 'register']);

Route::get('/register', function() {
    return Inertia::render('Register', [
        'auth' => Auth::user(),
        'initial' => true,
        'credentials' => Credential::all(),
        'categories' => HazardCategory::all(),
        'sectors' => Sector::all()
    ]);
});

Route::get('/register/{token?}', [UserController::class, 'verifyToken']);