import { Component } from '@angular/core';
import {  AlertController, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { UserPage } from '../user/user';
import { CommentsinfoPage } from '../commentsinfo/commentsinfo';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { CompanygroupPage } from '../companygroup/companygroup';

import 'rxjs/add/operator/map';

/**
 * Generated class for the CommentdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-commentdetails',
  templateUrl: 'commentdetails.html'

})
export class CommentdetailsPage {
  isReadyToSave: boolean;
  public photoInfo = [];
  public addedImgListsArray = [];
  public addedImgLists = [];
  progress: number;
  public recordID: any;
  public comment_unitid: any;
  public comment_id: any;
  public comments: any;
  public comment_by_name: any;
  public comment_remark: any;
  public comment_subject: any;
  public comment_priority: any;
  public comment_resources: any;
  public service_priority_class1: any;
  public service_priority_class2: any;
  micro_timestamp: any;
  public isUploadedProcessing: boolean = false;
  public isProgress = false;
  public isUploaded: boolean = true;
  item: any;
  public isEdited: boolean = false;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  form: FormGroup;
  public addedAttachList;
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
  public hideActionButton = true;
  constructor(public alertCtrl: AlertController, public NP: NavParams, public nav: NavController, public toastCtrl: ToastController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder
   
   ) {
    this.service_priority_class1 = "-outline";
    this.service_priority_class2 = "-outline";
    this.unitDetailData.loginas = localStorage.getItem("userInfoName");
    this.unitDetailData.userId = localStorage.getItem("userInfoId");



    this.comment_priority = 0;
    // Watch the form for changes, and



    let already = localStorage.getItem("microtime");
    if (already != undefined && already != 'undefined' && already != '') {
      this.micro_timestamp = already;
    } else {
      let dateStr = new Date();
      let yearstr = dateStr.getFullYear();
      let monthstr = dateStr.getMonth();
      let datestr = dateStr.getDate();
      let hrstr = dateStr.getHours();
      let mnstr = dateStr.getMinutes();
      let secstr = dateStr.getSeconds();
      this.micro_timestamp = yearstr + "" + monthstr + "" + datestr + "" + hrstr + "" + mnstr + "" + secstr;

    }
    localStorage.setItem("microtime", this.micro_timestamp);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentdetailsPage');
  }
  ionViewWillEnter() {
    this.getPrority(1);

    console.log("comment:" + JSON.stringify(this.NP.get("record")));
    if (this.NP.get("record")) {
      this.selectEntry(this.NP.get("record"));
      this.comment_id = this.NP.get("record").comment_id;
      if (this.NP.get("act") == 'Add') {
        this.isEdited = false;
        this.unitDetailData.pageTitle = 'Add Comments';
        this.comment_unitid = this.NP.get("unit_id");
      } else {
        this.comment_unitid = this.NP.get("record").comment_unitid;
        this.unitDetailData.pageTitle = 'Edit Comments';
        this.isEdited = true;
      }
      console.log("Comment Id:" + this.comment_id);
      console.log("Comment Unit Id:" + this.comment_unitid);
    }




  }
  getPrority(val) {
    this.comment_priority = val
  }
  selectEntry(item) {

    this.comments = item.comments;
    this.comment_subject = item.comment_subject;

    this.comment_by_name = item.comment_by_name;
    this.comment_priority = item.comment_priority;
    this.comment_remark = item.comment_remark;
    console.log("X" + this.comment_priority);
    if (this.comment_priority == "1") {
      this.service_priority_class1 = '';
      console.log("Y");
    } else if (this.comment_priority == "2") {
      this.service_priority_class2 = '';
      console.log("Z");
    }

    this.comment_resources = item.comment_resources;
    this.unitDetailData.nextServiceDate = item.next_service_date;
    this.comment_resources = item.comment_resources;

    if (this.comment_resources != undefined && this.comment_resources != 'undefined' && this.comment_resources != '') {
      let hashhypenhash = this.comment_resources.split("#-#");
      for (let i = 0; i < hashhypenhash.length; i++) {
        let imgDataArr = hashhypenhash[i].split("|");
        let imgSrc;
        imgSrc = this.apiServiceURL + "/commentimages" + '/' + imgDataArr[1];
        this.addedImgLists.push({
          imgSrc: imgSrc,
          imgDateTime: new Date(),
          fileName: imgDataArr[1],
          resouce_id: imgDataArr[0]
        });
      }

      if (this.addedImgLists.length > 9) {
        this.isUploaded = false;
      }
    }
  }
  previous() {
    this.nav.setRoot(CommentsinfoPage, {
      record: this.NP.get("record")
    });
  }

  redirectToUser() {
    this.nav.setRoot(UserPage);
  }

  redirectToUnitGroup() {
    this.nav.setRoot(UnitgroupPage);
  }
  redirectToCompanyGroup() {
    this.nav.setRoot(CompanygroupPage);
  }
  redirectToUnits() {
    this.nav.setRoot(UnitsPage);
  }
  redirectToMyAccount() {
    this.nav.setRoot(MyaccountPage);
  }

  redirectToRole() {
    this.nav.setRoot(RolePage);
  }
}
