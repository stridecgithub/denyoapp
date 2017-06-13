import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import 'rxjs/add/operator/map';

/**
 * Generated class for the AddunitgroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addunitgroup',
  templateUrl: 'addunitgroup.html',
})
export class AddunitgroupPage {
   public loginas: any;
  public form: FormGroup;
  public cname: any;
  public remark: any;
  public ccode: any;
  public userId: any;
  public responseResultCountry: any;

  // Flag to be used for checking whether we are adding/editing an entry
  public isEdited: boolean = false;
  public readOnly: boolean = false;

  // Flag to hide the form upon successful completion of remote operation
  public hideForm: boolean = false;
  public hideActionButton = true;
  public isUploadedProcessing: boolean = false;
  // Property to help ste the page title
  public pageTitle: string;
  // Property to store the recordID for when an existing entry is being edited
  public recordID: any = null;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";

    constructor(public navCtrl: NavController,
    public http: Http,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController) {
    this.loginas = localStorage.getItem("userInfoName");
    // Create form builder validation rules
    this.form = fb.group({
      "cname": ["", Validators.required],
      "remark": ["", Validators.required]
    });

    this.userId = localStorage.getItem("userInfoId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddunitgroupPage');
  }
   ionViewWillEnter() {
    this.resetFields();
  
    if (this.NP.get("record")) {
      console.log(this.NP.get("act"));
      this.isEdited = true;
      this.readOnly = false;
      this.hideActionButton = true;
    }
    else {
      this.isEdited = false;
      
    }
  }
  saveEntry() {
    let cname: string = this.form.controls["cname"].value,
      remark: string = this.form.controls["remark"].value;
      
if (this.isUploadedProcessing == false) {
    if (this.isEdited) {
    //  this.updateEntry(companygroup_name, address, country, contact, this.userId);
    }
    else {
      this.createEntry(cname, this.ccode, remark, this.userId);
    }
}
  }
  createEntry(cname, ccode, remark, createdby) {
    this.isUploadedProcessing = true;
    let updatedby = createdby;
    let body: string = "is_mobile=1&unitgroup_name=" + cname + "&colorcode=" + ccode + "&remark=" + remark + "&createdby=" + createdby + "&updatedby=" + updatedby,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/unitgroup/store";
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
            this.navCtrl.setRoot(UnitgroupPage);
          }
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }



  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.cname = "";
    this.remark = "";
  
  }
    sendNotification(message): void {
      this.isUploadedProcessing = false;
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }


  getColor(colorCodeValue) {
    console.log(colorCodeValue);
    this.ccode=colorCodeValue;
  }
}
