import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CompanygroupPage } from '../companygroup/companygroup';
import 'rxjs/add/operator/map';
import * as $ from 'jquery'
import "slick-carousel";
//import "http://code.jquery.com/jquery-2.1.1.min.js";
//import "http://strtheme.stridecdev.com/bootstrap-suggest.js";
/**
 * Generated class for the AddcompanygroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-atmentioned',
  templateUrl: 'atmentioned.html',
})
export class AtmentionedPage {
  // Define FormBuilder /model properties
  public loginas: any;
  public form: FormGroup;
  public address: any;
  public mentioneditems: string[] = [
    'Amsterdam',
    'Bogota',
    'Tamilnadu',
    'Ramanathapuram',
    'Madurai',
    'Virudhunagar',
    'Kamuthi',
    'Bangalore',
    'Delhi',
    'Calcuatta',
    'Rameshwaram',
    'Rajasthan',
    'India'
  ];
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

  private items: string[];
  constructor(public navCtrl: NavController,
    public http: Http,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController) {
    this.loginas = localStorage.getItem("userInfoName");
    // Create form builder validation rules
    this.form = fb.group({
      "address": ["", Validators.required],
      "address1": [""],
      "address2": [""],
      "address3": [""],
    });

    //this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtmentionedPage');
    //$(".myCarousel").slick();
  }

  // Determine whether we adding or editing a record
  // based on any supplied navigation parameters
  ionViewWillEnter() {
    this.resetFields();
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
      this.pageTitle = '@Mentioned R&D';
    }


    var users = [
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
    ];

    $('#example1').suggest('@', {
      data: users,
      map: function (user) {
        return {
          value: user.username,
          text: '<strong>' + user.username + '</strong> <small>' + user.fullname + '</small>'
        }
      }
    })

    $('#example2').suggest('@', {
      data: users,
      map: function (user) {
        return {
          value: user.username,
          text: '<strong>' + user.username + '</strong> <small>' + user.fullname + '</small>'
        }
      }
    })



    $('#example3').suggest('#', {
      data: users,
      filter: {
        casesensitive: true,
        limit: 10
      },
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
    this.address = item.address;

  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(companygroup_name, address, country) {
    let body: string = "key=create&companygroup_name=" + companygroup_name + "&address=" + address + "&country=" + country,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/companygroup.php";
    console.log(url);
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
            this.navCtrl.setRoot(CompanygroupPage);
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
  updateEntry(companygroup_name, address, country) {
    let body: string = "key=update&companygroup_name=" + companygroup_name + "&address=" + address + "&country=" + country + "&recordID=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/companygroup.php";
    console.log(url);
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
            this.navCtrl.setRoot(CompanygroupPage);
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
    let companygroup_name: string = this.form.controls["companygroup_name"].value,
      body: string = "key=delete&recordID=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/companygroup.php";
    console.log(url);
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
    let address: string = this.form.controls["address"].value,
      address1: string = this.form.controls["address1"].value,
      address2: string = this.form.controls["address2"].value;
    console.log("Address 1" + address);
    console.log("Address 2" + address1);
    console.log("Address 3" + address2);
    this.sendNotification(`Congratulations the company group was successfully deleted`);
  }



  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.address = "";

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

      });

  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'Tamilnadu',
      'Ramanathapuram',
      'Madurai',
      'Virudhunagar',
      'Kamuthi',
      'Bangalore',
      'Delhi',
      'Calcuatta',
      'Rameshwaram',
      'Rajasthan'
    ]
  }

  getSelectedItem(selectItem) {
    console.log(selectItem);
    this.address = selectItem;
    this.items = [];
  }
}

