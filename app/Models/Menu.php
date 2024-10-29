<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Menu extends Model
{
    protected $fillable = ['id', 'name', 'parent_id', 'depth'];

    public $incrementing = false;
    protected $keyType = 'uuid';

    // Relasi ke parent
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    // Relasi ke children
    public function children(): HasMany
    {
        return $this->hasMany(Menu::class, 'parent_id');
    }
}
