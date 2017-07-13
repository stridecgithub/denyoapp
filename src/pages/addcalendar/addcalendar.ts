import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CompanygroupPage } from '../companygroup/companygroup';
import 'rxjs/add/operator/map';
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
  selector: 'page-addcalendar',
  templateUrl: 'addcalendar.html',
})
export class AddcalendarPage {
  // Define FormBuilder /model properties
  public loginas: any;
  public form: FormGroup;
  public type_name: any;
  public event_project: any;
  public event_subject: any;
  public event_location: any;
  public gethashtag: any;
  public event_unitid: any;
  public companyId:any;
  public event_date: any;
  public event_title: any;
  public service_remark: any;
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
      "event_location": ["", Validators.required],
      "event_subject": ["", Validators.required],
      "event_unitid": [""],
      "event_title": ["", Validators.required],
      "event_project": [""],
      "event_date": [""],
      "event_type": [""],
      "event_notes": ["", Validators.required],
      "event_time": [""]
    });
    this.disunit = false;
    this.userId = localStorage.getItem("userInfoId");
    this.companyId = localStorage.getItem("userInfoCompanyId");
    this.responseResultType.push({
      id: '1',
      type_name: 'Service',
    }, {
        id: '2',
        type_name: 'Event'
      });


    /*for (let am = 600; am <= 1145; am++) {
      let am15plus=am+15;
      this.responseResultTime.push({
        id: am15plus+'AM',
        time_name: am15plus+' AM',
      });
    }*/
    this.responseResultTime.push({
      id: '6.00AM',
      time_name: '6:00 AM',
    }, {
        id: '6.15AM',
        time_name: '6:15 am'
      }, {
        id: '6.30AM',
        time_name: '6:30 AM'
      }, {
        id: '6.45AM',
        time_name: '6:45 AM'
      }, {
        id: '7.00AM',
        time_name: '7:00 AM'
      }, {
        id: '7.15AM',
        time_name: '7:15 AM'
      }, {
        id: '7.30AM',
        time_name: '7:30 AM'
      }, {
        id: '7.45AM',
        time_name: '7:45 AM'
      }, {
        id: '8.00AM',
        time_name: '8:00 AM'
      }, {
        id: '8.15AM',
        time_name: '8:15 AM'
      }, {
        id: '8.30AM',
        time_name: '8:30 AM'
      }, {
        id: '8.45AM',
        time_name: '8:45 AM'
      }, {
        id: '9.00AM',
        time_name: '9:00 AM'
      }, {
        id: '9.15AM',
        time_name: '9:15 AM'
      }, {
        id: '9.30AM',
        time_name: '9:30 AM'
      }, {
        id: '9.45AM',
        time_name: '9:45 AM'
      }, {
        id: '10.00AM',
        time_name: '10:00 AM'
      }, {
        id: '10.15AM',
        time_name: '10:15 AM'
      }, {
        id: '10.30AM',
        time_name: '10:30 AM'
      }, {
        id: '10.45AM',
        time_name: '10:45 AM'
      }, {
        id: '11.00AM',
        time_name: '11:00 AM'
      }, {
        id: '11.15AM',
        time_name: '11:15 AM'
      }, {
        id: '11.30AM',
        time_name: '11:30 AM'
      }, {
        id: '11.45AM',
        time_name: '11:45 AM'
      }, {
        id: '11.00PM',
        time_name: '11:00 PM'
      }, {
        id: '11.15PM',
        time_name: '11:15 PM'
      }, {
        id: '11.30PM',
        time_name: '11:30 PM'
      }, {
        id: '11.45PM',
        time_name: '11:45 PM'
      }, {
        id: '11.45PM',
        time_name: '11:45 PM'
      }, {
        id: '12.00PM',
        time_name: '12:00 PM'
      }, {
        id: '12.15PM',
        time_name: '12:15 PM'
      }, {
        id: '12.30PM',
        time_name: '12:30 PM'
      }, {
        id: '12.45PM',
        time_name: '12:45 PM'
      }, {
        id: '12.45PM',
        time_name: '12:45 PM'
      });
    let dateStr = new Date();
    let month = dateStr.getMonth() + 1;
    this.event_date = dateStr.getFullYear() + "-" + month + "-" + dateStr.getDate();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad  AddcalendarPage');
  }

  address1get(hashtag) {
    console.log(hashtag);
    this.gethashtag = hashtag;
  }
  getType(type) {
    console.log(type);
    if (type == "Service") {
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
    this.event_project = item.event_project;
    this.event_subject = item.event_subject;
    this.event_unitid = item.event_unitid;
    this.recordID = item.id;
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(event_title, type_name, event_project, event_subject, event_unitid, event_time, event_location, service_remark, createdby) {
    //let updatedby = createdby;
    let body: string = "is_mobile=1&event_type="
      + type_name + "&event_title=" + event_title + "&event_subject=" + event_subject + "&event_date=" + this.event_date + "&event_time=" + event_time + "&service_unitid=" + event_unitid + "&event_location=" + event_location + "&service_remark=" + service_remark + "&event_added_by=" + createdby,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/storeevent";
    console.log(url + "?" + body);
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
            this.nav.setRoot(CalendarPage);
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

  //http://denyoappv2.stridecdev.com/calendar/update?is_mobile=1&event_type=Event&event_title=sfd&event_location=london&event_date=2017-07-07&event_time=6:00 AM&ses_login_id=2&event_remark=@vignesh&id=1

  updateEntry(event_title, type_name, event_project, event_subject, event_unitid, event_time, event_location, service_remark, createdby) {
    let body: string = "is_mobile=1&event_type="
      + type_name + "&event_title=" + event_title + "&event_subject=" + event_subject + "&event_date=" + this.event_date + "&event_time=" + event_time + "&event_location=" + event_location + "&event_remark=" + service_remark + "&ses_login_id=" + createdby + "&id=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/calendar/update";
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
    let type_name: string = this.form.controls["event_type"].value,
      event_project: string = this.form.controls["event_project"].value,
      event_subject: string = this.form.controls["event_subject"].value,
      event_unitid: string = this.form.controls["event_unitid"].value,
      event_title: string = this.form.controls["event_title"].value,
      event_time: string = this.form.controls["event_time"].value,
      event_location: string = this.form.controls["event_location"].value,
      service_remark: string = this.form.controls["event_notes"].value;

    if (this.isEdited) {
      this.updateEntry(event_title, type_name, event_project, event_subject, event_unitid, event_time, event_location, service_remark, this.userId);
    }
    else {
      this.createEntry(event_title, type_name, event_project, event_subject, event_unitid, event_time, event_location, service_remark, this.userId);
    }
  }



  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.type_name = "";
    this.event_project = "";
    this.event_subject = "";
    this.event_unitid = "";
  }

  getCompanyListData() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/units?is_mobile=1&startindex=0&results=30&sort=unit_id&dir=asc&company_id=" + this.companyId;
    let res;
    console.log("URL" + url);
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        console.log(JSON.stringify(res));
        this.responseResultCompany = res.units;
      });

  }

  getProjectLocation(unitid) {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/" + unitid + "/1/getunitdata";
    let res;
    console.log("URL" + url);
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        console.log(JSON.stringify(res));
        console.log("Project Name:" + res.unitdata[0].projectname);
        console.log("Project Location:" + res.unitdata[0].location);
        this.event_project = res.unitdata[0].projectname;
        this.event_location = res.unitdata[0].location;
        //this.responseResultCompany = res.companies;
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
  notification() {
    this.nav.setRoot(NotificationPage);
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

