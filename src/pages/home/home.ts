import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DashboardPage } from '../dashboard/dashboard';
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
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(public navCtrl: NavController, public fb: FormBuilder, public device: Device, private http: Http, public toastCtrl: ToastController) {
    this.form = fb.group({
      "userid": ["", Validators.required],
      "password": ["", Validators.required]
    });

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
    let res;
    let body: string = "username=" + username +
      "&password=" + password +
      "&device_token=" + this.device.uuid +
      "&isapp=1",
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/checklogin";
    this.http.post(url, body, options)
      .subscribe(data => {
        res = data.json();
        if (res.msg[0]['Error'] > 0) {
          this.sendNotification(res.msg[0]['result']);
          return false;
        } else {
          res = data.json();
          console.log("Logged in Response:" + JSON.stringify(res));
          console.log("Logged Id:" + res['staffdetails'][0].staff_id);
          localStorage.setItem("userInfo", res['staffdetails'][0]);
          localStorage.setItem("userInfoId", res['staffdetails'][0].staff_id);
          localStorage.setItem("userInfoName", res['staffdetails'][0].firstname);
          localStorage.setItem("userInfoEmail", res['staffdetails'][0].email);
          localStorage.setItem("userInfoCompanyId", res['staffdetails'][0].company_id);
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
}
