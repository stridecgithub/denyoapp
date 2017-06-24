import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { OtherPage } from '../pages/other/other';
//import { TabsPage } from '../pages/tabs/tabs';
import { CompanygroupPage } from '../pages/companygroup/companygroup';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';

import { HomePage } from '../pages/home/home';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { UnitgroupPage } from '../pages/unitgroup/unitgroup';
//import { AddUnitPage } from '../pages/add-unit/add-unit';

import { RolePage } from '../pages/role/role';
//import { AddrolePage } from '../pages/addrole/addrole';
import { ReporttemplatePage } from '../pages/reporttemplate/reporttemplate';
//import { AddunitgroupPage } from '../pages/addunitgroup/addunitgroup';
import { App } from 'ionic-angular';
//import { AtmentionedPage } from '../pages/atmentioned/atmentioned';
import { UnitsPage } from '../pages/units/units';
import { OrgchartPage } from '../pages/orgchart/orgchart';
//import { AddorgchartonePage } from '../pages/addorgchartone/addorgchartone';
//import { AddorgcharttwoPage } from '../pages/addorgcharttwo/addorgcharttwo';
//import { AddreporttemplatePage } from '../pages/addreporttemplate/addreporttemplate';
import { LogoutPage } from '../pages/logout/logout';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { MessagesPage } from '../pages/messages/messages';
import { CalendarPage } from '../pages/calendar/calendar';
import { MapsPage } from '../pages/maps/maps';
import { ReportsPage } from '../pages/reports/reports';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: any;
  showLevel1 = null;
  showLevel2 = null;
  constructor(public _platform: Platform, public statusBar: StatusBar, public _SplashScreen: SplashScreen,
    public appCtrl: App, public dataService: DataServiceProvider) {


    this.initializeApp();
    this.dataService.getMenus()
      .subscribe((response) => {
        this.pages = response;
      });

    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'Dashboard', component: HomePage },
      { title: 'Company Group', component: CompanygroupPage },
      { title: 'Users', component: UserPage },
      { title: 'Unit Group', component: UnitgroupPage },
      { title: 'Units', component: UnitsPage },
      { title: 'Role', component: RolePage },
      { title: 'My Account', component: MyaccountPage },
      { title: 'Report Template', component: ReporttemplatePage },
      { title: 'Org Chart', component: OrgchartPage },
      { title: 'Message', component: MessagesPage },
      { title: 'Maps', component: MapsPage },
      { title: 'Calendar', component: CalendarPage },
      { title: 'Reports', component: ReportsPage },
      { title: 'Logout', component: LogoutPage }
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
    console.log("page com:-" + page.component);
    console.log("1" + page);
    console.log("2" + console.log(page));
    // page.component = 'UnitsPage';

    if (page.component == 'UnitsPage') {
      this.nav.setRoot(UnitsPage);
    } else if (page.component == 'UnitgroupPage') {
      this.nav.setRoot(UnitgroupPage);
    } else if (page.component == 'MyaccountPage') {
      this.nav.setRoot(MyaccountPage);
    } else if (page.component == 'UserPage') {
      this.nav.setRoot(UserPage);
    } else if (page.component == 'CompanygroupPage') {
      this.nav.setRoot(CompanygroupPage);
    } else if (page.component == 'RolePage') {
      this.nav.setRoot(RolePage);
    } else if (page.component == 'ReporttemplatePage') {
      this.nav.setRoot(ReporttemplatePage);
    } else if (page.component == 'OrgchartPage') {
      this.nav.setRoot(OrgchartPage);
    } else if (page.component == 'MessagesPage') {
      this.nav.setRoot(MessagesPage);
    } else if (page.component == 'LogoutPage') {
      this.nav.setRoot(LogoutPage);
    } else if (page.component == 'HomePage') {
      this.nav.setRoot(HomePage);
    } else if (page.component == 'CalendarPage') {
      this.nav.setRoot(CalendarPage);
    } else if (page.component == 'MapsPage') {
      this.nav.setRoot(MapsPage);
    } else if (page.component == 'ReportsPage') {
      this.nav.setRoot(ReportsPage);
    }
  }

  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };

  toggleLevel2(idx) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };

  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };
}

