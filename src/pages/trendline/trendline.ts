import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicinginfoPage } from '../servicinginfo/servicinginfo';
import { CommentsinfoPage } from '../commentsinfo/commentsinfo';
import { UserPage } from '../user/user';
import { CompanygroupPage } from '../companygroup/companygroup';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
//import { AlarmPage } from '../alarm/alarm';
import { AlarmlogPage } from '../alarmlog/alarmlog';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { Http, Headers, RequestOptions } from '@angular/http';
//import { HTTP } from '@ionic-native/http';
import * as $ from 'jquery';


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

	
	constructor(public http: Http, private sanitizer: DomSanitizer, public NP: NavParams, public navCtrl: NavController, public navParams: NavParams, public nav: NavController) {
	


	}



	ionViewDidLoad() {
		console.log('ionViewDidLoad TrendlinePage');
	}

	ionViewWillEnter() {

//$('#loadExternalURL').load('http://www.google.com');

$.ajax({
  dataType:'html',
  url:'http://denyoappv2.stridecdev.com/2/1/unitdetails',
  success:function(data) {
    $('#ajax').html(data);   
  }
});

$("#hai").click(function () {
			//$("#payment_status_div").show("slow");
			alert('Kannan');
		});
		this.iframeContent = "<iframe id='filecontainer' src=" + this.apiServiceURL + "/2/FUELLEVEL/1/showgraph height=350 width=100% frameborder=0></iframe>";

	

	}

  clickcall(){
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

