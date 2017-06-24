import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { IonicApp } from 'ionic-angular/index'
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Sendmsg } from '../sendmsg/sendmsg';
import { Compose } from '../compose/compose';
import { CompanygroupPage } from '../companygroup/companygroup';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  sendmsg = Sendmsg;
  compose = Compose;
  app: IonicApp;
  data: any;
  public loginas: any;
  public userId: any;
  public rootPage: any;
  public pageTitle: string;
  Catdata: any;
  constructor(app: IonicApp, public navCtrl: NavController, private alertCtrl: AlertController, private http: Http) {
    this.rootPage = CalendarPage; this.app = app;
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
    this.pageTitle = "Calendar";
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }






  redirectToUnitGroup() {
    this.navCtrl.setRoot(UnitgroupPage);
  }
  redirectToCompanyGroup() {
    this.navCtrl.setRoot(CompanygroupPage);
  }

  redirectToUnits() {
    this.navCtrl.setRoot(UnitsPage);
  }
  redirectToMyAccount() {
    this.navCtrl.setRoot(MyaccountPage);
  }

  redirectToRole() {
    this.navCtrl.setRoot(RolePage);
  }
  previous() {
    this.navCtrl.setRoot(HomePage);
  }
}

