import { AirplaneMenuProvider } from '../../providers/airplane-menu/airplane-menu';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the AirplaneMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-airplane-menu',
  templateUrl: 'airplane-menu.html',
})
export class AirplaneMenuPage {

  data: any = [];
  itemExpandHeight: number = 100;
  errorMessage: string;
  newUrl:string;
  loading:any;
  

  constructor(private toastCtrl: ToastController ,public airplaneMenu: AirplaneMenuProvider,private sanitizer:DomSanitizer, private loadingCtrl: LoadingController, private popoverCtrl: PopoverController) {
    // this.data = [
    //   {airplane_name: 'King Air', number_of_seat: 8, airplane_photo: 'assets/imgs/p5.png', expanded: false},
    //   {airplane_name: 'Pilatus', number_of_seat: 6, airplane_photo: 'assets/imgs/p6.png', expanded: false},
    //   {airplane_name: 'Citation CJ2', number_of_seat: 4, airplane_photo: 'assets/imgs/p7.png', expanded: false},
    //   {airplane_name: 'Phenom 100', number_of_seat: 8, airplane_photo: 'assets/imgs/p4.png', expanded: false},
    //   {airplane_name: 'Citation Mustang', number_of_seat: 5, airplane_photo: 'assets/imgs/p4.png', expanded: false},  
    //   {airplane_name: 'Phenom 100', number_of_seat: 9, airplane_photo: 'assets/imgs/p5.png',expanded: false}
      
    // ]
    
    this.getMenu()
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

  getMenu(){
    this.airplaneMenu.getAirplaneMenu()
    .subscribe(
      menuItems =>{
        this.loading.dismiss()        
        this.data = menuItems;
        this.data.forEach(function(e) { e.expanded =  false });
        
      },
      error =>  {
        this.loading.dismiss()  
        this.presentToast();
        this.errorMessage = <any>error
      });
  }

  sanitize(url:string){
    let newUrl = 'http://13.127.126.229' + url ;
    return this.sanitizer.bypassSecurityTrustUrl(newUrl);
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
