import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Http, Headers, RequestOptions } from '@angular/http';
//import { AddunitgroupPage } from '../addunitgroup/addunitgroup';
import { ReporttemplatePage } from '../reporttemplate/reporttemplate';
///import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the AddreporttemplatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Io//nic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addreporttemplate',
  templateUrl: 'addreporttemplate.html',
})
export class AddreporttemplatePage {
  public items = [];
  public template_data = [];
  public getCheckboxData = [];
  public loginas: any;
  public userId: any;
  public templatename: any;
  public templatedata: any;
  public form: FormGroup;
  public selectoption: any;
  public availableheading = [];
  public availableheadingitem = [];
  pageTitle: string;
  public isEdited: boolean = false;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(public nav: NavController,
    public http: Http,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController) {
    this.loginas = localStorage.getItem("userInfoName");
    // Create form builder validation rules
    this.form = fb.group({
      "templatename": ["", Validators.required]
    });

    this.userId = localStorage.getItem("userInfoId");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddreporttemplatePage');
  }
  ionViewWillEnter() {
    if (this.NP.get("record")) {
      this.pageTitle = "Edit Template";
      console.log(this.NP.get("act"));
      this.isEdited = true;
      //this.selectoption=true;

      this.selectEntry(this.NP.get("record"));
      // this.pageTitle = 'Edit Company Group';
      //this.readOnly = false;
      //this.hideActionButton = true;
    }
    else {
      this.pageTitle = "Add Template";
      this.isEdited = false;
      /*let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type }),
        options: any = new RequestOptions({ headers: headers }),
        url: any = this.apiServiceURL + "/getavailableheading";
      let res;
      console.log(url);
      this.http.get(url, options)
        .subscribe((data) => {
          res = data.json();

          console.log(JSON.stringify(res));
          console.log("2" + res.comm_datas);
          for (let comm_data in res.comm_datas) {
            this.template_data = res.comm_datas[comm_data].dates.split(",");
            for (var i = 0; i < this.template_data.length; i++) {
              this.items.push({ id: i, name: this.template_data[i] });

            }
          }
        });
        */
      //  this.selectoption=true;
    }

    if (this.NP.get("availableheading")) {
      let getavailableheading = this.NP.get("availableheading");
     
        this.availableheading = getavailableheading.split(",");
        console.log("Length" + this.availableheading.length);
        let checkvalue = false;
        for (let i = 0; i < this.availableheading.length; i++) {
          if (this.NP.get("record")) {
            let a = this.NP.get("record").availableheading.indexOf(this.availableheading[i]);
            if (a > 0) {
              checkvalue = true;
              console.log(this.availableheading[i] + ":" + checkvalue);
            } else {
              checkvalue = false;
              console.log(this.availableheading[i] + ":" + checkvalue);
            }
          }
          this.availableheadingitem.push(
            {
              val: this.availableheading[i],
              check: checkvalue
            }
          )
        }
      
    }
  }



  getCheckBoxValue(name) {
    console.log(name);
    this.getCheckboxData.push({
      availabledata: name

    })
    console.log(JSON.stringify(this.getCheckboxData));
  }
  saveEntry() {
    if (this.isEdited) {

      this.updateEntry();
    }
    else {
      this.createEntry();
    }


  }
  updateEntry() {
    console.log("Edit");

  }
  selectEntry(item) {

    this.templatename = item.templatename;
    console.log("Available Heading:" + JSON.stringify(item.availableheading));
    /* this.templatedata1 =item.availableheading.split("#");
     console.log(this.templatedata1[0]);
     console.log(this.template_data[0]);
     for(var i = 0 ;i<this.template_data.length;i++)
     {
      // console.log(this.template_data[i]);
       if(this.template_data[i]==this.templatedata1[i])
       {
             this.selectoption = true;
             console.log("true");
       }
       else
       {
         this.selectoption = false;
         console.log("false");
       }
  
     }*/
  }
  createEntry() {

    console.log(JSON.stringify(this.getCheckboxData));
    let templatename: string = this.form.controls["templatename"].value
    let body: string = "is_mobile=1&templatename=" + templatename + "&availabledata=" + JSON.stringify(this.getCheckboxData),
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/reporttemplate/store";
    console.log(url);
    console.log(body);
    this.http.post(url, body, options)
      .subscribe((data) => {
        let res = data.json();
        console.log(JSON.stringify(data.json()));
        // If the request was successful notify the user
        if (data.status === 200) {
          console.log("Msg Results:-" + res.msg[0].result);
          // this.hideForm = true;
          if (res.msg[0].result > 0) {
            this.sendNotification(res.msg[0].result);
            this.nav.setRoot(ReporttemplatePage);
          } else {
            this.sendNotification(res.msg[0].result);
            this.nav.setRoot(ReporttemplatePage);
          }
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }
  sendNotification(message): void {
    // this.isUploadedProcessing = false;
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
  previous() {
    this.nav.setRoot(ReporttemplatePage);
  }
}
