
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from "@angular/http";

import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';
import { NotificationPage } from '../notification/notification';

import { AddcalendarPage } from '../addcalendar/addcalendar';

import { DatePicker } from '@ionic-native/date-picker';
import 'intl';
import 'intl/locale-data/jsonp/en';
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers: [DatePicker]
})
export class CalendarPage {
  @ViewChild('postcontent') postcontent: ElementRef;
  myVal: any;
  viewLink: any;
  viewHtml: any;
  dateHeaderTitle: any;
  petselection: any;
  pet: string = "ALL";
  calendarResultAll: any;
  calendarResultService: any;
  calendarResultEvent: any;
  calendarResultAlarm: any;
  noeventtitle: any;
  noservicetitle: any;
  noalarmtitle: any;
  noalltitle: any;
  daySession: any;
  totalCount: any;
  totalCountEvent: any;
  curDate: any;
  public pageTitle: string;
  public loginas: any;
  public userId: any;
  allselected: any;
  serviceselected: any;
  alarmselected: any;
  eventsselected: any;
  public companyId: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(public navCtrl: NavController, private datePicker: DatePicker, private http: Http, public loadingCtrl: LoadingController) {
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
    this.userId = localStorage.getItem("userInfoId");
    this.companyId = localStorage.getItem("userInfoCompanyId");
  }

  opendatePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
      );
  }


  ionViewWillEnter() {
    this.eventsselected = true;
    this.allselected = false;
    this.serviceselected = false;
    this.alarmselected = false;
    this.eventsselected = false;

    this.pageTitle = "Calendar";
    //console.log(JSON.stringify(this.userInf));

    this.curDate = new Date();
    console.log('1' + this.curDate);
    let yearMonth = this.splitDate(this.curDate)
    this.dateHeaderTitle = yearMonth;
    this.onTimeSelected(this.curDate);



  }




  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  }; // these are the variable used by the calendar.


  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  addMonthsUTC(date, count) {
    if (date && count) {
      var m, d = (date = new Date(+date)).getUTCDate()

      date.setUTCMonth(date.getUTCMonth() + count, 1)
      m = date.getUTCMonth()
      date.setUTCDate(d)
      if (date.getUTCMonth() !== m) date.setUTCDate(0)
    }
    return date
  }

  today() {
    this.calendar.currentDate = new Date();
  }
  pre() {
    this.calendarResultAll = [];
    this.calendarResultService = [];
    this.calendarResultEvent = [];
    this.calendarResultAlarm = [];
    let prevmonth = this.addMonthsUTC(this.calendar.currentDate, -1);
    //console.log("nextmonth:" + prevmonth);
    this.calendar.currentDate = prevmonth;
    let yearMonth = this.splitDate(this.calendar.currentDate)
    this.dateHeaderTitle = yearMonth;
    //this.dateHeaderTitle = this.calendar.currentDate;
    this.calendarResultAll = [];
    this.curDate = this.calendar.currentDate;
    this.onTimeSelected(this.curDate);
  }
  nex() {
    this.calendarResultAll = [];
    this.calendarResultService = [];
    this.calendarResultEvent = [];
    this.calendarResultAlarm = [];
    let nextmonth = this.addMonthsUTC(this.calendar.currentDate, 1);
    //console.log("nextmonth:" + nextmonth);
    this.calendar.currentDate = nextmonth;
    let yearMonth = this.splitDate(this.calendar.currentDate)
    this.dateHeaderTitle = yearMonth;
    //this.dateHeaderTitle = this.calendar.currentDate;
    this.calendarResultAll = [];
    this.curDate = this.calendar.currentDate;
    this.onTimeSelected(this.curDate);
  }
  splitDate(curdate) {
    //var splitDt = curdate.split("@");
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let monthYear = monthNames[curdate.getMonth()] + " " + curdate.getUTCFullYear();
    return monthYear;
  }
  onTimeSelected(ev) {


    this.calendarResultAll = [];
    this.calendarResultService = [];
    this.calendarResultEvent = [];
    this.calendarResultAlarm = [];


    let dateStr;
    let month;
    let year;
    let date;
    console.log("Event ev?"+ev);
    if (ev != '') {
      //this.pet = '';
     this.petselection = '';
      this.calendarResultAll = [];
      this.calendarResultService = [];
      this.calendarResultEvent = [];
      this.calendarResultAlarm = [];
      console.log("2" + ev.selectedTime);
      console.log("3" + JSON.stringify(ev));

      if (ev.selectedTime == undefined) {
        console.log('undefined' + ev);
        month = ev.getUTCMonth() + 1;
        year = ev.getFullYear();
        date = ev.getDate();
      } else {
        console.log('defined');
        month = ev.selectedTime.getUTCMonth() + 1;
        year = ev.selectedTime.getFullYear();
        date = ev.selectedTime.getDate();
      }

      if (month.length == 1) {
        month = '0' + month;
      } else {
        month = month;
      }

      if (date.length == 1) {
        date = '0' + date
      } else {
        date = date;
      }
      console.log('Selected time: ' + year + "-" + month + "-" + date);
      dateStr = "&date=" + year + "-" + month + "-" + date;
    } else {
      dateStr = "";
    }

    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/calendar?is_mobile=1&loginid=" + this.userId + "&companyid=" + this.companyId + "" + dateStr;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        let currentDateArr = new Date();
        let cmonth = currentDateArr.getUTCMonth() + 1;
        let mnstr;
        let dtstr;
        if (cmonth.toLocaleString.length == 1) {
          cmonth = cmonth;
          mnstr = '0';

        } else {
          cmonth = cmonth;
          mnstr = '';

        }
        console.log("Current Date Length:" + currentDateArr.getDate().toLocaleString.length);
        if (currentDateArr.getDate().toLocaleString.length == 1) {
          dtstr = '0';
        } else {
          dtstr = '';

        }
        let curDate = currentDateArr.getFullYear() + "-" + mnstr + cmonth + "-" + dtstr + currentDateArr.getDate();
        let selDate = year + "-" + month + "-" + date;
        console.log("Current Date" + curDate);
        console.log("Selected Date" + year + "-" + month + "-" + date);
        if (ev != '') {
          if (curDate == selDate) {
            this.daySession = 'Todays  Event';
          } else {
            this.daySession = selDate;
          }
        } else {
          this.daySession = "";
        }
        //console.log("All Response:" +JSON.stringify(data.json()));
        //console.log("Calendar Response:" +JSON.stringify(data.json().services));
        console.log(data.json().services.length);
        console.log("Your selection pet:" + this.petselection);
        if (this.petselection == 'ALL') {
          if (data.json().allservices.length > 0) {
            this.calendarResultService = data.json().allservices;
            this.totalCount = data.json().allservices.length;
          }
          if (data.json().allevents.length > 0) {
            this.calendarResultEvent = data.json().allevents;
            this.totalCount = data.json().allevents.length;
          }
          if (data.json().allalarms.length > 0) {
            this.calendarResultAlarm = data.json().allalarms;
            this.totalCount = data.json().allalarms.length;
          }
        } else if (this.petselection == 'SERVICE') {
          if (data.json().allservices.length > 0) {
            this.calendarResultService = data.json().allservices;
            this.totalCount = data.json().allservices.length;
          } else {
            this.calendarResultService = [];
            this.totalCount = 0;
          }
        } else if (this.petselection == 'EVENT') {
          if (data.json().allevents.length > 0) {
            this.calendarResultEvent = data.json().allevents;
            this.totalCount = data.json().allevents.length;
          } else {
            this.calendarResultEvent = [];
            this.totalCount = 0;
          }
        } else if (this.petselection == 'ALARM') {
          if (data.json().allalarms.length > 0) {
            this.calendarResultAlarm = data.json().allalarms;
            this.totalCount = data.json().allalarms.length;
          } else {
            this.calendarResultAlarm = [];
            this.totalCount = 0;
          }
        } else {
          //this.onSegmentChanged('EVENT');
          if (ev != '') {
            if (data.json().events.length > 0) {
              this.calendarResultEvent = data.json().events;
              this.totalCountEvent = data.json().events.length;
            } else {
              this.calendarResultEvent = [];
              this.totalCountEvent = 0;
              this.noeventtitle = 'There is No Event';
            }
          } else {
            if (data.json().allevents.length > 0) {
              this.calendarResultEvent = data.json().allevents;
              this.totalCountEvent = data.json().allevents.length;
            } else {
              this.calendarResultEvent = [];
              this.totalCountEvent = 0;
              this.noeventtitle = 'There is No Event';
            }
          }
        }


      });
  }
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }
  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
      }
    }
    //events=[{"id":4,"title":"Joined new company","startTime":"2017-05-15T00:00:00.000Z","description":"I have joined the new company of webneo technology in anna nagar vaigai street"},{"id":5,"title":"New Task assigned","startTime":"2017-05-15T00:00:00.000Z","description":"I have start the new work joined"}]
    //events=[{"title":"All Day - 0","startTime":"2017-06-03T00:00:00.000Z","endTime":"2017-06-04T00:00:00.000Z","allDay":true},{"title":"Event - 1","startTime":"2017-04-15T06:55:00.000Z","endTime":"2017-04-15T08:34:00.000Z","allDay":false},{"title":"All Day - 2","startTime":"2017-06-02T00:00:00.000Z","endTime":"2017-06-03T00:00:00.000Z","allDay":true},{"title":"All Day - 3","startTime":"2017-06-15T00:00:00.000Z","endTime":"2017-06-16T00:00:00.000Z","allDay":true},{"title":"All Day - 4","startTime":"2017-06-08T00:00:00.000Z","endTime":"2017-06-09T00:00:00.000Z","allDay":true},{"title":"Event - 5","startTime":"2017-05-04T04:23:00.000Z","endTime":"2017-05-04T05:06:00.000Z","allDay":false},{"title":"Event - 6","startTime":"2017-05-24T10:13:00.000Z","endTime":"2017-05-25T12:51:00.000Z","allDay":false},{"title":"All Day - 7","startTime":"2017-07-07T00:00:00.000Z","endTime":"2017-07-08T00:00:00.000Z","allDay":true},{"title":"Event - 8","startTime":"2017-06-24T12:04:00.000Z","endTime":"2017-06-25T14:27:00.000Z","allDay":false},{"title":"All Day - 9","startTime":"2017-05-17T00:00:00.000Z","endTime":"2017-05-18T00:00:00.000Z","allDay":true},{"title":"All Day - 10","startTime":"2017-06-06T00:00:00.000Z","endTime":"2017-06-07T00:00:00.000Z","allDay":true},{"title":"Event - 11","startTime":"2017-05-26T12:08:00.000Z","endTime":"2017-05-26T13:00:00.000Z","allDay":false},{"title":"All Day - 12","startTime":"2017-06-22T00:00:00.000Z","endTime":"2017-06-23T00:00:00.000Z","allDay":true},{"title":"All Day - 13","startTime":"2017-05-04T00:00:00.000Z","endTime":"2017-05-05T00:00:00.000Z","allDay":true},{"title":"Event - 14","startTime":"2017-04-18T10:15:00.000Z","endTime":"2017-04-18T11:14:00.000Z","allDay":false},{"title":"Event - 15","startTime":"2017-05-12T10:51:00.000Z","endTime":"2017-05-13T13:13:00.000Z","allDay":false},{"title":"Event - 16","startTime":"2017-04-29T18:48:00.000Z","endTime":"2017-04-29T20:45:00.000Z","allDay":false},{"title":"All Day - 17","startTime":"2017-06-21T00:00:00.000Z","endTime":"2017-06-22T00:00:00.000Z","allDay":true},{"title":"Event - 18","startTime":"2017-05-15T15:13:00.000Z","endTime":"2017-05-15T16:56:00.000Z","allDay":false},{"title":"All Day - 19","startTime":"2017-04-21T00:00:00.000Z","endTime":"2017-04-22T00:00:00.000Z","allDay":true},{"title":"All Day - 20","startTime":"2017-06-04T00:00:00.000Z","endTime":"2017-06-05T00:00:00.000Z","allDay":true},{"title":"Event - 21","startTime":"2017-06-06T12:02:00.000Z","endTime":"2017-06-07T13:18:00.000Z","allDay":false},{"title":"All Day - 22","startTime":"2017-06-07T00:00:00.000Z","endTime":"2017-06-08T00:00:00.000Z","allDay":true},{"title":"All Day - 23","startTime":"2017-07-08T00:00:00.000Z","endTime":"2017-07-09T00:00:00.000Z","allDay":true},{"title":"Event - 24","startTime":"2017-04-27T09:04:00.000Z","endTime":"2017-04-28T11:09:00.000Z","allDay":false},{"title":"Event - 25","startTime":"2017-05-15T11:41:00.000Z","endTime":"2017-05-15T13:20:00.000Z","allDay":false},{"title":"All Day - 26","startTime":"2017-05-09T00:00:00.000Z","endTime":"2017-05-10T00:00:00.000Z","allDay":true},{"title":"All Day - 27","startTime":"2017-05-13T00:00:00.000Z","endTime":"2017-05-14T00:00:00.000Z","allDay":true},{"title":"All Day - 28","startTime":"2017-04-28T00:00:00.000Z","endTime":"2017-04-29T00:00:00.000Z","allDay":true},{"title":"All Day - 29","startTime":"2017-07-03T00:00:00.000Z","endTime":"2017-07-04T00:00:00.000Z","allDay":true},{"title":"Event - 30","startTime":"2017-06-05T17:38:00.000Z","endTime":"2017-06-06T19:40:00.000Z","allDay":false},{"title":"All Day - 31","startTime":"2017-05-06T00:00:00.000Z","endTime":"2017-05-07T00:00:00.000Z","allDay":true},{"title":"Event - 32","startTime":"2017-06-15T21:46:00.000Z","endTime":"2017-06-15T22:13:00.000Z","allDay":false},{"title":"Event - 33","startTime":"2017-05-10T20:47:00.000Z","endTime":"2017-05-10T20:54:00.000Z","allDay":false},{"title":"All Day - 34","startTime":"2017-06-14T00:00:00.000Z","endTime":"2017-06-15T00:00:00.000Z","allDay":true},{"title":"All Day - 35","startTime":"2017-06-03T00:00:00.000Z","endTime":"2017-06-04T00:00:00.000Z","allDay":true},{"title":"All Day - 36","startTime":"2017-07-02T00:00:00.000Z","endTime":"2017-07-03T00:00:00.000Z","allDay":true},{"title":"Event - 37","startTime":"2017-06-13T14:22:00.000Z","endTime":"2017-06-14T16:03:00.000Z","allDay":false},{"title":"Event - 38","startTime":"2017-07-08T18:34:00.000Z","endTime":"2017-07-08T18:43:00.000Z","allDay":false},{"title":"All Day - 39","startTime":"2017-07-06T00:00:00.000Z","endTime":"2017-07-07T00:00:00.000Z","allDay":true},{"title":"Event - 40","startTime":"2017-05-25T16:23:00.000Z","endTime":"2017-05-26T18:22:00.000Z","allDay":false},{"title":"All Day - 41","startTime":"2017-04-26T00:00:00.000Z","endTime":"2017-04-27T00:00:00.000Z","allDay":true},{"title":"Event - 42","startTime":"2017-07-09T16:37:00.000Z","endTime":"2017-07-10T18:47:00.000Z","allDay":false},{"title":"Event - 43","startTime":"2017-04-28T17:33:00.000Z","endTime":"2017-04-28T19:12:00.000Z","allDay":false},{"title":"Event - 44","startTime":"2017-05-17T23:08:00.000Z","endTime":"2017-05-19T01:13:00.000Z","allDay":false},{"title":"All Day - 45","startTime":"2017-04-13T00:00:00.000Z","endTime":"2017-04-14T00:00:00.000Z","allDay":true},{"title":"All Day - 46","startTime":"2017-06-04T00:00:00.000Z","endTime":"2017-06-05T00:00:00.000Z","allDay":true},{"title":"Event - 47","startTime":"2017-04-17T16:10:00.000Z","endTime":"2017-04-17T18:58:00.000Z","allDay":false},{"title":"Event - 48","startTime":"2017-04-15T00:35:00.000Z","endTime":"2017-04-15T02:24:00.000Z","allDay":false},{"title":"Event - 49","startTime":"2017-05-06T11:20:00.000Z","endTime":"2017-05-06T13:58:00.000Z","allDay":false}]



    return events;
  }
  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);


  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

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

  notification() {
    this.navCtrl.setRoot(NotificationPage);
  }
  previous() {
    this.navCtrl.setRoot(HomePage);
  }
  redirectToUser() {
    this.navCtrl.setRoot(UserPage);
  }
  redirectToUnitGroup() {
    this.navCtrl.setRoot(UnitgroupPage);
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

  doAdd() {
    this.navCtrl.setRoot(AddcalendarPage);
  }


  /**********************************/
  /* Dropdown Filter onchange event */
  /**********************************/
  onSegmentChanged(val) {
    this.noeventtitle = '';
    this.calendarResultEvent = [];
    this.calendarResultAll = [];
    this.calendarResultService = [];
    this.calendarResultAlarm = [];
    if (val == "ALL") {
      // this.reportData.status = "DRAFT";
      // this.reportData.startindex = 0;
      this.calendarResultAll = [];
      this.petselection = 'ALL';
      this.allselected = true;
      this.pet = 'ALL';

    } else if (val == "SERVICE") {
      this.serviceselected = true;

      //this.reportData.status = val;
      //this.reportData.startindex = 0;
      this.calendarResultService = [];
      this.petselection = 'SERVICE';
      this.pet = 'SERVICE';
    } else if (val == "EVENT") {

      this.eventsselected = true;
      //this.reportData.status = val;
      //this.reportData.startindex = 0;
      this.calendarResultEvent = [];
      this.petselection = 'EVENT';
      this.pet = 'EVENT';
    } else if (val == "ALARM") {
      this.alarmselected = true;
      //this.reportData.status = val;
      //this.reportData.startindex = 0;
      this.calendarResultAlarm = [];
      this.petselection = 'ALARM';
      this.pet = 'ALARM';
    }

    //this.doReport();

    this.onTimeSelected('');
  }
}

