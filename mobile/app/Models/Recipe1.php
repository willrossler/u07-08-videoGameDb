<?php
use Illuminate\Database\Eloquent\Model;
use App\User;

class Recipe extends Model
{
    //

    protected $fillable = ['userId', 'title', 'img','gameId'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    
}
