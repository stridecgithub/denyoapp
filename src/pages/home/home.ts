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
            console.log(roleparseData[rle]['module_name']);
            if (roleparseData[rle]['module_name'] == '1' && roleparseData[rle]['page_name'] == '8') {
              localStorage.setItem("DASHBOARD_MAP_VIEW", roleparseData[rle]['view_action']);
              localStorage.setItem("DASHBOARD_MAP_CREATE", roleparseData[rle]['create_action']);
              localStorage.setItem("DASHBOARD_MAP_EDIT", roleparseData[rle]['edit_action']);
              localStorage.setItem("DASHBOARD_MAP_DELETE", roleparseData[rle]['delete_action']);
              localStorage.setItem("DASHBOARD_MAP_HIDE", roleparseData[rle]['hide_action']);
            }
            /* if(roleparseData[rle]['page_name']=='8'){
               
             }*/

            console.log(roleparseData[rle]['page_name']);
            console.log(roleparseData[rle]['view_action']);
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
