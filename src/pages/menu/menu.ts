
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
 
export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}
 
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  rootPage = 'TabsPage';
 
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
 
  pages: PageInterface[] = [
    { title: 'Request A Flight', pageName: 'RequestFlightPage',  icon: 'md-jet' },
    { title: 'My Bookings', pageName: 'MyBookingsPage', icon: 'calendar' },
    // { title: 'My Flying Hours', pageName: 'MyBookingsPage', index: 1, icon: 'md-list-box' },
    { title: 'Notifications', pageName: 'NotificationsPage', tabComponent: 'NotificationsPage', index: 3, icon: 'md-notifications-outline' },
    { title: 'Discounts & Offers', pageName: 'PromotionPage',  icon: 'md-star-outline' },
    { title: 'Browse Packages', pageName: 'PackagePage',  icon: 'md-document' },
  //  { title: 'User Login', pageName: 'LoginPage',  icon: 'md-log-in' },
    
  ];
 
  constructor(public navCtrl: NavController, public auth: AuthProvider) { }
 
  openPage(page: PageInterface) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.push(page.pageName, params);
    }
  }

  openLoginPage(){
    this.nav.push('LoginPage');
  }
 
  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0]; 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }
 
}