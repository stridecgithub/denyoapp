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
import * as $ from 'jquery'
import "slick-carousel";
import 'rxjs/add/operator/map';
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
  providers: [Camera, FileChooser, Transfer, File]
})
export class AddserviceinfoPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  public photoInfo = [];
  progress: number;
  public isUploadedProcessing: boolean = false;
  public isProgress = false;
  public isUploaded: boolean = true;
  item: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  form: FormGroup;
  public unitDetailData: any = {
    userId: '',
    loginas: '',
    pageTitle: '',
    getremark: '',
    addedImgLists: '',
    serviced_by: ''
  }
  public hideActionButton = true;
  constructor(public nav: NavController, public toastCtrl: ToastController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, private filechooser: FileChooser,
    private transfer: Transfer,
    private file: File, private ngZone: NgZone) {
    this.unitDetailData.loginas = localStorage.getItem("userInfoName");
    this.unitDetailData.userId = localStorage.getItem("photoInfoId");
    this.unitDetailData.serviced_by = localStorage.getItem("userInfoName");
    this.unitDetailData.pageTitle = 'Servicing Act';
    this.form = formBuilder.group({
      profilePic: [''],
      serviced_datetime: [''],
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

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        quality: 25,
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
        , allowEdit: true
        /*quality: 25,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum: true*/
        /*
        quality: 25,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        allowEdit: true*/
      }).then((data) => {
        console.log("Image Data:" + data);
        this.unitDetailData.addedImgLists = data;
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
        this.uploadToServer(data);
      }, (err) => {
        console.log('Unable to take photo');
      })
    } else {
      alert(console.log(Error));
      this.fileInput.nativeElement.click();
    }
  }



  doUploadPhoto() {

    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      targetWidth: 200,
      targetHeight: 200,
      sourceType: 1
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      localStorage.setItem("userPhotoFile", imageData);
      this.uploadToServer(imageData);
      this.unitDetailData.addedImgLists = imageData;
      this.isUploadedProcessing = false;
    }, (err) => {
      // Handle error
      this.sendNotification(err);
    });

  }
  uploadToServer(path) {
    let fileName = path.substr(path.lastIndexOf('/') + 1);
    const fileTransfer: TransferObject = this.transfer.create();
    let currentName = path.replace(/^.*[\\\/]/, '');
    // this.photo = currentName;

    let d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";

    console.log("File Name is:" + currentName);
    console.log("File New Name is:" + newFileName);


    /*var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";*/

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
        console.log(JSON.stringify(data));
        console.log("UPLOAD SUCCESS:" + data.response);
        let successData = JSON.parse(data.response);
        this.photoInfo.push({
          photo: successData
        });
        //this.sendNotification("User photo uploaded successfully");
        this.progress += 5;
        this.isProgress = false;
        // this.isUploadedProcessing = false;
        // return false;



        // Save in Backend and MysQL
        //this.uploadToServer(data.response);
        // Save in Backend and MysQL
      }, (err) => {
        //loading.dismiss();
        console.log("Upload Error:");
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

  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

  processWebImage(event) {
    console.log("Image Event Result:" + JSON.stringify(event.target.files));
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };
    console.log(JSON.stringify(event.target.files));
    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    //return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
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

  address1get(hashtag) {
    console.log(hashtag);
    this.unitDetailData.hashtag = hashtag;
  }

  createInfo() {
    let serviced_datetime: string = this.form.controls["serviced_datetime"].value,
      service_remark: string = this.form.controls["service_remark"].value,
      next_service_date: string = this.form.controls["next_service_date"].value,
      serviced_by: string = this.form.controls["serviced_by"].value,
      is_request: string = this.form.controls["is_request"].value,
      service_subject: string = this.form.controls["service_subject"].value;
    console.log(serviced_datetime);
    console.log(service_remark);
    console.log(next_service_date);
    console.log(serviced_by);
    console.log(is_request);
    console.log(service_subject);
  }

}
