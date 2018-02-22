import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as ApplicationSettings from 'application-settings';
import * as Facebook from 'nativescript-facebook';

import { API_URL, AUTHORIZATION_KEY } from '../constants';


@Injectable()
export class AuthService {

  public user: any;

  constructor(private httpClient: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${API_URL}/login`, {username, password }, {observe: 'response'}).do((res) => {
      const authorization = res.headers.get('Authorization');
      ApplicationSettings.setString(AUTHORIZATION_KEY, authorization);
      this.user = res.body;
    });
  }

  public loadUser(): Promise<any> {

    return this.getUser().catch((err) => {
      return Observable.of({});
    }).toPromise();
  }

  public getUser(): Observable<any> {
    return this.httpClient.get(`${API_URL}/api/user/me`).do((user) => {
      this.user = user;
    });
  }

  public isLoggedId(): boolean {
    const token = ApplicationSettings.getString('authorization');
    if (token) {
      return true;
    }
    return false;
  }

  public signUp(user): Observable<any> {
    return this.httpClient.put(`${API_URL}/api/user/sign-up`, {user});
  }

  public saveUser(user): Observable<any> {
    return this.httpClient.put(`${API_URL}/api/user/update`, {user});
  }

  public changePassword(oldPassword: string, password: string): Observable<any> {
    return this.httpClient.put(`${API_URL}/api/user/change-password`, {oldPassword, password});
  }

  public logout(): Observable<any> {
    return this.httpClient.get(`${API_URL}/api/user/logout`).do((res: boolean) => {
      if (res) {
        ApplicationSettings.clear(); // ;setItem('authorization', authorization);
      }
    });
  }

  public gmailLogin() {
    // this.router.navigate(['/secure']);

    // tnsOAuthModule.login('/secure').
    console.log('gmailLogin');
  }

  onLogin(eventData: Facebook.LoginEventData) {
    if (eventData.error) {
        alert('Error during login: ' + eventData.error);
    } else {
      ApplicationSettings.setString('access_token', eventData.loginResponse.token);
        // this.navigationService.go(['home']);
    }
}

facebookLogin() {
    Facebook.login((error, fbData) => {
        if (error) {
            console.log(error);
            alert('Error during login: ' + error.message);
        } else {
          console.log(fbData);
          ApplicationSettings.setString('access_token', fbData.token);
        }
    });
}

}
