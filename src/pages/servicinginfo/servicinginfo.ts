import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanygroupPage } from '../companygroup/companygroup';
import { UserPage } from '../user/user';
import { MyaccountPage } from '../myaccount/myaccount';
import { AddserviceinfoPage } from '../addserviceinfo/addserviceinfo';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { UnitdetailsPage } from '../unitdetails/unitdetails';
import { RolePage } from '../role/role';
/**
 * Generated class for the ServicinginfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-servicinginfo',
  templateUrl: 'servicinginfo.html',
})
export class ServicinginfoPage {
  public pageTitle: string;
  
  constructor(public NP: NavParams, public navParams: NavParams, public nav: NavController) {
    this.pageTitle = 'Servicing Info';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicinginfoPage');
  }
  ionViewWillEnter() {
    console.log(JSON.stringify("Servicing Info" + this.NP.get("record")));
  }

  previous() {
    this.nav.setRoot(UnitdetailsPage);
  }
  redirectToUser() {
    this.nav.setRoot(UserPage);
  }

  redirectToUnitGroup() {
    this.nav.setRoot(UnitgroupPage);
  }
  redirectToCompanyGroup() {
    this.nav.setRoot(CompanygroupPage);
  }
  redirectToUnits() {
    this.nav.setRoot(UnitsPage);
  }
  redirectToMyAccount() {
    this.nav.setRoot(MyaccountPage);
  }

  redirectToRole() {
    this.nav.setRoot(RolePage);
  }
  doAdd() {
    this.nav.setRoot(AddserviceinfoPage, {
      record: this.NP.get("record")
    });
  }

}
