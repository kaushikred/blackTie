import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlyingHoursPage } from './flying-hours';

@NgModule({
  declarations: [
    FlyingHoursPage,
  ],
  imports: [
    IonicPageModule.forChild(FlyingHoursPage),
  ],
})
export class FlyingHoursPageModule {}
