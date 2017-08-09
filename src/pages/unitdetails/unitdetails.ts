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
import { AlarmPage } from '../alarm/alarm';


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
	public userId: any;
	public item = [];
	public colorListArr = [];
	iframeContent: any;
	//private _inputpdf: string = '<iframe src="http://denyoappv2.stridecdev.com/2/1/unitdetails" height="350" frameborder="0"></iframe>';
	private apiServiceURL: string = "http://denyoappv2.stridecdev.com";

	public serviceCount;
	public commentCount;
	public msgcount: any;
	public notcount: any;



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
		console.log("UD", JSON.stringify(this.NP.get("record")));
		this.pageTitle = 'Unit Details';
		let nud = localStorage.getItem("unitdetails");
		console.log(JSON.stringify(this.NP.get("record")));
		let editItem = this.NP.get("record");
		let colorcode;

		let index = this.colorListArr.indexOf(localStorage.getItem("unitcolorcode")); // 1
		console.log("Color Index:" + index);
		let colorvalincrmentone = index + 1;
		colorcode = "button" + colorvalincrmentone;
		console.log("Color is" + colorcode);
		let favorite;
		if (this.NP.get("record").favoriteindication == 'favorite') {
			favorite = "favorite";
		}
		else {
			favorite = "unfavorite";

		}
		this.unitDetailData.favoriteindication = favorite;
		localStorage.setItem("unitId", editItem.unit_id);
		let iframeunitid = localStorage.getItem("iframeunitId");
		console.log("iframeunitid:"+iframeunitid);
		if (iframeunitid == 'undefined') {
			iframeunitid = '0';
		}
		if (iframeunitid == undefined) {
			iframeunitid = '0';
		}
		if (iframeunitid != '0') {
			this.unitDetailData.unit_id = iframeunitid
		} else {
			if (this.NP.get("record").unit_id > 0) {
				this.unitDetailData.unit_id = this.NP.get("record").unit_id;
			} else {
				this.unitDetailData.unit_id = editItem.unit_id;
			}
		}

		this.unitDetailData.unitname = localStorage.getItem("unitunitname");
		this.unitDetailData.location = localStorage.getItem("unitlocation");
		this.unitDetailData.projectname = localStorage.getItem("unitprojectname");
		this.unitDetailData.colorcodeindications = localStorage.getItem("unitcolorcode");
		console.log("Unit Details Color Code:" + this.unitDetailData.colorcodeindications);
		this.unitDetailData.gen_status = editItem.gen_status;
		this.unitDetailData.nextservicedate = editItem.nextservicedate;
		this.unitDetailData.alarmnotificationto = editItem.nextservicedate;

		this.unitDetailData.lat = localStorage.getItem("unitlat");
		this.unitDetailData.lng = localStorage.getItem("unitlng");
		console.log(this.apiServiceURL + "/" + localStorage.getItem("unitId") + "/1/unitdetails");
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
		let //body: string = "loginid=" + this.userId,
			type1: string = "application/x-www-form-urlencoded; charset=UTF-8",
			headers1: any = new Headers({ 'Content-Type': type1 }),
			options1: any = new RequestOptions({ headers: headers1 }),
			url1: any = this.apiServiceURL + "/msgnotifycount?loginid=" + this.userId;
		console.log(url1);
		// console.log(body);

		this.http.get(url1, options1)
			.subscribe((data) => {
				console.log("Count Response Success:" + JSON.stringify(data.json()));
				this.msgcount = data.json().msgcount;
				this.notcount = data.json().notifycount;
			});
	}
	servicingInfo(unitId) {
		let body: string = "is_mobile=1&userid=" + this.unitDetailData.userId +
			"&unitid=" + unitId,
			type: string = "application/x-www-form-urlencoded; charset=UTF-8",
			headers: any = new Headers({ 'Content-Type': type }),
			options: any = new RequestOptions({ headers: headers }),
			url: any = this.apiServiceURL + "/removeservicecount";
		console.log(url);
		console.log(body);

		this.http.post(url, body, options)
			.subscribe((data) => {
				console.log("Response Success:" + JSON.stringify(data.json()));
				if (data.status === 200) {
					console.log("Service count successfully removed");
				}
				// Otherwise let 'em know anyway
				else {
					console.log("Something went wrong!");
				}
			});
		this.nav.setRoot(ServicinginfoPage, {
			record: this.NP.get("record")
		});
	}
	alamInfo() {
		this.nav.setRoot(AlarmPage, {
			record: this.NP.get("record")
		});
	}
	commentsInfo(unitId) {

		let body: string = "is_mobile=1&userid=" + this.unitDetailData.userId +
			"&unitid=" + unitId,
			type: string = "application/x-www-form-urlencoded; charset=UTF-8",
			headers: any = new Headers({ 'Content-Type': type }),
			options: any = new RequestOptions({ headers: headers }),
			url: any = this.apiServiceURL + "/removecommentcount";
		console.log(url);
		console.log(body);

		this.http.post(url, body, options)
			.subscribe((data) => {

				// If the request was successful notify the user
				if (data.status === 200) {
					console.log("Comment count successfully removed");

				}
				// Otherwise let 'em know anyway
				else {
					console.log("Something went wrong!");
				}
			});

		this.nav.setRoot(CommentsinfoPage, {
			record: this.NP.get("record")
		});
	}
	alarm() {
		this.nav.setRoot(AlarmlogPage, {
			record: this.NP.get("record")
		});
	}
	enginedetail() {
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
	viewunit() {
		this.nav.setRoot(ViewunitsPage, {
			record: this.NP.get("record")
		});
	}
}
