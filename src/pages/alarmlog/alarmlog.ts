import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { AddunitgroupPage } from '../addunitgroup/addunitgroup';
import { AddalarmPage } from '../addalarm/addalarm';
import { LoadingController } from 'ionic-angular';
import { UnitdetailsPage } from '../unitdetails/unitdetails';
import { AlarmdetailsPage } from '../alarmdetails/alarmdetails';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { NotificationPage } from '../notification/notification';
import { MapsPage } from '../maps/maps';
import { ReportsPage } from '../reports/reports';
import { CalendarPage } from '../calendar/calendar';
import { EmailPage } from '../email/email';
/**
 * Generated class for the AlarmlogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-alarmlog',
  templateUrl: 'alarmlog.html',
})
export class AlarmlogPage {
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
   public unitDetailData: any = {
    userId: '',
    loginas: '',
    pageTitle: '',
    getremark: '',
    serviced_by: '',
    nextServiceDate: '',
    addedImgLists1: '',
    addedImgLists2: ''
  }
  public reportAllLists = [];
  public colorListArr: any;
  public userId: any;
  public unit_id: any;
    private permissionMessage: string = "Permission denied for access this page. Please contact your administrator";
   public VIEWACCESS: any;
  public CREATEACCESS: any;
  public EDITACCESS: any;
  public DELETEACCESS: any;

  public msgcount: any;
  public notcount: any;
  constructor(public http: Http, public nav: NavController,
    public toastCtrl: ToastController, public alertCtrl: AlertController, public NP: NavParams, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
     this.VIEWACCESS = localStorage.getItem("UNITS_ALARM_VIEW");
    console.log("Role Authority for Unit Listing View:"+this.VIEWACCESS );
    this.CREATEACCESS = localStorage.getItem("UNITS_ALARM_CREATE");
    console.log("Role Authority for Unit Listing Create:"+this.CREATEACCESS );
    this.EDITACCESS = localStorage.getItem("UNITS_ALARM_EDIT");
    console.log("Role Authority for Unit Listing Edit:"+this.EDITACCESS );
    this.DELETEACCESS = localStorage.getItem("UNITS_ALARM_DELETE");
    console.log("Role Authority for Unit Listing Delete:"+this.DELETEACCESS );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmlogPage');
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
  doAlarm() {
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
      url: any = this.apiServiceURL + "/alarms?is_mobile=1&startindex=" + this.reportData.startindex + "&results=" + this.reportData.results + "&sort=" + this.reportData.sort + "&dir=" + this.reportData.sortascdesc + "&unitid=" + this.unit_id;
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
              alarm_id: res.alarms[alarm].alarm_id,
              alarm_name: res.alarms[alarm].alarm_name,
              alarm_assginedby_name: res.alarms[alarm].alarm_assginedby_name,
              alarm_assginedto_name: res.alarms[alarm].alarm_assginedto_name


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
      let editItem = this.NP.get("record");
    //this.unitDetailData.unit_id = editItem.unit_id;
    //this.unitDetailData.unitname = editItem.unitname;
    //this.unitDetailData.location = editItem.location;
    //this.unitDetailData.projectname = editItem.projectname;
    let favorite;
		if (this.NP.get("record").favoriteindication == 'favorite') {
			favorite = "favorite";
		}
		else {
			favorite = "unfavorite";

		}
this.unitDetailData.favoriteindication = favorite;
    this.unitDetailData.runninghr = editItem.runninghr;
    this.unitDetailData.gen_status = editItem.gen_status;
    this.unitDetailData.nextservicedate = editItem.nextservicedate;


    this.unitDetailData.unit_id = localStorage.getItem("unitId");
    if (this.unitDetailData.unit_id == undefined) {
      this.unitDetailData.unit_id = editItem.unit_id;
    }
    if (this.unitDetailData.unit_id == 'undefined') {
      this.unitDetailData.unit_id = editItem.unit_id;
    }
    this.unitDetailData.unitname = localStorage.getItem("unitunitname");
    this.unitDetailData.location = localStorage.getItem("unitlocation");
    this.unitDetailData.projectname = localStorage.getItem("unitprojectname");
    this.unitDetailData.colorcodeindications = localStorage.getItem("unitcolorcode");
    console.log("Unit Details Color Code:" + this.unitDetailData.colorcodeindications);
    this.unitDetailData.lat = localStorage.getItem("unitlat");
    this.unitDetailData.lng = localStorage.getItem("unitlng");

    }
    this.pageTitle = "Alarm";
    this.reportData.startindex = 0;
    this.reportData.sort = "alarm_id";
    this.doAlarm();
    let //body: string = "loginid=" + this.userId,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/msgnotifycount?loginid=" + this.userId;
    this.http.get(url, options)
      .subscribe((data) => {
        this.msgcount = data.json().msgcount;
        this.notcount = data.json().notifycount;
      });
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
  doEdit(item, act) {
    if (act == 'edit') {
      this.nav.setRoot(AddalarmPage, {
        record: item,
        act: act
      });
    }
  }
  details(item, act) {
    if (act == 'edit') {
      this.nav.setRoot(AlarmdetailsPage, {
        record: item,
        act: act
      });
      return false;
    }
  }
  notification() {
    this.nav.setRoot(NotificationPage);
  }
  redirectToUser() {
    this.nav.setRoot(UnitsPage);
  }
  redirectToMessage() {
    this.nav.setRoot(EmailPage);
  }
  redirectCalendar() {
    this.nav.setRoot(CalendarPage);
  }
  redirectToMaps() {
    this.nav.setRoot(MapsPage);
  }
  redirectToSettings() {
    this.nav.setRoot(MyaccountPage);
  }
}
