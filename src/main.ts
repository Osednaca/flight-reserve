import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FlightSearchComponent } from './app/components/flight-search/flight-search.component';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: FlightSearchComponent },
    ]),
    importProvidersFrom(HttpClientModule),
  ]
});