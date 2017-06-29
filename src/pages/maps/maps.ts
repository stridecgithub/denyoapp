
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AddunitsonePage } from '../addunitsone/addunitsone';
import { ViewcompanygroupPage } from '../viewcompanygroup/viewcompanygroup';
import { LoadingController } from 'ionic-angular';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { CompanygroupPage } from '../companygroup/companygroup';
import { RolePage } from '../role/role';
import { HomePage } from '../home/home';
import { UnitsPage } from '../units/units';
import { UnitdetailsPage } from '../unitdetails/unitdetails';
//declare var google;
import { DomSanitizer } from '@angular/platform-browser';
@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  //@ViewChild('mapContainer') mapContainer: ElementRef;
  //map: any;
  public loginas: any;
  public userid: any;
  public pageTitle: string;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  public totalCount;
  pet: string = "ALL";
  public sortby = 2;
  public vendorsort = "asc";
  public ascending = true;
  public colorListArr: any;
  iframeContent: any;
  public reportData: any =
  {
    status: '',
    sort: 'unit_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
  public reportAllLists = [];
  constructor(private sanitizer: DomSanitizer, public http: Http, public navCtrl: NavController,
    public toastCtrl: ToastController, public alertCtrl: AlertController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.pageTitle = 'Maps';
    this.loginas = localStorage.getItem("userInfoName");
    this.userid = localStorage.getItem("userInfoId");
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MapsPage');
  }


  doRefresh(refresher) {
    console.log('doRefresh function calling...');
    this.reportData.startindex = 0;
    this.reportAllLists = [];
    this.doUser();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }


  /****************************/
  /*@doUser calling on report */
  /****************************/
  doUser() {
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
    this.presentLoading(1);
    if (this.reportData.status == '') {
      this.reportData.status = "DRAFT";
    }
    if (this.reportData.sort == '') {
      this.reportData.sort = "vendor";
    }
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/dashboard?is_mobile=1&startindex=" + this.reportData.startindex + "&results=" + this.reportData.results + "&sort=" + this.reportData.sort + "&dir=" + this.reportData.sortascdesc + "&loginid=" + this.userid;
    let res;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        res = data.json();
        console.log(JSON.stringify(res));
        console.log("1" + res.units.length);
        console.log("2" + res.units);
        if (res.units.length > 0) {
          for (let unit in res.units) {
            let colorcode;
            let favorite;
            let index = this.colorListArr.indexOf(res.units[unit].colorcode); // 1
            console.log("Color Index:" + index);
            let colorvalincrmentone = index + 1;
            colorcode = "button" + colorvalincrmentone;
            console.log("Color is" + colorcode);
            if (res.units[unit].favorite == 1) {
              favorite = "favorite";
            }
            else {
              favorite = "unfavorite";

            }
            this.reportAllLists.push({
              unit_id: res.units[unit].unit_id,
              unitname: res.units[unit].unitname,
              location: res.units[unit].location,
              projectname: res.units[unit].projectname,
              colorcode: res.units[unit].colorcode,
              contacts: res.units[unit].contacts,
              nextservicedate: res.units[unit].nextservicedate,
              colorcodeindications: colorcode,
              controllerid: res.units[unit].controllerid,
              neaplateno: res.units[unit].neaplateno,
              companys_id: res.units[unit].companys_id,
              unitgroups_id: res.units[unit].unitgroups_id,
              runninghr: res.units[unit].runninghr,
              models_id: res.units[unit].models_id,
              alarmnotificationto: res.units[unit].alarmnotificationto,
              favoriteindication: favorite
            });
          }
          //this.reportAllLists = res.units;
          this.totalCount = res.totalCount;
          this.reportData.startindex += this.reportData.results;
        } else {
          this.totalCount = 0;
        }
        console.log("Total Record:" + this.totalCount);

      });
    this.presentLoading(0);
  }

  /**********************/
  /* Infinite scrolling */
  /**********************/
  doInfinite(infiniteScroll) {
    console.log('InfinitScroll function calling...');
    console.log('A');
    console.log("Total Count:" + this.totalCount)
    if (this.reportData.startindex < this.totalCount && this.reportData.startindex > 0) {
      console.log('B');
      this.doUser();
    }
    console.log('C');
    setTimeout(() => {
      console.log('D');
      infiniteScroll.complete();
    }, 500);
    console.log('E');
  }
  ionViewWillEnter() {
    //this.displayGoogleMap();
    //this.getMarkers();
    this.reportData.startindex = 0;
    this.reportData.sort = "unit_id";
    this.doUser();
    console.log(this.apiServiceURL + "/api/webview/map.php?is_mobile=1&loginid=1&startindex=0&results=8&sort=unit_id&dir=desc");
    //this.iframeContent = "<iframe src=" + this.apiServiceURL + "/api/webview/map.php?is_mobile=1&loginid=1&startindex=0&results=8&sort=unit_id&dir=desc height=350 frameborder=0></iframe>";

    this.iframeContent = "<iframe src=" + this.apiServiceURL + "/mapwebview?ses_login_id=" + this.userid + " height=350 frameborder=0></iframe>";

  }
  /*displayGoogleMap() {
    let latLng = new google.maps.LatLng(9.9252, 78.1198);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }*/

  /*getMarkers() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      //url: any = this.apiServiceURL + "/api/webview/googlemap.php";
      url: any = "http://strtheme.stridecdev.com/googlemap.php";
    this.http.get(url, options)
      .subscribe(data => {
        console.log("Map Response:-" + JSON.stringify(data.json()));
        //let staticdata = [{ "id": 1, "address": "Ambiga Cinemas", "lat": "9.918418", "lng": "78.148566" }, { "id": 2, "address": "Vasan Eye Care", "lat": "9.920792", "lng": "78.148785" }, { "id": 3, "address": "Naveen Bakery & Sweets", "lat": "9.921392", "lng": "78.148819" }, { "id": 4, "address": "Thanga Mayil Jewllery Shop", "lat": "9.918599", "lng": "78.148852" }, { "id": 5, "address": "Aravind Eye Hospital", "lat": "9.921358", "lng": "78.140062" }, { "id": 6, "address": "No 12 Vaigai Nagar", "lat": "9.918418", "lng": "78.140062" }];
        this.addMarkersToMap(data.json());
      },
      err => {
        console.log("Map error:-" + JSON.stringify(err));
      });
  }*/
  /*addMarkersToMap(markers) {
    for (let marker of markers) {
      var position = new google.maps.LatLng(marker.lat, marker.lng);
      var dogwalkMarker = new google.maps.Marker({ position: position, title: marker.address });
      dogwalkMarker.setMap(this.map);
    }
  }*/
  doAdd() {
    this.navCtrl.setRoot(AddunitsonePage);
  }
  doEdit(item, act) {
    if (act == 'edit') {
      this.navCtrl.setRoot(AddunitsonePage, {
        record: item,
        act: act
      });
      return false;
    } else if (act == 'detail') {
      this.navCtrl.setRoot(UnitdetailsPage, {
        record: item
      });
      return false;
    } else {
      this.navCtrl.setRoot(ViewcompanygroupPage, {
        record: item,
        act: act
      });
      return false;
    }
  }





  /******************************************/
  /* @doConfirm called for alert dialog box **/
  /******************************************/
  doConfirm(id, item) {
    console.log("Deleted Id" + id);
    let confirm = this.alertCtrl.create({
      message: 'Are you sure you want to delete this user?',
      buttons: [{
        text: 'Yes',
        handler: () => {

          for (let q: number = 0; q < this.reportAllLists.length; q++) {
            if (this.reportAllLists[q] == item) {
              this.reportAllLists.splice(q, 1);
            }
          }
        }
      },
      {
        text: 'No',
        handler: () => { }
      }]
    });
    confirm.present();
  }

  // Remove an existing record that has been selected in the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of delete followed by the key/value pairs
  // for the record ID we want to remove from the remote database

  // Manage notifying the user of the outcome
  // of remote operations
  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }



  onSegmentChanged(val) {
    let splitdata = val.split(",");
    this.reportData.sort = splitdata[0];
    this.reportData.sortascdesc = splitdata[1];
    //this.reportData.status = "ALL";
    this.reportData.startindex = 0;
    this.reportAllLists = [];
    this.doUser();
  }

  /********************/
  /* Sorting function */
  /********************/
  // doSort(val) {
  //   console.log('1');
  //   this.reportAllLists = [];
  //   this.reportData.startindex = 0;
  //   console.log('2');
  //   this.sortby = 1;
  //   if (this.vendorsort == "asc") {
  //     this.reportData.sortascdesc = "desc";
  //     this.vendorsort = "desc";
  //     this.ascending = false;
  //     console.log('3');
  //   }
  //   else {
  //     console.log('4');
  //     this.reportData.sortascdesc = "asc";
  //     this.vendorsort = "asc";
  //     this.ascending = true;
  //   }
  //   console.log('5');
  //   this.reportData.sort = val;
  //   this.doUser();
  //   console.log('6');
  // }
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







  redirectToUnitGroup() {
    this.navCtrl.setRoot(UnitgroupPage);
  }
  redirectToCompanyGroup() {
    this.navCtrl.setRoot(CompanygroupPage);
  }

  redirectToUnits() {
    this.navCtrl.setRoot(UnitsPage);
  }
  redirectToMyAccount() {
    this.navCtrl.setRoot(MyaccountPage);
  }

  redirectToRole() {
    this.navCtrl.setRoot(RolePage);
  }
  previous() {
    this.navCtrl.setRoot(HomePage);
  }
}


