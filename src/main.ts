import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { 
  LucideAngularModule,
  Plane, 
  PlaneTakeoff, 
  PlaneLanding, 
  CalendarDays, 
  Calendar,
  User, 
  Users,
  Search, 
  CreditCard, 
  Moon,
  Sun,
  LogIn,
  LogOut,
  Twitter,
  Facebook,
  Instagram,
  Briefcase,
  List
} from 'lucide-angular';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick({ 
      Plane, 
      PlaneTakeoff, 
      PlaneLanding, 
      CalendarDays, 
      Calendar,
      User, 
      Users,
      Search, 
      CreditCard, 
      Moon,
      Sun,
      LogIn,
      LogOut,
      Twitter,
      Facebook,
      Instagram,
      Briefcase,
      List
    }),
  )
  ]
}).catch(err => console.error(err));