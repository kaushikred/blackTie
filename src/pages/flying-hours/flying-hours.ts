import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import {
    IonicPage,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    PopoverController,
    ToastController,
} from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';

/**
 * Generated class for the FlyingHoursPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flying-hours',
  templateUrl: 'flying-hours.html',
})
export class FlyingHoursPage {
  errorMessage:string;
  login:string = 'LoginPage';
  enquiry = 'EnquiryPage';
  details: any = {
    data: '',
    total_package_hours: '',
    remaining_hours: ''

  };
  loading:any;
  

  constructor(public modalCtrl: ModalController, public home: HomeServiceProvider,private toastCtrl: ToastController, private loadingCtrl: LoadingController, public auth: AuthProvider, private popoverCtrl: PopoverController ) {
  }

  ionViewWillEnter() {
    this.getDetails()
    this.showLoader();
    
  }

  openModal() {
    let modal = this.modalCtrl.create('RequestAccountPage');
    // Getting data from the modal:
    modal.onDidDismiss(data => {
        
    });
    modal.present();
 }

  optionsPopover(event) {
    console.log(event)
    let popover = this.popoverCtrl.create('PopPage')
       popover.present({
          ev: event
       });
  }

  getDetails() {
    this.home.getAccountDetails()
       .subscribe(
         details => {
          this.loading.dismiss()                  
          this.details = details;
         },
         error =>  {
          this.loading.dismiss()   
          if(error.status == 401 ){
            this.presentToast("Please Login")    
          }else{
            this.presentToast('Something went wrong try again!') 
          }
           
                
           this.errorMessage = <any>error
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
