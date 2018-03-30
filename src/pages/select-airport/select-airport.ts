import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';
import 'rxjs/add/operator/debounceTime';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
// import { AIRPORTS } from '../../providers/airportList';

/**
 * Generated class for the SelectAirportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-airport',
  templateUrl: 'select-airport.html',
})
export class SelectAirportPage {
  data: any =[];
  errorMessage: string;
  items: any= [];
  searchControl:FormControl;
  searching: any = false;
  searchby = 'airport';

  searchTerm: string = '';

  private searchField: FormControl;
  private results: Observable<any>;

  constructor(public viewCtrl: ViewController, public home: HomeServiceProvider ) {
    this.searchControl = new FormControl();
   // this.getAirports()
    // this.home.search('akhiok').subscribe(x=>{
    //   console.log('return airports', x)
    // })
    this.searchField = new FormControl();
  }

  onSelectChange(){
    this.items = [];
    this.searchTerm = '';
    
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges
    .debounceTime(1000)
    .switchMap( term => {
      if(term.length > 2){
        console.log(term)
        return this.home.search(term,this.searchby)
      }else {
        console.log(term)
        return  Observable.of({data: {data: []}}) 
      }
      })
    .subscribe(search => {
      console.log(search)
      this.searching = false;
      console.log("jibrish result print",search)
      this.items = search.data.data;
      
        //    this.setFilteredItems();
    });

    

  //  console.log(AIRPORTS.filter(x => x.id == 4)) 
    
  }
  onSearchInput(){
    this.searching = true;
  }

  closeModal() {
    this.viewCtrl.dismiss({data: 'name'});
  }

  itemSelected(item){
    this.viewCtrl.dismiss({data: item});
  }

  

  
}
