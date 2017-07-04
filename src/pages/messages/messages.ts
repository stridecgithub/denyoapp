import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { IonicApp } from 'ionic-angular/index'
//import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from "@angular/http";
//import { HttpModule } from "@angular/http";
import { Sendmsg } from '../sendmsg/sendmsg';
import { Compose } from '../compose/compose';
//import { TabsPage } from '../tabs/tabs';
import { CompanygroupPage } from '../companygroup/companygroup';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { HomePage } from '../home/home';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
@Component({
    selector: 'page-messages',
    templateUrl: 'messages.html',
    providers: [Camera, FileChooser, Transfer, File]
})
export class MessagesPage {
    sendmsg = Sendmsg;
    compose = Compose;
    app: IonicApp;
    data: any;
    public loginas: any;
    public userId: any;
    public rootPage: any;
    public pageTitle: string;
    progress: number;
    public isProgress = false;
    public addedImgLists = [];
    public base64Image: any;
    public addedAttachList;
    public isUploaded: boolean = true;
    public isUploadedProcessing: boolean = false;
    Catdata: any;
    private baseURI: string = "";
    constructor(app: IonicApp, public navCtrl: NavController, private alertCtrl: AlertController, private http: Http, private camera: Camera,
        private filechooser: FileChooser,
        private transfer: Transfer,
        private file: File, private ngZone: NgZone, public toastCtrl: ToastController, ) {
        this.rootPage = MessagesPage; this.app = app;
        this.loginas = localStorage.getItem("userInfoName");
        this.userId = localStorage.getItem("userInfoId");
        this.pageTitle = "Messages";

    }

    ionViewDidEnter() {
        // this.presentAlert();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MessagesPage');
    }
    ionViewWillEnter() {

        this.presentAlert1();
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Low battery',
            subTitle: '10% of battery remaining',
            buttons: ['Dismiss']
        });
        alert.present();
    }
    presentAlert1() {


        //let text = "";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let linker = "http://denyoappv2.stridecdev.com/denyo2.php?method=inbox&id=1";
        this.http.get(linker, options)
            .map(res => res.text())
            .subscribe(data => {
                var element = document.createElement("input");
                element.setAttribute("type", "text");
                element.setAttribute("value", data);
                element.setAttribute("style", "color:Red");
                // (document.getElementById('contentview') as HTMLDivElement).appendChild(element);
                (document.getElementById('contentview') as HTMLDivElement).innerHTML = data;

            });

    }
    openPage(component) {
        this.presentAlert();

    }
    onPageDidEnter() {
        // this.presentAlert()
    }



    redirectToUnitGroup() {
        this.navCtrl.setRoot(UnitgroupPage);
    }
    redirectToCompanyGroup() {
        this.navCtrl.setRoot(CompanygroupPage);
    }

    redirectToUnits() {
        this.navCtrl.setRoot(UnitsPage);
    }
    redirectToMyAccount() {
        this.navCtrl.setRoot(MyaccountPage);
    }

    redirectToRole() {
        this.navCtrl.setRoot(RolePage);
    }
    previous() {
        this.navCtrl.setRoot(HomePage);
    }

    fileChooser() {
        this.isUploadedProcessing = true;
        this.filechooser.open()
            .then(
            uri => {
                console.log(uri);
                this.fileTrans(uri);
                this.addedAttachList = uri;
            }

            )
            .catch(e => console.log(e));


        return false;


    }

    fileTrans(path) {
        let fileName = path.substr(path.lastIndexOf('/') + 1);
        const fileTransfer: TransferObject = this.transfer.create();
        let currentName = path.replace(/^.*[\\\/]/, '');
        console.log("File Name is:" + currentName);
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: fileName,
            headers: {},
            chunkedMode: false,
            mimeType: "text/plain",
        }
        fileTransfer.onProgress(this.onProgress);
        fileTransfer.upload(path, this.baseURI + 'http://denyoappv2.stridecdev.com/api/upload_attach.php', options)
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
                    this.addedImgLists.push({
                        imgSrc: imgSrc,
                        file: successData.fileName
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

    sendNotification(message): void {
        let notification = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        notification.present();
    }

    download(file) {
        console.log("Download calling..." + file);
        const fileTransfer: TransferObject = this.transfer.create();
        const url = 'http://denyoappv2.stridecdev.com/api/uploads/' + file;
        fileTransfer.download(url, this.file.dataDirectory + file).then((entry) => {
            console.log('download complete: ' + entry.toURL());
        }, (error) => {
            // handle error
        });

    }
}
