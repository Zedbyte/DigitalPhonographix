<?php

namespace App\Http\Controllers;

use App\Models\PreTest;
use Illuminate\Http\Request;

class PreTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('pretest/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PreTest $preTest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PreTest $preTest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PreTest $preTest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PreTest $preTest)
    {
        //
    }
}
