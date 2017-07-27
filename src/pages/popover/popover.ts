import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  public photo: any;
  public firstname: any;
  public lastname: any;
  public job_position: any;
  public itemData: any;
  public itemDataDelete = [];
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.itemData = this.navParams.get("item");
    console.log(JSON.stringify(this.itemData));
    this.itemDataDelete.push({ staff_id: this.itemData.staff_id });
    this.photo = this.itemData.photo;
    this.firstname = this.itemData.firstname;
    this.lastname = this.itemData.lastname;
    this.job_position = this.itemData.job_position;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }
  close(itemData) {
    this.viewCtrl.dismiss(itemData);
  }

}
