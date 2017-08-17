import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { CompanygroupPage } from '../companygroup/companygroup';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RolePage } from '../role/role';
import { HomePage } from '../home/home';
import { UnitsPage } from '../units/units';
import { NotificationPage } from '../notification/notification';
import { MapsPage } from '../maps/maps';
import { CalendarPage } from '../calendar/calendar';
import { EmailPage } from '../email/email';
import { DatePicker } from '@ionic-native/date-picker';
import { ReportsPage } from '../reports/reports';
import { OrgchartPage} from '../orgchart/orgchart';
@Component({
  selector: 'page-reportviewtable',
  templateUrl: 'reportviewtable.html',
  providers: [DatePicker]
})
export class ReportviewtablePage {
  //@ViewChild('mapContainer') mapContainer: ElementRef;
  //map: any;
  public loginas: any;
  public form: FormGroup;
  public userid: any;
  public companyid: any;
  public pageTitle: string;
  public msgcount: any;
  public notcount: any;
  public from: any;
  public to: any;
  public responseTemplate: any;
  public responseUnit: any;
  public companyId: any;
  public reportAllLists = [];
  public responseResultTimeFrame = [];
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(private datePicker: DatePicker, public NP: NavParams,
    public fb: FormBuilder, public http: Http, public navCtrl: NavController, public nav: NavController, public loadingCtrl: LoadingController) {
    this.pageTitle = 'Reports Preview';
    this.loginas = localStorage.getItem("userInfoName");
    this.userid = localStorage.getItem("userInfoId");
    this.companyid = localStorage.getItem("userInfoCompanyId");
    // Create form builder validation rules
    this.form = fb.group({
      "selunit": [""],
      "seltemplate": [""],
      "seltimeframe": [""],
    });
  }
  ionViewWillEnter() {
    let //body: string = "loginid=" + this.userId,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/msgnotifycount?loginid=" + this.userid;
    this.http.get(url, options)
      .subscribe((data) => {
        console.log("Count Response Success:" + JSON.stringify(data.json()));
        this.msgcount = data.json().msgcount;
        this.notcount = data.json().notifycount;
      });
  }
  ionViewDidLoad() {
    let seltypeBtn = localStorage.getItem("buttonRpt");
    console.log("Select Type Button Submit" + seltypeBtn);
    let action;
    let seltype;
    if (seltypeBtn == '1') {
      action = 'request';
      seltype = '0'; // Request
    }
    if (seltypeBtn == '2') {
      action = 'view';
      seltype = '1'; // Generate
    }
    if (seltypeBtn == '3') {
      action = 'view';
      seltype = '2'; // PDF
    }
    let info = this.NP.get("selunit");
    console.log(JSON.stringify(info));

    //console.log('ionViewDidLoad ReportviewtablePage');
/*

    this.reportAllLists = [{
      "DATEANDTIME": "2017-08-12 23:58:25",
      "FUELLEVEL": "0",
      "LOADPOWERFACTOR": "0",
      "FREQ": "0",
      "ENGINESTATE": "0",
      "COLLANTTEMP": "27.7"
    }, {
      "DATEANDTIME": "2017-08-12 23:58:24",
      "FUELLEVEL": "0",
      "LOADPOWERFACTOR": "0",
      "FREQ": "0",
      "ENGINESTATE": "0",
      "COLLANTTEMP": "27.7"
    }, {
      "DATEANDTIME": "2017-08-12 23:58:23",
      "FUELLEVEL": "0",
      "LOADPOWERFACTOR": "0",
      "FREQ": "0",
      "ENGINESTATE": "0",
      "COLLANTTEMP": "27.7"
    }, {
      "DATEANDTIME": "2017-08-12 23:58:22",
      "FUELLEVEL": "0",
      "LOADPOWERFACTOR": "0",
      "FREQ": "0",
      "ENGINESTATE": "0",
      "COLLANTTEMP": "27.7"
    }, {
      "DATEANDTIME": "2017-08-12 23:58:21",
      "FUELLEVEL": "0",
      "LOADPOWERFACTOR": "0",
      "FREQ": "0",
      "ENGINESTATE": "0",
      "COLLANTTEMP": "27.7"
    }, {
      "DATEANDTIME": "2017-08-12 23:58:20",
      "FUELLEVEL": "0",
      "LOADPOWERFACTOR": "0",
      "FREQ": "0",
      "ENGINESTATE": "0",
      "COLLANTTEMP": "27.7"
    }, {
      "DATEANDTIME": "2017-08-12 23:58:19",
      "FUELLEVEL": "0",
      "LOADPOWERFACTOR": "0",
      "FREQ": "0",
      "ENGINESTATE": "0",
      "COLLANTTEMP": "27.7"
    }, {
      "DATEANDTIME": "2017-08-12 23:58:18",
      "FUELLEVEL": "0",
      "LOADPOWERFACTOR": "0",
      "FREQ": "0",
      "ENGINESTATE": "0",
      "COLLANTTEMP": "27.7"
    }];
*/
    let body: string = "is_mobile=1" +
      "&selunit=" + this.NP.get("selunit") +
      "&seltimeframe=" + this.NP.get("seltimeframe") +
      "&seltemplate=" + this.NP.get("seltemplate") +
      "&from=" + this.NP.get("from") +
      "&to=" + this.NP.get("to") +
      "&exportto=" + this.NP.get("exportto") +
      "&seltype=" + seltype +
      "&action=" + action +
      "&exportto=" + this.NP.get("exportto") + "&loginid=" + this.userid +
      "&companyid=" + this.companyid,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/reports/viewreport";

    console.log("Report submit url is:-" + url + "?" + body); let res;
    this.presentLoading(1);
    this.http.post(url, body, options)
      .subscribe((data) => {

        // If the request was successful notify the user
        res = data.json();
        console.log("Report Preview Success Response:-" + JSON.stringify(res));
        if (res.reportdata.length > 0) {
          this.reportAllLists = res.reportdata;        
        }

        if (data.status === 200) {

        }
        // Otherwise let 'em know anyway
        else {

        }
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
  notification() {
    this.navCtrl.push(NotificationPage);
  }
  redirectToUser() {
    this.navCtrl.push(UnitsPage);
  }
  redirectToMessage() {
    this.navCtrl.push(EmailPage);
  }
  redirectCalendar() {
    this.navCtrl.push(CalendarPage);
  }
  redirectToMaps() {
    this.navCtrl.push(MapsPage);
  }
  redirectToSettings() {
    this.navCtrl.push(OrgchartPage);
  }
  previous() {
    this.navCtrl.push(ReportsPage);
  }
}




