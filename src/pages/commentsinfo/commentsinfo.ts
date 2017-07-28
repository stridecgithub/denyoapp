import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { CompanygroupPage } from '../companygroup/companygroup';
import { UserPage } from '../user/user';
import { LoadingController } from 'ionic-angular';
import { AddcommentsinfoPage } from '../addcommentsinfo/addcommentsinfo';
import { AddserviceinfoPage } from '../addserviceinfo/addserviceinfo';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitdetailsPage } from '../unitdetails/unitdetails';
import { CommentdetailsPage } from '../commentdetails/commentdetails';
import { ServicedetailsPage } from '../servicedetails/servicedetails';
import { RolePage } from '../role/role';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { NotificationPage } from '../notification/notification';
import { MapsPage } from '../maps/maps';
import { ReportsPage } from '../reports/reports';
import { CalendarPage } from '../calendar/calendar';
import { EmailPage } from '../email/email';
/**
 * Generated class for the ServicinginfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-commentsinfo',
  templateUrl: 'commentsinfo.html',
})
export class CommentsinfoPage {
  public pageTitle: string;
  public unit_id: any;
   public msgcount:any;
  public notcount:any;
  public atMentionedInfo = [];
  public reportData: any =
  {
    status: '',
    sort: 'companygroup_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
  public userId: any;
  public reportAllLists = [];
  public loginas: any;
  public udetails:any;
    private permissionMessage: string = "Permission denied for access this page. Please contact your administrator";
   public VIEWACCESS: any;
  public CREATEACCESS: any;
  public EDITACCESS: any;
  public DELETEACCESS: any;
  public comments:any;
  public service_subject:any;
  public addedImgLists=[];
  public loadingMoreDataContent: string;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  public totalCount;
  constructor(public http: Http,
    public toastCtrl: ToastController, public alertCtrl: AlertController, public NP: NavParams, public navParams: NavParams, public nav: NavController, public loadingCtrl: LoadingController) {
    this.pageTitle = 'Comments';
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
    this.udetails = localStorage.getItem("unitdetails");
    this.VIEWACCESS = localStorage.getItem("UNITS_COMMENTS_VIEW");
    console.log("Role Authority for Unit Listing View:"+this.VIEWACCESS );
    this.CREATEACCESS = localStorage.getItem("UNITS_COMMENTS_CREATE");
    console.log("Role Authority for Unit Listing Create:"+this.CREATEACCESS );
    this.EDITACCESS = localStorage.getItem("UNITS_COMMENTS_EDIT");
    console.log("Role Authority for Unit Listing Edit:"+this.EDITACCESS );
    this.DELETEACCESS = localStorage.getItem("UNITS_COMMENTS_DELETE");
    console.log("Role Authority for Unit Listing Delete:"+this.DELETEACCESS );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoadCommentsinfoPage');
  }
  ionViewWillEnter() {
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
       this.msgcount=data.json().msgcount;
        this.notcount=data.json().notifycount;
      });
     this.unit_id =  localStorage.getItem("unitId");
    console.log("NUD"+localStorage.getItem("unitdetails"));

    if (this.NP.get("record")) {
      console.log("Service Info Record Param Value:" + JSON.stringify(this.NP.get("record")));
    }
    this.reportData.startindex = 0;
    this.reportData.sort = "comment_id";
    this.doService();
    //this.unit_id = this.NP.get("record").unit_id;
   
    // Atmentioned Tag Storage
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
  doRefresh(refresher) {
    console.log('doRefresh function calling...');
    this.reportData.startindex = 0;
    this.reportAllLists = [];
    this.doService();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  doInfinite(infiniteScroll) {
    console.log('InfinitScroll function calling...');
    console.log('A');
    console.log("Total Count:" + this.totalCount)
    if (this.reportData.startindex < this.totalCount && this.reportData.startindex > 0) {
      console.log('B');
      this.doService();
    }
    console.log('C');
    setTimeout(() => {
      console.log('D');
      infiniteScroll.complete();
    }, 500);
    console.log('E');
  }
  doService() {
    this.presentLoading(1);
    if (this.reportData.status == '') {
      this.reportData.status = "DRAFT";
    }
    if (this.reportData.sort == '') {
      this.reportData.sort = "comapny";
    }
    let editItem = this.NP.get("record");

    if (this.NP.get("record").unit_id != undefined && this.NP.get("record").unit_id != 'undefined') {
      this.unit_id = editItem.unit_id;
    } else {
      this.unit_id = editItem.service_unitid;
    }

    //http://denyoappv2.stridecdev.com/companygroup?is_mobile=1

    //http://denyoappv2.stridecdev.com/comments?is_mobile=1&startindex=0&results=8&sort=service_id&dir=asc&unitid=2
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/comments?is_mobile=1&startindex=" + this.reportData.startindex + "&results=" + this.reportData.results + "&sort=" + this.reportData.sort + "&dir=" + this.reportData.sortascdesc + "&unitid=" +  localStorage.getItem("unitId");
    let res;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        res = data.json();
        console.log(JSON.stringify(res));
        console.log("1" + res.comments.length);
        console.log("2" + res.comments);
        if (res.comments.length > 0) {
          this.reportAllLists = res.comments;
          this.totalCount = res.totalCount;
          this.reportData.startindex += this.reportData.results;
          this.loadingMoreDataContent = 'Loading More Data';
        } else {
          this.totalCount = 0;
          this.loadingMoreDataContent = 'No More Data';
        }
        console.log("Total Record:" + this.totalCount);

      });
    this.presentLoading(0);
  }
  notification() {
    this.nav.setRoot(NotificationPage);
  }
  previous() {
   
    this.nav.setRoot(UnitdetailsPage, {
      record: this.NP.get("record")
    });
  }
  
  doAdd() {
     this.service_subject='';
    this.comments='';
    this.addedImgLists=[];
    localStorage.setItem("microtime", "");
    this.nav.setRoot(AddcommentsinfoPage, {
      record: this.NP.get("record"),
      act: 'Add',
      unit_id: this.unit_id
    });
  }




  doEdit(item, act,type) {
    if(type.toLowerCase() == 'c')
    {
      console.log("comment")
        localStorage.setItem("microtime", "");
    this.nav.setRoot(AddcommentsinfoPage, {
      record: item,
      act: 'Edit'
    });
    }
    if(type.toLowerCase() == 's')
    {
      console.log("service")
       localStorage.setItem("microtime", "");
    this.nav.setRoot(AddserviceinfoPage, {
      record: item,
      act: 'Edit'
    });
    }

  
  }
   details(item, act,type) {
      if(type.toLowerCase() == 'c'){
    localStorage.setItem("microtime", "");
    this.nav.setRoot(CommentdetailsPage, {
      record: item,
      act: 'Edit'
    });
      }
 if(type.toLowerCase() == 's')
 {
    localStorage.setItem("microtime", "");
    this.nav.setRoot(ServicedetailsPage, {
      record: item,
      act: 'Edit'
    });
 }
  }

  doConfirm(id, item) {
    console.log("Deleted Id" + id);
    let confirm = this.alertCtrl.create({
      message: 'Are you sure you want to delete this comment?',
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
      url: any = this.apiServiceURL + "/comments/" + recordID + "/1/delete";
    this.http.get(url, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {

          this.sendNotification(`Comments was successfully deleted`);
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
