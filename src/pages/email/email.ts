import { Component, ViewChild, NgZone } from '@angular/core';
import { AlertController, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { UserPage } from '../user/user';
import { ServicinginfoPage } from '../servicinginfo/servicinginfo';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { DatePicker } from '@ionic-native/date-picker';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NotificationPage } from '../notification/notification';
/**
 * Generated class for the AddserviceinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
  providers: [Camera, FileChooser, Transfer, File, DatePicker]
})
export class EmailPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  public photoInfo = [];
  public inboxLists = [];
  public loginas: any;
  public hashtag;
  public addedImgListsArray = [];
  public addedImgLists = [];
  progress: number;
  public pageTitle: any;
  pet: string = "inbox";
  public recordID: any;
  public userId: any;
  public str: any;
  public service_id: any;
  public serviced_by: any;
  public serviced_datetime: any;
  public service_subject: any;
  public service_remark: any;
  public next_service_date: any;
  public service_priority: any;
  is_request: boolean
  public serviced_by_name: any;
  public service_resources: any;
  public service_priority_class1: any;
  public service_priority_class2: any;
  micro_timestamp: any;
  public isUploadedProcessing: boolean = false;
  public isProgress = false;
  public isUploaded: boolean = true;
  public selectedAction = [];
  item: any;

  public isEdited: boolean = false;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  form: FormGroup;
  public addedAttachList;
  public totalCount;
  public inboxData: any =
  {
    status: '',
    sort: 'messages_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
  public hideActionButton = true;
  constructor(public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private datePicker: DatePicker, public NP: NavParams, public nav: NavController, public toastCtrl: ToastController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, private filechooser: FileChooser,
    private transfer: Transfer,
    private file: File, private ngZone: NgZone) {
    this.service_priority_class1 = "-outline";
    this.service_priority_class2 = "-outline";
    this.userId = localStorage.getItem("userInfoId");
    this.str = '';
    this.form = formBuilder.group({
      subject: ['', Validators.required],
      composemessagecontent: ['', Validators.required],
      to: ['', Validators.required]

    });
    this.service_priority = 0;
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });


    let already = localStorage.getItem("microtime");
    if (already != undefined && already != 'undefined' && already != '') {
      this.micro_timestamp = already;
    } else {
      let dateStr = new Date();
      let yearstr = dateStr.getFullYear();
      let monthstr = dateStr.getMonth();
      let datestr = dateStr.getDate();
      let hrstr = dateStr.getHours();
      let mnstr = dateStr.getMinutes();
      let secstr = dateStr.getSeconds();
      this.micro_timestamp = yearstr + "" + monthstr + "" + datestr + "" + hrstr + "" + mnstr + "" + secstr;

    }
    localStorage.setItem("microtime", this.micro_timestamp);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddserviceinfoPage');
  }

  /*******************/
  /* Pull to Refresh */
  /*******************/
  doRefresh(refresher) {
    console.log('doRefresh function calling...');
    this.inboxData.startindex = 0;
    this.inboxLists = [];
    this.doInbox();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }


  /**********************/
  /* Infinite scrolling */
  /**********************/
  doInfinite(infiniteScroll) {
    console.log('InfinitScroll function calling...');
    console.log('A');
    console.log("Total Count:" + this.totalCount)
    if (this.inboxData.startindex < this.totalCount && this.inboxData.startindex > 0) {
      console.log('B');
      this.doInbox();
    }
    console.log('C');
    setTimeout(() => {
      console.log('D');
      infiniteScroll.complete();
    }, 500);
    console.log('E');
  }

  presentLoading(parm) {
    let loader;
    loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    if (parm > 0) {
      loader.present();
    } else {
      loader.dismiss();
    }
  }
  /****************************/
  /*@doCompanyGroup calling on report */
  /****************************/
  doInbox() {
    this.presentLoading(1);
    if (this.inboxData.status == '') {
      this.inboxData.status = "messages_id";
    }
    if (this.inboxData.sort == '') {
      this.inboxData.sort = "messages_id";
    }
    //http://denyoappv2.stridecdev.com/companygroup?is_mobile=1
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/messages?is_mobile=1&startindex=" + this.inboxData.startindex + "&results=" + this.inboxData.results + "&sort=" + this.inboxData.sort + "&dir=" + this.inboxData.sortascdesc + "&loginid=" + this.userId;
    let res;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        res = data.json();
        console.log(JSON.stringify(res));
        console.log("1" + res.messages.length);
        console.log("2" + res.messages);
        if (res.messages.length > 0) {
          this.inboxLists = res.messages;
          this.totalCount = res.totalCount;
          this.inboxData.startindex += this.inboxData.results;
          //this.loadingMoreDataContent = 'Loading More Data';
        } else {
          this.totalCount = 0;
          //this.loadingMoreDataContent = 'No More Data';
        }
        console.log("Total Record:" + this.totalCount);

      });
    this.presentLoading(0);
  }
  onSegmentChanged(val, item) {
    let splitdata = val.split(",");
    this.inboxData.sort = splitdata[0];
    this.inboxData.sortascdesc = splitdata[1];
    //this.inboxData.status = "ALL";
    this.inboxData.startindex = 0;
    console.log("listbox:" + JSON.stringify(this.inboxLists));
    //for (let i = 0; i < this.inboxLists.length; i++) {
    for (let unitgroup in item) {
      if (item[unitgroup].messages_id == true) {

      }
    }
    console.log(JSON.stringify(this.selectedAction));
    //this.inboxLists = [];
    this.doInbox();
  }

  getCheckBoxValue(name) {
    /*console.log("Available data" + name);
    this.selectedAction.push({
      availabledata: name
    })
    console.log(JSON.stringify(this.selectedAction));*/
    if (name != '') {
      if (this.str == '') {
        this.str = name;
      } else {
        this.str = this.str + "," + name;
      }
    }
    console.log(this.str);
  }
  ionViewWillEnter() {
    this.getPrority(1);
    let users = localStorage.getItem("atMentionedStorage");
    this.is_request = false;
    console.log(JSON.stringify(this.NP.get("record")));
    let editItem = this.NP.get("record");

    if (this.NP.get("record")) {
      this.selectEntry(this.NP.get("record"));
      this.service_id = this.NP.get("record").service_id;
      if (this.NP.get("act") == 'Add') {
        this.isEdited = false;
        this.pageTitle = 'Servicing Info Add';

      } else {

        this.pageTitle = 'Servicing Info Edit';
        this.isEdited = true;
      }
      console.log("Service Id:" + this.service_id);

    }



    this.inboxData.startindex = 0;
    this.inboxData.sort = "messages_id";
    this.doInbox();


  }



  takePictureURL(micro_timestamp) {
    this.isUploadedProcessing = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.fileTrans(imageData, micro_timestamp);
      this.addedAttachList = imageData;
    }, (err) => {
      // Handle error
      this.sendNotification(err);
    });
  }

  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

  fileTrans(path, micro_timestamp) {
    const fileTransfer: TransferObject = this.transfer.create();
    let currentName = path.replace(/^.*[\\\/]/, '');
    console.log("File Name is:" + currentName);

    //YmdHis_123_filename
    let dateStr = new Date();
    let year = dateStr.getFullYear();
    let month = dateStr.getMonth();
    let date = dateStr.getDate();
    let hr = dateStr.getHours();
    let mn = dateStr.getMinutes();
    let sec = dateStr.getSeconds();
    let d = new Date(),
      n = d.getTime(),
      newFileName = year + "" + month + "" + date + "" + hr + "" + mn + "" + sec + "_123_" + n + ".jpg";

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: newFileName,
      headers: {},
      chunkedMode: false,
      mimeType: "text/plain",
    }




    //  http://127.0.0.1/ionic/upload_attach.php
    //http://amahr.stridecdev.com/getgpsvalue.php?key=create&lat=34&long=45
    fileTransfer.onProgress(this.onProgress);
    fileTransfer.upload(path, this.apiServiceURL + '/fileupload.php?micro_timestamp=' + micro_timestamp, options)
      .then((data) => {
        let imgSrc;
        imgSrc = this.apiServiceURL + "/serviceimages" + '/' + newFileName;
        this.addedImgLists.push({
          imgSrc: imgSrc,
          imgDateTime: new Date(),
          fileName: newFileName
        });

        //loading.dismiss();
        if (this.addedImgLists.length > 9) {
          this.isUploaded = false;
        }
        this.progress += 5;
        this.isProgress = false;
        this.isUploadedProcessing = false;
        return false;



        // Save in Backend and MysQL
        //this.uploadToServer(data.response);
        // Save in Backend and MysQL
      }, (err) => {
        //loading.dismiss();
        console.log("Upload Error:" + JSON.stringify(err));
        this.sendNotification("Upload Error:" + JSON.stringify(err));
      })
  }

  onProgress = (progressEvent: ProgressEvent): void => {
    this.ngZone.run(() => {
      if (progressEvent.lengthComputable) {
        let progress = Math.round((progressEvent.loaded / progressEvent.total) * 95);
        this.isProgress = true;
        this.progress = progress;
      }
    });
  }

  saveEntry() {
    console.log(this.form.controls);
    if (this.isUploadedProcessing == false) {
      /* let name: string = this.form.controls["lat"].value,
         description: string = this.form.controls["long"].value,
         photos: object = this.addedImgLists;*/


      let to: string = this.form.controls["to"].value,
        copytome: string = this.form.controls["copytome"].value,
        next_service_date: string = this.form.controls["next_service_date"].value,
        serviced_by: string = this.form.controls["serviced_by"].value,
        is_request: string = this.form.controls["is_request"].value,
        service_subject: string = this.form.controls["service_subject"].value;
      console.log("serviced_datetime:" + to);
      console.log("service_remark:" + copytome);
      console.log("serviced_by:" + serviced_by);
      console.log("is_request:" + is_request);
      console.log("service_subject:" + service_subject);

      console.log("Image Data" + JSON.stringify(this.addedImgLists));
      //let d = new Date();
      //let micro_timestamp = d.getFullYear() + "" + d.getMonth() + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds();
      if (this.isEdited) {
        this.updateEntry();
      }
      else {
        this.createEntry(this.micro_timestamp, to, copytome);
      }
    }
  }

  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(micro_timestamp, to, copytome) {

    let body: string = "is_mobile=1" +
      "&important=" + this.service_priority +
      "&important=" + this.service_priority +
      "&loginid=" + this.userId +
      "&to=" + this.userId +
      "&copytome=" + copytome +
      "&uploadInfo=" + JSON.stringify(this.addedImgLists),
      //"&contact_number=" + this.contact_number +
      //"&contact_name=" + this.contact_name +
      //"&nextServiceDate=" + nextServiceDate,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/services/store";
    console.log(url);
    console.log(body);

    this.http.post(url, body, options)
      .subscribe((data) => {
        //console.log("Response Success:" + JSON.stringify(data.json()));
        // If the request was successful notify the user
        if (data.status === 200) {
          localStorage.setItem("microtime", "");
          this.sendNotification(`Servicing info was successfully added`);
          this.nav.setRoot(ServicinginfoPage, {
            record: this.NP.get("record")
          });
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }



  // Update an existing record that has been edited in the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of update followed by the key/value pairs
  // for the record data
  updateEntry() {
    let body: string = "is_mobile=1&service_id=" + this.service_id +

      "&is_denyo_support=0" +


      "&uploadInfo=" + JSON.stringify(this.addedImgLists),

      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/services/update";
    console.log(url);
    console.log(body);
    this.http.post(url, body, options)
      .subscribe(data => {
        console.log(data);
        // If the request was successful notify the user
        if (data.status === 200) {
          localStorage.setItem("microtime", "");
          this.sendNotification(`Servicing info  was successfully updated`);
          this.nav.setRoot(ServicinginfoPage, {
            record: this.NP.get("record")
          });
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }



  getPrority(val) {
    this.service_priority = val
  }

  addDays(days) {
    let result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

  address1get(hashtag) {
    console.log(hashtag);
    this.hashtag = hashtag;
  }

  updateIsRequest(val) {
    console.log('Is Request:' + this.is_request);
  }

  previous() {
    this.nav.setRoot(ServicinginfoPage, {
      record: this.NP.get("record")
    });
  }




  notification() {
    this.nav.setRoot(NotificationPage);
  }
  redirectToUser() {
    this.nav.setRoot(UserPage);
  }
  redirectToUnitGroup() {
    this.nav.setRoot(UnitgroupPage);
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
  selectEntry(item) {
    this.serviced_by = item.serviced_by;
    this.serviced_datetime = item.serviced_datetime;
    this.service_subject = item.service_subject;
    this.service_remark = item.service_remark;
    //this.next_service_date = item.next_service_date;
    this.service_priority = item.service_priority;
    console.log("X" + this.service_priority);
    if (this.service_priority == "1") {
      this.service_priority_class1 = '';
      console.log("Y");
    } else if (this.service_priority == "2") {
      this.service_priority_class2 = '';
      console.log("Z");
    }
    if (item.is_request > 0) {
      this.is_request = true;
    }
    this.serviced_by_name = item.serviced_by_name;
    this.service_resources = item.service_resources;

    this.service_resources = item.service_resources;

    if (this.service_resources != undefined && this.service_resources != 'undefined' && this.service_resources != '') {
      let hashhypenhash = this.service_resources.split("#-#");
      for (let i = 0; i < hashhypenhash.length; i++) {
        let imgDataArr = hashhypenhash[i].split("|");
        let imgSrc;
        imgSrc = this.apiServiceURL + "/serviceimages" + '/' + imgDataArr[1];
        this.addedImgLists.push({
          imgSrc: imgSrc,
          imgDateTime: new Date(),
          fileName: imgDataArr[1],
          resouce_id: imgDataArr[0]
        });
      }

      if (this.addedImgLists.length > 9) {
        this.isUploaded = false;
      }
    }
  }
  doRemoveResouce(id, item) {
    console.log("Deleted Id" + id);
    let confirm = this.alertCtrl.create({
      message: 'Are you sure you want to delete this file?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.deleteEntry(id);
          for (let q: number = 0; q < this.addedImgLists.length; q++) {
            if (this.addedImgLists[q] == item) {
              this.addedImgLists.splice(q, 1);
            }
          }
        }
      },
      {
        text: 'No',
        handler: () => { }
      }]
    });
    confirm.present();
  }


  // Remove an existing record that has been selected in the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of delete followed by the key/value pairs
  // for the record ID we want to remove from the remote database
  deleteEntry(recordID) {
    let
      //body: string = "key=delete&recordID=" + recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/" + recordID + "/removeresource";
    this.http.get(url, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.sendNotification(`Congratulations file was successfully deleted`);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }

}
