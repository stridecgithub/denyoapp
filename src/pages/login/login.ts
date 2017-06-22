import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
//import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the LoginPage page.
 *f
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Device]
})
export class LoginPage {
  public form: FormGroup;
  public userId: any;
  public passWrd: any;
  public userInf: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(public device: Device, public fb: FormBuilder, private http: Http, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.userInf = localStorage.getItem("userInfoId");
    console.log("UserId Localtorage" + this.userInf);
    if (this.userInf != 'null' && this.userInf != null && this.userInf != '') {
      this.navCtrl.setRoot(HomePage);
    }
    // Create form builder validation rules
    this.form = fb.group({
      "userid": ["", Validators.required],
      "password": ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
          this.presentLoading(0);
          return false;
        } else {
          res = data.json();
          localStorage.setItem("userInfo", res['staffdetails'][0]);
          localStorage.setItem("userInfoId", res['staffdetails'][0].user_id);
          localStorage.setItem("userInfoName", res['staffdetails'][0].firstname);
          localStorage.setItem("userInfoEmail", res['staffdetails'][0].email);
          localStorage.setItem("userInfoCompanyId", res['staffdetails'][0].company_id);
          this.presentLoading(0);
          this.navCtrl.setRoot(HomePage);
        }

      });
    this.presentLoading(0);
  }


  login() {
    let userid: string = this.form.controls["userid"].value,
      password: string = this.form.controls["password"].value;
    this.loginEntry(userid, password);
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

}
