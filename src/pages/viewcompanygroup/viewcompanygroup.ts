import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewcompanygroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-viewcompanygroup',
  templateUrl: 'viewcompanygroup.html',
})
export class ViewcompanygroupPage {
  public companygroup_name: any;
  public address: any;
  public country: any;
  public contact: any;
  public userId: any;
  public responseResultCountry: any;
  public recordID: any = null;
  public pageTitle: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public NP: NavParams) {
  }

  ionViewWillEnter() {
    console.log(this.NP.get("record"));
    if (this.NP.get("record")) {
      console.log(this.NP.get("act"));
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'View Company Group';
    }
  }
  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    console.log(this.companygroup_name);
    this.companygroup_name = item.companygroup_name;
    this.address = item.address;
    this.country = item.country;
    this.contact = item.contact;
    this.recordID = item.companygroup_id;
  }
}
