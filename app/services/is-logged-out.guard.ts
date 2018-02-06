import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class IsLoggedOutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    //
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.isLoggedId()) {
    //   this.router.navigate(['/secure/dashboard']);
    //   return false;
    // }
    return true;
  }
}
