import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DashboardPage } from '../dashboard/dashboard';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Device]
})
export class HomePage {
  public form: FormGroup;
  public userId: any;
  public passWrd: any;
  public userInf: any;
  header_data: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(public navCtrl: NavController, public fb: FormBuilder, public device: Device, private http: Http, public toastCtrl: ToastController) {
    this.form = fb.group({
      "userid": ["", Validators.required],
      "password": ["", Validators.required]
    });
    this.header_data = { ismenu: true, ishome: false, title: "Home" };
    this.userInf = localStorage.getItem("userInfoId");
    console.log("UserId Localtorage" + this.userInf);
    if (this.userInf != 'null' && this.userInf != null && this.userInf != '') {
      this.navCtrl.setRoot(DashboardPage);
    }
  }
  login() {
    let userid: string = this.form.controls["userid"].value,
      password: string = this.form.controls["password"].value;
    this.loginEntry(userid, password);
  }

  loginEntry(username, password) {
    let device_token = localStorage.getItem("deviceTokenForPushNotification");
    let res;
    let body: string = "username=" + username +
      "&password=" + password +
      "&device_token=" + device_token +
      "&isapp=1",
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/checklogin";
    console.log(url + '?' + body);
    this.http.post(url, body, options)
      .subscribe(data => {
        res = data.json();
        if (res.msg[0]['Error'] > 0) {
          this.sendNotification(res.msg[0]['result']);
          return false;
        } else {
          res = data.json();
          console.log("Logged in Response:" + JSON.stringify(res));
          localStorage.setItem("userInfo", res['staffdetails'][0]);
          localStorage.setItem("userInfoId", res['staffdetails'][0].staff_id);
          localStorage.setItem("userInfoName", res['staffdetails'][0].firstname);
          localStorage.setItem("userInfoEmail", res['staffdetails'][0].email);
          localStorage.setItem("userInfoCompanyId", res['staffdetails'][0].company_id);
          localStorage.setItem("userInfoRoleId", res['staffdetails'][0].role_id);
          console.log("Role Permssion Array:" + JSON.stringify(res['roledata']));
          localStorage.setItem("RolePermissionData", JSON.stringify(res['roledata']));
          let roleData = localStorage.getItem("RolePermissionData");
          let roleparseData = JSON.parse(roleData);
          for (let rle = 0; rle < roleparseData.length; rle++) {
            // 8 - Child Module Map
            // 1 - Parent Module Dashboard
            if (roleparseData[rle]['page_name'] == '8' && roleparseData[rle]['module_name'] == '1') {
              localStorage.setItem("DASHBOARD_MAP_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("DASHBOARD_MAP_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("DASHBOARD_MAP_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("DASHBOARD_MAP_DELETE", roleparseData[rle]['delete_action']);
              localStorage.setItem("DASHBOARD_MAP_HIDE", roleparseData[rle]['hide_action']);
            }

            // 12 - Child Module Unit
            // 1 - Parent Module Dashboard
            if (roleparseData[rle]['page_name'] == '12' && roleparseData[rle]['module_name'] == '1') {
              localStorage.setItem("DASHBOARD_UNITS_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("DASHBOARD_UNITS_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("DASHBOARD_UNITS_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("DASHBOARD_UNITS_DELETE", roleparseData[rle]['delete_action']);
              localStorage.setItem("DASHBOARD_UNITS_HIDE", roleparseData[rle]['hide_action']);
            }

            // 1 - Child Module My Account
            // 6 - Parent Module Settings
            if (roleparseData[rle]['page_name'] == '1' && roleparseData[rle]['module_name'] == '6') {
              localStorage.setItem("SETTINGS_MYACCOUN_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("SETTINGS_MYACCOUNT_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("SETTINGS_MYACCOUNT_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("SETTINGS_MYACCOUNT_DELETE", roleparseData[rle]['delete_action']);
            }


            // 2 - Child Module User List
            // 6 - Parent Module Settings
            if (roleparseData[rle]['page_name'] == '2' && roleparseData[rle]['module_name'] == '6') {
              localStorage.setItem("SETTINGS_USERLIST_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("SETTINGS_USERLIST_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("SETTINGS_USERLIST_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("SETTINGS_USERLIST_DELETE", roleparseData[rle]['delete_action']);
            }
            if (roleparseData[rle]['page_name'] == '3' && roleparseData[rle]['module_name'] == '6') {
              localStorage.setItem("SETTINGS_COMPANYGROUP_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("SETTINGS_COMPANYGROUP_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("SETTINGS_COMPANYGROUP_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("SETTINGS_COMPANYGROUP_DELETE", roleparseData[rle]['delete_action']);
            }
            if (roleparseData[rle]['page_name'] == '4' && roleparseData[rle]['module_name'] == '6') {
              localStorage.setItem("SETTINGS_USERROLE_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("SETTINGS_USERROLE_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("SETTINGS_USERROLE_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("SETTINGS_USERROLE_DELETE", roleparseData[rle]['delete_action']);
            }
            if (roleparseData[rle]['page_name'] == '5' && roleparseData[rle]['module_name'] == '6') {
              localStorage.setItem("SETTINGS_REPORTTEMPLATE_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("SETTINGS_REPORTTEMPLATE_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("SETTINGS_REPORTTEMPLATE_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("SETTINGS_REPORTTEMPLATE_DELETE", roleparseData[rle]['delete_action']);
            }
            if (roleparseData[rle]['page_name'] == '6' && roleparseData[rle]['module_name'] == '6') {
              localStorage.setItem("SETTINGS_ORGCHART_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("SETTINGS_ORGCHART_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("SETTINGS_ORGCHART_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("SETTINGS_ORGCHART_DELETE", roleparseData[rle]['delete_action']);
            }
            if (roleparseData[rle]['page_name'] == '7' && roleparseData[rle]['module_name'] == '2') {
              localStorage.setItem("CALENDAR_EVENTS_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("CALENDAR_EVENTS_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("CALENDAR_EVENTS_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("CALENDAR_EVENTS_DELETE", roleparseData[rle]['delete_action']);
            }
            if (roleparseData[rle]['page_name'] == '9' && roleparseData[rle]['module_name'] == '3') {
              localStorage.setItem("UNITS_LISTING_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("UNITS_LISTING_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("UNITS_LISTING_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("UNITS_LISTING_DELETE", roleparseData[rle]['delete_action']);  // Implementation Done by Kannan.N
            }
            if (roleparseData[rle]['page_name'] == '13' && roleparseData[rle]['module_name'] == '3') {
              localStorage.setItem("UNITS_ALARM_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("UNITS_ALARM_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("UNITS_ALARM_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("UNITS_ALARM_DELETE", roleparseData[rle]['delete_action']);
            }
            if (roleparseData[rle]['page_name'] == '14' && roleparseData[rle]['module_name'] == '3') {
              localStorage.setItem("UNITS_SERVICINGINFO_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("UNITS_SERVICINGINFO_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("UNITS_SERVICINGINFO_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("UNITS_SERVICINGINFO_DELETE", roleparseData[rle]['delete_action']);
            }
            if (roleparseData[rle]['page_name'] == '15' && roleparseData[rle]['module_name'] == '3') {
              localStorage.setItem("UNITS_COMMENTS_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("UNITS_COMMENTS_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("UNITS_COMMENTS_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("UNITS_COMMENTS_DELETE", roleparseData[rle]['delete_action']);
            }
            if (roleparseData[rle]['page_name'] == '16' && roleparseData[rle]['module_name'] == '3') {
              localStorage.setItem("UNITS_UNITGROUP_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("UNITS_UNITGROUP_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("UNITS_UNITGROUP_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("UNITS_UNITGROUP_DELETE", roleparseData[rle]['delete_action']);
            }
            if (roleparseData[rle]['page_name'] == '10' && roleparseData[rle]['module_name'] == '4') {
              localStorage.setItem("REPORTS_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("REPORTS_CREATE", roleparseData[rle]['create_action']);
            }
            if (roleparseData[rle]['page_name'] == '11' && roleparseData[rle]['module_name'] == '5') {
              localStorage.setItem("MESSAGE_INBOX_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("MESSAGE_INBOX_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("MESSAGE_INBOX_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("MESSAGE_INBOX_DELETE", roleparseData[rle]['delete_action']);
            }
            if (roleparseData[rle]['page_name'] == '17' && roleparseData[rle]['module_name'] == '5') {
              localStorage.setItem("MESSAGE_SENT_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("MESSAGE_SENT_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("MESSAGE_SENT_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("MESSAGE_SENT_DELETE", roleparseData[rle]['delete_action']);
            }
          }

          // Get Role Permission Data API Calling
          /* let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
             headers: any = new Headers({ 'Content-Type': type }),
             options: any = new RequestOptions({ headers: headers }),
             url: any = this.apiServiceURL + "/editrole?is_mobile=1&role_id=" + res['staffdetails'][0].role_id;
           console.log(url);
           let roleres;
           this.http.get(url, options)
             .subscribe((data) => {
               roleres = data.json();
               console.log("Role Permssion Array:"+JSON.stringify(roleres.roldata));
                localStorage.setItem("RolePermissionData", JSON.stringify(roleres.roldata));
 
             });*/
          // Get Role Permission Data API Calling
          this.navCtrl.setRoot(DashboardPage);
        }

      });
  }
  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
  doMove() {
    this.navCtrl.setRoot(ForgotpasswordPage);
  }
}
