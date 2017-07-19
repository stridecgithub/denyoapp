import { Component } from '@angular/core';
import {  NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AddorgchartonePage } from '../addorgchartone/addorgchartone';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UnitdetailsPage } from '../unitdetails/unitdetails';
import { DomSanitizer } from '@angular/platform-browser';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { NotificationPage } from '../notification/notification';
import { MapsPage } from '../maps/maps';
import { ReportsPage } from '../reports/reports';
import { CalendarPage } from '../calendar/calendar';
import { EmailPage } from '../email/email';

/**
 * Generated class for the EnginedetailviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-enginedetailview',
  templateUrl: 'enginedetailview.html',
})
export class EnginedetailviewPage {
 public pageTitle: string;
  public loginas: any;
  public unitid:any;
  public htmlContent;
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
  public colorListArr: any;
  public userId: any;
  public companyId: any;
  iframeContent: any;
  constructor( public http: Http, public nav: NavController, private sanitizer: DomSanitizer,
    public toastCtrl: ToastController, public alertCtrl: AlertController, public NP: NavParams, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
    this.companyId = localStorage.getItem("userInfoCompanyId");
    this.unitid =localStorage.getItem("unitId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnginedetailviewPage');
  }
 doRefresh(refresher) {
    console.log('doRefresh function calling...');
    this.reportData.startindex = 0;
    this.reportAllLists = [];
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }


  ionViewWillEnter() {
   // this.iframeContent =  "<iframe id='filecontainer' src=" + "http://denyoappv2.stridecdev.com/orgchart?company_id="+this.companyId+"&is_mobile=1&id="+this.userId+" height=350 width=100% frameborder=0></iframe>";
    this.pageTitle = "Org Chart";
    this.reportData.startindex = 0;
    this.reportData.sort = "unitgroup_id";
    
    
    console.log(this.apiServiceURL + "/orgchart?company_id=" + this.companyId + "&is_mobile=1");
    this.iframeContent = "<iframe src=" + "http://denyoappv2.stridecdev.com/"+this.unitid+"/1/enginedetails height=350 frameborder=0></iframe>";
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
  previous()
  {
     this.nav.setRoot(UnitdetailsPage, {
      record: this.NP.get("record")
    });
  }
}
