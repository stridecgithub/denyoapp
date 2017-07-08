import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { Http, Headers, RequestOptions } from '@angular/http';
//import { HTTP } from '@ionic-native/http';
import * as $ from 'jquery';



@Component({
  selector: 'page-engineview',
  templateUrl: 'engineview.html',
})
export class EngineviewPage {
public pageTitle: string;

	public item = [];
	public colorListArr = [];
	iframeContent: any;
	//private _inputpdf: string = '<iframe src="http://denyoappv2.stridecdev.com/2/1/unitdetails" height="350" frameborder="0"></iframe>';
	private apiServiceURL: string = "http://denyoappv2.stridecdev.com";

	public serviceCount;
	public commentCount;




	public unitDetailData: any = {
model_id: '',
		iframeURL: ''

	

	}
	constructor(public http: Http, private sanitizer: DomSanitizer, public NP: NavParams, public navCtrl: NavController, public navParams: NavParams, public nav: NavController) {
		this.unitDetailData.loginas = localStorage.getItem("userInfoName");
		this.unitDetailData.userId = localStorage.getItem("userInfoId");


	}


  ionViewDidLoad() {
    console.log('ionViewDidLoad EngineviewPage');
  }
  ionViewWillEnter() {
    console.log(JSON.stringify(this.NP.get("record")));
		let editItem = this.NP.get("record");
    this.iframeContent = "<iframe id='filecontainer' src=" + this.apiServiceURL + "/webview_enginedetails/"+editItem.model_id + " height=500px width=100% frameborder=0></iframe>";
  }

}
