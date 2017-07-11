import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController,Keyboard } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import { AddunitstwoPage } from '../addunitstwo/addunitstwo';
import { UserPage } from '../user/user';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
/**
 * Generated class for the AddcompanygroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-addunitsone',
  templateUrl: 'addunitsone.html',
  providers: [NativeGeocoder]
})
export class AddunitsonePage {
  // Define FormBuilder /model properties
  public loginas: any;
  public form: FormGroup;
  public location: any;
  public userId: any;
  public lat: any;
  public lang: any;
  public responseResultCountry: any;
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
  showFooter: boolean = true;
  constructor(public keyboard: Keyboard, private nativeGeocoder: NativeGeocoder, public nav: NavController,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController, ) {
    this.loginas = localStorage.getItem("userInfoName");
    // Create form builder validation rules
    this.form = fb.group({
      "location": ["", Validators.required]
    });
    this.userId = localStorage.getItem("userInfoId");
    this.keyboardCheck();
  }

  keyboardCheck() {
    if (this.keyboard.isOpen()) {
      // You logic goes here
      this.showFooter = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddunitsonePage');

  }

  // Determine whether we adding or editing a record
  // based on any supplied navigation parameters
  ionViewWillEnter() {
    this.resetFields();
    console.log(JSON.stringify(this.NP.get("record")));
    if (this.NP.get("record")) {
      console.log("Add User:" + JSON.stringify(this.NP.get("record")));
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Edit Units';
      this.readOnly = false;
      this.hideActionButton = true;
      let editItem = this.NP.get("record");
      this.location = editItem.location;
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'New  Units';
    }
  }



  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    this.location = item.location;
    this.recordID = item.userid;
    this.getGps();
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(location, createdby) {
    this.userInfo.push({
      location: location,
      createdby: createdby,
      latitude: this.lat,
      longitude: this.lang
    });
    this.nav.setRoot(AddunitstwoPage, {
      accountInfo: this.userInfo
    });

  }



  // Update an existing record that has been edited in the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of update followed by the key/value pairs
  // for the record data
  updateEntry(location, createdby) {
    this.userInfo.push({
      location: location,
      createdby: createdby,
      latitude: this.lat,
      longitude: this.lang
    });
    this.nav.setRoot(AddunitstwoPage, {
      accountInfo: this.userInfo,
      record: this.NP.get("record")
    });
  }



  // Handle data submitted from the page's HTML form
  // Determine whether we are adding a new record or amending an
  // existing record
  saveEntry() {
    let location: string = this.form.controls["location"].value;
    console.log(this.form.controls);
    /*if (this.addedImgLists) {
      this.isUploadedProcessing = true;
    }*/
    if (this.isUploadedProcessing == false) {
      if (this.isEdited) {
        this.updateEntry(location, this.userId);
      }
      else {
        this.createEntry(location, this.userId);
      }
    }
  }



  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.location = "";
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
    this.nav.setRoot(UnitsPage);
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

  getGps() {
    let locationSplit = this.location.split(",");
    for (let i = 0; i < locationSplit.length; i++) {
      if (i == 0) {
        console.log(locationSplit[i]);
        this.nativeGeocoder.forwardGeocode(locationSplit[i])
          .then((coordinates: NativeGeocoderForwardResult) => {
            console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)
            this.lat = coordinates.latitude;
            this.lang = coordinates.longitude;
          }
          )
          .catch((error: any) => console.log(error));
      }
    }
  }
}

