import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipsPage } from './tips';
import { AccordingComponentModule } from '../../components/accordion/accordion.module';


@NgModule({
  declarations: [
    TipsPage,
  ],
  imports: [
    IonicPageModule.forChild(TipsPage),
    AccordingComponentModule
  ],
})
export class TipsPageModule {}
