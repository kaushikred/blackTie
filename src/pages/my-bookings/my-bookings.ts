import { Observable } from 'rxjs/Rx';
import { analyzeFile } from '@angular/compiler/public_api';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomeServiceProvider } from '../../providers/home-service/home-service';
import 'rxjs/observable/combineLatest';

/**
 * Generated class for the MyBookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-bookings',
  templateUrl: 'my-bookings.html',
})
export class MyBookingsPage {

  booking = 'requested';
  login = 'LoginPage';
  loading:any;
  completed:any= {
    data: []
  };
  upcoming:any = {
    data: []
  };
  requested:any ={
    data: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public home: HomeServiceProvider, private loadingCtrl: LoadingController , private toastCtrl: ToastController, private popoverCtrl: PopoverController ) {
  }

  ionViewDidEnter() {
    this.showLoader()

    this.home.getCompleted().subscribe((data:any)=>{
      console.log('completed',data.data)
      this.completed = data.data ; 
      this.loading.dismiss()     
    },error =>{
      this.loading.dismiss() 
    })

    this.home.getRequested().subscribe(( data:any) =>{
      this.requested = data.data; 
      console.log(this.requested)
   //   this.loading.dismiss()      
    },error =>{
   //   this.loading.dismiss() 
    })

    let a1 = this.home.getCoordinating()
    let a2 = this.home.getReserved()

    Observable.combineLatest(a1,a2)
      .subscribe((combined:any) =>{
     //   this.loading.dismiss() 
        this.upcoming = combined[0].data.data.concat(combined[1].data.data)
      })

    
  }

  optionsPopover(event) {
    let popover = this.popoverCtrl.create('PopPage')
       popover.present({
          ev: event
       });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: ''
    });

    this.loading.present();
  }

}
