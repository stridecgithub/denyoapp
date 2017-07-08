import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-engineview',
  templateUrl: 'engineview.html',
})
export class EngineviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EngineviewPage');
  }

}
