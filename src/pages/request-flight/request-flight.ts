import { AirplaneMenuProvider } from '../../providers/airplane-menu/airplane-menu';
import { Component } from '@angular/core';
import {
    IonicPage,
    LoadingController,
    ModalController,
    NavController,
    ToastController,
    ViewController,
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { AuthProvider } from '../../providers/auth/auth';
import { PopoverController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';


/**
 * Generated class for the RequestFlightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-flight',
  templateUrl: 'request-flight.html',
})
export class RequestFlightPage {

  trip = 'oneWay';
  myModal: any;
  flightForm: FormGroup;
  flightReturnForm: FormGroup;
  submitAttempt: boolean = false;
  model: any = {};
  modelr:any = {};
  minDate:string;
  from: string;
  to:string;
  airplanedata: any = [];
  loading:any;
  login: string = 'LoginPage'
  tokenoneSignal:string= 'MDdmN2U1NjQtY2MwZS00YWEyLWIxMmItNWNhMGE1MmM2NjRm';	
  
  
  
  
  constructor(public http: HttpClient,public modalCtrl: ModalController, private popoverCtrl: PopoverController , public auth: AuthProvider , public nav: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController , public airplaneMenu: AirplaneMenuProvider , public formBuilder: FormBuilder, public home: HomeServiceProvider  ) {
    var d = new Date();
    d.setHours(0, -d.getTimezoneOffset(), 0, 0); //removing the timezone offset.
    this.minDate = d.toISOString();
    
    
    this.flightForm = formBuilder.group({
      from: ['', Validators.required ],
      to: ['', Validators.required ],
      date: ['', Validators.required ],
      time: ['', Validators.required ],
      type:['', Validators.required ],
      passengers:['', Validators.required ]
  });
    this.flightReturnForm = formBuilder.group({
      from: ['', Validators.required ],
      to: ['', Validators.required ],
      date: ['', Validators.required ],
      returndate: ['', Validators.required ],      
      time: ['', Validators.required ],
      returntime: ['', Validators.required ],      
      type:['', Validators.required ],
      passengers:['', Validators.required ]
    });
  //  this.getMenu();
  }

  ionViewDidLoad() {
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

  getMenu(){
    this.airplaneMenu.getAirplaneMenu()
    .subscribe(
      menuItems =>{

        this.airplanedata = menuItems;        
      },
      error =>  {
        
      });
  }

  openModalf() {
     let modal = this.modalCtrl.create('SelectAirportPage');
     // Getting data from the modal:
     modal.onDidDismiss(data => {
         console.log('MODAL DATA', data.data.name);
         this.from = data.data.id;
         this.model.flight_from = data.data.name
     });
     modal.present();
  }

  openModalt() {
    let modal = this.modalCtrl.create('SelectAirportPage');
    // Getting data from the modal:
    modal.onDidDismiss(data => {
        console.log('MODAL DATA', data.name);
        this.to = data.data.id;
        this.model.flight_to = data.data.name
    });
    modal.present();
  }

  openModalrf() {
    let modal = this.modalCtrl.create('SelectAirportPage');
    // Getting data from the modal:
    modal.onDidDismiss(data => {
        console.log('MODAL DATA', data.data.name);
        this.from = data.data.id;
        this.modelr.flight_from = data.data.name
    });
    modal.present();
 }

 openModalrt() {
   let modal = this.modalCtrl.create('SelectAirportPage');
   // Getting data from the modal:
   modal.onDidDismiss(data => {
       console.log('MODAL DATA', data.name);
       this.to = data.data.id;
       this.modelr.flight_to = data.data.name
   });
   modal.present();
 }

  request(){
    if(this.flightForm.valid){
      this.showLoader();      
      let data = {
        flight_from: this.from.toString(),
        flight_to:this.to.toString(),
        flight_type:"one_way",
        plane_type:this.model.plane_type,
        number_of_passengers:this.model.number_of_passengers,
        date_time: this.model.date +" " + this.model.time,
        // return_date_time:"2018-02-20 00:00:00"
       };
      this.submitAttempt = false;
      console.log(data)
       this.home.bookFlight(data)
      .subscribe(
        data => {
          this.flightForm.reset()
          this.loading.dismiss() 
          this.sendPush()       
          this.presentToast('Your package booking request has been sent, your valet will contact you shortly !');          
          console.log(data)
        },
        error =>  {
          this.loading.dismiss() 
          this.presentToast('Something went wrong try again!')
          
        });
    }else{
      this.submitAttempt = true;
    }
  }

  requestReturn(){
    console.log('return')
    if(this.flightReturnForm.valid){
      this.showLoader();      
      let data = {
        flight_from: this.from.toString(),
        flight_to:this.to.toString(),
        flight_type:"two_way",
        plane_type:this.modelr.plane_type,
        number_of_passengers:this.modelr.number_of_passengers,
        date_time: this.modelr.date +" " + this.modelr.time,
        return_date_time: this.modelr.returndate + " " + this.modelr.returntime
       };
      this.submitAttempt = false;
      console.log(data)
       this.home.bookFlight(data)
      .subscribe(
        data => {
          this.flightReturnForm.reset()
          this.loading.dismiss() 
          this.sendPush()                 
          this.presentToast('Your package booking request has been sent, your valet will contact you shortly !');          
          console.log(data)
        },
        error =>  {
          this.loading.dismiss() 
          this.presentToast('Something went wrong try again!')
          
        });
    }else{
      this.submitAttempt = true;
    }
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
