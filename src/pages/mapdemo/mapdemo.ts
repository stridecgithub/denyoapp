import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
declare var google;
/**
 * Generated class for the MapdemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mapdemo',
  templateUrl: 'mapdemo.html',
})
export class MapdemoPage {

  /*constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapdemoPage');
  }
*/


  @ViewChild('mapContainer') mapContainer: ElementRef;
  map: any;
  private baseURI: string = "http://strtheme.stridecdev.com/";
  constructor(public navCtrl: NavController, public http: Http,
    public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.presentLoading(1);
    this.displayGoogleMap();
    this.getMarkers();
    this.presentLoading(0);
  }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(9.9252, 78.1198);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
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
    for (let marker of markers) {
      var position = new google.maps.LatLng(marker.lat, marker.lng);
      var dogwalkMarker = new google.maps.Marker({ position: position, title: marker.address });
      dogwalkMarker.setMap(this.map);
    }
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
