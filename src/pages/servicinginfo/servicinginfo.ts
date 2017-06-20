import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ServicinginfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-servicinginfo',
  templateUrl: 'servicinginfo.html',
})
export class ServicinginfoPage {

  constructor(public NP: NavParams, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicinginfoPage');
  }
  ionViewWillEnter() {
    console.log(JSON.stringify("Servicing Info" + this.NP.get("record")));
  }

}
