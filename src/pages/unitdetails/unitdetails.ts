import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicinginfoPage } from '../servicinginfo/servicinginfo';
import { CommentsinfoPage } from '../commentsinfo/commentsinfo';
import { UserPage } from '../user/user';
import { CompanygroupPage } from '../companygroup/companygroup';
import { RolePage } from '../role/role';
import { EnginedetailviewPage } from '../enginedetailview/enginedetailview';
import { ViewunitsPage } from '../viewunits/viewunits';
//import { AlarmPage } from '../alarm/alarm';
import { AlarmlogPage } from '../alarmlog/alarmlog';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { Http, Headers, RequestOptions } from '@angular/http';
//import { HTTP } from '@ionic-native/http';
import * as $ from 'jquery';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { NotificationPage } from '../notification/notification';
import { MapsPage } from '../maps/maps';
import { ReportsPage } from '../reports/reports';
import { CalendarPage } from '../calendar/calendar';
import { EmailPage } from '../email/email';


/**
 * Generated class for the UnitdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
	selector: 'page-unitdetails',
	templateUrl: 'unitdetails.html'
})
export class UnitdetailsPage {
	public pageTitle: string;

	public item = [];
	public colorListArr = [];
	iframeContent: any;
	//private _inputpdf: string = '<iframe src="http://denyoappv2.stridecdev.com/2/1/unitdetails" height="350" frameborder="0"></iframe>';
	private apiServiceURL: string = "http://denyoappv2.stridecdev.com";

	public serviceCount;
	public commentCount;




	public unitDetailData: any = {
		unit_id: '',
		unitname: '',
		location: '',
		projectname: '',
		colorcode: '',
		gen_status: '',
		nextservicedate: '',
		alarmnotificationto: '',
		favoriteindication: '',
		userId: '',
		loginas: '',
		htmlContent: '',
		lat: '',
		lng: '',
		iframeURL: ''

	}
	constructor(public http: Http, private sanitizer: DomSanitizer, public NP: NavParams, public navCtrl: NavController, public navParams: NavParams, public nav: NavController) {
		this.unitDetailData.loginas = localStorage.getItem("userInfoName");
		this.unitDetailData.userId = localStorage.getItem("userInfoId");


	}



	ionViewDidLoad() {
		console.log('ionViewDidLoad UnitdetailsPage');
	}

	ionViewWillEnter() {
		$('#alarm').trigger("click");
		$('#filecontainer').contents().find('#alarm').trigger("click");
		$("#payment_status_div").hide();
		var iframe = $('#filecontainer').contents();
		iframe.find("#alarm").click(function () {
			//$("#payment_status_div").show("slow");
			alert('Kannan');
		});

/*
		$('iframe#filecontainer').on('load', function () {   // 2. wait for the iframe to load
			var $inner$ = $(this)[0].contentWindow.$;   // 3. get hold of the inner jQuery
			$inner$(function () {   // 4. wait for the inner jQuery to be ready
				$inner$.on('click', function () {   // Now I can intercept inner events.
					// do something
				});
			});
		});
*/
		/*
		$("#filecontainer #alarm").click(function () {
			console.log('Alarm button pressed');			// do something here
			//this.baseURI.anchor.;
		});*/

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
		localStorage.setItem("unitdetails", JSON.stringify(this.NP.get("record")));
		console.log("UD",JSON.stringify(this.NP.get("record")));
		this.pageTitle = 'Unit Details';
		let nud=localStorage.getItem("unitdetails");
		console.log(JSON.stringify(this.NP.get("record")));
		let editItem = this.NP.get("record");
		let colorcode;
		let favorite;
		let index = this.colorListArr.indexOf(this.NP.get("record").colorcode); // 1
		console.log("Color Index:" + index);
		let colorvalincrmentone = index + 1;
		colorcode = "button" + colorvalincrmentone;
		console.log("Color is" + colorcode);

		if (this.NP.get("record").favoriteindication == 'favorite') {
			favorite = "favorite";
		}
		else {
			favorite = "unfavorite";

		}


		this.unitDetailData.unit_id =  localStorage.getItem("unitId");
		this.unitDetailData.unitname = localStorage.getItem("unitunitname"); 
		this.unitDetailData.location =localStorage.getItem("unitlocation"); 
		this.unitDetailData.projectname = localStorage.getItem("unitprojectname"); 
		this.unitDetailData.colorcodeindications = localStorage.getItem("unitcolorcode");
		this.unitDetailData.gen_status = editItem.gen_status;
		this.unitDetailData.nextservicedate = editItem.nextservicedate;
		this.unitDetailData.alarmnotificationto = editItem.nextservicedate;
		this.unitDetailData.favoriteindication = favorite;
		this.unitDetailData.lat=localStorage.getItem("unitlat");
		this.unitDetailData.lng=localStorage.getItem("unitlng");
		console.log(this.apiServiceURL + "/" + localStorage.getItem("unitId")+ "/1/unitdetails");
		this.iframeContent = "<iframe id='filecontainer' src=" + this.apiServiceURL + "/" + this.unitDetailData.unit_id + "/1/unitdetails height=350 width=100% frameborder=0></iframe>";

		//http://denyoappv2.stridecdev.com/getcount?loginid=1&unitid=2



		let body: string = "is_mobile=1&loginid=" + this.unitDetailData.userId +
			"&unitid=" + this.unitDetailData.unit_id,
			type: string = "application/x-www-form-urlencoded; charset=UTF-8",
			headers: any = new Headers({ 'Content-Type': type }),
			options: any = new RequestOptions({ headers: headers }),
			url: any = this.apiServiceURL + "/getcount";
		console.log(url);
		console.log(body);

		this.http.post(url, body, options)
			.subscribe((data) => {
				console.log("Count Response Success:" + JSON.stringify(data.json()));
				let res = data.json();
				this.serviceCount = res.servicecount;
				this.commentCount = res.commentcount;
				// If the request was successful notify the user
				if (data.status === 200) {
					//this.sendNotification(`Comment count successfully removed`);

				}
				// Otherwise let 'em know anyway
				else {
					// this.sendNotification('Something went wrong!');
				}
			});

	}
	servicingInfo() {
		this.nav.setRoot(ServicinginfoPage, {
			record: this.NP.get("record")
		});
	}
	commentsInfo() {
		this.nav.setRoot(CommentsinfoPage, {
			record: this.NP.get("record")
		});
	}
	alarm() {
		this.nav.setRoot(AlarmlogPage, {
			record: this.NP.get("record")
		});
	}
	enginedetail()
	{
		this.nav.setRoot(EnginedetailviewPage, {
			record: this.NP.get("record")
		});
	}
	previous() {
		this.nav.setRoot(UnitsPage);
	}
	 notification() {
    this.nav.setRoot(NotificationPage);
  }
  redirectToUser() {
    this.nav.setRoot(UnitsPage);
  }
  redirectToMessage() {
    this.nav.setRoot(EmailPage);
  }
  redirectCalendar() {
    this.nav.setRoot(CalendarPage);
  }
  redirectToMaps() {
    this.nav.setRoot(MapsPage);
  }
  redirectToSettings() {
    this.nav.setRoot(MyaccountPage);
  }
	viewunit()
	{
		this.nav.setRoot(ViewunitsPage, {
			record: this.NP.get("record")
		});
	}
}
