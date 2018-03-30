import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/do';

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';


import { SERVER_NAME } from '../server';

// let apiUrl = SERVER_NAME;


/*
  Generated class for the HomeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeServiceProvider {
  
  headers = new HttpHeaders();
  token:string;

  id = localStorage.getItem('currentUser')
  constructor(public http: HttpClient) {

    this.token = localStorage.getItem('token');
    
    let value = this.id;
    console.log(value)
    console.log(parseInt('015'))
    
  }
  


  getBanners(): Observable<{}> {
    return this.http.get(SERVER_NAME+'sliderbanner/').pipe(
      map(this.extractData),
    );
  }

  getAirports(): Observable<{}> {
    return this.http.get(SERVER_NAME+'airport/').pipe(
      map(res =>{
        let body:any = res;
        return body.data.data || { };
      }),
    );
  }

  getNotifications(): Observable<{}>{
    this.token = localStorage.getItem('token');
    console.log("token is",this.token)
    return this.http.get(SERVER_NAME+'notification/',{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(
      map(res =>{
        let body:any = res;
        console.log("response is", JSON.stringify(res))
        return body.data.data || { };
      }),
    );
  }

    bookFlight(data): Observable<{}> {
      this.token = localStorage.getItem('token');
      console.log(this.token)
      
      return this.http.post(SERVER_NAME+ 'request/flights/',  data,{
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      })
  //    .do(this.sendPush)
      .pipe(
        map(this.extractData),
     //   catchError(this.handleError)
      );
    }

    requestAccount(data): Observable<{}> {      
      return this.http.post(SERVER_NAME+ 'new/account/',data).pipe(
        map(this.extractData),
     //   catchError(this.handleError)
      );
    }

    requestPackage(data): Observable<{}> {      
      return this.http.post(SERVER_NAME+ 'new/package/request/',data).pipe(
        map(this.extractData),
     //   catchError(this.handleError)
      );
    }

    forgotPassword(data): Observable<{}> {      
      return this.http.post(SERVER_NAME+ 'forgot_password_mail/',data).pipe(
        map(this.extractData),
     //   catchError(this.handleError)
      );
    }

    resetPassword(data): Observable<{}> {      
      return this.http.post(SERVER_NAME+ 'change_forgot_passwrod/',data).pipe(
        map(this.extractData),
     //   catchError(this.handleError)
      );
    }
  

  getAccountDetails(): Observable<{}>{
    this.token = localStorage.getItem('token');    
    return this.http.get(SERVER_NAME+'userprofile/',{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  }).pipe(

      map(this.extractData),
    );
  }

  getRequested(): Observable<{}>{
    this.token = localStorage.getItem('token');    
    return this.http.get(SERVER_NAME+'new/request/flights/?request_type=requested',{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  }).pipe(

      map(this.extractData),
    );
  }

  getCompleted(): Observable<{}>{
    this.token = localStorage.getItem('token');    
    return this.http.get(SERVER_NAME+'new/request/flights/?request_type=completed',{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  }).pipe(

      map(this.extractData),
    );
  }

  getReserved(): Observable<{}>{
    this.token = localStorage.getItem('token');    
    return this.http.get(SERVER_NAME+'new/request/flights/?request_type=reserved',{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  }).pipe(

      map(this.extractData),
    );
  }

  getCoordinating(): Observable<{}>{
    this.token = localStorage.getItem('token');    
    return this.http.get(SERVER_NAME+'new/request/flights/?request_type=coordinating',{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  }).pipe(

      map(this.extractData),
    );
  }

  search(term:string,searchby:string): Observable<any> {
    console.log(term)
    let apiURL = `${SERVER_NAME}airport/?${searchby}=${term}`;
    return this.http.get(apiURL).pipe(
      map(this.extractData)
    )
  }
  
  private extractData(res: any) {
    console.log(res)
    let body = res;
    return body || { };
  }

  
  

}
