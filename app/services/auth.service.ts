import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constants';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

  public user: any;

  constructor(private httpClient: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${API_URL}/login`, {username, password }, {observe: 'response'}).do(res => {
      const authorization = res.headers.get('Authorization');
      sessionStorage.setItem('authorization', authorization);
      this.user = res.body;
    });
  }

  public getUser(): Observable<any> {
    return this.httpClient.get(`${API_URL}/api/user/me`);
  }

  public isLoggedId(): boolean {
    const token = sessionStorage.getItem('authorization');
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
        sessionStorage.clear(); // ;setItem('authorization', authorization);
      }
    });
  }
}