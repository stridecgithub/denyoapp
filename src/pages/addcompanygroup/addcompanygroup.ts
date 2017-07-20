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
  selector: 'page-addcompanygroup',
  templateUrl: 'addcompanygroup.html',
})
export class AddcompanygroupPage {
  // Define FormBuilder /model properties
  public loginas: any;
  public form: FormGroup;
  public companygroup_name: any;
  public address: any;
  public country: any;
  public contact: any;
  public userId: any;
  public responseResultCountry: any;

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
      "companygroup_name": ["", Validators.required],
      "country": ["", Validators.required],
      "contact": ["", Validators.required],
      "address": [""]
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
    this.getJsonCountryListData();
    if (this.NP.get("record")) {
      console.log(this.NP.get("act"));
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Edit Company Group';
      this.readOnly = false;
      this.hideActionButton = true;
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'New Company Group';
    }
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
  createEntry(companygroup_name, address, country, contact, createdby) {
    let updatedby = createdby;
    let body: string = "is_mobile=1&companygroup_name=" + companygroup_name + "&address=" + address + "&country=" + country + "&contact=" + contact + "&createdby=" + createdby + "&updatedby=" + updatedby,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/companygroup/store";
    this.http.post(url, body, options)
      .subscribe((data) => {
        let res = data.json();
        console.log(JSON.stringify(data.json()));
        // If the request was successful notify the user
        if (data.status === 200) {
          console.log("Msg Results:-" + res.msg[0].Error);
          this.hideForm = true;
          if(res.msg[0].Error == '1')
          {
 this.sendNotification(res.msg[0].result);
          }
          else
          {
          if (res.msg[0].result > 0) {
            this.sendNotification(res.msg[0].result);
          } else {
            this.sendNotification(res.msg[0].result);
            this.nav.setRoot(CompanygroupPage);
          }
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
  updateEntry(companygroup_name, address, country, contact, createdby) {
    let updatedby = createdby;
    let body: string = "is_mobile=1&companygroup_name=" + companygroup_name + "&address=" + address + "&country=" + country + "&contact=" + contact + "&companygroup_id=" + this.recordID + "&createdby=" + createdby + "&updatedby=" + updatedby,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/companygroup/update";
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
    let companygroup_name: string = this.form.controls["companygroup_name"].value,
      //body: string = "key=delete&recordID=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/companygroup/" + this.recordID + "/1/delete";
    console.log(url);
    this.http.get(url, options)
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
    let companygroup_name: string = this.form.controls["companygroup_name"].value,
      address: string = this.form.controls["address"].value,
      country: string = this.form.controls["country"].value,
      contact: string = this.form.controls["contact"].value;


    if (companygroup_name.toLowerCase() == 'denyo' || companygroup_name.toLowerCase() == 'dum' || companygroup_name.toLowerCase() == 'dsg' || companygroup_name.toLowerCase() == 'denyo singapore') {
      this.sendNotification("Given Company Name Not Acceptable....");
    }
    else {

      if (this.isEdited) {
        this.updateEntry(companygroup_name, address, country, contact, this.userId);
      }
      else {
        this.createEntry(companygroup_name, address, country, contact, this.userId);
      }
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
  previous() {
    this.nav.setRoot(CompanygroupPage);
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
