import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestFlightPage } from './request-flight';

@NgModule({
  declarations: [
    RequestFlightPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestFlightPage),
  ],
})
export class RequestFlightPageModule {}
