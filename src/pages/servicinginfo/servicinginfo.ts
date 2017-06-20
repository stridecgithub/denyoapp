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
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  public atMentionedInfo = [];
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(public http: Http,public NP: NavParams, public navParams: NavParams, public nav: NavController) {
    this.pageTitle = 'Servicing Info';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicinginfoPage');
  }
  ionViewWillEnter() {
    console.log(JSON.stringify("Servicing Info" + this.NP.get("record")));

    // Atmentioned Tag Storage
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/getstaffs";
    let res;
    localStorage.setItem("atMentionedStorage", JSON.stringify(this.atMentionedInfo));
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        res.staffslist;
        if (res.staffslist.length > 0) {
          for (let userdata in res.staffslist) {
            let len = res.staffslist[userdata].personalhashtag.length;
            let perstag = res.staffslist[userdata].personalhashtag.substring(1, len);

            console.log("Length:" + len);
            console.log("perstag:" + perstag);
            this.atMentionedInfo.push({
              username: perstag,
              fullname: res.staffslist[userdata].firstname + " " + res.staffslist[userdata].lastname
            });
          }

          localStorage.setItem("atMentionedStorage", JSON.stringify(this.atMentionedInfo));        

        }
      });

    // Atmentioned Tag Storage
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
