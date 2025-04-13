import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => 
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => 
      import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'flights',
    loadComponent: () => 
      import('./features/flights/flight-search/flight-search.component').then(m => m.FlightSearchComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'bookings',
    loadComponent: () => 
      import('./features/bookings/booking-list/booking-list.component').then(m => m.BookingListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];