import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { CompanygroupPage } from '../pages/companygroup/companygroup';
import { AddcompanygroupPage } from '../pages/addcompanygroup/addcompanygroup';
import { ViewcompanygroupPage } from '../pages/viewcompanygroup/viewcompanygroup';
import { UserPage } from '../pages/user/user';
import { AdduserPage } from '../pages/adduser/adduser';
import { UseraccountPage } from '../pages/useraccount/useraccount';
import { UserorgchartPage } from '../pages/userorgchart/userorgchart';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { LogoutPage } from '../pages/logout/logout';
import { EditprofilesteponePage } from '../pages/editprofilestepone/editprofilestepone';
import { EditprofilesteptwoPage } from '../pages/editprofilesteptwo/editprofilesteptwo';
import { RolePage } from '../pages/role/role';
import { AddrolePage } from '../pages/addrole/addrole';
import { AddunitgroupPage } from '../pages/addunitgroup/addunitgroup';
import { UnitgroupPage } from '../pages/unitgroup/unitgroup';
import { HttpModule } from '@angular/http';
import { AtmentionedPage } from '../pages/atmentioned/atmentioned';
import { UnitsPage } from '../pages/units/units';
import { AddunitsonePage } from '../pages/addunitsone/addunitsone';
import { AddunitstwoPage } from '../pages/addunitstwo/addunitstwo';
import { AddunitsthreePage } from '../pages/addunitsthree/addunitsthree';
import { AddunitsfourPage } from '../pages/addunitsfour/addunitsfour';
import { ReporttemplatePage } from '../pages/reporttemplate/reporttemplate';
import { AddorgchartonePage } from '../pages/addorgchartone/addorgchartone';
import { AddorgcharttwoPage } from '../pages/addorgcharttwo/addorgcharttwo';
import { OrgchartPage } from '../pages/orgchart/orgchart';
import { UnitdetailsPage } from '../pages/unitdetails/unitdetails';
import { ServicinginfoPage } from '../pages/servicinginfo/servicinginfo';
import { AddserviceinfoPage } from '../pages/addserviceinfo/addserviceinfo';
import { AddreporttemplatePage } from '../pages/addreporttemplate/addreporttemplate';
import { AddrequestsupportPage } from '../pages/addrequestsupport/addrequestsupport';
import { CommentsinfoPage } from '../pages/commentsinfo/commentsinfo';
import { AddcommentsinfoPage } from '../pages/addcommentsinfo/addcommentsinfo';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { MessagesPage } from '../pages/messages/messages';
import { CalendarPage } from '../pages/calendar/calendar';
import { AddcalendarPage } from '../pages/addcalendar/addcalendar';
import { AlarmPage } from '../pages/alarm/alarm';
import { AddalarmPage } from '../pages/addalarm/addalarm';
import { MapsPage } from '../pages/maps/maps';
import { NgCalendarModule } from 'ionic2-calendar';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,

    CompanygroupPage,
    AddcompanygroupPage,
    ViewcompanygroupPage,
    UserPage,
    AdduserPage,
    UseraccountPage,
    UserorgchartPage,
    LogoutPage,
    MyaccountPage,
    UnitsPage,
    AddunitsonePage,
    AddunitstwoPage,
    AddunitsthreePage,
    AddunitsfourPage,
    EditprofilesteponePage,
    EditprofilesteptwoPage,
    RolePage,
    AddrolePage,
    AddunitgroupPage,
    UnitgroupPage,
    ReporttemplatePage,
    AtmentionedPage,
    AddorgchartonePage,
    AddorgcharttwoPage,
    OrgchartPage,
    UnitdetailsPage,
    ServicinginfoPage,
    CommentsinfoPage,
    AddcommentsinfoPage,
    AddserviceinfoPage,
    AddreporttemplatePage,
    AddrequestsupportPage,
    MessagesPage,
    CalendarPage,
    AddcalendarPage,
    AlarmPage,
    AddalarmPage,
    MapsPage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Go Back',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition',
      tabSubPages: false//tabsHideOnSubPagestabsHideOnSubPages
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,

    CompanygroupPage,
    AddcompanygroupPage,
    ViewcompanygroupPage,
    UserPage,
    AdduserPage,
    UseraccountPage,
    UserorgchartPage,
    LogoutPage,
    MyaccountPage,
    UnitsPage,
    AddunitsonePage,
    AddunitstwoPage,
    AddunitsthreePage,
    AddunitsfourPage,
    AddunitsonePage,
    EditprofilesteponePage,
    EditprofilesteptwoPage,
    RolePage,
    AddrolePage,
    AddunitgroupPage,
    UnitgroupPage,
    ReporttemplatePage,
    AtmentionedPage,
    AddorgchartonePage,
    AddorgcharttwoPage,
    OrgchartPage,
    UnitdetailsPage,
    ServicinginfoPage,
    CommentsinfoPage,
    AddcommentsinfoPage,
    AddserviceinfoPage,
    AddreporttemplatePage,
    AddrequestsupportPage,
    MessagesPage,
    CalendarPage,
    AlarmPage,
    AddalarmPage,
    AddcalendarPage,
    MapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataServiceProvider
  ]
})
export class AppModule { }
