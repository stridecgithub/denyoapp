import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AddorgchartonePage } from '../addorgchartone/addorgchartone';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DomSanitizer } from '@angular/platform-browser';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { NotificationPage } from '../notification/notification';
import { MapsPage } from '../maps/maps';
import { ReportsPage } from '../reports/reports';
import { CalendarPage } from '../calendar/calendar';
import { PopoverPage } from '../popover/popover';

import { EmailPage } from '../email/email';
import { PopoverController } from 'ionic-angular';
//import * as $ from 'jquery';
//import "slick-carousel";
/**
 * Generated class for the UnitgroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-orgchart',
  templateUrl: 'orgchart.html'
})
export class OrgchartPage {
  public responseResultCompany: any;
  public pageTitle: string;
  public loginas: any;
  public htmlContent;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  public totalCount;
  pet: string = "ALL";
  public msgcount: any;
  public notcount: any;
  public reportData: any =
  {
    status: '',
    sort: 'unitgroup_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
  public parents = [];
  public colorListArr: any;
  public userId: any;
  public companyId: any;
  iframeContent: any;
  constructor(public popoverCtrl: PopoverController, public http: Http, public nav: NavController, private sanitizer: DomSanitizer,
    public toastCtrl: ToastController, public alertCtrl: AlertController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
    this.companyId = localStorage.getItem("userInfoCompanyId");
    this.apiServiceURL = this.apiServiceURL;
  }
  presentPopover(myEvent, item) {
    let popover = this.popoverCtrl.create(PopoverPage, { item: item });
    popover.present({
      ev: myEvent,
    });
    popover.onWillDismiss(data => {
      console.log("Dismiss Data:" + JSON.stringify(data));
      console.log("Data Length:" + data);
      if (data.length == 1) {
        this.doDelete(data);
      } else {
        this.doEdit(data, 'edit');
      }
    });
  }
  doDelete(item) {
    console.log("Deleted Id" + item[0].staff_id);
    let confirm = this.alertCtrl.create({
      message: 'Are you sure you want to delete?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.deleteEntry(item[0].staff_id);
        }
      },
      {
        text: 'No',
        handler: () => { }
      }]
    });
    confirm.present();
  }


  deleteEntry(recordID) {
    let
      //body: string = "key=delete&recordID=" + recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/staff/" + recordID + "/1/delete";
    this.http.get(url, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {

          this.sendNotification(`Orgchart was successfully deleted`);
            this.parents = [];
          this.doOrgChart();
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }

  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrgchartPage');
  }


  onSegmentChanged(val) {
    this.companyId = val;
    this.parents = [];
    this.doOrgChart();
  }

  ionViewWillEnter() {
    this.pet = this.companyId;
    let //body: string = "loginid=" + this.userId,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/msgnotifycount?loginid=" + this.userId;
    console.log(url);
    // console.log(body);

    this.http.get(url, options)
      .subscribe((data) => {
        console.log("Count Response Success:" + JSON.stringify(data.json()));
        this.msgcount = data.json().msgcount;
        this.notcount = data.json().notifycount;
      });
    // this.iframeContent =  "<iframe id='filecontainer' src=" + "http://denyoappv2.stridecdev.com/orgchart?company_id="+this.companyId+"&is_mobile=1&id="+this.userId+" height=350 width=100% frameborder=0></iframe>";
    this.pageTitle = "Org Chart";
    this.reportData.startindex = 0;
    this.reportData.sort = "unitgroup_id";
    this.doOrgChart();

    console.log(this.apiServiceURL + "/orgchart?company_id=" + this.companyId + "&is_mobile=1");
    this.iframeContent = "<iframe src=" + "http://denyoappv2.stridecdev.com/orgchart?company_id=" + this.companyId + "&is_mobile=1&id=" + this.userId + " width=350  frameborder=0  scrolling=yes></iframe>";
  }
  doOrgChart() {
    //this.presentLoading(1);
    let //body: string = "loginid=" + this.userId,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/orgchart?company_id=" + this.companyId + "&is_mobile=1&id=" + this.userId;
    console.log(url);
    // console.log(body);
    let res;
    this.http.get(url, options)
      .subscribe((data) => {
        // this.presentLoading(0);
        console.log("Orgchart Response Success:" + JSON.stringify(data.json()));
        res = data.json();
        if (res.parents.length > 0) {
          this.parents = res.parents;
          this.responseResultCompany = res.companies;
        } else {
          //this.totalCount = 0;
        }
      });

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

  doAdd() {
    this.nav.setRoot(AddorgchartonePage);
  }
  previous() {
    this.nav.setRoot(HomePage);
  }
  doEdit(item, act) {
    if (act == 'edit') {
      this.nav.setRoot(AddorgchartonePage, {
        record: item,
        act: act
      });
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


