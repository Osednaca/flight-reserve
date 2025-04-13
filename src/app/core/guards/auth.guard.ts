import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.isLoggedIn().pipe(
      take(1),
      map(isLoggedIn => {
        if (isLoggedIn) return true;
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}