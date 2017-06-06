import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  public loginas: any;
  public userId: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com/";
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
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
        console.log("Photo:" + res.photo);
        if (res.photo) {
          this.photo = this.apiServiceURL + "api/uploads/users/" + res.photo;
          console.log(this.photo);
        }
      });
  }

}
