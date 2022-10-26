<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Recipe;
use App\Http\Resources\RecipeResource;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    public function __construct()
    {
    }

    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function index()
    {
        return auth()->user()->recipes()->get();
    }

    public function store(Request $request)
    {
        $checkRecipe = Recipe::all()->where('user_id', $request->user_id)->where('title', $request->title)->isEmpty();
        if ($checkRecipe) {
                $recipe = Recipe::create([
                    'user_id' => $request->user_id,
                    'game_id'=>$request->game_id,
                    'title' => $request->title,
                    'img' => $request->img
                ]);
      
                return response()->json(['message' => 'Recipe Added']);
            }else{
                return response()->json(['message' => 'Recipe already exists in your list']);

            }

    }
    public function fetch(Request $request){
        $id=$request->id;
        $favordata = Recipe::where('user_id', $id)
        ->orderBy('title')
        ->get();
        return response()->json($favordata);
    }
    public function update(Request $request, Recipe $recipe)
    {
        // check if currently authenticated user is the owner of the book
        if ($request->user()->id !== $recipe->user_id) {
            return response()->json(['error' => 'You can only edit your own recipes.'], 403);
        }

        $recipe->update($request->only(['title']));

        return new RecipeResource($recipe);
    }

    public function destroy(Request $request, $id)
    {
        Recipe::where('id', $request->id)->delete();
        $recipes = Recipe::where('user_id', $request->user()->id)->get();
        return response()->json($recipes);
        /* return RecipeResource::collection(Recipe::all()); */
        /* return response()->json(null, 204); */
    }
}
