import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { SERVER_NAME } from '../server';

/*
  Generated class for the EnquiryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnquiryProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EnquiryProvider Provider');
  }

  sendEnquiry(data): Observable<{}> {
    return this.http.post(SERVER_NAME+ 'enquiry/',  data).pipe(
      map(this.extractData),
   //   catchError(this.handleError)
    );
  }

  private extractData(res: any) {
    let body = res.data.result;
    console.log("body",body)
    return body || { };
  }

}
