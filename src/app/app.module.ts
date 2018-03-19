import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal';


import { MyApp } from './app.component';
import { HomeServiceProvider } from '../providers/home-service/home-service';
import { TipsServiceProvider } from '../providers/tips-service/tips-service';
import { HowItServiceProvider } from '../providers/how-it-service/how-it-service';
import { AirplaneMenuProvider } from '../providers/airplane-menu/airplane-menu';
import { PackagesProvider } from '../providers/packages/packages';
import { AuthProvider } from '../providers/auth/auth';
import { PromotionProvider } from '../providers/promotion/promotion';
import { EnquiryProvider } from '../providers/enquiry/enquiry';
import { OneSignlProvider } from '../providers/one-signl/one-signl';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeServiceProvider,
    OneSignal,
    TipsServiceProvider,
    HowItServiceProvider,
    AirplaneMenuProvider,
    PackagesProvider,
    AuthProvider,
    PromotionProvider,
    EnquiryProvider,
    OneSignlProvider
  ]
})
export class AppModule {}
