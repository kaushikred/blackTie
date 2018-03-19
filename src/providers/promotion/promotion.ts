import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { SERVER_NAME } from '../server';

/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PromotionProvider Provider');
  }

  getPromotion(): Observable<{}> {
    return this.http.get(SERVER_NAME+ 'promotiondetails/').pipe(
      map(this.extractData),
    );
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || [];
  }

}
