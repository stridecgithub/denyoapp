import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { UserPage } from '../user/user';
import { CommentsinfoPage } from '../commentsinfo/commentsinfo';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { DatePicker } from '@ionic-native/date-picker';
import * as $ from 'jquery'
import "slick-carousel";
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NotificationPage } from '../notification/notification';
/**
 * Generated class for the AddserviceinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addcommentsinfo',
  templateUrl: 'addcommentsinfo.html',
  providers: [Camera, FileChooser, Transfer, File, DatePicker]
})
export class AddcommentsinfoPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  public photoInfo = [];
  public addedImgListsArray = [];
  public addedImgLists = [];
  progress: number;
  public recordID: any;
  public service_unitid: any;
  public service_id: any;
  public comments: any;
  public service_subject: any;
  public service_priority: any;
  public service_resources: any;
  public service_priority_class1: any;
  public service_priority_class2: any;
  micro_timestamp: any;
  public isUploadedProcessing: boolean = false;
  public isProgress = false;
  public isUploaded: boolean = true;
  item: any;
  public isEdited: boolean = false;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  form: FormGroup;
  public addedAttachList;
  public unitDetailData: any = {
    userId: '',
    loginas: '',
    pageTitle: '',
    getremark: '',
    serviced_by: '',
    nextServiceDate: '',
    addedImgLists1: '',
    addedImgLists2: ''
  }
  public hideActionButton = true;
  constructor(public http: Http, public alertCtrl: AlertController, private datePicker: DatePicker, public NP: NavParams, public nav: NavController, public toastCtrl: ToastController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, private filechooser: FileChooser,
    private transfer: Transfer,
    private file: File, private ngZone: NgZone) {
    this.service_priority_class1 = "-outline";
    this.service_priority_class2 = "-outline";
    this.unitDetailData.loginas = localStorage.getItem("userInfoName");
    this.unitDetailData.userId = localStorage.getItem("userInfoId");
    this.unitDetailData.serviced_by = localStorage.getItem("userInfoName");

    this.form = formBuilder.group({
      profilePic: [''],
      comments: ['', Validators.required],
      service_subject: ['', Validators.required]
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
    console.log('ionViewDidLoad AddcommentsinfoPage');
  }
  ionViewWillEnter() {
    let users = localStorage.getItem("atMentionedStorage");
    if (this.NP.get("record")) {
      this.selectEntry(this.NP.get("record"));
      this.service_id = this.NP.get("record").service_id;
      if (this.NP.get("act") == 'Add') {
        this.isEdited = false;
        this.unitDetailData.pageTitle = 'Add Comments';
        this.service_unitid = this.NP.get("unit_id");
      } else {
        this.service_unitid = this.NP.get("record").service_unitid;
        this.unitDetailData.pageTitle = 'Edit Comments';
        this.isEdited = true;
      }
      console.log("Service Id:" + this.service_id);
      console.log("Service Unit Id:" + this.service_unitid);
    }

    $('#example1').suggest('@', {
      data: JSON.parse(users),
      map: function (user) {
        return {
          value: user.username,
          text: '<strong>' + user.username + '</strong> <small>' + user.fullname + '</small>'
        }
      }
    })


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
    fileTransfer.upload(path, this.apiServiceURL + '/commentupload.php?micro_timestamp=' + micro_timestamp, options)
      .then((data) => {
        let imgSrc;
        imgSrc = this.apiServiceURL + "/commentimages" + '/' + newFileName;
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


      let comments: string = this.form.controls["comments"].value,
        service_subject: string = this.form.controls["service_subject"].value;
      console.log("comments:" + comments);

      console.log("service_subject:" + service_subject);
      console.log("nextServiceDate:" + this.unitDetailData.nextServiceDate);
      console.log("Image Data" + JSON.stringify(this.addedImgLists));
      //let d = new Date();
      //let micro_timestamp = d.getFullYear() + "" + d.getMonth() + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds();
      if (this.isEdited) {
        this.updateEntry(comments, service_subject, this.addedImgLists, this.unitDetailData.hashtag, this.micro_timestamp);
      }
      else {
        this.createEntry(comments, service_subject, this.addedImgLists, this.unitDetailData.hashtag, this.micro_timestamp);
      }
    }
  }

  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(comments, service_subject, addedImgLists, remarkget, micro_timestamp) {

    let body: string = "is_mobile=1" +
      "&comment_unit_id=" + this.service_unitid +
      "&comment_priority=" + this.service_priority +
      "&comments=" + comments +
      "&comment_by=" + this.unitDetailData.userId +
      "&comment_subject=" + service_subject +
      "&micro_timestamp=" + micro_timestamp +
      "&uploadInfo=" + JSON.stringify(this.addedImgLists),
      //"&contact_number=" + this.contact_number +
      //"&contact_name=" + this.contact_name +
      //"&nextServiceDate=" + nextServiceDate,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/comments/store";
      console.log(body);
      console.log("Hello");
    console.log(url);
    

    this.http.post(url, body, options)
      .subscribe((data) => {
        //console.log("Response Success:" + JSON.stringify(data.json()));
        // If the request was successful notify the user
        if (data.status === 200) {
          localStorage.setItem("microtime", "");
          this.sendNotification(`Comments was successfully added`);
          this.nav.setRoot(CommentsinfoPage, {
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
  updateEntry(comments, service_subject, addedImgLists, remarkget, micro_timestamp) {
    let body: string = "is_mobile=1&service_id=" + this.service_id +
      "&comments=" + comments +
      "&comment_priority=" + this.service_priority +
      "&comment_unit_id=" + this.service_unitid +
      "&comment_by=" + this.unitDetailData.userId +
      "&comment_subject=" + service_subject +
      "&micro_timestamp=" + micro_timestamp +
      "&uploadInfo=" + JSON.stringify(this.addedImgLists),

      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/comments/update";
    console.log(url);
    console.log(body);
    this.http.post(url, body, options)
      .subscribe(data => {
        console.log(data);
        // If the request was successful notify the user
        if (data.status === 200) {
          localStorage.setItem("microtime", "");
          this.sendNotification(`Comments was successfully updated`);
          this.nav.setRoot(CommentsinfoPage, {
            record: this.NP.get("record")
          });
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }

  getNextDate(val, field) {
    console.log('1' + val);
    let date;
    if (val > 0) {
      date = this.addDays(val);
    } else {
      this.showDatePicker();
    }
    if (field == '1') {
      this.comments = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    } else {
      this.unitDetailData.nextServiceDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    }
  }

  getPrority(val) {
    this.service_priority = val
  }

  addDays(days) {
    let result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }
  showDatePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.unitDetailData.nextServiceDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        console.log('Got date: ', date)
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }
  address1get(hashtag) {
    console.log(hashtag);
    this.unitDetailData.hashtag = hashtag;
  }


  notification() {
    this.nav.setRoot(NotificationPage);
  }
  previous() {
    this.nav.setRoot(CommentsinfoPage, {
      record: this.NP.get("record")
    });
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

    this.comments = item.comment_remark;
    this.service_subject = item.comment_subject;

    //this.next_service_date = item.next_service_date;
    this.service_priority = item.comment_priority;
    console.log("X" + this.service_priority);
    if (this.service_priority == "1") {
      this.service_priority_class1 = '';
      console.log("Y");
    } else if (this.service_priority == "2") {
      this.service_priority_class2 = '';
      console.log("Z");
    }

    this.service_resources = item.comment_resources;
    this.unitDetailData.nextServiceDate = item.next_service_date;
    this.service_resources = item.comment_resources;

    if (this.service_resources != undefined && this.service_resources != 'undefined' && this.service_resources != '') {
      let hashhypenhash = this.service_resources.split("#-#");
      for (let i = 0; i < hashhypenhash.length; i++) {
        let imgDataArr = hashhypenhash[i].split("|");
        let imgSrc;
        imgSrc = this.apiServiceURL + "/commentimages" + '/' + imgDataArr[1];
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
      url: any = this.apiServiceURL + "/" + recordID + "/removecommentresource";
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

