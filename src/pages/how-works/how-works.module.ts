import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HowWorksPage } from './how-works';
import { AccordingComponentModule } from '../../components/accordion/accordion.module';

@NgModule({
  declarations: [
    HowWorksPage
  ],
  imports: [
    IonicPageModule.forChild(HowWorksPage),
    AccordingComponentModule
    
  ],
})
export class HowWorksPageModule {}
