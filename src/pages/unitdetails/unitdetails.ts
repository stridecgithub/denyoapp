import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicinginfoPage } from '../servicinginfo/servicinginfo';
/**
 * Generated class for the UnitdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unitdetails',
  templateUrl: 'unitdetails.html',
})
export class UnitdetailsPage {
  public pageTitle: string;
  public item = [];
  public colorListArr = [];
  constructor(public NP: NavParams, public navCtrl: NavController, public navParams: NavParams, public nav: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnitdetailsPage');
  }

  ionViewWillEnter() {
    this.colorListArr = [
      "FBE983",
      "5584EE",
      "A4BDFD",
      "47D6DC",
      "7AE7BE",
      "51B749",
      "FBD75C",
      "FFB878",
      "FF877C",
      "DC2128",
      "DAADFE",
      "E1E1E1"
    ];
    this.pageTitle = 'Unit Details';
    console.log(JSON.stringify(this.NP.get("record")));    
    let colorcode;
    let favorite;
    let index = this.colorListArr.indexOf(this.NP.get("record").colorcode); // 1
    console.log("Color Index:" + index);
    let colorvalincrmentone = index + 1;
    colorcode = "button" + colorvalincrmentone;
    console.log("Color is" + colorcode);

    if (this.NP.get("record").favorite == 1) {
      favorite = "favorite";
    }
    else {
      favorite = "unfavorite";

    }
    this.item.push({
      unit_id: this.NP.get("record").unit_id,
      unitname: this.NP.get("record").unitname,
      location: this.NP.get("record").location,
      projectname: this.NP.get("record").projectname,
      colorcode: this.NP.get("record").colorcode,
      nextservicedate: this.NP.get("record").nextservicedate,
      colorcodeindications: colorcode,
      controllerid: this.NP.get("record").controllerid,
      neaplateno: this.NP.get("record").neaplateno,
      companys_id: this.NP.get("record").companys_id,
      unitgroups_id: this.NP.get("record").unitgroups_id,
      models_id: this.NP.get("record").models_id,
      alarmnotificationto: this.NP.get("record").alarmnotificationto,
      favoriteindication: favorite
    });
    console.log("Item Pushed:" + console.log(this.NP.get("record").unit_id));

    //console.log("Pushed Item Unit Name:" + console.log(this.item.unitname));
  }
  servicingInfo() {
    this.nav.setRoot(ServicinginfoPage, {
      record: this.NP.get("record")
    });
  }

}
