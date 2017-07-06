import { Component } from '@angular/core';
import {  NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { UnitdetailsPage } from '../unitdetails/unitdetails';
//import { TabsPage } from '../tabs/tabs';
//import { UserPage } from '../user/user';
////import { CompanygroupPage } from '../companygroup/companygroup';
//import { MyaccountPage } from '../myaccount/myaccount';
//import { UnitsPage } from '../units/units';
//import { RolePage } from '../role/role';


/**
 * Generated class for the AlarmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html',
})
export class AlarmPage {
 public pageTitle: string;
  public loginas: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  public totalCount;
  pet: string = "ALL";
  public reportData: any =
  {
    status: '',
    sort: 'alarm_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
  public reportAllLists = [];
  public colorListArr: any;
  public userId: any;
  public unit_id:any;
  constructor(public http: Http, public nav: NavController,
    public toastCtrl: ToastController, public alertCtrl: AlertController,public NP: NavParams, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmPage');
  }
 doRefresh(refresher) {
    console.log('doRefresh function calling...');
    this.reportData.startindex = 0;
    this.reportAllLists = [];
    this.doAlarm();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  doAlarm()
  {
     let editItem = this.NP.get("record");
 if (this.NP.get("record").unit_id != undefined && this.NP.get("record").unit_id != 'undefined') {
      this.unit_id = editItem.unit_id;
    }
    this.presentLoading(1);
    if (this.reportData.status == '') {
      this.reportData.status = "DRAFT";
    }
    if (this.reportData.sort == '') {
      this.reportData.sort = "alarm_id";
    }

    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/alarms?is_mobile=1&startindex=" + this.reportData.startindex + "&results=" + this.reportData.results + "&sort=" + this.reportData.sort + "&dir=" + this.reportData.sortascdesc+"&unitid="+this.unit_id;
    let res;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        res = data.json();
        console.log(JSON.stringify(res));
        console.log("1" + res.alarms.length);
        console.log("2" + res.alarms);
      
        if (res.alarms.length > 0) {

          for (let alarm in res.alarms) {
           
           
           
            this.reportAllLists.push({
              alarm_name: res.alarms[alarm].alarm_name,
              alarm_assigned_by: res.alarms[alarm].alarm_assigned_by,
              alarm_assigned_to: res.alarms[alarm].alarm_assigned_to
             
              
            });
          }
          //"unitgroup_id":1,"unitgroup_name":"demo unit","colorcode":"FBD75C","remark":"nice","favorite":1,"totalunits":5
          /*this.reportAllLists = res.unitgroups;
         
          console.log("Total Record:`" + this.totalCount);
          console.log(JSON.stringify(this.reportAllLists));*/
          this.totalCount = res.totalCount;
          this.reportData.startindex += this.reportData.results;
        } else {
          this.totalCount = 0;
        }
        console.log("Total Record:2" + this.totalCount);

      });
    this.presentLoading(0);
  }
   ionViewWillEnter() {
      if (this.NP.get("record")) {
      console.log("Service Info Record Param Value:" + JSON.stringify(this.NP.get("record")));
    }
    this.pageTitle = "Alarm";
    this.reportData.startindex = 0;
    this.reportData.sort = "alarm_id";
    this.doAlarm();
  }
  doInfinite(infiniteScroll) {
    console.log('InfinitScroll function calling...');
    console.log('A');
    console.log("Total Count:" + this.totalCount)
    if (this.reportData.startindex < this.totalCount && this.reportData.startindex > 0) {
      console.log('B');
      this.doAlarm();
    }
    console.log('C');
    setTimeout(() => {
      console.log('D');
      infiniteScroll.complete();
    }, 500);
    console.log('E');
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
   previous() {
    this.nav.setRoot(UnitdetailsPage, {
      record: this.NP.get("record")
    });
  }
}
