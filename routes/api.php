<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExamController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/users', [ExamController::class, 'index']);
Route::get('/users/{id}', [ExamController::class, 'show']);
Route::post('/create', [ExamController::class, 'store']);
Route::put('/usersupdate/{id}', [ExamController::class, 'update']);
Route::delete('/usersdelete/{id}', [ExamController::class, 'destroy']);
