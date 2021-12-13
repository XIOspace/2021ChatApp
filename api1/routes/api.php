<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes1
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:api')->post('/user', 'ApiController@user');
// Route::middleware('auth:api')->get('/user', 'ApiController@user');
// Route::get('/userlogin', 'ApiController@userlogin');
Route::post('/userlogin', 'ApiController@userlogin');
