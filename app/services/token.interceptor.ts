import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';
import { AUTHORIZATION_KEY } from '../constants';
import * as ApplicationSettings from 'application-settings';
import { NavigationService } from './navigation.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private navigationService: NavigationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = ApplicationSettings.getString(AUTHORIZATION_KEY);
    console.log(token);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).do(evt => {
      //
    }, (err: HttpErrorResponse) => {
      console.dir(err);
      if (err.status === 403) {
        ApplicationSettings.remove(AUTHORIZATION_KEY);
        this.navigationService.go(['/']);
      }
    });
  }
}
