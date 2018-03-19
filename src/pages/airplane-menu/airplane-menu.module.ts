import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirplaneMenuPage } from './airplane-menu';
import { AccordingComponentModule } from '../../components/accordion/accordion.module';

@NgModule({
  declarations: [
    AirplaneMenuPage
  ],
  imports: [
    IonicPageModule.forChild(AirplaneMenuPage),
    AccordingComponentModule
  ],
})
export class AirplaneMenuPageModule {}
