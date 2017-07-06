import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
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

		if (this.NP.get("record").favoriteindication == 'favorite') {
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
		console.log(this.apiServiceURL + "/" + this.unitDetailData.unit_id + "/1/unitdetails");
		this.iframeContent = "<iframe id='ifrmMsg' src=" + this.apiServiceURL + "/" + this.unitDetailData.unit_id + "/1/unitdetails height=350 frameborder=0></iframe>";

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
