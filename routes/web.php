<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\QuizController;

Route::get('/', function() {
    return Inertia::render('Home', [
        'auth' => Auth::user(),
    ]);
});

Route::put('/account/password/forgot/', [PasswordResetController::class, 'reset']);
Route::get('/account/password/forgot', [PasswordResetController::class, 'forgot']);
Route::get('/account/password/forgot/{token}', [PasswordResetController::class, 'viewReset']);
Route::post('/account/password/forgot', [PasswordResetController::class, 'requestResetEmail']);

Route::get('/contact', [FeedbackController::class, 'view']);
Route::post('/contact', [FeedbackController::class, 'send']);

Route::get('/about', function() {
    return Inertia::render('About', [
        'auth' => Auth::user()
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/account', [UserController::class, 'viewAccountPage']);    
    Route::put('/account', [UserController::class, 'update']);

    Route::get('/admin', [AdminController::class, 'viewAdminPage']);
    Route::put('/admin/password/reset/{user_id}', [AdminController::class, 'resetUserPassword']);
    Route::put('/admin/status/update/{user_id}', [AdminController::class, 'updateUserStatus']);
    Route::post('/admin/create', [AdminController::class, 'createAdmin']);
    Route::post('/admin/feedback', [AdminController::class, 'addRecipient']);
    Route::delete('/admin/feedback/{id}', [AdminController::class, 'deleteRecipient']);
    Route::post('/admin/privacy', [AdminController::class, 'updatePrivacySettings']);
    Route::post('/admin/credential', [AdminController::class, 'addCredential']);
    Route::post('/admin/sector', [AdminController::class, 'addSector']);
    Route::post('/admin/category', [AdminController::class, 'addCategory']);
    Route::put('/admin/account', [AdminController::class, 'updateAdminAccount']);
    Route::get('/logout', [LoginController::class, 'logout']);
});

Route::get('/quiz', [QuizController::class, 'viewQuiz']);

Route::post('/admin/register', [AdminController::class, 'registerAdmin']);

Route::post('/users', [UserController::class, 'store']);

Route::get('/login', [LoginController::class, 'viewLogin'])->name('login');
Route::post('/login', [LoginController::class, 'authenticate']);

Route::post('/database/search', [UserController::class, 'search']);
Route::get('/database/search', [UserController::class, 'viewSearch']);
Route::get('/database', [UserController::class, 'browse']);

Route::post('/register', [UserController::class, 'register']);
Route::get('/register', function() {
    return Inertia::render('Home', [
        'auth' => Auth::user(),
        'register' => true,
    ]);
});
Route::get('/register/{token?}', [UserController::class, 'verifyToken']);