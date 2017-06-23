import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { IonicApp } from 'ionic-angular/index'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpModule } from "@angular/http";
import { Sendmsg } from '../sendmsg/sendmsg';
import { Compose } from '../compose/compose';
import { TabsPage } from '../tabs/tabs';
import { CompanygroupPage } from '../companygroup/companygroup';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
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
    this.rootPage = MessagesPage; this.app = app;
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
  }

  ionViewDidEnter() {
    // this.presentAlert();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }
  ionViewWillEnter() {
     this.pageTitle = "Messages";
    this.presentAlert1();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  presentAlert1() {


    let text = "";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    let linker = "http://denyoappv2.stridecdev.com/denyo2.php?method=inbox&id=1";
    this.http.get(linker, options)
      .map(res => res.text())
      .subscribe(data => {
        var element = document.createElement("input");
        element.setAttribute("type", "text");
        element.setAttribute("value", data);
        element.setAttribute("style", "color:Red");
        // (document.getElementById('contentview') as HTMLDivElement).appendChild(element);
        (document.getElementById('contentview') as HTMLDivElement).innerHTML = data;

      });

  }
  openPage(component) {
    this.presentAlert();

  }
  onPageDidEnter() {
    // this.presentAlert()
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
