import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { OtherPage } from '../pages/other/other';
//import { TabsPage } from '../pages/tabs/tabs';
import { CompanygroupPage } from '../pages/companygroup/companygroup';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { HomePage } from '../pages/home/home';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { UnitgroupPage } from '../pages/unitgroup/unitgroup';
//import { AddUnitPage } from '../pages/add-unit/add-unit';

import { RolePage } from '../pages/role/role';
import { ReporttemplatePage } from '../pages/reporttemplate/reporttemplate';
//import { AddunitgroupPage } from '../pages/addunitgroup/addunitgroup';
import { App } from 'ionic-angular';
//import { AtmentionedPage } from '../pages/atmentioned/atmentioned';
import { UnitsPage } from '../pages/units/units';
import { OrgchartPage } from '../pages/orgchart/orgchart';
import { AddorgchartonePage } from '../pages/addorgchartone/addorgchartone';
import { AddorgcharttwoPage } from '../pages/addorgcharttwo/addorgcharttwo';
import { AddreporttemplatePage } from '../pages/addreporttemplate/addreporttemplate';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public _platform: Platform, public statusBar: StatusBar, public _SplashScreen: SplashScreen,
    public appCtrl: App) {


    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      /*{ title: 'Tabs Page', component: TabsPage  },
      { title: 'Other Page', component: OtherPage },*/
      { title: 'Dashboard', component: HomePage },
      { title: 'Company Group', component: CompanygroupPage },
      { title: 'Users', component: UserPage },
      //{ title: 'Add Unit Group', component: AddunitgroupPage },
      { title: 'Unit Group', component: UnitgroupPage },
      { title: 'Units', component: UnitsPage },
      { title: 'Role', component: RolePage },
      { title: 'My Account', component: MyaccountPage },
      // { title: 'At mentioned Page', component: AtmentionedPage },

      { title: 'Report Template', component: ReporttemplatePage },
      //{ title: 'Report Template', component: OrgchartPage },
      { title: 'Logout', component: LogoutPage },
      { title: 'Add Org-1', component: AddorgchartonePage },
      { title: 'Add Org-2', component: AddorgcharttwoPage },
     // { title: 'Add Report Template', component: AddreporttemplatePage}

    ];

  }


  initializeApp() {
    this.statusBar.styleDefault();
    this._platform.ready().then(() => {
      // do whatever you need to do here.
      setTimeout(() => {
        this._SplashScreen.hide();
      }, 100);
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

