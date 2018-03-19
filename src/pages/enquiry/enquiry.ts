import { EnquiryProvider } from '../../providers/enquiry/enquiry';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

/**
 * Generated class for the EnquiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enquiry',
  templateUrl: 'enquiry.html',
})
export class EnquiryPage {
  model: any = {}
  loading:any;
  tokenoneSignal:string= 'MDdmN2U1NjQtY2MwZS00YWEyLWIxMmItNWNhMGE1MmM2NjRm';	
  
  
  constructor(public http: HttpClient,private loadingCtrl: LoadingController , private toastCtrl: ToastController , private popoverCtrl: PopoverController, private enquiry: EnquiryProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiryPage');
  }

  optionsPopover(event) {
    let popover = this.popoverCtrl.create('PopPage')
       popover.present({
          ev: event
       });
  }

  sendEnquiry(){
    this.showLoader();    
    this.enquiry.sendEnquiry(this.model)
      .subscribe(
          data => {
            this.model = {
              name: '',
              email: '',
              txt: ''
          }
          this.loading.dismiss()        
          
          this.presentToast('Message Sent Successfuly')
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
      duration: 4000,
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
