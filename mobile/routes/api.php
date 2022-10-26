<?php
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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



// Public Routes

Route::any('/register', [AuthController::class, 'register']);
Route::any('/login', [AuthController::class, 'login']);
Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/{id}', [RecipeController::class, 'show']);
Route::get('/recipes/search/{title}', [RecipeController::class, 'search']);
Route::any('/recipesdetail', [RecipeController::class, 'store']); // POST to saved recipes ???
Route::any('/getFavor', [RecipeController::class, 'fetch']); // POST to saved recipes ???

// Protected Routes

// Route::group(['middleware' => ['auth:sanctum']], function () {
//     Route::post('/recipesdetail', [RecipeController::class, 'store']); // POST to saved recipes ???
//     Route::put('/recipes/{id}', [RecipeController::class, 'update']); // specific recipe
//     Route::delete('/recipes/{id}', [RecipeController::class, 'destroy']);
//     Route::get('/recipeslist',  [RecipeController::class, 'index'] ); // saved recipes
//     Route::post('/logout', [AuthController::class, 'logout']);


//     // Route::get('saved-recipes', 'SavedRecipeController@index');
//     // Route::post('saved-recipes', 'SavedRecipeController@store');
//     // Route::delete('saved-recipes/{recipeId}', 'SavedRecipeController@destroy');
// });

Route::middleware(['cors'])->group(function () {

    // Route::post('/recipesdetail', [RecipeController::class, 'store']); // POST to saved recipes ???
    // Route::get('/recipesdetail', [RecipeController::class, 'index']); // POST to saved recipes ???
    Route::put('/recipes/{id}', [RecipeController::class, 'update']); // specific recipe
    Route::delete('/recipes/{id}', [RecipeController::class, 'destroy']);
    Route::get('/recipeslist',  [RecipeController::class, 'index'] ); // saved recipes
    Route::post('/logout', [AuthController::class, 'logout']);
});
