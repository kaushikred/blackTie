import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';

/**
 * Generated class for the RequestPackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-package',
  templateUrl: 'request-package.html',
})
export class RequestPackagePage {
  model: any = {}
  loading:any;
  
  constructor(public navCtrl: NavController,public viewCtrl: ViewController ,  
    public navParams: NavParams, public home: HomeServiceProvider , private loadingCtrl: LoadingController , private toastCtrl: ToastController ) {
    console.log(navParams.get('package'));
    this.model.package = navParams.get('package');
    this.model.message = 'test message';
    

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  sendEnquiry(){
    this.showLoader()
    this.home.requestPackage(this.model).subscribe((data)=>{
      this.loading.dismiss()  
      this.presentToast('Package request has been sent!')  
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
