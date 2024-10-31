<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Str;

class Menu extends Model
{
    protected $fillable = ['id', 'title', 'parent_id', 'depth'];

    public $incrementing = false;
    protected $keyType = 'uuid';

    protected static function boot()
    {
        parent::boot();

        // Set UUID untuk kolom 'id' secara otomatis
        static::creating(function ($model) {
            $model->id = Str::uuid()->toString();
        });
    }

    // Relasi ke parent
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    public function getChildrenAttribute()
        {
            return $this->children()->with('children')->get() ?? [];
        }

    // Relasi ke children
    public function children(): HasMany
    {
        return $this->hasMany(Menu::class, 'parent_id');
    }
}
