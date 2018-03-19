import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { PromotionProvider } from '../../providers/promotion/promotion';

/**
 * Generated class for the PromotionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promotion',
  templateUrl: 'promotion.html',
})
export class PromotionPage {

  promos: any = [];
  errorMessage: string;
  loading:any;
  login = 'LoginPage';
  

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController , private auth: AuthProvider, private promo: PromotionProvider, private popoverCtrl: PopoverController ) {
    this.getPromotions();
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

  getPromotions(){
    this.promo.getPromotion()
    .subscribe(
      promos => {
        this.loading.dismiss()   
        console.log(promos)             
        this.promos = promos
      },
      error =>  {
        this.loading.dismiss()  
        this.presentToast();
      });
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
