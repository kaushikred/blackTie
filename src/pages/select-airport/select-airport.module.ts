import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectAirportPage } from './select-airport';

@NgModule({
  declarations: [
    SelectAirportPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectAirportPage),
  ],
})
export class SelectAirportPageModule {}
