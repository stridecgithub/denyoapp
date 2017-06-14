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
import { AddunitsthreePage } from '../addunitsthree/addunitsthree';
/**
 * Generated class for the AddcompanygroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addunitstwo',
  templateUrl: 'addunitstwo.html',
  providers: [Camera, FileChooser, Transfer, File]
})
export class AddunitstwoPage {
  // Define FormBuilder /model properties
  public loginas: any;
  public form: FormGroup;
  public unitname: any;
  public projectname: any;
  public controllerid: any;
  public photo: any;
  public models_id: any;
  public neaplateno: any;
  public userId: any;
  public responseResultModel: any;
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
      //"unitname": ["", Validators.required],
      //"projectname": ["", Validators.required],
      "unitname": ["", Validators.compose([Validators.maxLength(30), Validators.required])],
      "projectname": ["", Validators.compose([Validators.maxLength(30), Validators.required])],
      "models_id": ["", Validators.required],
      "neaplateno": ["", Validators.required],
      /// "controllerid": ["", Validators.required]
      'controllerid': ['', Validators.required],
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
    this.getJsonModelListData();
    console.log(JSON.stringify(this.NP.get("record")));
    if (this.NP.get("record")) {
      console.log("Add User:" + JSON.stringify(this.NP.get("record")));
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Edit  Units - 2';
      this.readOnly = false;
      this.hideActionButton = true;
      if (this.NP.get("record").photo) {
        this.addedImgLists = this.apiServiceURL + "/public/staffphotos/" + this.NP.get("record").photo;
        console.log(this.addedImgLists);
      }
      let editItem = this.NP.get("record");
      this.unitname = editItem.firstname;
      this.projectname = editItem.lastname;
      this.controllerid = editItem.controllerid;
      this.models_id = editItem.models_id_id;
      this.neaplateno = editItem.neaplateno_number;
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'New  Units - 2';
    }
    /*this.unitname = "Kannan";
    this.projectname = "Nagarathinam";
    this.controllerid = "kannanrathvalli@gmail.com";
    this.models_id = "238";
    this.neaplateno = "9443976954";*/
  }



  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    this.unitname = item.unitname;
    this.projectname = item.projectname;
    this.controllerid = item.controllerid;
    this.models_id = item.models_id;
    this.neaplateno = item.neaplateno;
    this.photo = item.photo;
    this.recordID = item.userid;
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(unitname, projectname, controllerid, models_id, neaplateno, createdby) {
    this.userInfo.push({
      photo: this.photo,
      unitname: unitname,
      projectname: projectname,
      controllerid: controllerid,
      models_id: models_id,
      neaplateno: neaplateno,
      createdby: createdby,

    });


    let body: string = "controllerid=" + controllerid + "&unit_id=0",
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/checkcontrollerid";

    this.http.post(url, body, options)
      .subscribe((data) => {
        console.log(JSON.stringify(data.json()));
        // If the request was successful notify the user
        if (data.status === 200) {
          console.log("create" + data.json().msg[0].Error);
          if (data.json().msg[0].Error > 0) {
            //this.userInfo=[];
            this.sendNotification(data.json().msg[0].result);
          } else {
            //this.sendNotification(data.json().message);
            this.navCtrl.setRoot(AddunitsthreePage, {
              accountInfo: this.userInfo
            });
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
  updateEntry(unitname, projectname, controllerid, models_id, neaplateno, createdby) {
    this.userInfo.push({
      photo: this.photo,
      unitname: unitname,
      projectname: projectname,
      controllerid: controllerid,
      models_id: models_id,
      neaplateno: neaplateno,
      createdby: createdby,

    });

    let body: string = "controllerid=" + controllerid + "&id=" + this.NP.get("record").unit_id,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/checkcontrollerid";
    this.http.post(url, body, options)
      .subscribe((data) => {
        console.log(JSON.stringify(data.json()));
        // If the request was successful notify the user
        if (data.status === 200) {
          console.log("update" + data.json().msg[0].Error);
          if (data.json().msg[0].Error > 0) {
            //this.userInfo=[];
            this.sendNotification(data.json().msg[0].result);
          } else {
            //this.sendNotification(data.json().message);
            this.navCtrl.setRoot(AddunitsthreePage, {
              accountInfo: this.userInfo,
              record: this.NP.get("record")
            });
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
    let unitname: string = this.form.controls["unitname"].value,
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
          this.sendNotification(`Congratulations the company group: ${unitname} was successfully deleted`);
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
    let unitname: string = this.form.controls["unitname"].value,
      projectname: string = this.form.controls["projectname"].value,
      controllerid: string = this.form.controls["controllerid"].value,
      models_id: string = this.form.controls["models_id"].value,
      neaplateno: string = this.form.controls["neaplateno"].value;
    console.log(this.form.controls);
    /*if (this.addedImgLists) {
      this.isUploadedProcessing = true;
    }*/
    if (this.isUploadedProcessing == false) {
      if (this.isEdited) {
        this.updateEntry(unitname, projectname, controllerid, models_id, neaplateno, this.userId);
      }
      else {
        this.createEntry(unitname, projectname, controllerid, models_id, neaplateno, this.userId);
      }
    }
  }



  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.unitname = "";
    this.projectname = "";
    this.controllerid = "";
    this.models_id = "";
    this.neaplateno = "";
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

  getJsonModelListData() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/getmodels";
    let res;
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        this.responseResultModel = res.countries;
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

