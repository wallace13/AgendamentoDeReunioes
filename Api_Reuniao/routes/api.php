<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Actions\Fortify\ResetUserPassword;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::post('/agendamentos/store','App\Http\Controllers\AgendamentoController@store');

    //Route::get('/agendamentos','App\Http\Controllers\AgendamentoController@index');

    Route::get('/agendamentos/{id}','App\Http\Controllers\AgendamentoController@show');

    Route::get('/horario','App\Http\Controllers\AgendamentoController@getHorarios');

    Route::put('/agendamentos/update/{id}','App\Http\Controllers\AgendamentoController@update');

    Route::delete('/agendamentos/destroy/{id}','App\Http\Controllers\AgendamentoController@destroy');

    Route::post('/register','App\Http\Controllers\AuthController@store');

    Route::get('/user','App\Http\Controllers\AuthController@index');

    Route::get('/userName/{userName}','App\Http\Controllers\AuthController@getUserName');

    Route::get('/email/{email}','App\Http\Controllers\AuthController@getEmail');

    Route::get('/usuarios','App\Http\Controllers\AuthController@index');

    Route::get('/user/{id}','App\Http\Controllers\AuthController@show');

    Route::patch('/user/update/{id}','App\Http\Controllers\AuthController@update');

    Route::delete('/user/destroy/{id}','App\Http\Controllers\AuthController@destroy');

    Route::patch('user/password', 'App\Http\Controllers\AuthController@updateSenha');

    Route::patch('user/resetpassword', 'App\Http\Controllers\AuthController@resetSenha');

    Route::get('/agendamentos/{id}/user','App\Http\Controllers\AgendamentoController@getUserAgendamento');

    Route::get('/horarios','App\Http\Controllers\HorarioController@index');

    Route::get('/horario/{id}','App\Http\Controllers\HorarioController@show');

    Route::post('/horario/store','App\Http\Controllers\HorarioController@store');

    Route::patch('/horario/update/{id}','App\Http\Controllers\HorarioController@update');

    Route::delete('/horario/destroy/{id}','App\Http\Controllers\HorarioController@destroy');

    Route::get('/horariosDisponiveis','App\Http\Controllers\HorarioController@getHorariosDisponiveis');

    Route::get('/horarioEspecifico/{hora}','App\Http\Controllers\HorarioController@getHorarioEspecifico');
});
Route::post('/login','App\Http\Controllers\AuthController@login');
Route::post('/logout','App\Http\Controllers\AuthController@logout');
Route::get('/agendamentos','App\Http\Controllers\AgendamentoController@index');
