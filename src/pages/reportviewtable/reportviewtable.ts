import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  public responseResultTimeFrame = [];
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(private datePicker: DatePicker, public NP: NavParams,
    public fb: FormBuilder, public http: Http, public navCtrl: NavController, public nav: NavController) {
    this.pageTitle = 'Reports';
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
   
      let info = this.NP.get("selunit");
      console.log(JSON.stringify(info));

      //console.log('ionViewDidLoad ReportviewtablePage');




      let body: string = "is_mobile=1" +
        "&selunit=" +this.NP.get("selunit") +
        "&seltimeframe=" + this.NP.get("seltimeframe") +
        "&seltemplate=" +this.NP.get("seltemplate") +
        "&from=" + this.NP.get("from") +
        "&to=" + this.NP.get("to") +       
        "&exportto= "+this.NP.get("exportto") +
        "&seltype="+this.NP.get("seltype")+
        "&action="+this.NP.get("action")+
        "&exportto="+this.NP.get("exportto")+ "&loginid="+ this.userid+
         "&companyid="+this.companyid ,
        //"&contact_number=" + this.contact_number +
        //"&contact_name=" + this.contact_name +
        //"&nextServiceDate=" + nextServiceDate,
        type: string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type }),
        options: any = new RequestOptions({ headers: headers }),
        url: any = this.apiServiceURL + "/reports/viewreport";

      console.log("Report submit url is:-" + url + "?" + body);

      //http://denyoappv2.stridecdev.com/reports/viewreport?is_mobile=1&selunit=1&seltimeframe=continues&seltemplate=1&from=2017-08-12&to=2017-08-12&action=view&exportto=table&seltype=

      this.http.post(url, body, options)
        .subscribe((data) => {
          console.log("Response Table Success:" + JSON.stringify(data.json()));
          // If the request was successful notify the user
          if (data.status === 200) {

          }
          // Otherwise let 'em know anyway
          else {

          }
        });
   

  }
  notification() {
    this.navCtrl.setRoot(NotificationPage);
  }
  redirectToUser() {
    this.navCtrl.setRoot(UnitsPage);
  }
  redirectToMessage() {
    this.navCtrl.setRoot(EmailPage);
  }
  redirectCalendar() {
    this.navCtrl.setRoot(CalendarPage);
  }
  redirectToMaps() {
    this.navCtrl.setRoot(MapsPage);
  }
  redirectToSettings() {
    this.navCtrl.setRoot(MyaccountPage);
  }
  previous() {
    this.navCtrl.setRoot(ReportsPage);
  }
}




