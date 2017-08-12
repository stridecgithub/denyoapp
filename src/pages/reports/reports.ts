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
import { ReportviewtablePage } from '../reportviewtable/reportviewtable';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
  providers: [DatePicker]
})
export class ReportsPage {
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
  public userInfo: any;
  public exportto: any;
  public action: any;
  public seltype: any;


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
      "typeone": [""],
      "typetwo": [""],
    });
  }
  ionViewWillEnter() {
    this.getDropDownDataTemplate();
    this.getDropDownDataUnits();
    let //body: string = "loginid=" + this.userId,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/msgnotifycount?loginid=" + this.userid;
    console.log(url);
    // console.log(body);

    this.http.get(url, options)
      .subscribe((data) => {
        console.log("Count Response Success:" + JSON.stringify(data.json()));
        this.msgcount = data.json().msgcount;
        this.notcount = data.json().notifycount;
      });

    this.responseResultTimeFrame.push({
      id: 'onetime',
      time_name: '1 Time',
    }, {
        id: 'continues',
        time_name: 'Continues'
      });
  }

  getNextDate(val) {
    let date;
    this.showDatePicker(val);

    if (val == '1') {
      this.from = date.getFullYear() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getDate();
    }

    if (val == '2') {
      this.to = date.getFullYear() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getDate();
    }
  }


  saveEntry() {
    let selunit: string = this.form.controls["selunit"].value,
      seltemplate: string = this.form.controls["seltemplate"].value,
      seltimeframe: string = this.form.controls["seltimeframe"].value;
    // this.createEntry(selunit, seltemplate, seltimeframe);
    this.from = "2017-08-09";
    this.to = "2017-08-12";
    this.action = 'view';
    this.exportto = 'table';
    this.seltype = 0; // 0 for TABLE 1 for PDF




    this.nav.setRoot(ReportviewtablePage, {
      selunit: selunit,
      seltemplate: seltemplate,
      seltimeframe: seltimeframe,
      from: this.from,
      to: this.to,
      exportto: this.exportto,
      action: this.action,
      seltype: this.seltype
    });



  }


  createEntry(selunit, seltemplate, seltimeframe) {



  }

  showDatePicker(val) {


    this.datePicker.show({
      date: new Date(), mode: 'date',

      doneButtonColor: '#F2F3F4',
      cancelButtonColor: '#000000',
      allowFutureDates: true,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      date => {
        let monthstr = date.getMonth() + parseInt("1");
        if (val == '1') {
          this.from = date.getFullYear() + "-" + monthstr + "-" + date.getDate();
          console.log('Got date: ', date);
        }
        if (val == '2') {
          this.to = date.getFullYear() + "-" + monthstr + "-" + date.getDate();
          console.log('Got date: ', date);
        }
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  //http://denyoappv2.stridecdev.com/reports/viewreport?is_mobile=1&selunit=1&seltimeframe=continues&seltemplate=1&from=2017-08-12&to=2017-08-12&action=view&exportto=table&seltype=0
  getTemplate(templateId) {
    console.log(templateId);
  }

  getFormat(format) {
    console.log(format);
  }

  getDropDownDataUnits() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      //url: any = this.apiServiceURL + "/units?is_mobile=1&startindex=0&results=300&sort=unit_id&dir=asc&company_id=" + this.companyId + "&loginid=" + this.userId;
      url: any = this.apiServiceURL + "/reports?is_mobile=1&companyid=" + this.companyid + "&loginid=" + this.userid;

    let res;
    console.log("URL" + url);
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();


        this.responseUnit = res.units;
      });

  }

  getDropDownDataTemplate() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      //url: any = this.apiServiceURL + "/units?is_mobile=1&startindex=0&results=300&sort=unit_id&dir=asc&company_id=" + this.companyId + "&loginid=" + this.userId;
      url: any = this.apiServiceURL + "/reports?is_mobile=1&companyid=" + this.companyid + "&loginid=" + this.userid;

    let res;
    console.log("URL" + url);
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        this.responseTemplate = res.templates;

      });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
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
    this.navCtrl.setRoot(HomePage);
  }
}



