import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AddunitgroupPage } from '../addunitgroup/addunitgroup';
import { LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the UnitgroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unitgroup',
  templateUrl: 'unitgroup.html',
})
export class UnitgroupPage {
  
 public pageTitle: string;
  public loginas: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  public totalCount;
  pet: string = "ALL";  
   public reportData: any =
  {
    status: '',
    sort: 'unitgroup_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
   public reportAllLists = [];

  constructor(public http: Http, public nav: NavController,
    public toastCtrl: ToastController, public alertCtrl: AlertController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loginas = localStorage.getItem("userInfoName");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UnitgroupPage');
  }

   doRefresh(refresher) {
    console.log('doRefresh function calling...');
    this.reportData.startindex = 0;
    this.reportAllLists = [];
    this.dounitGroup();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
   dounitGroup() {
    this.presentLoading(1);
    if (this.reportData.status == '') {
      this.reportData.status = "DRAFT";
    }
    if (this.reportData.sort == '') {
      this.reportData.sort = "unitgroup";
    }
    //http://denyoappv2.stridecdev.com/companygroup?is_mobile=1
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/unitgroup?is_mobile=1&startindex=" + this.reportData.startindex + "&results=" + this.reportData.results + "&sort=" + this.reportData.sort + "&dir=" + this.reportData.sortascdesc;
    let res;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        res = data.json();      
        console.log(JSON.stringify(res));
        if (res.unitgroups.length > 0) {
          this.reportAllLists = res.unitgroups;
          this.totalCount = res.totalCount;
          this.reportData.startindex += this.reportData.results;
        } else {
          this.totalCount = 0;
        }
        console.log("Total Record:" + this.totalCount);

      });
    this.presentLoading(0);
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

}
