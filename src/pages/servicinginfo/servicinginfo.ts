import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanygroupPage } from '../companygroup/companygroup';
import { UserPage } from '../user/user';
import { LoadingController } from 'ionic-angular';
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
    public reportData: any =
  {
    status: '',
    sort: 'companygroup_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
  public reportAllLists = [];
  public loginas: any;
  public loadingMoreDataContent:string;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  public totalCount;
  constructor(public http: Http, public NP: NavParams, public navParams: NavParams, public nav: NavController, public loadingCtrl: LoadingController) {
    this.pageTitle = 'Servicing Info';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicinginfoPage');
  }
  ionViewWillEnter() {
    this.reportData.startindex = 0;
    this.reportData.sort = "service_id";
    this.doService();

    // Atmentioned Tag Storage
  }
   presentLoading(parm) {
    let loader;
    loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    if (parm > 0) {
      loader.present();
    } else {
      loader.dismiss();
    }
  }
    doRefresh(refresher) {
    console.log('doRefresh function calling...');
    this.reportData.startindex = 0;
    this.reportAllLists = [];
    this.doService();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  doInfinite(infiniteScroll) {
    console.log('InfinitScroll function calling...');
    console.log('A');
    console.log("Total Count:" + this.totalCount)
    if (this.reportData.startindex < this.totalCount && this.reportData.startindex > 0) {
      console.log('B');
      this.doService();
    }
    console.log('C');
    setTimeout(() => {
      console.log('D');
      infiniteScroll.complete();
    }, 500);
    console.log('E');
  }
  doService()

{
  this.presentLoading(1);
    if (this.reportData.status == '') {
      this.reportData.status = "DRAFT";
    }
    if (this.reportData.sort == '') {
      this.reportData.sort = "comapny";
    }
     let editItem = this.NP.get("record");
    //http://denyoappv2.stridecdev.com/companygroup?is_mobile=1
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/services?is_mobile=1&startindex=" + this.reportData.startindex + "&results=" + this.reportData.results + "&sort=" + this.reportData.sort + "&dir=" + this.reportData.sortascdesc+"&unitid="+editItem.unit_id;
    let res;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        res = data.json();
        console.log(JSON.stringify(res));
        console.log("1" + res.services.length);
        console.log("2" + res.services);
        if (res.services.length > 0) {
          this.reportAllLists = res.services;
          this.totalCount = res.totalCount;
          this.reportData.startindex += this.reportData.results;
          this.loadingMoreDataContent='Loading More Data';
        } else {
          this.totalCount = 0;
          this.loadingMoreDataContent='No More Data';
        }
        console.log("Total Record:" + this.totalCount);

      });
    this.presentLoading(0);
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
    localStorage.setItem("microtime", "");
    this.nav.setRoot(AddserviceinfoPage, {
      record: this.NP.get("record")
    });
  }


}
