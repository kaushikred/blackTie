

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { SERVER_NAME } from '../server';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
  }

  login(username: string, password: string): Observable<{}> {
    return this.http.post(SERVER_NAME+ 'login/',  { email: username, password: password }).pipe(
      map(this.extractData),
   //   catchError(this.handleError)
    );
  }

  isAuthenticated(){
    if (localStorage.getItem('token')) {
      // logged in so return true
      return true;
    }

    return false;
  }

  
  private extractData(res: any) {
    let body = res.data.result;
    console.log("body",body)
    if (body ) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('token', body);
    }

    return body || { };
  }
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return error;
  }

  // login(username: string, password: string) {
  //   return this.http.post<any>('/api/authenticate', { username: username, password: password })
  //       .map(user => {
  //           // login successful if there's a jwt token in the response
  //           if (user && user.token) {
  //               // store user details and jwt token in local storage to keep user logged in between page refreshes
  //               localStorage.setItem('currentUser', JSON.stringify(user));
  //           }

  //           return user;
  //       });
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }

}
