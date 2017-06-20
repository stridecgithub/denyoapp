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
  public unitDetailData: any = {
    unit_id: '',
    unitname: '',
    location: '',
    projectname: '',
    colorcode: '',
    gen_status: '',
    nextservicedate: '',
    alarmnotificationto: '',
    favoriteindication: ''
  }
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
    let editItem = this.NP.get("record");
    let colorcode;
    let favorite;
    let index = this.colorListArr.indexOf(this.NP.get("record").colorcode); // 1
    console.log("Color Index:" + index);
    let colorvalincrmentone = index + 1;
    colorcode = "button" + colorvalincrmentone;
    console.log("Color is" + colorcode);

    if (this.NP.get("record").favorite == 'favorite') {
      favorite = "favorite";
    }
    else {
      favorite = "unfavorite";

    }


    this.unitDetailData.unit_id = editItem.unit_id;
    this.unitDetailData.unitname = editItem.unitname;
    this.unitDetailData.location = editItem.location;
    this.unitDetailData.projectname = editItem.projectname;
    this.unitDetailData.colorcodeindications = colorcode;
    this.unitDetailData.gen_status = editItem.gen_status;
    this.unitDetailData.nextservicedate = editItem.nextservicedate;
    this.unitDetailData.alarmnotificationto = editItem.nextservicedate;
    this.unitDetailData.favoriteindication = favorite;



    console.log("Color Indication:" + this.unitDetailData.colorcodeindications);
    console.log("Favorite Indication:" + this.unitDetailData.favoriteindication);

    //console.log("Pushed Item Unit Name:" + console.log(this.item.unitname));
  }
  servicingInfo() {
    this.nav.setRoot(ServicinginfoPage, {
      record: this.NP.get("record")
    });
  }

}
