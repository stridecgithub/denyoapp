import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AddalarmPage } from '../addalarm/addalarm'; 

/**
 * Generated class for the AlarmdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-alarmdetails',
  templateUrl: 'alarmdetails.html',
})
export class AlarmdetailsPage {
 public loginas: any;
  public pageTitle: string;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  public totalCount;
  pet: string = "ALL";
  public sortby = 2;
  public alarm_assginedby_name:any;
  public alarm_assginedto_name:any;
  public alarm_name:any;
  public estatus;
  public vendorsort = "asc";
  public ascending = true;
  public colorListArr: any;
  public companyId: any;
  public reportData: any =
  {
    status: '',
    sort: 'unit_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
  public reportAllLists = [];
  constructor(public http: Http, public nav: NavController,
    public toastCtrl: ToastController, public alertCtrl: AlertController, public NP: NavParams) {
    this.pageTitle = 'Units';
    this.loginas = localStorage.getItem("userInfoName");
    this.companyId = localStorage.getItem("userInfoCompanyId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmdetailsPage');
  }
 ionViewWillEnter() {
      if (this.NP.get("record")) {
      console.log("Alarm Details" + JSON.stringify(this.NP.get("record")));
      console.log(this.NP.get("record").alarm_name);
    this.alarm_name = this.NP.get("record").alarm_name;
     this.alarm_assginedby_name=this.NP.get("record").alarm_assginedby_name;
    this.alarm_assginedto_name=this.NP.get("record").alarm_assginedto_name;
    if(this.alarm_assginedby_name == "")
    {
        this.estatus=1;
    }
     // this.selectEntry(this.NP.get("record"));
    }
   
  }
  selectEntry(item)
  {
    
    this.alarm_name = item.alarm_name;
    this.alarm_assginedby_name=item.alarm_assginedby_name;
    this.alarm_assginedto_name=item.alarm_assginedto_name;
  }
  editalarm()
  {
     this.nav.setRoot(AddalarmPage);
  }
}
