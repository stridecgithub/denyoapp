import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserPage } from '../user/user';
import { CompanygroupPage } from '../companygroup/companygroup';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { DomSanitizer } from '@angular/platform-browser';



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
	//private _inputpdf: string = '<iframe src="http://denyoappv2.stridecdev.com/2/1/unitdetails" height="350" frameborder="0"></iframe>';
	private apiServiceURL: string = "http://denyoappv2.stridecdev.com";


	constructor(private sanitizer: DomSanitizer, public NP: NavParams, public navCtrl: NavController, public navParams: NavParams, public nav: NavController) {



	}



	ionViewDidLoad() {
		console.log('ionViewDidLoad TrendlinePage');
	}

	ionViewWillEnter() {
		console.log("Alaram Id" + this.NP.get("alarmid"));
let alarmID=this.NP.get("alarmid");
		//$('#loadExternalURL').load('http://www.google.com');

		$.ajax({
			dataType: 'html',
			url: 'http://denyoappv2.stridecdev.com/2/FUELLEVEL/1/showgraph',
			success: function (data) {
				$('#ajax').html(data);
			}
		});

		$("#hai").click(function () {
			//$("#payment_status_div").show("slow");
			alert('Kannan');
		});
		this.iframeContent = "<iframe id='filecontainer' src=" + this.apiServiceURL + "/"+alarmID+"/FUELLEVEL/1/showgraph height=350 width=100% frameborder=0></iframe>";



	}

	clickcall() {
		console.log('Enter kannan kris thibi1');
	}
	previous() {
		this.nav.setRoot(UnitsPage);
	}
	redirectToUser() {
		this.nav.setRoot(UserPage);
	}

	redirectToUnitGroup() {
		this.nav.setRoot(UnitgroupPage);
	}
	redirectToCompanyGroup() {
		this.nav.setRoot(CompanygroupPage);
	}
	redirectToUnits() {
		this.nav.setRoot(UnitsPage);
	}
	redirectToMyAccount() {
		this.nav.setRoot(MyaccountPage);
	}

	redirectToRole() {
		this.nav.setRoot(RolePage);
	}
}

