import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController ,Platform} from 'ionic-angular';
import { EmailPage } from '../email/email';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-dashboardmap',
  templateUrl: 'dashboardmap.html',
})
export class DashboardmapPage {
 
  map: GoogleMap;
  mapElement: HTMLElement;
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private platform: Platform, public nav: NavController) {
    this.platform.ready().then(() => {
      this.loadMap();
    });

  }
  // Load the map when the platform is ready

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Contact',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe((data) => {
                console.log(JSON.stringify(data));
                //alert('marker clicked');
              });

            marker.on(GoogleMapsEvent.INFO_CLICK)
              .subscribe((data) => {
                console.log(JSON.stringify(data));
                this.goAboutPage();
              });

          });
      });
  }
  goAboutPage() {
    this.nav.push(EmailPage);
  }
}