import { Component } from '@angular/core';
import { IonicPage, LoadingController,ModalController, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { PackagesProvider } from '../../providers/packages/packages';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

/**
 * Generated class for the PackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-package',
  templateUrl: 'package.html',
})
export class PackagePage {
  errorMessage: string;
  data: any = [];
  loading:any;
  login: string = 'LoginPage'
  tokenoneSignal:string= 'MDdmN2U1NjQtY2MwZS00YWEyLWIxMmItNWNhMGE1MmM2NjRm';	
  

  constructor(public modalCtrl: ModalController, public http: HttpClient,private toastCtrl: ToastController , public packages: PackagesProvider,public loadingCtrl: LoadingController, public auth: AuthProvider, private popoverCtrl: PopoverController) {}

  ionViewDidLoad() {
    this.getPackages();
    this.showLoader();
    
  }

  openModal(id) {
    let modal = this.modalCtrl.create('RequestPackagePage', {package: id});
    // Getting data from the modal:
    modal.onDidDismiss(data => {
    });
    modal.present();
  }

  optionsPopover(event) {
    let popover = this.popoverCtrl.create('PopPage')
       popover.present({
          ev: event
       });
  }

  getPackages(){
    this.packages.getPackages()
    .subscribe(
      packages =>{
        this.loading.dismiss()
        this.data = packages;
      },
      error =>  {
        this.loading.dismiss()  
        this.presentToast('Something went wrong try again!');
      });
  }

  bookPackage(id){
    this.showLoader();
    this.packages.bookPackage(id)
      .subscribe(
          data => {
            this.loading.dismiss()  
            this.presentToast('Your package booking equiry has been sent, your valet will contact you shortly !');
            this.sendPush()       
            
          },
          error => {
            this.loading.dismiss()  
            this.presentToast('Something went wrong try again!');
            console.log(error.status)
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
      duration: 5000,
      position: 'bottom',
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  sendPush(){
    console.log('sent pushing')
    let username = localStorage.getItem('username');    
    

    var headers = new HttpHeaders();
    
    headers.append('Authorization', 'Basic ' + this.tokenoneSignal); 

    let item = {
      "app_id": "2816ecdb-566e-4ee9-bcb3-f9257aaf04a8",
        "contents": {"en": "We have received your enquiry, your flight valet will contact you shortly."},
        "filters": [
            {"field": "tag", "key": "Customer_Id", "relation": "=", "value": username}
        ]
    
    }

    this.http.post('https://onesignal.com/api/v1/notifications', item, {
      headers: new HttpHeaders().set('Authorization', `Basic ${this.tokenoneSignal}`)
    } )
    .subscribe(res => {
      console.log(res)
    }, (err) => {
     console.log(err)
    });
    
    
    
  }

}
