import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { EditprofilesteponePage } from '../editprofilestepone/editprofilestepone';
import { TabsPage } from '../tabs/tabs';
import { UserPage } from '../user/user';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
/**
 * Generated class for the MyaccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {
  public pageTitle: string;
  public photo: any;
  public name: any;
  public userid: any;
  public password: any;
  public hashtag: any;
  public loginas: any;
  public role: any;
  public email: any;
  public country: any;
  public job_position: any;
  public accountcreatedby: any;
  public userId: any;
  public item: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com/";
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public nav: NavController) {
    this.pageTitle = 'My Account';
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
  }


  //[{"userid":"1","userdetailsid":"1","username":"webkannan","password":"webkannan","role":"1","hashtag":"@welcome","first_name":"Kannan","last_name":"Nagarathinam","email":"kannan@gmail.com","contact":"123456789","country":"2","photo":"1496647262537.jpg","job_position":"At prog","report_to":"0","company_group":"1","companygroup_name":"Denyo"}]

  ionViewDidLoad() {
    // body: string = "key=myaccount&userId=" + this.userId,
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "settings/profile?is_mobile=1&loggedin_id=" + this.userId;
    console.log(url);
    let res;
    this.http.get(url, options)
      .subscribe((data) => {
        res = data.json();
        console.log(JSON.stringify(res));
        console.log("1" + res.settings.length);
        console.log("2" + res.settings);
        if (res.settings.length > 0) {
          this.userid = res.settings[0].username;
          this.password = res.settings[0].password;
          this.hashtag = "@" + this.userid;
          this.role = res.settings[0].role_name;
          this.email = res.settings[0].email;
          this.country = res.settings[0].country_name;
          this.job_position = res.settings[0].job_position;
          this.accountcreatedby = res.settings[0].report_to;
          this.photo = this.apiServiceURL + "/staffphotos/" + res.settings[0].photo_filename;
        }
        // [{ "userid": "1", "userdetailsid": "1", "username": "denyov2", "password": "e3b81d385ca4c26109dfbda28c563e2b", "firstname": "Super Admin", "lastname": "Denyo", "email": "balamurugan@webneo.in", "contact_number": "9597645985", "country_id": "99", "photo": "1496647262537.jpg", "job_position": "Country Manager", "report_to": "0", "company_id": "1", "companygroup_name": "Denyo" }]



      });

  }
  doEdit(userid) {
    this.nav.setRoot(EditprofilesteponePage, {
      userId: userid
    });
  }

  previous() {
    this.nav.setRoot(TabsPage);
  }

  redirectToUser() {
    this.nav.setRoot(UserPage);
  }
  redirectToUnitGroup() {
    this.nav.setRoot(UnitgroupPage);
  }
  redirectToUnits() {
    this.nav.setRoot(UnitsPage);
  }
  redirectToMyAccount() {
    this.nav.setRoot(MyaccountPage);
  }
  redirectToRole() {
    this.nav.setRoot(RolePage);
  }

}
