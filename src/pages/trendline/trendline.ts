import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserPage } from '../user/user';
import { CompanygroupPage } from '../companygroup/companygroup';
import { AlarmlogPage } from '../alarmlog/alarmlog';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { DomSanitizer } from '@angular/platform-browser';


import { OrgchartPage } from '../orgchart/orgchart';
/**
 * Generated class for the UnitdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
	selector: 'page-trendline',
	templateUrl: 'trendline.html'
})
export class TrendlinePage {
	public pageTitle: string;
	iframeContent: any;
	
	public loginas: any;
	//private _inputpdf: string = '<iframe src="http://denyoappv2.stridecdev.com/2/1/unitdetails" height="350" frameborder="0"></iframe>';
	private apiServiceURL: string = "http://denyoappv2.stridecdev.com";


	constructor(private sanitizer: DomSanitizer, public NP: NavParams, public navCtrl: NavController, public navParams: NavParams, public nav: NavController) {

 this.loginas = localStorage.getItem("userInfoName");

	}



	ionViewDidLoad() {
		 this.pageTitle = "Trendline";
		console.log('ionViewDidLoad TrendlinePage');
	}

	ionViewWillEnter() {
		console.log("Alaram Id" + this.NP.get("alarmid"));
		let alarmID = this.NP.get("alarmid");
		//$('#loadExternalURL').load('http://www.google.com');


		this.iframeContent = "<iframe id='filecontainer' src=" + this.apiServiceURL + "/" + alarmID + "/FUELLEVEL/1/showgraph height=350 width=100% frameborder=0></iframe>";



	}

	clickcall() {
		console.log('Enter kannan kris thibi1');
	}
	previous() {
		this.nav.push(AlarmlogPage);
	}
	redirectToUser() {
		this.nav.push(UserPage);
	}

	redirectToUnitGroup() {
		this.nav.push(UnitgroupPage);
	}
	redirectToCompanyGroup() {
		this.nav.push(CompanygroupPage);
	}
	redirectToUnits() {
		this.nav.push(UnitsPage);
	}
	redirectToMyAccount() {
		this.nav.push(OrgchartPage);
	}

	redirectToRole() {
		this.nav.push(RolePage);
	}
}

