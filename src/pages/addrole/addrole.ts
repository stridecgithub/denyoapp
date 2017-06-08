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

  public roleperMissionData = [];
  // Flag to be used for checking whether we are adding/editing an entry
  public isEdited: boolean = false;
  public readOnly: boolean = false;
  //public dashboardviewmap: boolean = false;
  public rolepermissionData: any =
  {
    dashboardviewmap: false,
    dashboardcreatemap: false,
    dashboardeditmap: false,
    dashboarddeletemap: false,
    dashboardhidemap: false,
    //Dashboard Units
    dashboardviewunits: false,
    dashboardcreateunits: false,
    dashboardeditunits: false,
    dashboarddeleteunits: false,
    dashboardhideunits: false,
    // Calendar Events
    calviewevents: false,
    calcreateevents: false,
    caleditevents: false,
    caldeleteevents: false,
    // Calendar Services
    calviewservices: false,
    calcreateservices: false,
    caleditservices: false,
    caldeleteservices: false,
    // Calendar Alarm
    calviewalarm: false,
    calcreatealarm: false,
    caleditalarm: false,
    caldeletealarm: false,
    // Units Unit List
    univiewlist: false,
    unicreatelist: false,
    unieditlist: false,
    unideletelist: false,
    // Units Alaram
    univiewalarm: false,
    unicreatealarm: false,
    unieditalarm: false,
    unideletealarm: false,
    // Units Services Info
    univiewservices: false,
    unicreateservices: false,
    unieditservices: false,
    unideleteservices: false,
    // Units Comments
    univiewcomm: false,
    unicreatecomm: false,
    unieditcomm: false,
    unideletecomm: false,
    // Units Unit Group
    univiewgroup: false,
    unicreategroup: false,
    unieditgroup: false,
    unideletegroup: false,
    // Units Generator Model Managment
    univiewgmm: false,
    unicreategmm: false,
    unieditgmm: false,
    unideletegmm: false,

    // Reports
    viewreports: false,
    createreports: false,
    editreports: false,
    deletereports: false,


    // Message Inbox
    msgviewinbox: false,
    msgcreateinbox: false,
    msgeditinbox: false,
    msgdeleteinbox: false,
    // Message Sent
    msgviewsent: false,
    msgcreatesent: false,
    msgeditsent: false,
    msgdeletesent: false,

    // Settings My Account
    setviewmyacc: false,
    setcreatemyacc: false,
    seteditmyacc: false,
    setdeletemyacc: false,
    // Settings User List
    setviewuselst: false,
    setcreateuselst: false,
    setedituselst: false,
    setdeleteuselst: false,
    // Settings User Group
    setviewusegru: false,
    setcreateusegru: false,
    seteditusegru: false,
    setdeleteusegru: false,
    // Settings User Role
    setviewuserle: false,
    setcreateuserle: false,
    setedituserle: false,
    setdeleteuserle: false,
    // Settings Report Template
    setviewtmp: false,
    setcreatetmp: false,
    setedittmp: false,
    setdeletetmp: false,
    // Settings Org Chart
    setvieworg: false,
    setcreateorg: false,
    seteditorg: false,
    setdeleteorg: false

  }
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
      "role_name": ["", Validators.required],
      //Dashboard Map
      "dashboardviewmap": [""],
      "dashboardcreatemap": [""],
      "dashboardeditmap": [""],
      "dashboarddeletemap": [""],
      "dashboardhidemap": [""],
      //Dashboard Units
      "dashboardviewunits": [""],
      "dashboardcreateunits": [""],
      "dashboardeditunits": [""],
      "dashboarddeleteunits": [""],
      "dashboardhideunits": [""],
      // Calendar Events
      "calviewevents": [""],
      "calcreateevents": [""],
      "caleditevents": [""],
      "caldeleteevents": [""],
      // Calendar Services
      "calviewservices": [""],
      "calcreateservices": [""],
      "caleditservices": [""],
      "caldeleteservices": [""],
      // Calendar Alarm
      "calviewalarm": [""],
      "calcreatealarm": [""],
      "caleditalarm": [""],
      "caldeletealarm": [""],
      // Units Unit List
      "univiewlist": [""],
      "unicreatelist": [""],
      "unieditlist": [""],
      "unideletelist": [""],
      // Units Alaram
      "univiewalarm": [""],
      "unicreatealarm": [""],
      "unieditalarm": [""],
      "unideletealarm": [""],
      // Units Services Info
      "univiewservices": [""],
      "unicreateservices": [""],
      "unieditservices": [""],
      "unideleteservices": [""],
      // Units Comments
      "univiewcomm": [""],
      "unicreatecomm": [""],
      "unieditcomm": [""],
      "unideletecomm": [""],
      // Units Unit Group
      "univiewgroup": [""],
      "unicreategroup": [""],
      "unieditgroup": [""],
      "unideletegroup": [""],
      // Units Generator Model Managment
      "univiewgmm": [""],
      "unicreategmm": [""],
      "unieditgmm": [""],
      "unideletegmm": [""],
      // Reports
      "viewreports": [""],
      "createreports": [""],
      "editreports": [""],
      "deletereports": [""],
      // Message Inbox
      "msgviewinbox": [""],
      "msgcreateinbox": [""],
      "msgeditinbox": [""],
      "msgdeleteinbox": [""],
      // Message Sent
      "msgviewsent": [""],
      "msgcreatesent": [""],
      "msgeditsent": [""],
      "msgdeletesent": [""],

      // Settings My Account
      "setviewmyacc": [""],
      "setcreatemyacc": [""],
      "seteditmyacc": [""],
      "setdeletemyacc": [""],
      // Settings User List
      "setviewuselst": [""],
      "setcreateuselst": [""],
      "setedituselst": [""],
      "setdeleteuselst": [""],
      // Settings User Group
      "setviewusegru": [""],
      "setcreateusegru": [""],
      "seteditusegru": [""],
      "setdeleteusegru": [""],
      // Settings User Role
      "setviewuserle": [""],
      "setcreateuserle": [""],
      "setedituserle": [""],
      "setdeleteuserle": [""],
      // Settings Report Template
      "setviewtmp": [""],
      "setcreatetmp": [""],
      "setedittmp": [""],
      "setdeletetmp": [""],
      // Settings Org Chart
      "setvieworg": [""],
      "setcreateorg": [""],
      "seteditorg": [""],
      "setdeleteorg": [""]
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
    if (this.NP.get("record")) {
      console.log(this.NP.get("act"));
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Edit Role';
      this.readOnly = false;
      this.hideActionButton = true;
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Add New Role';
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
  createEntry(role_name, roleperMissionData, createdby) {
    let body: string = "key=create&role_name=" + role_name + "&roleperMissionData=" + JSON.stringify(roleperMissionData) + "&createdby=" + createdby,
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
            this.roleperMissionData = [];
            this.sendNotification(data.json().message);
          } else {
            this.sendNotification(data.json().message);
            // this.navCtrl.setRoot(RolePage);
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
  updateEntry(role_name, roleperMissionData, createdby) {
    let body: string = "key=update&role_name=" + role_name + "&roleperMissionData=" + JSON.stringify(roleperMissionData) + "&recordID=" + this.recordID + "&createdby=" + createdby,
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
    // console.log("Controll Form is:"+JSON.stringify(this.form.controls));
    let role_name: string = this.form.controls["role_name"].value;


    let dashboardviewmap: string = this.form.controls["dashboardviewmap"].value,
      dashboardcreatemap: string = this.form.controls["dashboardcreatemap"].value,
      dashboardeditmap: string = this.form.controls["dashboardeditmap"].value,
      dashboarddeletemap: string = this.form.controls["dashboarddeletemap"].value,
      dashboardhidemap: string = this.form.controls["dashboardhidemap"].value,

      dashboardviewunits: string = this.form.controls["dashboardviewunits"].value,
      dashboardcreateunits: string = this.form.controls["dashboardcreateunits"].value,
      dashboardeditunits: string = this.form.controls["dashboardeditunits"].value,
      dashboarddeleteunits: string = this.form.controls["dashboarddeleteunits"].value,
      dashboardhideunits: string = this.form.controls["dashboardhideunits"].value,

      calviewevents: string = this.form.controls["calviewevents"].value,
      calcreateevents: string = this.form.controls["calcreateevents"].value,
      caleditevents: string = this.form.controls["caleditevents"].value,
      caldeleteevents: string = this.form.controls["caldeleteevents"].value,

      calviewservices: string = this.form.controls["calviewservices"].value,
      calcreateservices: string = this.form.controls["calcreateservices"].value,
      caleditservices: string = this.form.controls["caleditservices"].value,
      caldeleteservices: string = this.form.controls["caldeleteservices"].value,

      calviewalarm: string = this.form.controls["calviewalarm"].value,
      calcreatealarm: string = this.form.controls["calcreatealarm"].value,
      caleditalarm: string = this.form.controls["caleditalarm"].value,
      caldeletealarm: string = this.form.controls["caldeletealarm"].value,
      // Units Unit List      
      univiewlist: string = this.form.controls["univiewlist"].value,
      unicreatelist: string = this.form.controls["unicreatelist"].value,
      unieditlist: string = this.form.controls["unieditlist"].value,
      unideletelist: string = this.form.controls["unideletelist"].value,
      // Units Alaram
      univiewalarm: string = this.form.controls["univiewalarm"].value,
      unicreatealarm: string = this.form.controls["unicreatealarm"].value,
      unieditalarm: string = this.form.controls["unieditalarm"].value,
      unideletealarm: string = this.form.controls["unideletealarm"].value,
      // Units Services Info
      univiewservices: string = this.form.controls["univiewservices"].value,
      unicreateservices: string = this.form.controls["unicreateservices"].value,
      unieditservices: string = this.form.controls["unieditservices"].value,
      unideleteservices: string = this.form.controls["unideleteservices"].value,
      // Units Comments
      univiewcomm: string = this.form.controls["univiewcomm"].value,
      unicreatecomm: string = this.form.controls["unicreatecomm"].value,
      unieditcomm: string = this.form.controls["unieditcomm"].value,
      unideletecomm: string = this.form.controls["unideletecomm"].value,
      // Units Unit Group
      univiewgroup: string = this.form.controls["univiewgroup"].value,
      unicreategroup: string = this.form.controls["unicreategroup"].value,
      unieditgroup: string = this.form.controls["unieditgroup"].value,
      unideletegroup: string = this.form.controls["unideletegroup"].value,
      // Units Generator Model Managment
      univiewgmm: string = this.form.controls["univiewgmm"].value,
      unicreategmm: string = this.form.controls["unicreategmm"].value,
      unieditgmm: string = this.form.controls["unieditgmm"].value,
      unideletegmm: string = this.form.controls["unideletegmm"].value,

      // Units Generator Model Managment
      viewreports: string = this.form.controls["viewreports"].value,
      createreports: string = this.form.controls["createreports"].value,
      editreports: string = this.form.controls["editreports"].value,
      deletereports: string = this.form.controls["deletereports"].value,

      // Message Inbox
      msgviewinbox: string = this.form.controls["msgviewinbox"].value,
      msgcreateinbox: string = this.form.controls["msgcreateinbox"].value,
      msgeditinbox: string = this.form.controls["msgeditinbox"].value,
      msgdeleteinbox: string = this.form.controls["msgdeleteinbox"].value,
      // Message Sent
      msgviewsent: string = this.form.controls["msgviewsent"].value,
      msgcreatesent: string = this.form.controls["msgcreatesent"].value,
      msgeditsent: string = this.form.controls["msgeditsent"].value,
      msgdeletesent: string = this.form.controls["msgdeletesent"].value,


      // Settings My Account
      setviewmyacc: string = this.form.controls["setviewmyacc"].value,
      setcreatemyacc: string = this.form.controls["setcreatemyacc"].value,
      seteditmyacc: string = this.form.controls["seteditmyacc"].value,
      setdeletemyacc: string = this.form.controls["setdeletemyacc"].value,
      // Settings User List
      setviewuselst: string = this.form.controls["setviewuselst"].value,
      setcreateuselst: string = this.form.controls["setcreateuselst"].value,
      setedituselst: string = this.form.controls["setedituselst"].value,
      setdeleteuselst: string = this.form.controls["setdeleteuselst"].value,
      // Settings User Group
      setviewusegru: string = this.form.controls["setviewusegru"].value,
      setcreateusegru: string = this.form.controls["setcreateusegru"].value,
      seteditusegru: string = this.form.controls["seteditusegru"].value,
      setdeleteusegru: string = this.form.controls["setdeleteusegru"].value,
      // Settings User Role
      setviewuserle: string = this.form.controls["setviewuserle"].value,
      setcreateuserle: string = this.form.controls["setcreateuserle"].value,
      setedituserle: string = this.form.controls["setedituserle"].value,
      setdeleteuserle: string = this.form.controls["setdeleteuserle"].value,
      // Settings Report Template
      setviewtmp: string = this.form.controls["setviewtmp"].value,
      setcreatetmp: string = this.form.controls["setcreatetmp"].value,
      setedittmp: string = this.form.controls["setedittmp"].value,
      setdeletetmp: string = this.form.controls["setdeletetmp"].value,
      // Settings Org Chart
      setvieworg: string = this.form.controls["setvieworg"].value,
      setcreateorg: string = this.form.controls["setcreateorg"].value,
      seteditorg: string = this.form.controls["seteditorg"].value,
      setdeleteorg: string = this.form.controls["setdeleteorg"].value
      ;
    this.roleperMissionData.push({
      "Dashboard": {
        "dashboardviewmap": dashboardviewmap,
        "dashboardcreatemap": dashboardcreatemap,
        "dashboardeditmap": dashboardeditmap,
        "dashboarddeletemap": dashboarddeletemap,
        "dashboardhidemap": dashboardhidemap,
        "dashboardviewunits": dashboardviewunits,
        "dashboardcreateunits": dashboardcreateunits,
        "dashboardeditunits": dashboardeditunits,
        "dashboarddeleteunits": dashboarddeleteunits,
        "dashboardhideunits": dashboardhideunits
      },
      "Calendar": {
        // Calendar Events
        "calviewevents": calviewevents,
        "calcreateevents": calcreateevents,
        "caleditevents": caleditevents,
        "caldeleteevents": caldeleteevents,
        // Calendar Services
        "calviewservices": calviewservices,
        "calcreateservices": calcreateservices,
        "caleditservices": caleditservices,
        "caldeleteservices": caldeleteservices,
        // Calendar Alarm
        "calviewalarm": calviewalarm,
        "calcreatealarm": calcreatealarm,
        "caleditalarm": caleditalarm,
        "caldeletealarm": caldeletealarm,
      },
      "Units": {
        // Units Unit List
        "univiewlist": univiewlist,
        "unicreatelist": unicreatelist,
        "unieditlist": unieditlist,
        "unideletelist": unideletelist,
        // Units Alaram
        "univiewalarm": univiewalarm,
        "unicreatealarm": unicreatealarm,
        "unieditalarm": unieditalarm,
        "unideletealarm": unideletealarm,
        // Units Services Info
        "univiewservices": univiewservices,
        "unicreateservices": unicreateservices,
        "unieditservices": unieditservices,
        "unideleteservices": unideleteservices,
        // Units Comments
        "univiewcomm": univiewcomm,
        "unicreatecomm": unicreatecomm,
        "unieditcomm": unieditcomm,
        "unideletecomm": unideletecomm,
        // Units Unit Group
        "univiewgroup": univiewgroup,
        "unicreategroup": unicreategroup,
        "unieditgroup": unieditgroup,
        "unideletegroup": unideletegroup,
        // Units Generator Model Managment
        "univiewgmm": univiewgmm,
        "unicreategmm": unicreategmm,
        "unieditgmm": unieditgmm,
        "unideletegmm": unideletegmm,
      },
      "Reports": {
        "viewreports": viewreports,
        "createreports": createreports,
        "editreports": editreports,
        "deletereports": deletereports
      },
      "Message": {
        // Message Inbox
        "msgviewinbox": msgviewinbox,
        "msgcreateinbox": msgcreateinbox,
        "msgeditinbox": msgeditinbox,
        "msgdeleteinbox": msgdeleteinbox,
        // Message Sent
        "msgviewsent": msgviewsent,
        "msgcreatesent": msgcreatesent,
        "msgeditsent": msgeditsent,
        "msgdeletesent": msgdeletesent
      },
      "Settings": {
        // Settings My Account
        "setviewmyacc": setviewmyacc,
        "setcreatemyacc": setcreatemyacc,
        "seteditmyacc": seteditmyacc,
        "setdeletemyacc": setdeletemyacc,
        // Settings User List
        "setviewuselst": setviewuselst,
        "setcreateuselst": setcreateuselst,
        "setedituselst": setedituselst,
        "setdeleteuselst": setdeleteuselst,
        // Settings User Group
        "setviewusegru": setviewusegru,
        "setcreateusegru": setcreateusegru,
        "seteditusegru": seteditusegru,
        "setdeleteusegru": setdeleteusegru,
        // Settings User Role
        "setviewuserle": setviewuserle,
        "setcreateuserle": setcreateuserle,
        "setedituserle": setedituserle,
        "setdeleteuserle": setdeleteuserle,
        // Settings Report Template
        "setviewtmp": setviewtmp,
        "setcreatetmp": setcreatetmp,
        "setedittmp": setedittmp,
        "setdeletetmp": setdeletetmp,
        // Settings Org Chart
        "setvieworg": setvieworg,
        "setcreateorg": setcreateorg,
        "seteditorg": seteditorg,
        "setdeleteorg": setdeleteorg
      }
    });



    console.log("1" + this.roleperMissionData);
    console.log("2" + JSON.stringify(this.roleperMissionData));
    if (this.isEdited) {
      this.updateEntry(role_name, this.roleperMissionData, this.userId);
    }
    else {
      this.createEntry(role_name, this.roleperMissionData, this.userId);
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


}

