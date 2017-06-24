import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
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
import { DatePicker } from '@ionic-native/date-picker';
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers: [DatePicker]
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
  @ViewChild('postcontent') postcontent: ElementRef;
  myVal: any;
  viewLink: any;
  viewHtml: any;
  dateHeaderTitle: any;
  calendarResult: any;
  Catdata: any;
  private apiServiceURL: string = "http://strtheme.stridecdev.com/";
  constructor(app: IonicApp, public navCtrl: NavController, private alertCtrl: AlertController, private http: Http, public loadingCtrl: LoadingController) {
    this.rootPage = CalendarPage; this.app = app;
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
    this.pageTitle = "Calendar";

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }



  ionViewWillEnter() {

    //console.log(JSON.stringify(this.userInf));
    this.presentLoading(1);
    let curDate = new Date();
    console.log('1' + curDate);
    let yearMonth = this.splitDate(curDate)
    this.dateHeaderTitle = yearMonth;
    this.onTimeSelected(curDate);


    this.presentLoading(0);
  }

  onTimeSelected(ev) {
    this.presentLoading(1);
    console.log("2" + ev.selectedTime);
    console.log("3" + JSON.stringify(ev));
    let month;
    let year;
    let date;
    if (ev.selectedTime == undefined) {
      console.log('undefined' + ev);
      month = ev.getUTCMonth() + 1;
      year = ev.getFullYear();
      date = ev.getDate();
    } else {
      console.log('defined');
      month = ev.selectedTime.getUTCMonth() + 1;
      year = ev.selectedTime.getFullYear();
      date = ev.selectedTime.getDate();
    }

    if (month > 9) {
      month = month;
    } else {
      month = '0' + month;
    }
    console.log('Selected time: ' + year + "-" + month + "-" + date);
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "events.php?date=" + year + "-" + month + "-" + date;

    this.http.get(url, options)
      .subscribe(data => {
        // console.log(JSON.stringify(data.json()));
        this.calendarResult = data.json();
        //this.eventSource=data.json();
      });
    this.presentLoading(0);
  }

  splitDate(curdate) {
    //var splitDt = curdate.split("@");
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let monthYear = monthNames[curdate.getMonth()] + " " + curdate.getUTCFullYear();
    return monthYear;
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

