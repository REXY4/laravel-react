<?php

use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\API\MenuController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'login'])->name('login'); // Pastikan ini benar
Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::middleware('auth:sanctum')->prefix('menus')->group(function () {
    Route::get('/', [MenuController::class, 'index']);
    Route::post('/', [MenuController::class, 'store']);
    Route::get('/{id}', [MenuController::class, 'show']);
    Route::put('/{id}', [MenuController::class, 'update']);
    Route::delete('/{id}', [MenuController::class, 'destroy']);
})->name('menus');
