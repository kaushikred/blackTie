import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBookingsPage } from './my-bookings';
import { MomentModule } from 'angular2-moment';


@NgModule({
  declarations: [
    MyBookingsPage,
  ],
  imports: [
    MomentModule,    
    IonicPageModule.forChild(MyBookingsPage),
  ],
})
export class MyBookingsPageModule {}
