<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function search(Request $request)
    {
        $request->validate([
            'origin' => 'required|string',
            'destination' => 'required|string',
            'date' => 'required|date',
        ]);

        $flights = Flight::where('origin', $request->origin)
            ->where('destination', $request->destination)
            ->whereDate('departure_date', $request->date)
            ->get();

        return response()->json($flights);
    }
}