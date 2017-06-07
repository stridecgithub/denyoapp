import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RolePage } from '../role/role';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AddRolePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addrole',
  templateUrl: 'addrole.html',
})
export class AddrolePage {
  // Define FormBuilder /model properties
  public loginas: any;
  public form: FormGroup;
  public role_name: any; 
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
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com/";
  constructor(public navCtrl: NavController,
    public http: Http,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController) {
    this.loginas = localStorage.getItem("userInfoName");
    // Create form builder validation rules
    this.form = fb.group({
      "role_name": ["", Validators.required]    
    });

    this.userId = localStorage.getItem("userInfoId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRolePage');
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
      this.pageTitle = 'Edit role';
      this.readOnly = false;
      this.hideActionButton = true;
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'New role';
    }
  }



  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    this.role_name = item.role_name;  
    this.recordID = item.id;
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(role_name,  createdby) {
    let body: string = "key=create&role_name=" + role_name + "&createdby=" + createdby,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/roles.php";

    this.http.post(url, body, options)
      .subscribe((data) => {
        console.log(JSON.stringify(data.json()));
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          console.log(data.json().Error);
          if (data.json().Error > 0) {
            this.sendNotification(data.json().message);
          } else {
            this.sendNotification(data.json().message);
            this.navCtrl.setRoot(RolePage);
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
  updateEntry(role_name, createdby) {
    let body: string = "key=update&role_name=" + role_name + "&recordID=" + this.recordID + "&createdby=" + createdby,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/roles.php";

    this.http.post(url, body, options)
      .subscribe(data => {
        console.log(data);
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          if (data.json().Error > 0) {
            this.sendNotification(data.json().message);
          } else {
            this.sendNotification(data.json().message);
            this.navCtrl.setRoot(RolePage);
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
    let role_name: string = this.form.controls["role_name"].value,
      body: string = "key=delete&recordID=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/roles.php";

    this.http.post(url, body, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`Congratulations the role: ${role_name} was successfully deleted`);
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
    let role_name: string = this.form.controls["role_name"].value;

    if (this.isEdited) {
      this.updateEntry(role_name, this.userId);
    }
    else {
      this.createEntry(role_name, this.userId);
    }
  }



  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.role_name = "";    
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
      url: any = this.apiServiceURL + "api/countries.php";
    let res;
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        this.responseResultCountry = res;
      });

  }

}

