import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AddreporttemplatePage } from '../addreporttemplate/addreporttemplate';
import { LoadingController } from 'ionic-angular';
//import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the UnitgroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reporttemplate',
  templateUrl: 'reporttemplate.html',
})
export class ReporttemplatePage {
  public pageTitle: string;
  public loginas: any;
  public userId: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  public templatenamehash;
  public templatenamecomm;
  public totalCount;
  public reporttemplate;

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
    this.userId = localStorage.getItem("userInfoId");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReporttemplatePage');
  }


  onSegmentChanged(val) {
    let splitdata = val.split(",");
    this.reportData.sort = splitdata[0];
    this.reportData.sortascdesc = splitdata[1];
    //this.reportData.status = "ALL";
    this.reportData.startindex = 0;
    this.reportAllLists = [];
    this.doReport();
  }

  ionViewWillEnter() {
    this.doReport();
    this.doReportTemplate();
  }
  doReportTemplate() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/getavailableheading";
    let res;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        res = data.json();       
        this.reporttemplate = JSON.stringify(res.comm_datas);
      });
  }
  doRefresh(refresher) {
    console.log('doRefresh function calling...');
    this.reportData.startindex = 0;
    this.reportAllLists = [];
    this.doReport();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  doReport() {
    this.presentLoading(1);
    if (this.reportData.status == '') {
      this.reportData.status = "DRAFT";
    }
    if (this.reportData.sort == '') {
      this.reportData.sort = "unitgroup_id";
    }

    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      // url: any = this.apiServiceURL + "/reporttemplate?is_mobile=1";
      url: any = this.apiServiceURL + "/reporttemplate?is_mobile=1&startindex=" + this.reportData.startindex + "&results=" + this.reportData.results + "&sort=" + this.reportData.sort + "&dir=" + this.reportData.sortascdesc;
    let res;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        res = data.json();
        console.log(JSON.stringify(res));
        console.log("1" + res.availabletemp.length);
        console.log("2" + res.availabletemp);
        if (res.availabletemp.length > 0) {
          for (let availabletemps in res.availabletemp) {
            this.reportAllLists.push({
              templatename: res.availabletemp[availabletemps].templatename,
              availableheading: res.availabletemp[availabletemps].availableheading.split("#")
            });
          }
          this.totalCount = res.totalCount;
          this.reportData.startindex += this.reportData.results;
        } else {
          //this.totalCount = 0;
        }
        // console.log("Total Record:2" + this.totalCount);

      });
    this.presentLoading(0);
  }
  doInfinite(infiniteScroll) {
    console.log('InfinitScroll function calling...');
    console.log('A');
    console.log("Total Count:" + this.totalCount)
    if (this.reportData.startindex < this.totalCount && this.reportData.startindex > 0) {
      console.log('B');
      this.doReport();
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
  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
  doAdd(availableheading) {
    this.nav.setRoot(AddreporttemplatePage, {
      availableheading: availableheading
    });
  }
  doConfirm(id, item) {
    console.log("Deleted Id" + id);
    let confirm = this.alertCtrl.create({
      message: 'Are you sure you want to delete this unit group?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.deleteEntry(id);
          for (let q: number = 0; q < this.reportAllLists.length; q++) {
            if (this.reportAllLists[q] == item) {
              this.reportAllLists.splice(q, 1);
            }
          }
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
      url: any = this.apiServiceURL + "/reporttemplate/" + recordID + "/1/delete";
    this.http.get(url, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {

          this.sendNotification(`Report Template was successfully deleted`);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }
  doEdit(item, act, availableheading) {
    if (act == 'edit') {
      this.nav.setRoot(AddreporttemplatePage, {
        record: item,
        act: act,
        availableheading: availableheading
      });
    }
  }
}

