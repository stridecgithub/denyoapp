import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicinginfoPage } from '../servicinginfo/servicinginfo';
import { UserPage } from '../user/user';
import { CompanygroupPage } from '../companygroup/companygroup';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { UnitgroupPage } from '../unitgroup/unitgroup';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import * as $ from 'jquery'
/**
 * Generated class for the UnitdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unitdetails',
  templateUrl: 'unitdetails.html',
  providers: [HTTP]
})
export class UnitdetailsPage {
  public pageTitle: string;

  public item = [];
  public colorListArr = [];
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  public unitDetailData: any = {
    unit_id: '',
    unitname: '',
    location: '',
    projectname: '',
    colorcode: '',
    gen_status: '',
    nextservicedate: '',
    alarmnotificationto: '',
    favoriteindication: '',
    userId: '',
    loginas: '',
    htmlContent: '',
    iframeURL: ''
  }
  constructor(private httpdata: HTTP, public NP: NavParams, public navCtrl: NavController, public navParams: NavParams, public nav: NavController) {
    this.unitDetailData.loginas = localStorage.getItem("userInfoName");
    this.unitDetailData.userId = localStorage.getItem("userInfoId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnitdetailsPage');
  }

  ionViewWillEnter() {
    this.colorListArr = [
      "FBE983",
      "5584EE",
      "A4BDFD",
      "47D6DC",
      "7AE7BE",
      "51B749",
      "FBD75C",
      "FFB878",
      "FF877C",
      "DC2128",
      "DAADFE",
      "E1E1E1"
    ];
    this.pageTitle = 'Unit Details';
    console.log(JSON.stringify(this.NP.get("record")));
    let editItem = this.NP.get("record");
    let colorcode;
    let favorite;
    let index = this.colorListArr.indexOf(this.NP.get("record").colorcode); // 1
    console.log("Color Index:" + index);
    let colorvalincrmentone = index + 1;
    colorcode = "button" + colorvalincrmentone;
    console.log("Color is" + colorcode);

    if (this.NP.get("record").favoriteindication == 'favorite') {
      favorite = "favorite";
    }
    else {
      favorite = "unfavorite";

    }


    this.unitDetailData.unit_id = editItem.unit_id;
    this.unitDetailData.unitname = editItem.unitname;
    this.unitDetailData.location = editItem.location;
    this.unitDetailData.projectname = editItem.projectname;
    this.unitDetailData.colorcodeindications = colorcode;
    this.unitDetailData.gen_status = editItem.gen_status;
    this.unitDetailData.nextservicedate = editItem.nextservicedate;
    this.unitDetailData.alarmnotificationto = editItem.nextservicedate;
    this.unitDetailData.favoriteindication = favorite;
    let url;
    url = this.apiServiceURL + "/orgchart?company_id=7&is_mobile=1";
    //url = "http://strtheme.stridecdev.com/ioncalendar/calendar.html";
    this.httpdata.get(url, {}, {})
      .then(data => {
        this.unitDetailData.htmlContent = data.data;
      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });


    $(".serv-info").click(function () {
      alert('Serve info calling...');
    })
  }
  servicingInfo() {
    this.nav.setRoot(ServicinginfoPage, {
      record: this.NP.get("record")
    });
  }
  previous() {
    this.nav.setRoot(UnitsPage);
  }
  redirectToUser() {
    this.nav.setRoot(UserPage);
  }

  redirectToUnitGroup() {
    this.nav.setRoot(UnitgroupPage);
  }
  redirectToCompanyGroup() {
    this.nav.setRoot(CompanygroupPage);
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
