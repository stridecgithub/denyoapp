import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { UserPage } from '../user/user';
import { CommentsinfoPage } from '../commentsinfo/commentsinfo';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { DatePicker } from '@ionic-native/date-picker';
import * as $ from 'jquery'
import "slick-carousel";
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';

/**
 * Generated class for the CommentdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-commentdetails',
  templateUrl: 'commentdetails.html',
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
  constructor(public http: Http, public alertCtrl: AlertController, private datePicker: DatePicker, public NP: NavParams, public nav: NavController, public toastCtrl: ToastController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, private filechooser: FileChooser,
    private transfer: Transfer,
    private file: File, private ngZone: NgZone) {
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
    let users = localStorage.getItem("atMentionedStorage");
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

    //this.next_service_date = item.next_service_date;
    this.comment_priority = item.comment_priority;
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
}
