import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicinginfoPage } from '../servicinginfo/servicinginfo';
import { CommentsinfoPage } from '../commentsinfo/commentsinfo';
import { UserPage } from '../user/user';
import { CompanygroupPage } from '../companygroup/companygroup';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { DomSanitizer } from '@angular/platform-browser';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import * as $ from 'jquery';
import "slick-carousel";
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
	providers: [HTTP]
})
export class UnitdetailsPage {
	public pageTitle: string;

	public item = [];
	public colorListArr = [];
	iframeContent: any;
	//private _inputpdf: string = '<iframe src="http://denyoappv2.stridecdev.com/2/1/unitdetails" height="350" frameborder="0"></iframe>';
	private apiServiceURL: string = "http://denyoappv2.stridecdev.com";





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
	constructor(private sanitizer: DomSanitizer, private httpdata: HTTP, public NP: NavParams, public navCtrl: NavController, public navParams: NavParams, public nav: NavController) {
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
		this.iframeContent = "<iframe src=" + this.apiServiceURL + "/" + this.unitDetailData.unit_id + "/1/unitdetails height=350 frameborder=0></iframe>";
		let url;
		// url = this.apiServiceURL + "/orgchart?company_id=7&is_mobile=1";
		//url = "http://strtheme.stridecdev.com/ioncalendar/calendar.html";
		//url = this.apiServiceURL + "/2/1/unitdetails";
		//http://denyoappv2.stridecdev.com/2/1/unitdetails
		/*url = this.apiServiceURL + "/api/webview/unitedetails.html";
		this.httpdata.get(url, {}, {})
			.then(data => {
				this.unitDetailData.htmlContent = data.data;
			})
			.catch(error => {

				console.log(error.status);
				console.log(error.error); // error message as string
				console.log(error.headers);

			});


		$(".serv-info").click(function () {
			alert('Serve info calling...');
		})
*/

		/*
										
				$('.collanttempbar').sparkline(['0:4:9.5:1:2'], {type: 'bar', height:'140px', barWidth:'10', barHeight:'140', stackedBarColor:['#00FF50','#ffca00','#00FF50','#ffca00','#df0000']} );
									
				$('.oilpressurebar').sparkline(['0:1:0.3:9'], {type: 'bar', height:'140px', barWidth:'10', barHeight:'140', stackedBarColor:['#00FF50','#df0000','#ffca00','#00FF50']} );
									
				$('.loadpowerfactorbar').sparkline(['0:10'], {type: 'bar', height:'140px', barWidth:'10', barHeight:'140', stackedBarColor:['#00FF50','#00FF50']} );
									
				$('.batteryvoltagebar').sparkline(['0:4:4:4'], {type: 'bar', height:'140px', barWidth:'10', barHeight:'140', stackedBarColor:['#00FF50','#ffca00','#00FF50','#ffca00']} );
					//$('.batteryvoltagebar').sparkline(['0:4:4:4'], {type: 'bar', height:'140px', barWidth:'10', barHeight:'140', stackedBarColor:['#00FF50','#ffca00','#00FF50','#ffca00']} );
	
		// fault reset - alarm status change - start
		$("#FAULTBTN").click(function(){
			var token = $('input[name=_token]').val();
			var unitid = $("#unitid").val();
			$.ajax({
				headers: {'X-CSRF-TOKEN': token},
				method: "POST",
				url : "http://denyoappv2.stridecdev.com/resetfault",
				data: {unitid:unitid },		
				success : function(data){ 
					alert("Fault successfully reset!");
				}
			});
		});
		// fault reset - alarm status change - end
	
		
		$('#STARTBTN').click(function(){			
			$("#STARTBTN").removeClass("btnon");
			$("#STARTBTN").addClass("btnoff");
			$("#STARTBTN").css("color", "");
			$("#STOPBTN").removeClass("btnoff");
			$("#STOPBTN").addClass("btnon");
			$("#STOPBTN").css({"background": "#b60016", "color": "#FFF", "box-shadow": "inset 0px 0px 2px #e8676c", "margin-top": "10px"});
	
			var generatorid = "GEN0002";
			var path = "http://denyoapi.stridecdev.com/api2/"+generatorid+"/on/"+generatorid;
				
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
					if (xmlhttp.status == 200) {
						$("#startstatus").css('display', '');
					}
					else if (xmlhttp.status == 400) {
						alert('There was an error 400');
					}
					else {
						alert('something else other than 200 was returned');
					}
				}
			};
			xmlhttp.open("POST", path, true);
			xmlhttp.send();
		});
		$('#STOPBTN').click(function(){	
			$("#STARTBTN").removeClass("btnoff");
			$("#STARTBTN").addClass("btnon");
			$("#STOPBTN").removeClass("btnon");
			$("#STOPBTN").addClass("btnoff");		
			var generatorid="GEN0002";
			var path = "http://denyoapi.stridecdev.com/api2/"+generatorid+"/off/"+generatorid;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
					if (xmlhttp.status == 200) {
						$("#stopstatus").css('display', '');
					}
					else if (xmlhttp.status == 400) {
						alert('There was an error 400');
					}
					else {
						alert('something else other than 200 was returned');
					}
				}
			};
			xmlhttp.open("POST", path, true);
			xmlhttp.send();
		});
		$('#OFFBTN').click(function(){
			var generatorid="GEN0002";
			var path = "http://denyoapi.stridecdev.com/api2/"+generatorid+"/off-mode/"+generatorid;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
					if (xmlhttp.status == 200) {
						$("#offmodestatus").css('display', '');
					}
					else if (xmlhttp.status == 400) {
						alert('There was an error 400');
					}
					else {
						alert('something else other than 200 was returned');
					}
				}
			};
			xmlhttp.open("POST", path, true);
			xmlhttp.send();
		});
		$('#OFFBTNd').click(function(){
			var generatorid="GEN0002";
			var path = "http://denyoapi.stridecdev.com/api2/"+generatorid+"/off-mode/"+generatorid;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
					if (xmlhttp.status == 200) {
						$("#offmodestatus").css('display', '');
					}
					else if (xmlhttp.status == 400) {
						alert('There was an error 400');
					}
					else {
						alert('something else other than 200 was returned');
					}
				}
			};
			xmlhttp.open("POST", path, true);
			xmlhttp.send();
		});
		$('#MANBTN').click(function(){
			var generatorid="GEN0002";
			var path = "http://denyoapi.stridecdev.com/api2/"+generatorid+"/man-mode/"+generatorid;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
					if (xmlhttp.status == 200) {
						$("#manmodestatus").css('display', '');
					}
					else if (xmlhttp.status == 400) {
						alert('There was an error 400');
					}
					else {
						alert('something else other than 200 was returned');
					}
				}
			};
			xmlhttp.open("POST", path, true);
			xmlhttp.send();
		});
		$('#MANBTNd').click(function(){
			var generatorid="GEN0002";
			var path = "http://denyoapi.stridecdev.com/api2/"+generatorid+"/man-mode/"+generatorid;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
					if (xmlhttp.status == 200) {
						$("#manmodestatus").css('display', '');
					}
					else if (xmlhttp.status == 400) {
						alert('There was an error 400');
					}
					else {
						alert('something else other than 200 was returned');
					}
				}
			};
			xmlhttp.open("POST", path, true);
			xmlhttp.send();
		});
		$('#AUTOBTN').click(function(){
			var generatorid="GEN0002";
			var path = "http://denyoapi.stridecdev.com/api2/"+generatorid+"/auto-mode/"+generatorid;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
					if (xmlhttp.status == 200) {
						$(".automodestatus").css('display', '');
					}
					else if (xmlhttp.status == 400) {
						alert('There was an error 400');
					}
					else {
						alert('something else other than 200 was returned');
					}
				}
			};
			xmlhttp.open("POST", path, true);
			xmlhttp.send();
		});
		
		$('#AUTOBTNd').click(function(){
			var generatorid="GEN0002";
			var path = "http://denyoapi.stridecdev.com/api2/"+generatorid+"/auto-mode/"+generatorid;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
					if (xmlhttp.status == 200) {
						$("#automodestatus").css('display', '');
					}
					else if (xmlhttp.status == 400) {
						alert('There was an error 400');
					}
					else {
						alert('something else other than 200 was returned');
					}
				}
			};
			xmlhttp.open("POST", path, true);
			xmlhttp.send();
		});
		
		$('#FAULTBTN').click(function(){
			var generatorid="GEN0002";
			var path = "http://denyoapi.stridecdev.com/api2/"+generatorid+"/fault-reset/"+generatorid;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
					if (xmlhttp.status == 200) {
						$("#faultmodestatus").css('display', '');
					}
					else if (xmlhttp.status == 400) {
						alert('There was an error 400');
					}
					else {
						alert('something else other than 200 was returned');
					}
				}
			};
			xmlhttp.open("POST", path, true);
			xmlhttp.send();
		});*/
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
