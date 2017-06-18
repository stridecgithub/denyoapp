import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AddunitsfourPage } from '../addunitsfour/addunitsfour';
import { AddunitstwoPage } from '../addunitstwo/addunitstwo';
import { UserPage } from '../user/user';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role'; 
import * as $ from 'jquery'
import "slick-carousel";
/**
 * Generated class for the AddcompanygroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addunitsthree',
  templateUrl: 'addunitsthree.html'
})
export class AddunitsthreePage {
  // Define FormBuilder /model properties
  public loginas: any;
  public form: FormGroup;
  public alarmhashtags: any;
  public contact_name_1: any;
  public contact_number_1: any;
  public contact_name_2: any;
  public contact_number_2: any;
  public contact_name_3: any;
  public contact_number_3: any;
  public contact_name_4: any;
  public contact_number_4: any;
  public contact_name_5: any;
  public contact_number_5: any;
  public gethashtag: any;
  public userId: any;
  public unitname: any;
  public createdby: any;
  public location: any;
  public projectname: any;
  public controllerid: any;
  public neaplateno: any;
  public models_id: any;
  public responseResultCountry: any;
  public responseResultStaff: any;
  progress: number;
  public isProgress = false;
  public isUploaded: boolean = true;
  // Flag to be used for checking whether we are adding/editing an entry
  public isEdited: boolean = false;
  public readOnly: boolean = false;
  public addedImgLists: any;
  public userInfo = [];
  public contactInfo = [];
  public contactnameArray = [];
  public contactnumberArray = [];
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
    public toastCtrl: ToastController, public loadingCtrl: LoadingController, private ngZone: NgZone) {
    this.loginas = localStorage.getItem("userInfoName");
    // Create form builder validation rules
    this.form = fb.group({
      "alarmhashtags": ["", Validators.required],
      "contact_name_1": [""],
      'contact_number_1': [""],
      "contact_name_2": [""],
      'contact_number_2': [""],
      "contact_name_3": [""],
      'contact_number_3': [""],
      "contact_name_4": [""],
      'contact_number_4': [""],
      "contact_name_5": [""],
      'contact_number_5': [""],
      "contact_name": [""],
      'contact_number': [""]

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
    this.getJsonCountryListData();
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
      this.alarmhashtags = editItem.alarmnotificationto;

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
          this.unitname = info[key].unitname;
          this.createdby = info[key].createdby;
          this.projectname = info[key].projectname;
          this.controllerid = info[key].controllerid;
          this.neaplateno = info[key].neaplateno;
          this.models_id = info[key].models_id;
          this.location = info[key].location;
          console.log("Unit Name:" + this.unitname);
          //console.log(JSON.stringify(this));
        } else {
          console.log('Key' + key);
          this.unitname = info[0].unitname;
          this.createdby = info[0].createdby;

          this.unitname = info[0].unitname;
          this.createdby = info[0].createdby;
          this.projectname = info[0].projectname;
          this.controllerid = info[0].controllerid;
          this.neaplateno = info[0].neaplateno;
          this.models_id = info[0].models_id;
          this.location = info[0].location;
          console.log("Unit Name:" + this.unitname);
        }
        /* this.userInfo.push({
           info
         });
         console.log("User Information:" + JSON.stringify(this.userInfo));
         */
      }
    }

    /*let users = [
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
    ];*/

    let users = localStorage.getItem("atMentionedStorage");

    console.log("A:" + JSON.parse(users));
    console.log("B:" + users);
    console.log("C:" + JSON.stringify(users));
    $('#example1').suggest('@', {
      data: JSON.parse(users),
      map: function (user) {
        return {
          value: user.username,
          text: '<strong>' + user.username + '</strong> <small>' + user.fullname + '</small>'
        }
      }
    })

  }



  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    this.alarmhashtags = item.alarmnotificationto;
    this.recordID = item.unit_id;
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(alarmhashtags, contactInfo, createdby) {
    this.userInfo.push({
      alarmhashtags: alarmhashtags,
      contactInfo: contactInfo,
      unitname: this.unitname,
      createdby: this.createdby,
      projectname: this.projectname,
      controllerid: this.controllerid,
      neaplateno: this.neaplateno,
      models_id: this.models_id,
      location: this.location
    });
    this.nav.setRoot(AddunitsfourPage, {
      accountInfo: this.userInfo
    });

  }



  // Update an existing record that has been edited in the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of update followed by the key/value pairs
  // for the record data
  updateEntry(alarmhashtags, contactInfo, createdby) {
    this.userInfo.push({
      alarmhashtags: alarmhashtags,
      contactInfo: contactInfo,
      unitname: this.unitname,
      createdby: this.createdby,
      projectname: this.projectname,
      controllerid: this.controllerid,
      neaplateno: this.neaplateno,
      models_id: this.models_id,
      location: this.location

    });
    this.nav.setRoot(AddunitsfourPage, {
      accountInfo: this.userInfo,
      record: this.NP.get("record")
    });
  }



  // Remove an existing record that has been selected in the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of delete followed by the key/value pairs
  // for the record ID we want to remove from the remote database
  deleteEntry() {
    let alarmhashtags: string = this.form.controls["alarmhashtags"].value,
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
          this.sendNotification(`Congratulations the company group: ${alarmhashtags} was successfully deleted`);
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
    let alarmhashtags: string = this.form.controls["alarmhashtags"].value;
    //let incr = 0;
    //let unitgroup;
    //console.log("Incr 1:" + incr);
    console.log("Length:" + this.contactnameArray.length);

    /*this.contactInfo.push({
      contact_name: this.form.controls["contact_name"].value,
      contact_number: this.form.controls["contact_number"].value
    });
*/

    let ContactLength = this.contactnameArray.length;
    console.log("Contact Length:" + ContactLength);
    for (let i = 1; i <= this.contactnameArray.length; i++) {
      //incr++;
      console.log("Incr i:" + i);
      this.contactInfo.push({
        contact_name: this.form.controls["contact_name_" + i].value,
        contact_number: this.form.controls["contact_number_" + i].value
      });

    }
    /*if (this.addedImgLists) {
      this.isUploadedProcessing = true;
    }*/
    if (this.isUploadedProcessing == false) {
      if (this.isEdited) {
        this.updateEntry(alarmhashtags, this.contactInfo, this.userId);
      }
      else {
        this.createEntry(alarmhashtags, this.contactInfo, this.userId);
      }
    }
  }



  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.alarmhashtags = "";
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

  getJsonCountryListData() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/getCountries";
    let res;
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        this.responseResultCountry = res.countries;
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
  previous() {
    this.nav.setRoot(AddunitstwoPage);
  }

  address1get(hashtag) {
    console.log(hashtag);
    this.gethashtag = hashtag;
  }

  addmore() {
    let len = this.contactnameArray.length;
    let incr;
    console.log("1" + len);
    if (len == 0) {
      len = 1;
    } else {
      console.log("2" + len);
      len = len + 1;
      //len = parseInt(incr) + parseInt(len);
    }
    if (len > 4) {
      console.log("3" + len);
      console.log('Contact details only five item')
    } else {
      console.log("4" + len);
      console.log("5" + len);
      incr = len + 1;
      console.log("6incr" + incr);
      this.contactnameArray.push({
        name: 'contact_name_' + incr,
        placeholder: "Name"
      });

      this.contactnumberArray.push({
        name: 'contact_number_' + incr,
        placeholder: "Number"
      });
    }
    console.log("7" + len);
    console.log("len:" + this.form.controls["contact_name_" + len].value);
    if (this.form.controls["contact_name_" + len].value == 'contact_name_2') {
      console.log("8");
      this.contact_name_2 = '';

    }
    if (this.form.controls["contact_name_" + len].value == 'contact_name_3') {
      this.contact_name_3 = '';
      console.log("9");
    }
    if (this.form.controls["contact_name_" + len].value == 'contact_name_4') {
      this.contact_name_4 = '';
      console.log("10");
    }
    if (this.form.controls["contact_name_" + len].value == 'contact_name_5') {
      this.contact_name_5 = '';
      console.log("11");
    }



  }

  
redirectToUser() {
    this.nav.setRoot(UserPage);
  }
  redirectToUnitGroup() {
    this.nav.setRoot(UnitgroupPage);
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

