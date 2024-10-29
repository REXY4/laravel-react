<?php

namespace App\Http\Controllers\API;

use App\Models\Menu;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    // Mendapatkan semua menu secara hierarki
    public function index()
    {
        $menus = Menu::with('children')->whereNull('parent_id')->get();
        return response()->json($menus);
    }

    // Menambahkan menu baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|uuid|exists:menus,id',
            'depth' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Membuat menu baru
        $menu = Menu::create($request->all());
        return response()->json($menu, 201); // Mengembalikan status 201 Created
    }

    // Mendapatkan detail menu spesifik
    public function show($id)
    {
        $menu = Menu::with('children')->findOrFail($id);
        return response()->json($menu);
    }

    // Memperbarui menu
    public function update(Request $request, $id)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'parent_id' => 'nullable|uuid|exists:menus,id',
            'depth' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $menu = Menu::findOrFail($id);
        $menu->update($request->all());
        return response()->json($menu);
    }

    // Menghapus menu
    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();
        return response()->json(['message' => 'Menu deleted'], 204); // Mengembalikan status 204 No Content
    }
}