import { Component } from '@angular/core';
import { IonicPage,App, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop',
  templateUrl: 'pop.html',
})
export class PopPage {

  constructor(private app: App , private viewCtrl: ViewController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopPage');
  }

  myAccount(page){
    this.viewCtrl.dismiss().then(() => {
      this.app.getActiveNav().push(page)
  
    });
  }

}
