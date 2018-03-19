import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';
import {DomSanitizer} from '@angular/platform-browser';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeServiceProvider]
})
export class HomePage {
  Arr = Array; //Array type captured in a variable
  num:number = 8;
  banners: any = [];
  errorMessage: string;
  loading:any;
  

  requestFlight = 'RequestFlightPage';
  airplaneMenu = 'AirplaneMenuPage';
  package = 'PackagePage';
  enquiry = 'EnquiryPage';
  howWorks = 'HowWorksPage';
  tips = 'TipsPage';
  offerPage = 'PromotionPage';
  myAccount = 'FlyingHoursPage';
  bookingPage = 'MyBookingsPage';

  constructor(private toastCtrl: ToastController , public home: HomeServiceProvider,private sanitizer:DomSanitizer,private loadingCtrl: LoadingController, private popoverCtrl: PopoverController) {
    this.getBanners()
  }

  ionViewDidLoad() {
    this.showLoader();
  }

  optionsPopover(event) {
    let popover = this.popoverCtrl.create('PopPage')
       popover.present({
          ev: event
       });
  }
  getBanners() {
    this.home.getBanners()
       .subscribe(
         banners => {
          this.loading.dismiss()          
          this.banners = banners
         },
         error =>  {
          this.loading.dismiss()  
          this.presentToast();
         });
  }

  sanitize(url:string){
    let newUrl = 'http://13.127.126.229' + url ;
    return this.sanitizer.bypassSecurityTrustUrl(newUrl);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: ''
    });

    this.loading.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Something went wrong try again!',
      duration: 4000,
      position: 'bottom',
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


}
