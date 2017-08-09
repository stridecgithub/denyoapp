
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ToastController, AlertController, NavParams, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AddunitsonePage } from '../addunitsone/addunitsone';
import { ViewcompanygroupPage } from '../viewcompanygroup/viewcompanygroup';
import { LoadingController } from 'ionic-angular';

import { UnitgroupPage } from '../unitgroup/unitgroup';
import { CompanygroupPage } from '../companygroup/companygroup';
import { RolePage } from '../role/role';
import { HomePage } from '../home/home';

import { UnitdetailsPage } from '../unitdetails/unitdetails';
declare var google;
import { DomSanitizer } from '@angular/platform-browser';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { NotificationPage } from '../notification/notification';

import { ReportsPage } from '../reports/reports';
import { CalendarPage } from '../calendar/calendar';
import { EmailPage } from '../email/email';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;


  //@ViewChild('mapContainer') mapContainer: ElementRef;
  //map: any;
  public loginas: any;
  public userid: any;
  public companyid: any;
  public addressData = [];
  public detailvalue: any;
  public pageTitle: string;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  private permissionMessage: string = "Permission denied for access this page. Please contact your administrator";
  public totalCount;
  pet: string = "ALL";
  public sortby = 2;
  public str: any;
  public str1: any;
  public msgcount: any;
  public notcount: any;
  public vendorsort = "asc";
  public ascending = true;
  public colorListArr: any;
  iframeContent: any;
  public VIEWACCESS: any;
  public HIDEACCESS: any;
  public reportData: any =
  {
    status: '',
    sort: 'unit_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
  public reportAllLists = [];
  constructor(public platform: Platform, public http: Http, public navCtrl: NavController,
    public toastCtrl: ToastController, private sanitizer: DomSanitizer, public alertCtrl: AlertController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    /* Role Authority Start */
    this.VIEWACCESS = localStorage.getItem("DASHBOARD_MAP_VIEW");
    this.HIDEACCESS = localStorage.getItem("DASHBOARD_MAP_HIDE");
    console.log("Role Authority for Map View" + this.VIEWACCESS);

    console.log("Role Authority for Map Hide" + this.HIDEACCESS);
    /* Role Authority End */

    this.pageTitle = 'Maps';
    this.str = '';
    this.str1 = '';
    this.loginas = localStorage.getItem("userInfoName");
    this.userid = localStorage.getItem("userInfoId");
    this.companyid = localStorage.getItem("userInfoCompanyId");




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
    //this.presentLoading(1);
    if (this.reportData.status == '') {
      this.reportData.status = "DRAFT";
    }
    if (this.reportData.sort == '') {
      this.reportData.sort = "vendor";
    }
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/dashboard?is_mobile=1&startindex=" + this.reportData.startindex + "&results=" + this.reportData.results + "&sort=" + this.reportData.sort + "&dir=" + this.reportData.sortascdesc + "&loginid=" + this.userid + "&company_id=" + this.companyid;
    let res;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        res = data.json();
        res = data.json();

        /* if (res.msg[0].Error > 0) {
           res.units = [];
         }*/



        if (res.totalCount > 0) {
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
              viewonid: res.units[unit].viewonid,
              genstatus: res.units[unit].genstatus,
              favoriteindication: favorite,
              latitude: res.units[unit].latitude,
              longtitude: res.units[unit].longtitude
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
    // this.presentLoading(0);
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
  mapunitdetail(item) {
    this.navCtrl.setRoot(UnitdetailsPage, {
      record: item
    });

  }
  ionViewWillEnter() {


    let //body: string = "loginid=" + this.userId,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/msgnotifycount?loginid=" + this.userid;
    console.log(url);
    // console.log(body);

    this.http.get(url, options)
      .subscribe((data) => {
        console.log("Count Response Success:" + JSON.stringify(data.json()));
        this.msgcount = data.json().msgcount;
        this.notcount = data.json().notifycount;
      });
    if (this.VIEWACCESS > 0) {
      this.reportData.startindex = 0;
      this.reportData.sort = "unit_id";
      this.doUser();
    }
    // console.log(this.apiServiceURL + "/api/webview/map.php?is_mobile=1&loginid=1&startindex=0&results=8&sort=unit_id&dir=desc");
    this.loadMap(0);
  }

  loadMap(val) {
    console.log(JSON.stringify(val));
    console.log(val.length);
    if (JSON.stringify(val).length > 0) {
      this.reportData.startindex = 0;
      this.reportData.results = 8;
    }
    var typestr: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headersstr: any = new Headers({ 'Content-Type': typestr }),
      optionsstr: any = new RequestOptions({ headers: headersstr }),
      urlstr: any = this.apiServiceURL + "/dashboard?is_mobile=1&startindex=" + this.reportData.startindex + "&results=" + this.reportData.results + "&sort=" + this.reportData.sort + "&dir=" + this.reportData.sortascdesc + "&loginid=" + this.userid + "&company_id=" + this.companyid;
    console.log("Map Marker api url:" + urlstr);
    var res;
    var latLng
    this.http.get(urlstr, optionsstr)
      .subscribe(data => {
        res = data.json();
        /* if (res.msg[0].Error > 0) {
           res.units = [];
         }*/
        if (res.totalCount > 0) {
          for (var unit in res.units) {
            if (val == 0) {
              var labeldata = '<div class="info_content">' +
                '<h3><a href="#" (click)="mapunitdetail(' + res.units[unit].unit_id + ')">' + res.units[unit].unitname + '</a></h3>' +
                '<h4>' + res.units[unit].projectname + '</h4>' +
                '<p>Running Hours:' + res.units[unit].runninghr + '</p>' + '</div>';

              /* var labeldata = '<div class="info_content">' +
              '<h3><a href="/unitdetails/">' + res.units[unit].unitname + '</a></h3>' +
              '<h4>' + res.units[unit].projectname + '</h4>' +
              '<p>Running Hours:' + res.units[unit].runninghr + '</p>' + '</div>';*/



              this.addressData.push({
                title: labeldata
              });
              latLng = new google.maps.LatLng(res.units[unit].latitude, res.units[unit].longtitude);

              // Creating a marker and putting it on the map
              var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: res.units[unit].unitname,
                infoContent: labeldata
              });
              var infoWindow = new google.maps.InfoWindow();
              (function (marker, data, unit, addressData) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function (e) {
                  console.log(e);
                  infoWindow.setContent(addressData[unit].title);
                  infoWindow.open(map, marker);

                });
              })(marker, data, unit, this.addressData);

            } else {
              var labeldata = '<div class="info_content">' +
                '<h3><a href="#" data-tap-disabled="true" (click)="mapunitdetail(' + val.unit_id + ')">' + val.unitname + '</a></h3>' +
                '<h4>' + val.projectname + '</h4>' +
                '<p>Running Hours:' + val.runninghr + '</p>' + '</div>';


              /* var labeldata = '<div class="info_content">' +
               '<h3><a href="./email">' + res.units[unit].unitname + '</a></h3>' +
               '<h4>' + res.units[unit].projectname + '</h4>' +
               '<p>Running Hours:' + res.units[unit].runninghr + '</p>' + '</div>';*/
              latLng = new google.maps.LatLng(val.latitude, val.longtitude);
              // Creating a marker and putting it on the map
              var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: val.unitname,
                infoContent: labeldata
              });
              var infoWindow = new google.maps.InfoWindow();
              (function (marker, data, addressData) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function (e) {
                  infoWindow.setContent(addressData);
                  infoWindow.open(map, marker);
                });

              })(marker, data, labeldata);
            }
          }
        }
      },
      err => {
        console.log("Map error:-" + JSON.stringify(err));
      });

    // Creating a new map

    if (val == 0) {
      console.log("Default Loading...");
      var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(1.3249773, 103.70307100000002),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    } else {
      /* console.log("Selected one:"+val.latitude+" "+val.longtitude);
       var map = new google.maps.Map(document.getElementById("map"), {
         center: new google.maps.LatLng(val.latitude, val.longtitude),
         zoom: 14,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       });*/
      console.log("Selected Unit...");
      var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(val.latitude, val.longtitude),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

    }
  }

  xyz() {
    console.log('Hello');
  }
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
  doSort(val) {
    console.log('1');
    this.reportAllLists = [];
    this.reportData.startindex = 0;
    console.log('2');
    this.sortby = 1;
    if (this.vendorsort == "asc") {
      this.reportData.sortascdesc = "desc";
      this.vendorsort = "desc";
      this.ascending = false;
      console.log('3');
    }
    else {
      console.log('4');
      this.reportData.sortascdesc = "asc";
      this.vendorsort = "asc";
      this.ascending = true;
    }
    console.log('5');
    this.reportData.sort = val;
    this.doUser();
    console.log('6');
  }
  /*presentLoading(parm) {
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
  }*/







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
  favorite(unit_id) {
    this.reportData.startindex = 0;
    this.reportAllLists = [];
    let body: string = "unitid=" + unit_id + "&is_mobile=1" + "&loginid=" + this.userid,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/setunitfavorite";
    console.log(url);
    console.log(body);
    this.http.post(url, body, options)
      .subscribe(data => {
        console.log(data);
        let res = data.json();
        console.log(res.msg[0].Error);
        console.log(res.msg[0].result);
        if (res.msg[0] == 0) {
          console.log("Favorite");
        } else {
          console.log("Un Favorite");
        }

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
              contacts: res.units[unit].contacts,
              projectname: res.units[unit].projectname,
              colorcode: res.units[unit].colorcode,
              nextservicedate: res.units[unit].nextservicedate,
              colorcodeindications: colorcode,
              controllerid: res.units[unit].controllerid,
              neaplateno: res.units[unit].neaplateno,
              companys_id: res.units[unit].companys_id,
              unitgroups_id: res.units[unit].unitgroups_id,
              models_id: res.units[unit].models_id,
              alarmnotificationto: res.units[unit].alarmnotificationto,
              viewonid: res.units[unit].viewonid,
              favoriteindication: favorite,
              latitude: res.units[unit].latitude,
              longtitude: res.units[unit].longtitude
            });
          }
          //this.reportAllLists = res.units;
          this.totalCount = res.totalCount;
          this.reportData.startindex += this.reportData.results;
        } else {
          this.totalCount = 0;
        }

        // If the request was successful notify the user
        if (data.status === 200) {
          this.sendNotification(res.msg[0].result);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
    this.doUser();
  }
  getCheckBoxValue(item, val, val1) {
    /*console.log("Available data" + val);
    this.getCheckboxData.push({
      availabledata: val
    })*/


    /*console.log("Available data" + name);
  this.selectedAction.push({
  availabledata: name
  })
  console.log(JSON.stringify(this.selectedAction));*/
    if (val != '') {
      if (this.str == '') {
        this.str = val;
      } else {
        this.str = this.str + "," + val;
      }
    }
    if (val1 != '') {
      if (this.str1 == '') {
        this.str1 = val1;
      } else {
        this.str1 = this.str1 + "," + val1;
      }
    }
    console.log(this.str + "//" + this.str1);
    this.detailvalue = item;
    localStorage.setItem("unitunitname", item.unitname);
    localStorage.setItem("unitlocation", item.location);
    localStorage.setItem("unitprojectname", item.projectname);
    localStorage.setItem("unitcolorcode", item.colorcodeindications);
    localStorage.setItem("unitlat", item.lat);
    localStorage.setItem("unitlng", item.lng);
    console.log(this.str + "//" + JSON.stringify(this.detailvalue));
    localStorage.setItem("viewlist", this.str);

  }
  onAction(act) {
    let urlstr;
    if (act == 'view') {
      if (this.str == '') {
        this.sendNotification("Please select Atleast One Unit")
      }
      else {
        this.navCtrl.setRoot(UnitdetailsPage, {
          record: this.detailvalue
        });
        return false;
      }
    }
    if (act == 'hide') {
      if (this.str == '') {
        this.sendNotification("Please select Atleast One Unit")
      }
      else {
        urlstr = "/dashboardaction?id=" + this.str1 + "&action=hide&is_mobile=1&loginid=" + this.userid;
      }

    }
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + urlstr;
    console.log(url);

    this.http.get(url, options)
      .subscribe((data) => {
        console.log("Count Response Success:" + JSON.stringify(data.json()));
        if (act == 'hide') {

          this.sendNotification(`Dashboard hide action successfully updated`);
        }
        // If the request was successful notify the user
        if (data.status === 200) {
          this.loadMap(0);
          this.reportData.startindex = 0;
          this.reportData.sort = "unit_id";
          //this.doUser();
      this.navCtrl.setRoot(this.navCtrl.getActive().component);


        }
        // Otherwise let 'em know anyway
        else {
          // this.sendNotification('Something went wrong!');
        }
      });


  }
  notification() {
    this.navCtrl.setRoot(NotificationPage);
  }
  redirectToUser() {
    this.navCtrl.setRoot(UnitsPage);
  }
  redirectToMessage() {
    this.navCtrl.setRoot(EmailPage);
  }
  redirectCalendar() {
    this.navCtrl.setRoot(CalendarPage);
  }
  redirectToMaps() {
    this.navCtrl.setRoot(MapsPage);
  }
  redirectToSettings() {
    this.navCtrl.setRoot(MyaccountPage);
  }
}


