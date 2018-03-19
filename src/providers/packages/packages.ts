import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { SERVER_NAME } from '../server';

/*
  Generated class for the PackagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PackagesProvider {
  headers = new HttpHeaders();
  token:string;

  constructor(public http: HttpClient) {
    this.token = localStorage.getItem('token');
    
  }
  
  
    getPackages(): Observable<{}> {
      return this.http.get(SERVER_NAME+ 'package/').pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }

    bookPackage(id): Observable<{}> {
      this.token = localStorage.getItem('token');
      console.log(this.token)
      
      return this.http.post(SERVER_NAME+ 'bookings/',  {package_id: id},{
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      }).pipe(
        map(this.extractData),
     //   catchError(this.handleError)
      );
    }
    
    private extractData(res: Response) {
      let body = res;
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
      return Observable.throw(errMsg);
    }


}
