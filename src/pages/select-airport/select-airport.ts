import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';
import 'rxjs/add/operator/debounceTime';

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
  items: any;
  searchControl:FormControl;
  searching: any = false;

  searchTerm: string = '';

  constructor(public viewCtrl: ViewController, public home: HomeServiceProvider ) {
    this.searchControl = new FormControl();
    this.getAirports()
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
            this.setFilteredItems();
    });
  }
  onSearchInput(){
    if(this.searchTerm.length>=3){
      this.searching = true;
    }
    else{
      this.searching=false;
    }
  }

  closeModal() {
    this.viewCtrl.dismiss({data: 'name'});
  }

  itemSelected(item){
    this.viewCtrl.dismiss({data: item});
  }

  filterItems(searchTerm){
      return this.data.filter((item) => {
          return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });    
  }

  getAirports(){
    this.searching = true;
    
    this.home.getAirports()
    .subscribe(
      airports => {
        this.searching = false;
        
        this.data = airports;        
        this.setFilteredItems();
      },
      error =>  {
        this.searching = false;        
        this.errorMessage = <any>error
      });
  }

  setFilteredItems() {
    if(this.searchTerm.length>=3){
      this.items = this.filterItems(this.searchTerm);
    }
    else{
      this.items = this.filterItems("");
    }
  }
}
