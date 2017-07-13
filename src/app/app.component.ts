import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
//import { DashboardPage } from '../pages/dashboard/dashboard';

import { CompanygroupPage } from '../pages/companygroup/companygroup';
import { UserPage } from '../pages/user/user';


import { MyaccountPage } from '../pages/myaccount/myaccount';
import { UnitgroupPage } from '../pages/unitgroup/unitgroup';
import { RolePage } from '../pages/role/role';
import { ReporttemplatePage } from '../pages/reporttemplate/reporttemplate';
import { UnitsPage } from '../pages/units/units';
import { OrgchartPage } from '../pages/orgchart/orgchart';
//import { AlarmPage } from '../pages/alarm/alarm';
import { AlarmlogPage } from '../pages/alarmlog/alarmlog';
import { AddalarmPage } from '../pages/addalarm/addalarm';
//import { MessagesPage } from '../pages/messages/messages';
import { CalendarPage } from '../pages/calendar/calendar';
import { MapsPage } from '../pages/maps/maps';
import { ReportsPage } from '../pages/reports/reports';
import { AddenginedetailPage } from '../pages/addenginedetail/addenginedetail';
import { ServicedetailsPage } from '../pages/servicedetails/servicedetails';
import { AlarmdetailsPage } from '../pages/alarmdetails/alarmdetails';
import { CommentdetailsPage } from '../pages/commentdetails/commentdetails';
import { EnginedetailPage } from '../pages/enginedetail/enginedetail';
import { EmailPage } from '../pages/email/email';
import { EngineviewPage } from '../pages/engineview/engineview';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
//import { TrendlinePage } from '../pages/trendline/trendline';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { ViewunitsPage } from '../pages/viewunits/viewunits';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
@Component({
  templateUrl: 'app.html',
  providers: [Push]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: any;
  showLevel1 = null;
  showLevel2 = null;
  ///private push: Push,
  constructor(private push: Push, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public dataService: DataServiceProvider, public menuCtrl: MenuController) {
    this.initializeApp();
    this.dataService.getMenus()
      .subscribe((response) => {
        this.pages = response;
      });
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

      { title: 'Maps', component: MapsPage },
      { title: 'Calendar', component: CalendarPage },
      { title: 'Reports', component: ReportsPage },
      // { title: 'Alarm List', component: AlarmPage },
      { title: 'Alarm', component: AddalarmPage },
      { title: 'Alarm Log', component: AlarmlogPage },
      { title: 'Service Details', component: ServicedetailsPage },
      { title: 'Comment Details', component: CommentdetailsPage },
      { title: 'Alarm Details', component: AlarmdetailsPage },
      { title: 'Engine Details', Component: EnginedetailPage },
      { title: 'Add Engine Details', Component: AddenginedetailPage },
      { title: 'Engine Details', Component: EngineviewPage },
      { title: 'ForgotPassword', Component: ForgotpasswordPage },

      // { title: 'Map Demo', component: MapdemoPage },


    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.initPushNotification();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 300);
      /*
            // to check if we have permission
            this.push.hasPermission()
              .then((res: any) => {
      
                if (res.isEnabled) {
                  console.log('We have permission to send push notifications');
                } else {
                  console.log('We do not have permission to send push notifications');
                }
      
              });
      
            // to initialize push notifications
      
            const options: PushOptions = {
              android: {
                senderID: '85075801930'
              },
              ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
              },
              windows: {}
            };
      
            const pushObject: PushObject = this.push.init(options);
      
            pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
      
            pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
      
            pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
      */
    });
  }


  openPage(page) {
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
    } else if (page.title == 'Message') {
      this.menuCtrl.close();
      this.nav.setRoot(EmailPage);
    } else if (page.title == 'Logout') {
      this.logout();
      this.menuCtrl.close();
      //this.nav.setRoot(LogoutPage);
    } else if (page.title == 'Dashboard') {
      this.menuCtrl.close();
      this.nav.setRoot(HomePage);
    } else if (page.title == 'Calendar') {
      this.menuCtrl.close();
      this.nav.setRoot(CalendarPage);
    } else if (page.title == 'Maps') {
      this.menuCtrl.close();
      this.nav.setRoot(MapsPage);
    } else if (page.title == 'Reports') {
      this.menuCtrl.close();
      this.nav.setRoot(ReportsPage);
    }
    else if (page.title == 'Alarm') {
      this.menuCtrl.close();
      //this.nav.setRoot(AlarmPage);
    }
    else if (page.component == 'AddalarmPage') {
      this.nav.setRoot(AddalarmPage);
    }
    else if (page.component == 'MapdemoPage') {
      //this.nav.setRoot(MapdemoPage);
    }
    else if (page.component == 'EnginedetailPage') {
      this.nav.setRoot(EnginedetailPage);
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
  logout() {
    localStorage.setItem("userInfo", "");
    localStorage.setItem("userInfoId", "");
    localStorage.setItem("userInfoName", "");
    localStorage.setItem("userInfoEmail", "");
    localStorage.setItem("userInfoCompanyId", "");
    localStorage.setItem("atMentionedStorage", "");
    this.nav.push(HomePage);
  }
  initPushNotification() {
    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    // to initialize push notifications

    const options: PushOptions = {
      android: {
        senderID: '218019355699'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };


    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => {

      console.log('Device registered', registration);
      console.log('Device Json registered', JSON.stringify(registration));
      localStorage.setItem("deviceTokenForPushNotification", registration.registrationId);
    }
    );

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));


  }
}

