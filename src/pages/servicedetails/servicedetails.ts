import { Component,ViewChild, NgZone } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { UserPage } from '../user/user';
import { ServicinginfoPage } from '../servicinginfo/servicinginfo';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { CompanygroupPage } from '../companygroup/companygroup';
import { DatePicker } from '@ionic-native/date-picker';
//import * as $ from 'jquery'
//import "slick-carousel";
import 'rxjs/add/operator/map';
//import { Http, Headers, RequestOptions } from '@angular/http';

/**
 * Generated class for the ServicedetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-servicedetails',
  templateUrl: 'servicedetails.html',
   providers: [Camera, FileChooser, File, DatePicker]
})
export class ServicedetailsPage {
 isReadyToSave: boolean;
  public photoInfo = [];
  public addedImgListsArray = [];
  public addedImgLists = [];
  progress: number;

  public recordID: any;
  public requestbutton:any;
  public service_unitid: any;
  public service_id: any;
  public serviced_by: any;
  public serviced_datetime: any;
  public service_subject: any;
  public service_remark: any;
  public next_service_date: any;
  public service_priority: any;
  
  is_request: boolean
  public serviced_by_name: any;
  public service_resources: any;
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
  constructor( public alertCtrl: AlertController, private datePicker: DatePicker, public NP: NavParams, public nav: NavController, public toastCtrl: ToastController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, private filechooser: FileChooser,
  
    private file: File, private ngZone: NgZone) {
    this.service_priority_class1 = "-outline";
    this.service_priority_class2 = "-outline";
    this.unitDetailData.loginas = localStorage.getItem("userInfoName");
    this.unitDetailData.userId = localStorage.getItem("userInfoId");
    this.unitDetailData.serviced_by = localStorage.getItem("userInfoName");

   
    this.service_priority = 0;
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
    console.log('ionViewDidLoad ServicedetailsPage');
  }
 ionViewWillEnter() {
    this.getPrority(1);    
    this.is_request = false;
    console.log(JSON.stringify(this.NP.get("record")));
    let editItem = this.NP.get("record");
    this.unitDetailData.unit_id = editItem.unit_id;
    this.unitDetailData.unitname = editItem.unitname;
    this.unitDetailData.location = editItem.location;
    this.unitDetailData.projectname = editItem.projectname;
    this.unitDetailData.runninghr = editItem.runninghr;
    this.unitDetailData.gen_status = editItem.gen_status;
    this.unitDetailData.nextservicedate = editItem.nextservicedate;
    if (this.NP.get("record")) {
      this.selectEntry(this.NP.get("record"));
      this.service_id = this.NP.get("record").service_id;
      if (this.NP.get("act") == 'Add') {
       
      } else {
        this.service_unitid = this.NP.get("record").service_unitid;
        this.unitDetailData.pageTitle = 'Servicing Info Edit';
        this.isEdited = true;
      }
      console.log("Service Id:" + this.service_id);
      console.log("Service Unit Id:" + this.service_unitid);
    }

  


  }
   getPrority(val) {
    this.service_priority = val
  }
   selectEntry(item) {
    this.serviced_by_name = item.serviced_by_name;
    this.serviced_datetime = item.serviced_datetime;
    this.service_subject = item.service_subject;
    this.service_remark = item.service_remark;
   // this.requestbutton=1;
    //this.next_service_date = item.next_service_date;
    this.service_priority = item.service_priority;
    console.log("X" + this.service_priority);
    if (this.service_priority == "1") {
      this.service_priority_class1 = '';
      console.log("Y");
    } else if (this.service_priority == "2") {
      this.service_priority_class2 = '';
      console.log("Z");
    }
    if (item.is_request > 0) {
      this.is_request = true;
    }
    this.serviced_by_name = item.serviced_by_name;
    this.service_resources = item.service_resources;
    this.unitDetailData.nextServiceDate = item.next_service_date;
    this.service_resources = item.service_resources;
    this.service_priority=item.service_priority;
    this.requestbutton=item.is_request;
    console.log("RQ"+this.is_request);

if (this.service_resources != undefined && this.service_resources != 'undefined' && this.service_resources != '') {
      let hashhypenhash = this.service_resources.split("#-#");
      for (let i = 0; i < hashhypenhash.length; i++) {
        let imgDataArr = hashhypenhash[i].split("|");
        let imgSrc;
        imgSrc = this.apiServiceURL + "/serviceimages" + '/' + imgDataArr[1];
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
    this.nav.setRoot(ServicinginfoPage, {
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
