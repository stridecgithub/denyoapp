import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { UserPage } from '../user/user';
//import { UseraccountPage } from '../useraccount/useraccount';
import { AddorgchartonePage } from '../addorgchartone/addorgchartone';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the AddcompanygroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addorgcharttwo',
  templateUrl: 'addorgcharttwo.html',
  providers: [FileChooser, Transfer, File]
})
export class AddorgcharttwoPage {
  // Define FormBuilder /model properties
  public userInfo = [];
  public loginas: any;
  public userdata = [];
  public first_name: any;
  public last_name: any;
  public email: any;
  public userId: any;
  public country: any;
  public contact: any;
  public createdby: any;
  public photo: any;
  public username: any;
  public password: any;
  public re_password: any;
  public job_position: any;
  public company_group: any;
  public report_to: any;
  public hashtag: any;
  public role: any;
  public form: FormGroup;
  public companygroup_name: any;
  public address: any;
  public responseResultCompanyGroup: any;
  public responseResultReportTo: any;
  progress: number;
  public isUploadedProcessing: boolean = false;
  public isProgress = false;
  public isUploaded: boolean = true;
  // Flag to be used for checking whether we are adding/editing an entry
  public isEdited: boolean = false;
  public readOnly: boolean = false;

  // Flag to hide the form upon successful completion of remote operation
  public hideForm: boolean = false;
  public hideActionButton = true;
  // Property to help ste the page title
  public pageTitle: string;
  // Property to store the recordID for when an existing entry is being edited
  public recordID: any = null;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(public navCtrl: NavController,
    public http: Http,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController,
    private filechooser: FileChooser,
    private transfer: Transfer,
    private file: File, private ngZone: NgZone) {
    this.loginas = localStorage.getItem("userInfoName");
    // Create form builder validation rules
    this.form = fb.group({
      "job_position": ["", Validators.required],
      "company_group": ["", Validators.required],
      "report_to": [""]
    });

    this.userId = localStorage.getItem("userInfoId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddorgcharttwoPage');
  }

  // Determine whether we adding or editing a record
  // based on any supplied navigation parameters
  ionViewWillEnter() {
    this.resetFields();
    this.getCompanyGroupListData();
    this.getUserListData();
    if (this.NP.get("record")) {
      console.log("User Org Chart:" + JSON.stringify(this.NP.get("record")));
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Edit Org Chart';
      this.readOnly = false;
      this.hideActionButton = true;
      let editItem = this.NP.get("record");
      this.job_position = editItem.job_position;
      this.company_group = editItem.company_id;
      this.report_to = editItem.report_to;
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'New  Org Chart';
    }

    if (this.NP.get("accountInfo")) {
      let info = this.NP.get("accountInfo");

      //var objects = JSON.parse(info);
      console.log("JSON.stringify:" + JSON.stringify(info));
      console.log("Length:" + info.length); console.log("info.first_name" + info.first_name);
      console.log("info.first_name array" + info['first_name']);
      console.log("info.first_name array 0" + info[0]['first_name']);
      let keyindex = info.length - 1;
      this.first_name = info[keyindex]['first_name'];
      this.last_name = info[keyindex]['last_name'];
      this.email = info[keyindex]['email'];
      this.country = info[keyindex]['country'];
      this.contact = info[keyindex]['contact'];
      this.photo = info[keyindex]['photo'];
      this.createdby = info[keyindex]['createdby'];
    
    }
  }



  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    this.job_position = item.job_position;
    this.company_group = item.company_id;
    this.report_to = item.report_to;
    this.recordID = item.staff_id;
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(userdata, userid) {

    let userPhotoFile = localStorage.getItem("userPhotoFile");
    if (userPhotoFile) {
      console.log("Upload Device Image File:" + userPhotoFile);
      this.fileTrans(userPhotoFile);
    }
    let body: string = "is_mobile=1&firstname=" + this.first_name +
      "&lastname=" + this.last_name +
      "&photo=" + this.photo +
      "&email=" + this.email +
      "&country_id=" + this.country +
      "&contact_number=" + this.contact +
      "&createdby=" + this.createdby +
      "&updatedby=" + this.createdby +
      "&report_to=" + this.report_to +
      "&company_id=" + this.company_group +
      "&job_position=" + this.job_position,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/orgchart/store";
    console.log(url);
    console.log(body);

    this.http.post(url, body, options)
      .subscribe((data) => {
        //console.log("Response Success:" + JSON.stringify(data.json()));
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`User created was successfully added`);
          localStorage.setItem("userPhotoFile", "");
          this.navCtrl.setRoot(HomePage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }



  // Update an existing record that has been edited in the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of update followed by the key/value pairs
  // for the record data
  updateEntry(userdata, userid) {

    let userPhotoFile = localStorage.getItem("userPhotoFile");
    if (userPhotoFile) {
      console.log("Upload Device Image File:" + userPhotoFile);
      this.fileTrans(userPhotoFile);
    }
    let body: string = "is_mobile=1&staff_id=" + this.recordID +
      "&firstname=" + this.first_name +
      "&lastname=" + this.last_name +
      "&photo=" + this.photo +
      "&email=" + this.email +
      "&country_id=" + this.country +
      "&contact_number=" + this.contact +
      "&createdby=" + this.createdby +
      "&updatedby=" + this.createdby +
      "&company_id=" + this.company_group +
      "&job_position=" + this.job_position,

      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/orgchart/update";
    console.log(url);
    console.log(body);
    this.http.post(url, body, options)
      .subscribe(data => {
        console.log(data);
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`successfully updated`);
          this.navCtrl.setRoot(HomePage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }



  // Remove an existing record that has been selected in the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of delete followed by the key/value pairs
  // for the record ID we want to remove from the remote database
  deleteEntry() {
    let companygroup_name: string = this.form.controls["companygroup_name"].value,
      body: string = "key=delete&recordID=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/api/users.php";

    this.http.post(url, body, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`Congratulations the company group: ${companygroup_name} was successfully deleted`);
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
    let job_position: string = this.form.controls["job_position"].value,
      company_group: string = this.form.controls["company_group"].value,
      report_to: string = this.form.controls["report_to"].value;
    this.userInfo.push({
      'job_position': job_position,
      'company_group': company_group,
      'report_to': report_to,
      'first_name': this.first_name,
      'last_name': this.last_name,
      'photo': this.photo,
      'email': this.email,
      'country': this.country,
      'contact': this.contact,
      'createdby': this.createdby,
      'username': this.username,
      'password': this.password,
      'hashtag': this.hashtag,
      'role': this.role

    });
    if (this.isEdited) {
      this.updateEntry(this.userInfo, this.userId);
    }
    else {
      this.createEntry(this.userInfo, this.userId);
    }
  }



  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.companygroup_name = "";
    this.address = "";
    this.country = "";
    this.contact = "";
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

  getCompanyGroupListData() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/getcompanies";
    let res;
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        this.responseResultCompanyGroup = res.companies;
      });

  }

  getUserListData() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/getstaffs";
    let res;
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        this.responseResultReportTo = res.staffslist;
      });

  }

  previous() {
    this.navCtrl.setRoot(AddorgchartonePage);
  }
  fileTrans(path) {
    let fileName = path.substr(path.lastIndexOf('/') + 1);
    const fileTransfer: TransferObject = this.transfer.create();
    let currentName = path.replace(/^.*[\\\/]/, '');
    this.photo = currentName;
    console.log("File Name is:" + currentName);


    /*var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";*/

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: fileName,
      headers: {},
      chunkedMode: false,
      mimeType: "text/plain",
    }

    //  http://127.0.0.1/ionic/upload_attach.php
    //http://amahr.stridecdev.com/getgpsvalue.php?key=create&lat=34&long=45
    fileTransfer.onProgress(this.onProgress);
    fileTransfer.upload(path, this.apiServiceURL + '/upload.php', options)
      .then((data) => {
        console.log(JSON.stringify(data));
        console.log("UPLOAD SUCCESS:" + data.response);
        let successData = JSON.parse(data.response);
        this.userInfo.push({
          photo: successData
        });
        //this.sendNotification("User photo uploaded successfully");
        this.progress += 5;
        this.isProgress = false;
        // this.isUploadedProcessing = false;
        // return false;



        // Save in Backend and MysQL
        //this.uploadToServer(data.response);
        // Save in Backend and MysQL
      }, (err) => {
        //loading.dismiss();
        console.log("Upload Error:");
        this.sendNotification("Upload Error:" + JSON.stringify(err));
      })
  }
  onProgress = (progressEvent: ProgressEvent): void => {
    this.ngZone.run(() => {
      if (progressEvent.lengthComputable) {
        let progress = Math.round((progressEvent.loaded / progressEvent.total) * 95);
        this.isProgress = true;
        this.progress = progress;
      }
    });
  }

  //http://denyoappv2.stridecdev.com/staff/store
  //main.js:61474 firstname=Kannan&lastname=Naga&photo=undefined&email=kn@gmail.com&country_id=4&contact_number=123456789&createdby=1&updatedby=1&username=nk&password=nk&role_id=1&personalhashtag=@nk&report_to=3&company_id=13&job_position=At prg
  //main.js:61622 File Name is:1497379310688.jpg
}



