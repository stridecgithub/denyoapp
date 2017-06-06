import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyaccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {
  public pageTitle: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.pageTitle = 'My Account';
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MyaccountPage');
  }

}
