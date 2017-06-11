import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { OtherPage } from '../pages/other/other';
//import { TabsPage } from '../pages/tabs/tabs';
import { CompanygroupPage } from '../pages/companygroup/companygroup';
import { UserPage } from '../pages/user/user';
//import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { HomePage } from '../pages/home/home';
import { MyaccountPage } from '../pages/myaccount/myaccount';

import { AddUnitPage } from '../pages/add-unit/add-unit';

import { RolePage } from '../pages/role/role';
import { App } from 'ionic-angular';
import { AtmentionedPage } from '../pages/atmentioned/atmentioned';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AtmentionedPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public appCtrl: App) {


    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      /*{ title: 'Tabs Page', component: TabsPage  },
      { title: 'Other Page', component: OtherPage },*/
      { title: 'Dashboard', component: HomePage },
      { title: 'Company Group', component: CompanygroupPage },
      { title: 'Users', component: UserPage },
      { title: 'Role', component: RolePage },
      { title: 'My Account', component: MyaccountPage },
      { title: 'Logout', component: LogoutPage },
      { title: 'Add Unit', component: AddUnitPage },
      { title: 'At mentioned Page', component: AtmentionedPage }
      
    ];

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.push(page.component);

    //this.nav.getRootNav().push
    //this.nav.getRootNav().push(page.component);

    //this.viewCtrl.dismiss();
     //this.nav.push(page.component);
     this.nav.setRoot(page.component);
   //this.appCtrl.getRootNav().setRoot(page.component);
  }
}

