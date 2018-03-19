import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { HowItServiceProvider } from '../../providers/how-it-service/how-it-service';

/**
 * Generated class for the HowWorksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-how-works',
  templateUrl: 'how-works.html',
})
export class HowWorksPage {
  data: any = [];
  errorMessage: string;
  loading:any;
  
  constructor(private toastCtrl: ToastController , public how: HowItServiceProvider, public loadingCtrl: LoadingController, private popoverCtrl: PopoverController ) {
    
    this.getHow()
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

  expandItem(item){
    this.data.map((listItem) => {
        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }
        return listItem;
    });
  }

  getHow(){
    this.how.getHowItWorks()
    .subscribe(
      data => {
        this.loading.dismiss()
        this.data = data
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
