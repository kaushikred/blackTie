import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';


/*
  Generated class for the OneSignlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OneSignlProvider {

  constructor(public http: HttpClient, private oneSignal: OneSignal) {
    console.log('Hello OneSignlProvider Provider');
  }

  push(data){
    
        this.oneSignal.startInit('2816ecdb-566e-4ee9-bcb3-f9257aaf04a8', '192225178951');
    
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
        this.oneSignal.handleNotificationOpened().subscribe(() => {
         // do something when notification is received
          
        });
    
       
    
        console.log('email is',data)
    
        this.oneSignal.getIds()
       .then((ids) =>
       {
          console.log(ids)
          this.oneSignal.sendTags({ Customer_Id: data });
         
       });
    
       
    
        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });
    
        this.oneSignal.endInit();
    
      }

}
