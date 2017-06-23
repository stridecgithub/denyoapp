import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Sendmsg} from '../sendmsg/sendmsg';
import {HomePage} from '../home/home';
/**
 * Generated class for the Compose page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 interface External{
    notify: Function;
}
@IonicPage()
@Component({
  selector: 'page-compose',
  templateUrl: 'compose.html',
})

export class Compose {
  sendmsg = Sendmsg;
  home=HomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Compose');
  }

}
