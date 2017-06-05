import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { OtherPage } from '../pages/other/other';
import { CompanygroupPage } from '../pages/companygroup/companygroup';
import { AddcompanygroupPage } from '../pages/addcompanygroup/addcompanygroup';
import { ViewcompanygroupPage } from '../pages/viewcompanygroup/viewcompanygroup';
import { UserPage } from '../pages/user/user';
import { AdduserPage } from '../pages/adduser/adduser';
import { UseraccountPage } from '../pages/useraccount/useraccount';
import { UserorgchartPage } from '../pages/userorgchart/userorgchart';
import { LogoutPage } from '../pages/logout/logout';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    OtherPage,
    CompanygroupPage,
    AddcompanygroupPage,
    ViewcompanygroupPage,
    UserPage,
    AdduserPage,
    UseraccountPage,
    UserorgchartPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    OtherPage,
    CompanygroupPage,
    AddcompanygroupPage,
    ViewcompanygroupPage,
    UserPage,
    AdduserPage,
    UseraccountPage,
    UserorgchartPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
