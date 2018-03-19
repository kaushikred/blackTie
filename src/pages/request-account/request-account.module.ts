import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestAccountPage } from './request-account';

@NgModule({
  declarations: [
    RequestAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestAccountPage),
  ],
})
export class RequestAccountPageModule {}
