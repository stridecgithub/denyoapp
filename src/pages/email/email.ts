import { Component, ViewChild, NgZone } from '@angular/core';
import { AlertController, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { UserPage } from '../user/user';
import { DashboardPage } from '../dashboard/dashboard';
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
  public sendLists = [];
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
  public messages_subject: any;
  public messages_body: any;
  public next_service_date: any;
  public message_priority: any;
  is_request: boolean
  public serviced_by_name: any;
  public service_resources: any;
  public message_priority_class1: any;
  public message_priority_class2: any;
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
  public totalCountSend;
  public inboxData: any =
  {
    status: '',
    sort: 'messages_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
  public sendData: any =
  {
    status: '',
    sort: 'messages_id',
    sortascdesc: 'asc',
    startindex: 0,
    results: 8
  }
  public hideActionButton = true;
  constructor(public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public NP: NavParams, public nav: NavController, public toastCtrl: ToastController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, private filechooser: FileChooser,
    private transfer: Transfer,
    private ngZone: NgZone) {
    this.message_priority_class1 = "-outline";
    this.message_priority_class2 = "-outline";
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
    this.str = '';
    this.form = formBuilder.group({
      subject: ['', Validators.required],
      composemessagecontent: ['', Validators.required],
      to: ['', Validators.required],
      copytome: ['']

    });
    this.message_priority = 0;
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


  doSendRefresh(refresher) {
    console.log('doRefresh function calling...');
    this.sendData.startindex = 0;
    this.sendLists = [];
    this.doSend();
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


  doSendInfinite(infiniteScroll) {
    console.log('InfinitScroll function calling...');
    console.log('A');
    console.log("Total Count:" + this.totalCount)
    if (this.sendData.startindex < this.totalCount && this.sendData.startindex > 0) {
      console.log('B');
      this.doSend();
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
    //this.presentLoading(1);
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
    // this.presentLoading(0);
  }


  doSend() {
    //this.presentLoading(1);
    if (this.sendData.status == '') {
      this.sendData.status = "messages_id";
    }
    if (this.sendData.sort == '') {
      this.sendData.sort = "messages_id";
    }
    //http://denyoappv2.stridecdev.com/sentitems?is_mobile=1&sort=messages_id&dir=desc&startindex=0&results=8&loginid=1
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/sentitems?is_mobile=1&startindex=" + this.sendData.startindex + "&results=" + this.sendData.results + "&sort=" + this.sendData.sort + "&dir=" + this.sendData.sortascdesc + "&loginid=" + this.userId;
    let res;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        res = data.json();
        console.log(JSON.stringify(res));
        console.log("1" + res.messages.length);
        console.log("2" + res.messages);
        if (res.messages.length > 0) {
          this.sendLists = res.messages;
          this.totalCountSend = res.totalCount;
          this.sendData.startindex += this.sendData.results;
          //this.loadingMoreDataContent = 'Loading More Data';
        } else {
          this.totalCountSend = 0;
          //this.loadingMoreDataContent = 'No More Data';
        }
        console.log("Total Record:" + this.totalCountSend);

      });
    //this.presentLoading(0);
  }


  onSendSegmentChanged(val, item) {
    let splitdata = val.split(",");
    this.sendData.sort = splitdata[0];
    this.sendData.sortascdesc = splitdata[1];
    this.sendData.startindex = 0;
    this.doSend();
  }


  onSegmentChanged(val, item) {
    let splitdata = val.split(",");
    this.inboxData.sort = splitdata[0];
    this.inboxData.sortascdesc = splitdata[1];
    this.inboxData.startindex = 0;
    this.doInbox();
  }

  ionViewWillEnter() {
    this.getPrority(1);
    this.is_request = false;
    console.log(JSON.stringify(this.NP.get("record")));

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
    this.sendData.startindex = 0;
    this.sendData.sort = "messages_id";
    this.doInbox();
    this.doSend();


  }




  fileChooser(micro_timestamp) {
    this.isUploadedProcessing = true;
    this.filechooser.open()
      .then(
      uri => {
        console.log(uri);
        this.fileTrans(uri, micro_timestamp);
        this.addedAttachList = uri;
      }

      )
      .catch(e => console.log(e));


    return false;


  }


  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

  fileTrans(path, micro_timestamp) {
    let fileName = path.substr(path.lastIndexOf('/') + 1);
    const fileTransfer: TransferObject = this.transfer.create();
    let currentName = path.replace(/^.*[\\\/]/, '');
    console.log("File Name is:" + currentName);

    let dateStr = new Date();
    let year = dateStr.getFullYear();
    let month = dateStr.getMonth();
    let date = dateStr.getDate();
    let hr = dateStr.getHours();
    let mn = dateStr.getMinutes();
    let sec = dateStr.getSeconds();
    let d = new Date(),
      n = d.getTime(),
      newFileName = year + "" + month + "" + date + "" + hr + "" + mn + "" + sec + "_123_" + n + currentName;



    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: newFileName,
      headers: {},
      chunkedMode: false,
      mimeType: "text/plain",
    }
    fileTransfer.onProgress(this.onProgress);
    // fileTransfer.upload(path, this.baseURI + '/api/upload_attach.php', options)
    fileTransfer.upload(path, this.apiServiceURL + '/api/upload_attach.php?micro_timestamp=' + micro_timestamp, options)
      .then((data) => {
        console.log("UPLOAD SUCCESS:" + data.response);
        let successData = JSON.parse(data.response);
        this.sendNotification("File attached successfully");
        console.log('http:' + '//' + successData.baseURL + '/' + successData.target_dir + '/' + successData.fileName);
        let imgSrc;
        if (successData.ext == 'jpg') {
          //imgSrc = 'http://denyoappv2.stridecdev.com/api/uploads/' + successData.fileName;
          //imgSrc = '<ion-icon name="image"></ion-icon>';
          imgSrc = 'img/img.png';
          /* this.addedImgLists.push({
               imgSrc: imgSrc,
               file: successData.fileName
           });*/
          this.addedImgLists.push({
            imgSrc: imgSrc,
            imgDateTime: new Date(),
            fileName: newFileName
          });
        } else {
          if (successData.ext == 'pdf') {
            imgSrc = 'img/pdf.png';
            // imgSrc = '<ion-icon name="document"></ion-icon>';
          }
          if (successData.ext == 'doc' || successData.ext == 'docx') {
            imgSrc = 'img/doc.png';
            //imgSrc = '<ion-icon name="document"></ion-icon>';
          }
          if (successData.ext == 'xls' || successData.ext == 'xlsx') {
            imgSrc = 'img/xls.png';
            //imgSrc = '<ion-icon name="document"></ion-icon>';
          }
          if (successData.ext == 'ppt' || successData.ext == 'pptx') {
            imgSrc = 'img/ppt.png';
            //imgSrc = '<ion-icon name="document"></ion-icon>';
          }
          this.addedImgLists.push({
            imgSrc: imgSrc,
            file: fileName
          });
        }
        localStorage.setItem('fileAttach', JSON.stringify(this.addedImgLists));
        if (this.addedImgLists.length > 9) {
          this.isUploaded = false;
        }
        this.progress += 5;
        this.isProgress = false;
        this.isUploadedProcessing = false;
        return false;
      }, (err) => {
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
        composemessagecontent: string = this.form.controls["composemessagecontent"].value,
        subject: string = this.form.controls["subject"].value;
      console.log("serviced_datetime:" + to);
      console.log("messages_body:" + copytome);
      console.log("messages_subject:" + subject);
      console.log("Image Data" + JSON.stringify(this.addedImgLists));
      //let d = new Date();
      //let micro_timestamp = d.getFullYear() + "" + d.getMonth() + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds();

      this.createEntry(this.micro_timestamp, to, copytome, composemessagecontent, subject);

    }
  }

  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(micro_timestamp, to, copytome, composemessagecontent, subject) {
    if (copytome == true) {
      copytome = '1';
    }
    let body: string = "is_mobile=1" +
      "&important=" + this.message_priority +
      "&microtime=" + micro_timestamp +
      "&loginid=" + this.userId +
      "&to=" + to +
      "&composemessagecontent=" + composemessagecontent +
      "&copytome=" + copytome +
      "&subject=" + subject,
      //"&contact_number=" + this.contact_number +
      //"&contact_name=" + this.contact_name +
      //"&nextServiceDate=" + nextServiceDate,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/messages/store";
    console.log(url);
    console.log(body);

    this.http.post(url, body, options)
      .subscribe((data) => {
        //console.log("Response Success:" + JSON.stringify(data.json()));
        // If the request was successful notify the user
        if (data.status === 200) {
          localStorage.setItem("microtime", "");
          this.sendNotification(`Message sending successfully`);
          this.inboxData.startindex = 0;
          this.inboxLists = [];
          this.sendData.startindex = 0;
          this.sendLists = [];
          this.pet = 'inbox';
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }







  getPrority(val) {
    this.message_priority = val
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
    this.nav.setRoot(DashboardPage);
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
    console.log(JSON.stringify(item));
    this.serviced_by = item.serviced_by;
    this.serviced_datetime = item.serviced_datetime;
    this.messages_subject = item.messages_subject;
    this.messages_body = item.message_body;
    //this.next_service_date = item.next_service_date;
    this.message_priority = item.message_priority;
    console.log("X" + this.message_priority);
    if (this.message_priority == "1") {
      this.message_priority_class1 = '';
      console.log("Y");
    } else if (this.message_priority == "2") {
      this.message_priority_class2 = '';
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





  doConfirm(id, item) {
    console.log("Deleted Id" + id);
    let confirm = this.alertCtrl.create({
      message: 'Are you sure you want to delete this message?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.deleteEntry(id);
          for (let q: number = 0; q < this.inboxLists.length; q++) {
            if (this.inboxLists[q] == item) {
              this.inboxLists.splice(q, 1);
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
  deleteEntry(recordID) {
    let
      //body: string = "key=delete&recordID=" + recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/message/" + recordID + "/1/delete";
    this.http.get(url, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {

          this.sendNotification(`messages was successfully deleted`);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
      });
  }
  doDetails(item) {
    this.pet = 'details';
    this.selectEntry(item);
  }

  reply(){

  }

  forward(){

  }
}
