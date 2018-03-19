import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { SERVER_NAME } from '../server';

/*
  Generated class for the TipsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TipsServiceProvider {

  

  constructor(public http: HttpClient) {}


  getTips(): Observable<{}> {
    return this.http.get(SERVER_NAME+ 'flyingtips/').pipe(
      map(this.extractData),
    //  catchError(this.handleError)
    );
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || [];
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
