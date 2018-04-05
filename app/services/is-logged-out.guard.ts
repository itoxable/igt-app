import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { NavigationService } from './navigation.service';

@Injectable()
export class IsLoggedOutGuard implements CanActivate {
  constructor(private authService: AuthService, private navigationService: NavigationService) {
    //
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedId()) {
      this.navigationService.go(['/secure']);
      return false;
    }
    return true;
  }
}
