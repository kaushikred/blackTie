import { Component } from '@angular/core';
import { IonicPage, LoadingController, PopoverController } from 'ionic-angular';
import { TipsServiceProvider } from '../../providers/tips-service/tips-service';
/**
 * Generated class for the TipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html',
})
export class TipsPage {

  data: any ;
  errorMessage: string;
  loading:any;
  

  constructor(private tips: TipsServiceProvider,public loadingCtrl: LoadingController, private popoverCtrl: PopoverController ) {
        
    this.getTips();
  }

  optionsPopover(event) {
    let popover = this.popoverCtrl.create('PopPage')
       popover.present({
          ev: event
       });
  }

  ionViewDidLoad() {
    this.showLoader();
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

  getTips(){
    this.tips.getTips()
    .subscribe(
      tips => {
        this.loading.dismiss()  
        this.data = tips
      },
      error =>  {
        this.loading.dismiss()        
      }
    )}

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: ''
    });

    this.loading.present();
  }

}
