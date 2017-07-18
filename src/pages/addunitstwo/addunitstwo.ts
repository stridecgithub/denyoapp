import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AddunitsthreePage } from '../addunitsthree/addunitsthree';
import { AddunitsonePage } from '../addunitsone/addunitsone';
import { UserPage } from '../user/user';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { RolePage } from '../role/role';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { NotificationPage } from '../notification/notification';
import { MapsPage } from '../maps/maps';
import { ReportsPage } from '../reports/reports';
import { CalendarPage } from '../calendar/calendar';
import { EmailPage } from '../email/email';
/**
 * Generated class for the AddcompanygroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-addunitstwo',
  templateUrl: 'addunitstwo.html'
})
export class AddunitstwoPage {
  // Define FormBuilder /model properties
  public loginas: any;
  public form: FormGroup;
  public unitname: any;
  public projectname: any;
  public controllerid: any;
  public models_id: any;
  public neaplateno: any;
  public userId: any;
  public createdby: any;
  public location: any;
  public latitude: any;
  public longitude: any;

  public responseResultModel: any;
  progress: number;
  public isProgress = false;
  public isUploaded: boolean = true;
  // Flag to be used for checking whether we are adding/editing an entry
  public isEdited: boolean = false;
  public readOnly: boolean = false;
  public addedImgLists: any;
  public userInfo = [];

  // Flag to hide the form upon successful completion of remote operation
  public hideForm: boolean = false;
  public hideActionButton = true;
  // Property to help ste the page title
  public pageTitle: string;
  // Property to store the recordID for when an existing entry is being edited
  public recordID: any = null;
  public isUploadedProcessing: boolean = false;
  public uploadResultBase64Data;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(public nav: NavController,
    public http: Http,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.loginas = localStorage.getItem("userInfoName");
    // Create form builder validation rules
    this.form = fb.group({
      //"unitname": ["", Validators.required],
      //"projectname": ["", Validators.required],
      "unitname": ["", Validators.compose([Validators.maxLength(30), Validators.required])],
      "projectname": ["", Validators.compose([Validators.maxLength(30), Validators.required])],
      "models_id": ["", Validators.required],
      "neaplateno": ["", Validators.required],
      /// "controllerid": ["", Validators.required]
      'controllerid': ['', Validators.required],
    });
    this.userId = localStorage.getItem("userInfoId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddunitsonePage');

  }

  // Determine whether we adding or editing a record
  // based on any supplied navigation parameters
  ionViewWillEnter() {
    this.resetFields();
    this.getJsonModelListData();
    console.log(JSON.stringify(this.NP.get("record")));
    if (this.NP.get("record")) {
      console.log("Add User:" + JSON.stringify(this.NP.get("record")));
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Edit  Units';
      this.readOnly = false;
      this.hideActionButton = true;
      if (this.NP.get("record").photo) {
        this.addedImgLists = this.apiServiceURL + "/public/staffphotos/" + this.NP.get("record").photo;
        console.log(this.addedImgLists);
      }
      let editItem = this.NP.get("record");
      this.unitname = editItem.unitname;
      this.projectname = editItem.projectname;
      this.controllerid = editItem.controllerid;
      this.models_id = editItem.models_id;
      this.neaplateno = editItem.neaplateno;
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'New  Units';
    }


    if (this.NP.get("accountInfo")) {
      let info = this.NP.get("accountInfo");

      //var objects = JSON.parse(info);
      console.log("JSON.stringify:" + JSON.stringify(info));
      console.log("Length:" + info.length);
      console.log('A');
      for (var key in info) {
        console.log('B');
        let keyindex;
        if (this.NP.get("record")) {
          keyindex = 0;
        } else {
          keyindex = 1;
        }
        console.log("Key:" + key);
        console.log("Key Index:" + keyindex);
        if (key == keyindex) {
          console.log('Key' + key);
          this.location = info[key].location;
          this.createdby = info[key].createdby;
          this.latitude = info[key].latitude;
          this.longitude = info[key].longitude;
          console.log("Location for User Account:" + this.location);
          //console.log(JSON.stringify(this));
        } else {
          console.log('Key' + key);
          this.location = info[0].location;
          this.createdby = info[0].createdby;
          this.latitude = info[0].latitude;
          this.longitude = info[0].longitude;
          console.log("Location for User Account:" + this.location);
        }
        /* this.userInfo.push({
           info
         });
         console.log("User Information:" + JSON.stringify(this.userInfo));
         */
      }
    }


    //Static Storage
    /*let data = [
      { username: 'Krishanth', fullname: 'Kannan' },
      { username: 'Thibishanth', fullname: 'Kannan' },
      { username: 'Gohila', fullname: 'Kannan' },
      { username: 'lodev09', fullname: 'Jovanni Lo' },
      { username: 'foo', fullname: 'Foo User' },
      { username: 'bar', fullname: 'Bar User' },
      { username: 'twbs', fullname: 'Twitter Bootstrap' },
      { username: 'john', fullname: 'John Doe' },
      { username: 'jane', fullname: 'Jane Doe' },
      { username: 'Kannan', fullname: 'Nagarathinam' },
    ]*/



    /* this.atMentionedInfo.push({
       username: "Kannan",
       fullname: "Nagarathinam Kannan"
     });
 
     this.atMentionedInfo.push({
       username: "Krishanth",
       fullname: "Kannan Krishanth"
     });
 
     this.atMentionedInfo.push({
       username: "Thibishanth",
       fullname: "Kannan Krishanth"
     });
     localStorage.setItem("atMentionedStorage", JSON.stringify(this.atMentionedInfo));*/
    //Static Storage
  }



  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    this.unitname = item.unitname;
    this.projectname = item.projectname;
    this.controllerid = item.controllerid;
    this.models_id = item.models_id;
    this.neaplateno = item.neaplateno;
    this.recordID = item.unit_id;
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(unitname, projectname, controllerid, models_id, neaplateno, createdby) {

    // If Controller Id Check Unique
    let
      body: string = "unit_id=0&controllerid=" + controllerid,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/checkcontrollerid";

    this.http.post(url, body, options)
      .subscribe(data => {
        let res = data.json();
        // If the request was successful notify the user
        if (data.status === 200) {
          console.log(JSON.stringify(data.json()));
          this.hideForm = true;
          if(res.msg[0].Error == '1')
          {
          this.sendNotification(JSON.stringify(data));
        }
        else
        {
 this.userInfo.push({
      unitname: unitname,
      projectname: projectname,
      controllerid: controllerid,
      models_id: models_id,
      neaplateno: neaplateno,
      createdby: createdby,
      location: this.location,
      latitude: this.latitude,
      longitude: this.longitude
    });
    this.nav.setRoot(AddunitsthreePage, {
      accountInfo: this.userInfo,
      record: this.NP.get("record")
    });
        }
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
    // If Controller Id Check Unique

   
  }



  // Update an existing record that has been edited in the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of update followed by the key/value pairs
  // for the record data
  updateEntry(unitname, projectname, controllerid, models_id, neaplateno, createdby) {

    // If Controller Id Check Unique
    let
      body: string = "unit_id="+this.NP.get("record").unit_id+"&controllerid=" + controllerid,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/checkcontrollerid";

    this.http.post(url, body, options)
      .subscribe(data => {
        // If the request was successful notify the user
        let res = data.json();
        // If the request was successful notify the user
        if (data.status === 200) {
          console.log(JSON.stringify(data.json()));
          this.hideForm = true;
          if(res.msg[0].Error == '1')
          {
          this.sendNotification(res.msg[0].result);
        }
        else
        {
 this.userInfo.push({
      unitname: unitname,
      projectname: projectname,
      controllerid: controllerid,
      models_id: models_id,
      neaplateno: neaplateno,
      createdby: createdby,
      location: this.location,
      latitude: this.latitude,
      longitude: this.longitude
    });
    this.nav.setRoot(AddunitsthreePage, {
      accountInfo: this.userInfo,
      record: this.NP.get("record")
    });
        }
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
    // If Controller Id Check Unique

   
  }

  // Remove an existing record that has been selected in the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of delete followed by the key/value pairs
  // for the record ID we want to remove from the remote database
  deleteEntry() {
    let unitname: string = this.form.controls["unitname"].value,
      body: string = "key=delete&recordID=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/companygroup.php";

    this.http.post(url, body, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`Congratulations the company group: ${unitname} was successfully deleted`);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }



  // Handle data submitted from the page's HTML form
  // Determine whether we are adding a new record or amending an
  // existing record
  saveEntry() {
    let unitname: string = this.form.controls["unitname"].value,
      projectname: string = this.form.controls["projectname"].value,
      controllerid: string = this.form.controls["controllerid"].value,
      models_id: string = this.form.controls["models_id"].value,
      neaplateno: string = this.form.controls["neaplateno"].value;
    console.log(this.form.controls);
    
    if (this.isUploadedProcessing == false) {
      if (this.isEdited) {
        this.updateEntry(unitname, projectname, controllerid, models_id, neaplateno, this.userId);
      }
      else {
        this.createEntry(unitname, projectname, controllerid, models_id, neaplateno, this.userId);
      }
    }
  }



  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.unitname = "";
    this.projectname = "";
    this.controllerid = "";
    this.models_id = "";
    this.neaplateno = "";
  }



  // Manage notifying the user of the outcome
  // of remote operations
  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

  getJsonModelListData() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/getmodels";
    let res;
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        this.responseResultModel = res.models;
      });

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
    this.nav.setRoot(NotificationPage);
  }
  previous() {
    this.nav.setRoot(AddunitsonePage, {
      accountInfo: this.userInfo,
      record: this.NP.get("record")
    });
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

