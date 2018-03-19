import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifications:any = [];
  loading:any;
  login = 'LoginPage';
  
  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController , public home: HomeServiceProvider,  private auth: AuthProvider, private popoverCtrl: PopoverController ) {}

  ionViewWillEnter() {
    this.getNotifications();
    this.showLoader();
  }

  optionsPopover(event) {
    let popover = this.popoverCtrl.create('PopPage')
       popover.present({
          ev: event
       });
  }

  getNotifications() {
    this.home.getNotifications()
       .subscribe(
         notifications => {
          console.log(notifications)
          this.loading.dismiss()                  
          this.notifications = notifications;
         },
         error =>  {
          this.loading.dismiss()   
          if(error.status == 401 ){
            this.presentToast("Please Login")    
          }else{
            this.presentToast('Something went wrong try again!') 
          }
           console.log("this error",JSON.stringify(error))
         });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: ''
    });

    this.loading.present();
  }

  presentToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'bottom',
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
