import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { OneSignlProvider } from '../../providers/one-signl/one-signl';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  model: any = {};
  loading:any;
  
  constructor(  public home: HomeServiceProvider ,private toastCtrl: ToastController , public alertCtrl: AlertController, private loadingCtrl: LoadingController , public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, public oneSignal: OneSignlProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  //  this.login()
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Enter Email',
      message: "Password will be sent to your Email id",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log(data)
            this.home.forgotPassword(data).subscribe(data=>{
              if(!data){
                this.presentToast('Please enter valid email');
              }
              this.navCtrl.push('ResetPasswordPage')
              this.presentToast('Password Reset Code Has Been Sent To Email');
            },error =>{
              console.log(error)
              this.presentToast('Account with this email is not present');
             // this.navCtrl.push('ResetPasswordPage')
              // this.presentToast("Email not exist");
            })
        //    console.log('push')
        //    this.navCtrl.push('ResetPasswordPage')
        //    this.presentToast('Password Reset Code Has Been Sent To Email');
            
          }
        }
      ]
    });
    prompt.present();
    prompt.onDidDismiss((data) =>{
      
       if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))
        {
          console.log('valid')
        }else{
          this.presentToast('Please enter valid email');
        }
       // alert("You have entered an invalid email address!")
        
      
      console.log(data)
    //  this.navCtrl.push('ResetPasswordPage')
    } )
  }

  login() {
//    this.loading = true;
    this.showLoader();
    this.auth.login(this.model.username, this.model.password)
        .subscribe(
            data => {
              console.log(data)
            //  this.navCtrl.push('MenuPage');
              this.oneSignal.push(this.model.username)
              localStorage.setItem('username', (this.model.username))
              
              this.navCtrl.pop();
              this.loading.dismiss()                      
             //   this.router.navigate([this.returnUrl]);
            },
            error => {
              this.loading.dismiss() 
              if(error.status === 401) {
                this.presentToast('Username or Password does not match');
              }else{
                this.presentToast('Something went wrong try again!');
              }
              
              console.log(error.status)
            });
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
