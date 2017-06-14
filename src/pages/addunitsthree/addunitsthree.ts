import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import 'rxjs/add/operator/map';
import { UserPage } from '../user/user';
import { AddunitsfourPage } from '../addunitsfour/addunitsfour';
/**
 * Generated class for the AddcompanygroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addunitsthree',
  templateUrl: 'addunitsthree.html',
  providers: [Camera, FileChooser, Transfer, File]
})
export class AddunitsthreePage {
  // Define FormBuilder /model properties
  public loginas: any;
  public form: FormGroup;
  public alarmhashtags: any;
  public contact_name: any;
  public contact_number: any;
  public userId: any;
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
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(public navCtrl: NavController,
    public http: Http,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController, private camera: Camera,
    private filechooser: FileChooser,
    private transfer: Transfer,
    private file: File, private ngZone: NgZone) {
    this.loginas = localStorage.getItem("userInfoName");
    // Create form builder validation rules
    this.form = fb.group({
      //"alarmhashtags": ["", Validators.required],
      //"contact_name": ["", Validators.required],
      "alarmhashtags": ["", Validators.required],
      "contact_name": ["", Validators.required],     
      /// "contact_number": ["", Validators.required]
      'contact_number': ["", Validators.required],
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
      this.pageTitle = 'Edit  Units - 3';
      this.readOnly = false;
      this.hideActionButton = true;
      if (this.NP.get("record").photo) {
        this.addedImgLists = this.apiServiceURL + "/public/staffphotos/" + this.NP.get("record").photo;
        console.log(this.addedImgLists);
      }
      let editItem = this.NP.get("record");
      this.alarmhashtags = editItem.alarmhashtags;
      this.contact_name = editItem.contact_name;
      this.contact_number = editItem.contact_number;
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'New  Units - 3';
    }
    /*this.alarmhashtags = "Kannan";
    this.contact_name = "Nagarathinam";
    this.contact_number = "kannanrathvalli@gmail.com";
    this.country = "238";
    this.contact = "9443976954";*/
  }



  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    this.alarmhashtags = item.alarmhashtags;
    this.contact_name = item.contact_name;
    this.contact_number = item.contact_number;
    this.recordID = item.userid;
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(alarmhashtags, contact_name, contact_number, createdby) {
    this.userInfo.push({
      alarmhashtags: alarmhashtags,
      contact_name: contact_name,
      contact_number: contact_number,
      createdby: createdby,

    });
    this.navCtrl.setRoot(AddunitsfourPage, {
      accountInfo: this.userInfo
    });
    /*
        let body: string = "key=contact_numberexist&contact_number=" + contact_number,
          type: string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers: any = new Headers({ 'Content-Type': type }),
          options: any = new RequestOptions({ headers: headers }),
          url: any = this.apiServiceURL + "api/users.php";
    
        this.http.post(url, body, options)
          .subscribe((data) => {
            console.log(JSON.stringify(data.json()));
            // If the request was successful notify the user
            if (data.status === 200) {
              this.hideForm = true;
              console.log(data.json().Error);
              if (data.json().Error > 0) {
                this.userInfo = []; // need this one
                this.sendNotification(data.json().message);
              } else {
                //this.sendNotification(data.json().message);
                this.navCtrl.setRoot(AddunitstwoPage, {
                  accountInfo: this.userInfo
                });
              }
            }
            // Otherwise let 'em know anyway
            else {
              this.sendNotification('Something went wrong!');
            }
          });
    */

  }



  // Update an existing record that has been edited in the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of update followed by the key/value pairs
  // for the record data
  updateEntry(alarmhashtags, contact_name, contact_number, createdby) {
    this.userInfo.push({

      alarmhashtags: alarmhashtags,
      contact_name: contact_name,
      contact_number: contact_number,

      createdby: createdby,

    });
    this.navCtrl.setRoot(AddunitsfourPage, {
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
    let alarmhashtags: string = this.form.controls["alarmhashtags"].value,
      contact_name: string = this.form.controls["contact_name"].value,
      contact_number: string = this.form.controls["contact_number"].value,
      country: string = this.form.controls["country"].value,
      contact: string = this.form.controls["contact"].value;
    console.log(this.form.controls);
    /*if (this.addedImgLists) {
      this.isUploadedProcessing = true;
    }*/
    if (this.isUploadedProcessing == false) {
      if (this.isEdited) {
        this.updateEntry(alarmhashtags, contact_name, contact_number, this.userId);
      }
      else {
        this.createEntry(alarmhashtags, contact_name, contact_number, this.userId);
      }
    }
  }



  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.alarmhashtags = "";
    this.contact_name = "";
    this.contact_number = "";

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
    this.navCtrl.setRoot(UserPage);
  }
}

