import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { EditprofilesteponePage } from '../editprofilestepone/editprofilestepone';
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
    let body: string = "key=myaccount&userId=" + this.userId,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "api/users.php";
    let res;
    this.http.post(url, body, options)
      .subscribe((data) => {
        res = data.json();
        this.userid = res[0].username;
        this.password = res[0].password;
        this.hashtag = res[0].hashtag;
        this.role = res[0].role;
        this.email = res[0].email;
        this.country = res[0].country;
        this.job_position = res[0].job_position;
        this.accountcreatedby = res[0].report_to;

        // [{ "userid": "1", "userdetailsid": "1", "username": "denyov2", "password": "e3b81d385ca4c26109dfbda28c563e2b", "firstname": "Super Admin", "lastname": "Denyo", "email": "balamurugan@webneo.in", "contact_number": "9597645985", "country_id": "99", "photo": "1496647262537.jpg", "job_position": "Country Manager", "report_to": "0", "company_id": "1", "companygroup_name": "Denyo" }]
        if (res[0].photo) {
          this.photo = this.apiServiceURL + "api/uploads/users/" + res[0].photo;
        }
      });
    
  }
  doEdit(id) {
    let act = 'myaccount'
    this.nav.setRoot(EditprofilesteponePage, {
      record: this.item,
      act: act
    });
  }

}
