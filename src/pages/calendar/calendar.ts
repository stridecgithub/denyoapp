
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from "@angular/http";

import { UnitgroupPage } from '../unitgroup/unitgroup';
import { RolePage } from '../role/role';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

import { AddcalendarPage } from '../addcalendar/addcalendar';

import { CalendardetailPage } from '../calendardetail/calendardetail';
import { DatePicker } from '@ionic-native/date-picker';

import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { NotificationPage } from '../notification/notification';
import { MapsPage } from '../maps/maps';
import { ReportsPage } from '../reports/reports';
import { EmailPage } from '../email/email';


import 'intl';
import 'intl/locale-data/jsonp/en';
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers: [DatePicker]
})
export class CalendarPage {
  public msgcount: any;
   public colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };
  public notcount: any;
  private permissionMessage: string = "Permission denied for access this page. Please contact your administrator";
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
  totalCountEventDateWise: any;
  curDate: any;
  public pageTitle: string;
  public loginas: any;
  public userId: any;
  allselected: any;
  serviceselected: any;
  alarmselected: any;
  eventsselected: any;
  public eventIdentify = [];
  public serviceIdentify = [];
  public alarmIdentity = [];
  public companyId: any;
  public currentCalendarDate: any;
  public EVENTVIEWACCESS: any;
  public EVENTCREATEACCESS: any;
  public EVENTEDITACCESS: any;
  public EVENTDELETEACCESS: any;
  public ALARMVIEWACCESS: any;
  public ALARMDELETEACCESS: any;
  public SERVICEVIEWACCESS: any;
  public SERVICECREATEACCESS: any;
  public SERVICEEDITACCESS: any;
  public SERVICEDELETEACCESS: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public navCtrl: NavController, private datePicker: DatePicker, private http: Http, public loadingCtrl: LoadingController) {
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
    this.userId = localStorage.getItem("userInfoId");
    this.companyId = localStorage.getItem("userInfoCompanyId");





    this.EVENTVIEWACCESS = localStorage.getItem("CALENDAR_EVENTS_VIEW");
    console.log("Role Authority for Unit Listing View:" + this.EVENTVIEWACCESS);
    this.EVENTCREATEACCESS = localStorage.getItem("CALENDAR_EVENTS_CREATE");
    console.log("Role Authority for Unit Listing Create:" + this.EVENTCREATEACCESS);
    this.EVENTEDITACCESS = localStorage.getItem("CALENDAR_EVENTS_EDIT");
    console.log("Role Authority for Unit Listing Edit:" + this.EVENTEDITACCESS);
    this.EVENTDELETEACCESS = localStorage.getItem("CALENDAR_EVENTS_DELETE");
    console.log("Role Authority for Unit Listing Delete:" + this.EVENTDELETEACCESS);


    this.ALARMVIEWACCESS = localStorage.getItem("UNITS_ALARM_VIEW");
    this.ALARMDELETEACCESS = localStorage.getItem("UNITS_ALARM_DELETE");

    this.SERVICEVIEWACCESS = localStorage.getItem("UNITS_SERVICINGINFO_VIEW");
    this.SERVICECREATEACCESS = localStorage.getItem("UNITS_SERVICINGINFO_CREATE");
    this.SERVICEEDITACCESS = localStorage.getItem("UNITS_SERVICINGINFO_EDIT");
    this.SERVICEDELETEACCESS = localStorage.getItem("UNITS_SERVICINGINFO_DELETE");


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
    this.totalCountEventDateWise = 0;
    this.eventsselected = true;
    this.allselected = false;
    this.serviceselected = false;
    this.alarmselected = false;
    this.eventsselected = false;

    this.pageTitle = "Calendar";
    this.curDate = new Date();
    console.log('Current Date is now when will enter:' + this.curDate);
    let yearMonth = this.splitDate(this.curDate)
    //this.dateHeaderTitle = yearMonth;
    this.onTimeSelected(this.curDate);

    this.createRandomEvents();

    let //body: string = "loginid=" + this.userId,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/msgnotifycount?loginid=" + this.userId;
    this.http.get(url, options)
      .subscribe((data) => {
        this.msgcount = data.json().msgcount;
        this.notcount = data.json().notifycount;
      });


  }




  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  }; // these are the variable used by the calendar.






  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onEventSelected(event) {

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
    console.log("nextmonth:" + prevmonth);
    this.calendar.currentDate = prevmonth;
    let yearMonth = this.splitDate(this.calendar.currentDate)
    //this.dateHeaderTitle = yearMonth;
    //this.dateHeaderTitle = this.calendar.currentDate;
    this.calendarResultAll = [];
    this.curDate = this.calendar.currentDate;
    this.onTimeSelected(this.curDate);
    this.createRandomEvents();
  }
  nex() {

    this.calendarResultAll = [];
    this.calendarResultService = [];
    this.calendarResultEvent = [];
    this.calendarResultAlarm = [];
    let nextmonth = this.addMonthsUTC(this.calendar.currentDate, 1);
    console.log("nextmonth:" + nextmonth);
    this.calendar.currentDate = nextmonth;
    let yearMonth = this.splitDate(this.calendar.currentDate)
    //this.dateHeaderTitle = yearMonth;
    //this.dateHeaderTitle = this.calendar.currentDate;
    this.calendarResultAll = [];
    this.curDate = this.calendar.currentDate;
    this.onTimeSelected(this.curDate);
    this.createRandomEvents();
  }
  splitDate(curdate) {
    //var splitDt = curdate.split("@");
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let monthYear = monthNames[curdate.getMonth()] + " " + curdate.getUTCFullYear();
    return monthYear;
  }

  getlength(number) {
    return number.toString().length;
  }
  onTimeSelected(ev) {
    this.currentCalendarDate = ev;
    this.calendarResultAll = [];
    this.calendarResultService = [];
    this.calendarResultEvent = [];
    this.calendarResultAlarm = [];

    // this.createRandomEvents();
    let dateStr;
    let month;
    let year;
    let date;

    if (ev != '') {
      //this.pet = '';
      this.petselection = '';
      this.calendarResultAll = [];
      this.calendarResultService = [];
      this.calendarResultEvent = [];
      this.calendarResultAlarm = [];


      if (ev.selectedTime == undefined) {

        month = ev.getUTCMonth() + 1;
        year = ev.getFullYear();
        date = ev.getDate();
      } else {

        month = ev.selectedTime.getUTCMonth() + 1;
        year = ev.selectedTime.getFullYear();
        date = ev.selectedTime.getDate();
      }
      console.log("Month Vlue" + month);
      console.log("Month Length" + month.length);
      if (this.getlength(month) == 1) {
        month = '0' + month;
      } else {
        month = month;
      }

      console.log("Date Length" + date.length);
      if (this.getlength(date) == 1) {
        date = '0' + date
      } else {
        date = date;
      }

      dateStr = "&date=" + year + "-" + month + "-" + date;
    } else {
      dateStr = "";
    }
    console.log("Date Selection:" + dateStr);
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/calendar?is_mobile=1&loginid=" + this.userId + "&companyid=" + this.companyId + "" + dateStr;
    console.log(url);
    this.http.get(url, options)
      .subscribe((data) => {
        let currentDateArr = new Date();
        let cmonth = currentDateArr.getMonth() + 1;
        let mnstr;
        let dtstr;
        console.log("cmonth.toLocaleString.length" + cmonth.toLocaleString.length);
        console.log("cmonth" + cmonth)
        if (cmonth > 9) {
          cmonth = cmonth;
          mnstr = '';
          console.log("Less than 9 below 10")

        } else {
          console.log("Greater than 9 reach 10")
          cmonth = cmonth;
          mnstr = '0';

        }

        if (currentDateArr.getDate().toLocaleString.length == 1) {
          dtstr = '0';
        } else {
          dtstr = '';

        }
        let curDate = currentDateArr.getFullYear() + "-" + mnstr + cmonth + "-" + dtstr + currentDateArr.getDate();

        let months = { '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December' };

        let selDate = year + "-" + month + "-" + date;
        let selectdate=year+"-"+month+"-"+date;
        if (year != undefined)
          this.dateHeaderTitle = months[month] + " " + year;
        if (ev != '') {
          console.log("curDate:" + curDate);
          console.log("selDate:" + selDate);
           localStorage.setItem("sdate", selectdate);
          if (curDate == selDate) {
            this.daySession = 'Todays  Event';
            console.log(this.daySession);
          } else {
            this.daySession = selDate;
          }
        } else {
          this.daySession = "";
        }
        console.log("Pet:======>" + this.petselection);
        this.calendarResultEvent = [];
        if (this.petselection == 'ALL') {
          console.log('ALL');
          this.doCalendarResult(data, 0, 0, 0, 'all')
        } else if (this.petselection == 'SERVICE') {
          console.log('SERVICE');
          this.doCalendarResult(data, 0, 0, 0, 'service');//JsonData,Event,Service,Alarm
        } else if (this.petselection == 'EVENT') {
          console.log('EVENT');
          this.doCalendarResult(data, 0, 0, 0, 'event');//JsonData,Event,Service,Alarm
        } else if (this.petselection == 'ALARM') {
          console.log('ALARM');
          this.doCalendarResult(data, 0, 0, 0, 'alarm');//JsonData,Event,Service,Alarm
        } else {
          console.log('EV' + ev);
          if (ev != '') {
            this.doCalendarResult(data, 1, 1, 1, '')//JsonData,Event,Service,Alarm
          }

        }

      });


  }
  doCalendarResult(data, event, service, alarm, type) {//JsonData,Event,Service,Alarm
    this.serviceIdentify = [];
    this.eventIdentify = [];
    this.alarmIdentity = [];
    if (event > 0 && type == '') {
      console.log("A");
      this.eventIdentify = data.json().events;
    } else {
      console.log("B");
      if (type == 'event') {
        console.log("C");
        this.eventIdentify = data.json().allevents;
      }
      if (type == 'all') {
        console.log("D");
        this.eventIdentify = data.json().allevents;
      }
    }
    for (var i = 0; i < this.eventIdentify.length; i += 1) {

      //let eventdate = this.eventIdentify[i]['event_date'] + " " + this.eventIdentify[i]['event_time'];// Check Date and Time
      let eventdate = this.eventIdentify[i]['event_date'] ;// Check Date only
      this.calendarResultEvent.push({
        event_id: this.eventIdentify[i]['event_id'],
        event_title: this.eventIdentify[i]['event_title'],
        event_date: eventdate,
        event_time: this.eventIdentify[i]['event_time'],
        event_location: this.eventIdentify[i]['event_location'],
        event_remark: this.eventIdentify[i]['event_remark'],
        event_addedby_name: this.eventIdentify[i]['event_addedby_name'],
        event_type: 'E'
      });
    }

    if (service > 0 && type == '') {
      console.log("E");
      this.serviceIdentify = data.json().services;
    } else {
      console.log("F");
      if (type == 'service') {
        console.log("G");
        this.serviceIdentify = data.json().allservices;
      }
      if (type == 'all') {
        console.log("H");
        this.serviceIdentify = data.json().allservices;
      }
    }
    for (var j = 0; j < this.serviceIdentify.length; j += 1) {
      let eventdate;    

      if (this.serviceIdentify[j]['serviced_datetime'] == '0000-00-00') {
        //eventdate = this.serviceIdentify[j]['next_service_date'] + " " + this.serviceIdentify[j]['serviced_time'];// Check Date and Time
        eventdate = this.serviceIdentify[j]['next_service_date'] ;// Check Date only
      } else {
        if (this.serviceIdentify[j]['serviced_time'] == null) {
          eventdate = this.serviceIdentify[j]['next_service_date'];
        } else {
          eventdate = this.serviceIdentify[j]['serviced_datetime'];
        }
      }

      this.calendarResultEvent.push({
        event_id: this.serviceIdentify[j]['service_id'],
        event_title: this.serviceIdentify[j]['service_subject'],
        event_unitid: this.serviceIdentify[j]['service_unitid'],
        event_date: eventdate,
        event_time: this.serviceIdentify[j]['serviced_time'],
        event_remark: this.serviceIdentify[j]['service_remark'],
        event_location: this.serviceIdentify[j]['service_location'],
        event_addedby_name: this.serviceIdentify[j]['serviced_by_name'],
        event_type: 'S'
      });

    }

    if (alarm > 0 && type == '') {
      console.log("I");
      this.alarmIdentity = data.json().alarms;
    } else {
      console.log("J");
      if (type == 'alarm') {
        console.log("K");
        this.alarmIdentity = data.json().allalarms;
      }
      if (type == 'all') {
        console.log("L");
        this.alarmIdentity = data.json().allalarms;
      }
    }
    for (var k = 0; k < this.alarmIdentity.length; k += 1) {

      this.calendarResultEvent.push({

        event_id: this.alarmIdentity[k]['alarm_id'],
        event_title: this.alarmIdentity[k]['alarm_name'],
        event_unitid: this.alarmIdentity[k]['alarm_unit_id'],
        event_date: this.alarmIdentity[k]['alarm_received_date'],
        event_remark: this.alarmIdentity[k]['alarm_remark'],
        event_location: this.alarmIdentity[k]['alarm_location'],
        event_addedby_name: this.alarmIdentity[k]['alarm_assginedby_name'],
        event_type: 'A'
      });


    }
    this.totalCountEventDateWise = this.calendarResultEvent.length;
    console.log("Date wise selection calendar response:" + JSON.stringify(this.calendarResultEvent));
    console.log("totalCountEventDateWise++" + this.totalCountEventDateWise);
    if (this.totalCountEventDateWise == 0) {
      this.noeventtitle = 'There is no events';
    }
  }
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  doCalendarDelete(item, action) {
    console.log("Deleted Id" + item.event_id);
    let confirm = this.alertCtrl.create({
      message: 'Are you sure you want to delete?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.deleteEntry(item.event_id, action);
          for (let q: number = 0; q < this.calendarResultEvent.length; q++) {
            if (this.calendarResultEvent[q] == item) {
              this.calendarResultEvent.splice(q, 1);
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
  doCalendarEdit(item, type) {
    this.navCtrl.setRoot(AddcalendarPage, {
      item: item,
      type: type
    });
  }

  doCalendarView(event_id){    
    this.navCtrl.setRoot(CalendardetailPage, {
      event_id: event_id
    });
  }
  deleteEntry(recordID, deltype) {
    let delactionurl;
    if (deltype == 'Event') {
      //http://denyoappv2.stridecdev.com/calendar/1/1/deleteevent
      delactionurl = "/calendar/" + recordID + "/1/deleteevent";
    } else if (deltype == 'Service') {

      //http://denyoappv2.stridecdev.com/calendar/2/1/deleteservice
      delactionurl = "/calendar/" + recordID + "/1/deleteservice";

    } else if (deltype == 'Alarm') {
      // http://denyoappv2.stridecdev.com/calendar/2/1/deletealarm
      delactionurl = "/calendar/" + recordID + "/1/deletealarm";
    }
    let
      //body: string = "key=delete&recordID=" + recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + delactionurl;
    console.log("Event Deleted API Url:" + url);
    this.http.get(url, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          if (deltype == 'Event') {
            this.sendNotification(`Event was successfully deleted`);
          }
          if (deltype == 'Service') {
            this.sendNotification(`Service was successfully deleted`);
          }
          if (deltype == 'Alarm') {
            this.sendNotification(`Alarm was successfully deleted`);
          }
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
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
  createRandomEvents() {

    let today = new Date();
    console.log("Today is " + today);
    console.log("Month wise Current Date:-" + this.currentCalendarDate);

    // let currentdateArr=this.currentCalendarDate.split(" ");

    //Sun Oct 01 2017
    let curdate = this.currentCalendarDate.getDate();
    let curmonth = this.currentCalendarDate.getMonth() + 1;

    let mnstr;
    if (curmonth > 9) {
      curmonth = curmonth;
      mnstr = '';
      console.log("Less than 9 below 10")

    } else {
      console.log("Greater than 9 reach 10")
      curmonth = curmonth;
      mnstr = '0';

    }


    let curyear = this.currentCalendarDate.getFullYear();
    let currentdate = curyear + "-" + mnstr + curmonth + "-" + curdate;
    var events = [];

    let
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/calendar? is_mobile=1&loginid=" + this.userId + "&date=" + currentdate + "&companyid=" + this.companyId;
    console.log("All Events calling API URL" + url);

    // console.log(url);

    this.http.get(url, options)
      .subscribe((data) => {
        let res = data.json();
        this.eventIdentify = res.allevents;
        for (var i = 0; i < this.eventIdentify.length; i += 1) {
          var startTime;
          var endTime;
          var event_date_array = this.eventIdentify[i]['event_date'].split('-');
          var yearstr = event_date_array[0];
          var monthstr = parseInt(event_date_array[1], 10) - 1;
          var datestr = parseInt(event_date_array[2], 10);
          var startMinute = Math.floor(Math.random() * 24 * 60);
          var endMinute = Math.floor(Math.random() * 180) + startMinute;
          startTime = new Date(yearstr, monthstr, datestr, 0, 0 + startMinute);
          endTime = new Date(yearstr, monthstr, datestr, 0, 0 + endMinute);
          events.push({
            title: this.eventIdentify[i]['event_title'],
            startTime: startTime,
            endTime: endTime,
            allDay: true,
            color: this.colors.red
          });
        }


        this.serviceIdentify = res.allservices;
        for (var j = 0; j < this.serviceIdentify.length; j += 1) {
          var startTime;
          var endTime;
          var service_date_array;
          if (this.serviceIdentify[j]['serviced_datetime'] == '0000-00-00') {
            service_date_array = this.serviceIdentify[j]['next_service_date'].split('-');
          } else {
            if (this.serviceIdentify[j]['serviced_time'] == null) {
               service_date_array = this.serviceIdentify[j]['next_service_date'].split('-');
            } else {
              service_date_array = this.serviceIdentify[j]['serviced_datetime'].split('-');
            }
          }





          var yearstr = service_date_array[0];
          var monthstr = parseInt(service_date_array[1], 10) - 1;
          var datestr = parseInt(service_date_array[2], 10);
          var startMinute = Math.floor(Math.random() * 24 * 60);
          var endMinute = Math.floor(Math.random() * 180) + startMinute;
          startTime = new Date(yearstr, monthstr, datestr, 0, 0 + startMinute);
          endTime = new Date(yearstr, monthstr, datestr, 0, 0 + endMinute);
          events.push({
            title: this.serviceIdentify[j]['service_subject'],
            startTime: startTime,
            endTime: endTime,
            allDay: true,
            color: this.colors.yellow
          });

        }


        this.alarmIdentity = res.allalarms;
        for (var k = 0; k < this.alarmIdentity.length; k += 1) {
          var startTime;
          var endTime;
          var substrdt = this.alarmIdentity[k]['alarm_received_date'];//.substring(0, 10)
          console.log("Date Substr result" + substrdt);
          var service_date_array = substrdt.split('-');
          var yearstr = service_date_array[0];
          var monthstr = parseInt(service_date_array[1], 10) - 1;
          var datestr = parseInt(service_date_array[2], 10);
          var startMinute = Math.floor(Math.random() * 24 * 60);
          var endMinute = Math.floor(Math.random() * 180) + startMinute;

          startTime = new Date(yearstr, monthstr, datestr, 0, 0 + startMinute);
          endTime = new Date(yearstr, monthstr, datestr, 0, 0 + endMinute);
          events.push({
            title: this.alarmIdentity[k]['alarm_name'],
            startTime: startTime,
            endTime: endTime,
            allDay: true,
            color: this.colors.blue
          });

        }


        // If the request was successful notify the user
        if (data.status === 200) {


        }
        // Otherwise let 'em know anyway
        else {

        }



        this.eventSource = events;

        console.log("Calendar response:" + JSON.stringify(this.eventSource));
      });

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


  previous() {
    this.navCtrl.setRoot(HomePage);
  }
  notification() {
    this.navCtrl.setRoot(NotificationPage);
  }
  redirectToUser() {
    this.navCtrl.setRoot(UnitsPage);
  }
  redirectToMessage() {
    this.navCtrl.setRoot(EmailPage);
  }
  redirectCalendar() {
    this.navCtrl.setRoot(CalendarPage);
  }
  redirectToMaps() {
    this.navCtrl.setRoot(MapsPage);
  }
  redirectToSettings() {
    this.navCtrl.setRoot(MyaccountPage);
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

