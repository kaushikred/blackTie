import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

/**
 * Generated class for the RequestAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-account',
  templateUrl: 'request-account.html',
})
export class RequestAccountPage {
  model: any = {}
  loading:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public home: HomeServiceProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController ) {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestAccountPage');
  }

  sendEnquiry(){
    this.showLoader()
    this.home.requestAccount(this.model).subscribe((data)=>{
      this.loading.dismiss()  
      this.presentToast('Account request has been sent!')  
      this.viewCtrl.dismiss();
      console.log(data) 
    },error =>{
      this.loading.dismiss() 
      this.presentToast('Something went wrong try again!')       
      console.log(error)
    })
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
      duration: 4000,
      position: 'bottom',
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
