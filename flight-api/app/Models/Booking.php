<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'flight_id',
        'passenger_name',
    ];

    public function flight()
    {
        return $this->belongsTo(Flight::class);
    }
}