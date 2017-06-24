
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { IonicApp } from 'ionic-angular/index'
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Sendmsg } from '../sendmsg/sendmsg';
import { Compose } from '../compose/compose';
import { CompanygroupPage } from '../companygroup/companygroup';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  @ViewChild('mapContainer') mapContainer: ElementRef;
  sendmsg = Sendmsg;
  compose = Compose;
  app: IonicApp;
  data: any;
  public loginas: any;
  public userId: any;
  public rootPage: any;
  public pageTitle: string;
  

  
  map: any;
  private baseURI: string = "http://strtheme.stridecdev.com/";
  Catdata: any;
  constructor(app: IonicApp, public navCtrl: NavController, private alertCtrl: AlertController, private http: Http) {
    this.rootPage = MapsPage; this.app = app;
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
    this.pageTitle = "Maps";
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MapsPage');
  }


 ionViewWillEnter() {
    
    this.displayGoogleMap();
    this.getMarkers();
    
  }

displayGoogleMap() {
    /*let latLng = new google.maps.LatLng(9.9252, 78.1198);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);*/
  }

  getMarkers() {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "googlemap.php";

    this.http.get(url, options)
      .subscribe(data => {
        console.log(JSON.stringify(data.json()));
        this.addMarkersToMap(data.json());
      });
  }

  addMarkersToMap(markers) {
   /* for (let marker of markers) {
      var position = new google.maps.LatLng(marker.lat, marker.lng);
      var dogwalkMarker = new google.maps.Marker({ position: position, title: marker.address });
      dogwalkMarker.setMap(this.map);
    }*/
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


