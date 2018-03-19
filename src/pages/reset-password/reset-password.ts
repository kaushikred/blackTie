import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  model: any = {};  
  loading:any;
  
  constructor(public navCtrl: NavController,private toastCtrl: ToastController , public navParams: NavParams,private loadingCtrl: LoadingController ,  public home: HomeServiceProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  reset(){
    this.showLoader();    
    this.home.resetPassword(this.model).subscribe(data =>{
      this.loading.dismiss()  
      this.presentToast('Password has been changed');
      this.navCtrl.pop()
    }, error =>{
      this.loading.dismiss()        
      if(error.status == 401){
        this.presentToast('Please enter the correct code');
      }else{
        this.presentToast('Something went wrong');
      }
      console.log(error)
    })
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

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: ''
    });

    this.loading.present();
  }

}
