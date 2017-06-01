import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
//import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
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
})
export class LoginPage {
  public form: FormGroup;
  public userId: any;
  public passWrd: any;
  public userInf: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com/";
  constructor(public fb: FormBuilder, private http: Http, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.userInf = localStorage.getItem("userInfoId");
    console.log("UserId Localtorage" + this.userInf);
    if (this.userInf != 'null' && this.userInf != null && this.userInf != '') {
      this.navCtrl.push(TabsPage);
    }
    // Create form builder validation rules
    this.form = fb.group({
      "userid": ["", Validators.required],
      "password": ["", Validators.required]
    });

    this.userId = 'webneo';
    this.passWrd = 'webneo';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  loginEntry(username, password) {
    this.presentLoading(1);
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/login.php?username=" + username + "&password=" + password;
    let res;
    this.http.get(url, options)
      .subscribe(data => {
        res = data.json();
        if (res[0].err == 'Invalid') {
          this.sendNotification('Username or password are invalid try again');
          this.presentLoading(0);
          return false;
        } else {
          res = data.json();
          console.log(res[0].id);
          console.log(res[0].username);
          console.log(res[0].email);
          console.log("1" + data);
          console.log("2" + JSON.stringify(data.json()));
          localStorage.setItem("userInfoId", res[0].id);
          localStorage.setItem("userInfoName", res[0].username);
          localStorage.setItem("userInfoEmail", res[0].email);
          this.presentLoading(0);
          this.navCtrl.push(TabsPage);
        }

      });
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
