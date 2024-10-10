<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Flight;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'flight_id' => 'required|exists:flights,id',
            'passenger_name' => 'required|string',
        ]);

        $flight = Flight::findOrFail($request->flight_id);

        if ($flight->available_seats <= 0) {
            return response()->json(['message' => 'No hay asientos disponibles'], 400);
        }

        $booking = Booking::create($request->all());
        $flight->decrement('available_seats');

        return response()->json(['message' => 'Reserva creada con éxito', 'booking' => $booking], 201);
    }
}