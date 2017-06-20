import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { UserPage } from '../user/user';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { DatePicker } from '@ionic-native/date-picker';
import * as $ from 'jquery'
import "slick-carousel";
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the AddserviceinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addserviceinfo',
  templateUrl: 'addserviceinfo.html',
  providers: [Camera, FileChooser, Transfer, File, DatePicker]
})
export class AddserviceinfoPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  public photoInfo = [];
  public addedImgListsArray = [];
  public addedImgLists = [];
  progress: number;
  public recordID;
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
  constructor(public http: Http, private datePicker: DatePicker, public nav: NavController, public toastCtrl: ToastController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, private filechooser: FileChooser,
    private transfer: Transfer,
    private file: File, private ngZone: NgZone) {
    this.unitDetailData.loginas = localStorage.getItem("userInfoName");
    this.unitDetailData.userId = localStorage.getItem("photoInfoId");
    this.unitDetailData.serviced_by = localStorage.getItem("userInfoName");
    this.unitDetailData.pageTitle = 'Servicing Act';
    this.form = formBuilder.group({
      profilePic: [''],
      serviced_datetime: ['', Validators.required],
      service_subject: [''],
      service_remark: [''],
      serviced_by: [''],
      next_service_date: [''],
      is_request: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddserviceinfoPage');
  }
  ionViewWillEnter() {
    let users = localStorage.getItem("atMentionedStorage");

    console.log("A:" + JSON.parse(users));
    console.log("B:" + users);
    console.log("C:" + JSON.stringify(users));
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

  takePictureURL() {
    this.isUploadedProcessing = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.fileTrans(imageData);
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

  fileTrans(path) {
    /* let loading = this.loadingCtrl.create({
         content: 'Uploading processing Please wait...'
     });
     loading.present();*/
    let fileName = path.substr(path.lastIndexOf('/') + 1);
    const fileTransfer: TransferObject = this.transfer.create();
    let currentName = path.replace(/^.*[\\\/]/, '');
    console.log("File Name is:" + currentName);


    let d = new Date(),
      n = d.getTime(),
      newFileName = "stridecdev_" + n + ".jpg";

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
    fileTransfer.upload(path, this.apiServiceURL + '/upload.php', options)
      .then((data) => {

        console.log("UPLOAD SUCCESS:" + data.response);
        let successData = JSON.parse(data.response);
        this.sendNotification("UPLOAD SUCCESS:");
        console.log('http:' + '//' + successData.baseURL + '/' + successData.target_dir + '/' + successData.fileName);

        //<img src="{{addedImgLists[i].imgSrc}}" width="75%" height="75%" />
        let imgSrc;

        imgSrc = this.apiServiceURL + "/staffphotos" + '/' + newFileName;
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


      let serviced_datetime: string = this.form.controls["serviced_datetime"].value,
        service_remark: string = this.form.controls["service_remark"].value,
        next_service_date: string = this.form.controls["next_service_date"].value,
        serviced_by: string = this.form.controls["serviced_by"].value,
        is_request: string = this.form.controls["is_request"].value,
        service_subject: string = this.form.controls["service_subject"].value;
      console.log("serviced_datetime:" + serviced_datetime);
      console.log("service_remark:" + service_remark);
      console.log("serviced_by:" + serviced_by);
      console.log("is_request:" + is_request);
      console.log("service_subject:" + service_subject);
      console.log("nextServiceDate:" + this.unitDetailData.nextServiceDate);
      console.log("Image Data" + JSON.stringify(this.addedImgLists));

      if (this.isEdited) {
        this.updateEntry(name, serviced_datetime, service_remark);
      }
      else {
        this.createEntry(name, serviced_datetime, service_remark);
      }
    }
  }

  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(lat, long, photos) {
    let body: string = "key=create&lat=" + lat + "&long=" + long + "&photos=" + photos,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "upload_photo.php";

    this.http.post(url, body, options)
      .subscribe((data) => {
        // If the request was successful notify the user
        if (data.status === 200) {

          this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
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
  updateEntry(lat, long, photos) {
    let body: string = "key=update&lat=" + name + "&long=" + long + "&photos=" + photos + "&recordID=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "manage-location.php";

    this.http.post(url, body, options)
      .subscribe(data => {
        console.log(data);
        // If the request was successful notify the user
        if (data.status === 200) {

          this.sendNotification(`Congratulations the technology: ${name} was successfully updated`);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }

  getNextDate(val) {
    console.log('1' + val);
    let date;
    if (val > 0) {
      date = this.addDays(val);
    } else {
      this.showDatePicker();
    }
    this.unitDetailData.nextServiceDate = date;
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
        this.unitDetailData.nextServiceDate = date;
        console.log('Got date: ', date)
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }
  address1get(hashtag) {
    console.log(hashtag);
    this.unitDetailData.hashtag = hashtag;
  }
}
