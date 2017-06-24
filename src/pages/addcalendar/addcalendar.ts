import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CompanygroupPage } from '../companygroup/companygroup';
import 'rxjs/add/operator/map';
import { UserPage } from '../user/user';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { CalendarPage } from '../calendar/calendar';
/**
 * Generated class for the AddcompanygroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addcalendar',
  templateUrl: 'addcalendar.html',
})
export class AddcalendarPage {
  // Define FormBuilder /model properties
  public loginas: any;
  public form: FormGroup;
  public type_name: any;
  public service_project: any;
  public event_subject: any;
  public service_unitid: any;
  public event_date: any;
  public userId: any;
  public responseResultType = [];
  public responseResultTime = [];
  public responseResultCompany: any;
  public unitfield: any;
  disunit: any;


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
  constructor(public nav: NavController,
    public http: Http,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController) {
    this.loginas = localStorage.getItem("userInfoName");
    // Create form builder validation rules
    this.form = fb.group({
      "service_location": ["", Validators.required],
      "event_subject": ["", Validators.required],
      "service_unitid": ["", Validators.required],
      "service_project": [""],
      "event_date": [""],
      "event_type": [""],
      "event_notes": [""],
      "serviced_datetime": [""]
    });
    this.disunit = false;
    this.userId = localStorage.getItem("userInfoId");
    this.responseResultType.push({
      id: '1',
      type_name: 'Service',
    }, {
        id: '2',
        type_name: 'Event'
      });

    this.responseResultTime.push({
      id: '6:00 am',
      time_name: '6:00 am',
    }, {
        id: '6:15 am',
        time_name: '6:15 am'
      }), {
        id: '6:30 am',
        time_name: '6:30 am'
      };
    let dateStr = new Date();
    this.event_date = dateStr.getFullYear() + "-" + dateStr.getMonth() + "-" + dateStr.getDate();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad  AddcalendarPage');
  }
  getType(type) {
    console.log(type);
    if (type == 1) {
      this.unitfield = true;
      this.disunit = true;
    } else {
      this.unitfield = false;
    }
  }
  // Determine whether we adding or editing a record
  // based on any supplied navigation parameters
  ionViewWillEnter() {
    this.getCompanyListData();
    this.resetFields();
    if (this.NP.get("record")) {
      console.log(this.NP.get("act"));
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Edit Calendar';
      this.readOnly = false;
      this.hideActionButton = true;
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Add Calendar';
    }
  }



  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    this.type_name = item.type_name;
    this.service_project = item.service_project;
    this.event_subject = item.event_subject;
    this.service_unitid = item.service_unitid;
    this.recordID = item.companygroup_id;
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(type_name, service_project, event_subject, service_unitid, createdby) {
    let updatedby = createdby;
    let body: string = "is_mobile=1&type_name=" + type_name + "&service_project=" + service_project + "&event_subject=" + event_subject + "&service_unitid=" + service_unitid + "&createdby=" + createdby + "&updatedby=" + updatedby,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/services/store";
    this.http.post(url, body, options)
      .subscribe((data) => {
        let res = data.json();
        console.log(JSON.stringify(data.json()));
        // If the request was successful notify the user
        if (data.status === 200) {
          console.log("Msg Results:-" + res.msg[0].result);
          this.hideForm = true;
          if (res.msg[0].result > 0) {
            this.sendNotification(res.msg[0].result);
          } else {
            this.sendNotification(res.msg[0].result);
            this.nav.setRoot(CompanygroupPage);
          }
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
  updateEntry(type_name, service_project, event_subject, service_unitid, createdby) {
    let updatedby = createdby;
    let body: string = "is_mobile=1&type_name=" + type_name + "&service_project=" + service_project + "&event_subject=" + event_subject + "&service_unitid=" + service_unitid + "&companygroup_id=" + this.recordID + "&createdby=" + createdby + "&updatedby=" + updatedby,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/services/update";
    console.log(url);
    this.http.post(url, body, options)
      .subscribe(data => {
        let res = data.json();
        console.log(data.json());
        // If the request was successful notify the user
        if (data.status === 200) {
          console.log("Msg Results:-" + res.msg[0].result);
          this.hideForm = true;
          if (res.msg[0].result > 0) {
            this.sendNotification(res.msg[0].result);
          } else {
            this.sendNotification(res.msg[0].result);
            this.nav.setRoot(CompanygroupPage);
          }
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

    //http://denyoappv2.stridecdev.com/companygroup/8/1/delete
    let type_name: string = this.form.controls["type_name"].value,
      //body: string = "key=delete&recordID=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/services/" + this.recordID + "/1/delete";
    console.log(url);
    this.http.get(url, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`Congratulations the company group: ${type_name} was successfully deleted`);
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
    let type_name: string = this.form.controls["type_name"].value,
      service_project: string = this.form.controls["service_project"].value,
      event_subject: string = this.form.controls["event_subject"].value,
      service_unitid: string = this.form.controls["service_unitid"].value;

    if (this.isEdited) {
      this.updateEntry(type_name, service_project, event_subject, service_unitid, this.userId);
    }
    else {
      this.createEntry(type_name, service_project, event_subject, service_unitid, this.userId);
    }
  }



  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.type_name = "";
    this.service_project = "";
    this.event_subject = "";
    this.service_unitid = "";
  }

  getCompanyListData() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/getcompanies";
    let res;
    console.log("URL" + url);
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        console.log(JSON.stringify(res));
        this.responseResultCompany = res.companies;
      });

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


  previous() {
    this.nav.setRoot(CalendarPage);
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

