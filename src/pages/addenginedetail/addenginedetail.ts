import { Component } from '@angular/core';
import {  NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EnginedetailPage } from '../enginedetail/enginedetail';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the AddenginedetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-addenginedetail',
  templateUrl: 'addenginedetail.html',
})
export class AddenginedetailPage {
 public pageTitle: string;
  public loginas: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  public totalCount;
  pet: string = "ALL";
  public reportData: any =
  {
    status: '',
    sort: 'unitgroup_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
  public reportAllLists = [];
  public colorListArr: any;
  public userId: any;
   public hideForm: boolean = false;
  public enginemodel:any;
  public rawhtml:any;
  public companyId;
   public form: FormGroup;
 constructor(public navCtrl: NavController,
    public http: Http,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController) {
      this.form = fb.group({
      "enginemodel": ["", Validators.required],
      "rawhtml": ["", Validators.required]
         
    });
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
    this.companyId = localStorage.getItem("userInfoCompanyId");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddenginedetailPage');
  }
    saveEntry()
  {
     let body: string = "is_mobile=1&model=" + this.enginemodel +
      "&rawhtml=" + this.rawhtml ,
      
      
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/enginemodel";
    console.log(url);
    console.log(body);

    this.http.post(url, body, options)
      .subscribe((data) => {
        //console.log("Response Success:" + JSON.stringify(data.json()));
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`successfully Added`);
          localStorage.setItem("userPhotoFile", "");
          this.navCtrl.setRoot(EnginedetailPage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
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
 previous() {
    this.navCtrl.setRoot(EnginedetailPage);
  }
}
