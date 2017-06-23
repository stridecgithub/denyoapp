import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {Compose} from '../compose/compose';
@IonicPage()
@Component({
  selector: 'page-sendmsg',
  templateUrl: 'sendmsg.html',
})
export class Sendmsg {
   home=HomePage;
   compose=Compose;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sendmsg');
  }

}
