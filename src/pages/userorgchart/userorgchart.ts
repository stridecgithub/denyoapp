import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserPage } from '../user/user';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AddcompanygroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-userorgchart',
  templateUrl: 'userorgchart.html',
})
export class UserorgchartPage {
  // Define FormBuilder /model properties
  public userInfo = [];
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
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com/";
  constructor(public navCtrl: NavController,
    public http: Http,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController) {

    // Create form builder validation rules
    this.form = fb.group({
      "job_position": ["", Validators.required],
      "company_group": ["", Validators.required],
      "report_to": ["", Validators.required]
    });

    this.userId = localStorage.getItem("userInfoId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcompanygroupPage');
  }

  // Determine whether we adding or editing a record
  // based on any supplied navigation parameters
  ionViewWillEnter() {
    this.resetFields();
    this.getCompanyGroupListData();
    this.getUserListData();
    if (this.NP.get("editID")) {
      console.log(this.NP.get("accountInfo"));
      this.isEdited = true;
      this.selectEntry(this.NP.get("accountInfo"));
      this.pageTitle = 'Edit User';
      this.readOnly = false;
      this.hideActionButton = true;
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'New User';
    }

    if (this.NP.get("accountInfo")) {
      let info = this.NP.get("accountInfo");

      //var objects = JSON.parse(info);
      console.log("JSON.stringify:" + JSON.stringify(info));
      console.log("Length:" + info.length);


      // [{ "photo": "1496409230606.jpg", "first_name": "Kannan", "last_name": "Nagarathinam", "email": "kannanrathvalli@gmail.com", "country": "India", "contact": "9443976954", "createdby": "6", "username": "webkannan", "password": "webkannan", "hashtag": "@India", "role": "Admin" }]
      console.log("info.first_name" + info.first_name);
      console.log("info.first_name array" + info['first_name']);
      console.log("info.first_name array 0" + info[0]['first_name']);
      this.first_name = info[0]['first_name'];
      this.last_name = info[0]['last_name'];
      this.email = info[0]['email'];
      this.country = info[0]['country'];
      this.contact = info[0]['contact'];
      this.photo = info[0]['photo'];
      this.createdby = info[0]['createdby'];
      this.username = info[0]['username'];
      this.password = info[0]['password'];
      this.hashtag = info[0]['hashtag'];
      this.role = info[0]['role'];

    }

    this.job_position = "Software Engineer";

  }



  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    this.companygroup_name = item.companygroup_name;
    this.address = item.address;
    this.country = item.country;
    this.contact = item.contact;
    this.recordID = item.companygroup_id;
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(userdata, userid) {
    let body: string = "key=create&userdata=" +
      JSON.stringify(userdata) +
      "&recordID=" + this.recordID +
      "&first_name=" + this.first_name +
      "&last_name=" + this.last_name +
      "&photo=" + this.photo +
      "&email=" + this.email +
      "&country=" + this.country +
      "&hashtag=" + this.contact +
      "&createdby=" + this.createdby +
      "&username=" + this.username +
      "&password=" + this.password +
      "&role=" + this.role +
      "&hashtag=" + this.hashtag +
      "&hashtag=" + this.hashtag +
      "&report_to=" + this.report_to +
      "&company_group=" + this.company_group +
      "&job_position=" + this.job_position,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/users.php";

    this.http.post(url, body, options)
      .subscribe((data) => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`User created was successfully added`);
          // this.navCtrl.push(UserPage);
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
    //[userdata] => [{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"},{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"},{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"},{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"},{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"},{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"},{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"},{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"},{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"},{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"},{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"},{"job_position":"Software Engineer","company_group":"4","report_to":"1","first_name":"Kannan","last_name":"Nagarathinam","photo":"1496426577824.jpg","email":"kannanrathvalli@gmail.com","country":"India","contact":"9443976954","createdby":"6","username":"webkannan","password":"webkannan","hashtag":"@India","role":"Admin"}]

    let body: string = "key=update&userdata=" +
     JSON.stringify(userdata) +
      "&recordID=" + this.recordID +
      "&first_name=" + this.first_name +
      "&last_name=" + this.last_name +
      "&photo=" + this.photo +
      "&email=" + this.email +
      "&country=" + this.country +
      "&hashtag=" + this.contact +
      "&createdby=" + this.createdby +
      "&username=" + this.username +
      "&password=" + this.password +
      "&role=" + this.role +
      "&hashtag=" + this.hashtag +
      "&hashtag=" + this.hashtag +
      "&report_to=" + this.report_to +
      "&company_group=" + this.company_group +
      "&job_position=" + this.job_position,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/users.php";

    this.http.post(url, body, options)
      .subscribe(data => {
        console.log(data);
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`User created was successfully updated`);
          // this.navCtrl.push(UserPage);
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
      url: any = this.apiServiceURL + "api/users.php";

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
      url: any = this.apiServiceURL + "api/companygroup.php?key=all";
    let res;
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        this.responseResultCompanyGroup = res;
      });

  }

  getUserListData() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/users.php?key=all";
    let res;
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        this.responseResultReportTo = res;
      });

  }



}

