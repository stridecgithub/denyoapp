import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { CompanygroupPage } from '../companygroup/companygroup';
import { RolePage } from '../role/role';
import { HomePage } from '../home/home';
import { UnitsPage } from '../units/units';
@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  //@ViewChild('mapContainer') mapContainer: ElementRef;
  //map: any;
  public loginas: any;
  public userid: any;
  public companyid:any;
  public pageTitle: string;
 
  constructor(public navCtrl: NavController) {
    this.pageTitle = 'Reports';
    this.loginas = localStorage.getItem("userInfoName");
    this.userid = localStorage.getItem("userInfoId");
    this.companyid = localStorage.getItem("userInfoCompanyId");
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
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



