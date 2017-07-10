import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { NgCalendarModule } from 'ionic2-calendar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CalendarPage } from '../pages/calendar/calendar';
import { CompanygroupPage } from '../pages/companygroup/companygroup';
import { AddcompanygroupPage } from '../pages/addcompanygroup/addcompanygroup';
import { ViewcompanygroupPage } from '../pages/viewcompanygroup/viewcompanygroup';
import { UserPage } from '../pages/user/user';
import { AdduserPage } from '../pages/adduser/adduser';
import { UseraccountPage } from '../pages/useraccount/useraccount';
import { UserorgchartPage } from '../pages/userorgchart/userorgchart';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { EditprofilesteponePage } from '../pages/editprofilestepone/editprofilestepone';
import { EditprofilesteptwoPage } from '../pages/editprofilesteptwo/editprofilesteptwo';
import { RolePage } from '../pages/role/role';
import { AddrolePage } from '../pages/addrole/addrole';
import { AddunitgroupPage } from '../pages/addunitgroup/addunitgroup';
import { UnitgroupPage } from '../pages/unitgroup/unitgroup';
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
import { AddcalendarPage } from '../pages/addcalendar/addcalendar';
import { AlarmPage } from '../pages/alarm/alarm';
import { AlarmlogPage } from '../pages/alarmlog/alarmlog';
import { AddalarmPage } from '../pages/addalarm/addalarm';
import { MapsPage } from '../pages/maps/maps';
import { ServicedetailsPage } from '../pages/servicedetails/servicedetails';
import { CommentdetailsPage } from '../pages/commentdetails/commentdetails';
import { AlarmdetailsPage } from '../pages/alarmdetails/alarmdetails';
import { NotificationPage } from '../pages/notification/notification';
import { ReportsPage } from '../pages/reports/reports';
import { MessagesPage } from '../pages/messages/messages';
import { AddenginedetailPage } from '../pages/addenginedetail/addenginedetail';
import { EnginedetailPage } from '../pages/enginedetail/enginedetail';
import { EngineviewPage } from '../pages/engineview/engineview';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { EmailPage } from '../pages/email/email';
import { TrendlinePage } from '../pages/trendline/trendline';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { ViewunitsPage } from '../pages/viewunits/viewunits';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage,
    CalendarPage,
    CompanygroupPage,
    AddcompanygroupPage,
    ViewcompanygroupPage,
    UserPage,
    AdduserPage,
    UseraccountPage,
    UserorgchartPage,
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
    MessagesPage,
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
    AddenginedetailPage,
    EnginedetailPage,
    CalendarPage,
    AddcalendarPage,
    AlarmPage,
    AddalarmPage,
    AlarmlogPage,
    MapsPage,
    ServicedetailsPage,
    NotificationPage,
    CommentdetailsPage,
    AlarmdetailsPage,
    ReportsPage,
    EngineviewPage,
    ForgotpasswordPage,
    EmailPage,
    ViewunitsPage,
    TrendlinePage
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    CalendarPage,
    CompanygroupPage,
    AddcompanygroupPage,
    ViewcompanygroupPage,
    AddenginedetailPage,
    EnginedetailPage,
    UserPage,
    AdduserPage,
    UseraccountPage,
    UserorgchartPage,
    MessagesPage,
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
    CalendarPage,
    AddcalendarPage,
    AlarmPage,
    AddalarmPage,
    AlarmlogPage,
    MapsPage,
    ServicedetailsPage,
    NotificationPage,
    CommentdetailsPage,
    AlarmdetailsPage,
    ReportsPage,
    EngineviewPage,
    ForgotpasswordPage,
    EmailPage,
    ViewunitsPage,
    TrendlinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataServiceProvider
  ]
})
export class AppModule { }
