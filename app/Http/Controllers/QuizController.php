<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\QuizQuestion;

class QuizController extends Controller {
    public function viewQuiz() {
        return Inertia::render('Quiz', [
            'auth' => Auth::user(),
            'quizQuestions' => QuizQuestion::where('active', true)->get()
        ]);
    }
}
