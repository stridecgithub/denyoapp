import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { Alert, NavController, Events, Toast, Modal } from 'ionic-angular';
import * as moment from 'moment';
import { AlarmdetailsPage } from '../alarmdetails/alarmdetails';
import { CalendardetailPage } from '../calendardetail/calendardetail';
import { DatePicker } from '@ionic-native/date-picker';
import { OrgchartPage } from '../orgchart/orgchart';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitsPage } from '../units/units';
import { NotificationPage } from '../notification/notification';
import { MapsPage } from '../maps/maps';
import { ReportsPage } from '../reports/reports';
import { EmailPage } from '../email/email';
import { Http, Headers, RequestOptions } from "@angular/http";

import { UnitgroupPage } from '../unitgroup/unitgroup';
import { RolePage } from '../role/role';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

import { AddcalendarPage } from '../addcalendar/addcalendar';


@Component({
  //templateUrl: 'build/pages/calendar/calendar.html',
  // directives: [CalendarComponent]
  //Static Events:-[{"data":{},"icon":"alarm","class":"class","iconStyle":{"color":"green"},"style":{"color":"red"},"name":"Item 1","type":"event","startDate":"2017-08-22T22:41:26.675Z","endDate":"2017-08-22T23:41:26.675Z","allDay":false},{"data":{},"class":"class","icon":"jet","name":"Item 2","type":"event","startDate":"2017-08-23T01:41:26.675Z","endDate":"2017-08-26T02:41:26.675Z","allDay":false},{"data":{},"class":"class","icon":"globe","name":"Item 3","type":"event","startDate":"2017-08-23T22:41:26.675Z","endDate":"2017-08-25T01:41:26.675Z","allDay":false}]
  selector: 'page-calendar',
  templateUrl: 'calendar.html',

})
export class CalendarPage {
  @ViewChild(CalendarComponent)
  private calendarComponent: CalendarComponent;
  public pageTitle: string;
  public loginas: any;
  public notcount: any;
  public msgcount: any;
  public eventIdentify = [];
  public serviceIdentify = [];
  public alarmIdentity = [];
  public userId: any;
  public companyId: any;
  private apiServiceURL: string = "http://denyoappv2.stridecdev.com";
  now: number = Date.now();

  millisInHour: number = 1000 * 60 * 60;
  millisInDay: number = this.millisInHour * 24;

  calEvents = [];
  /*calEvents = [
    {
      data: {},
      icon: 'alarm',
      class: 'class',
      iconStyle: { color: 'green' },
      style: { color: 'red' },
      name: 'Item 1',
      type: 'event',
      startDate: new Date(),
      endDate: new Date(this.now + this.millisInHour * 1),
      allDay: false,
      ontap: (item: any) => {
        alert('Custom click event for Item 1');
      }
    },
    {
      data: {},
      class: 'class',
      icon: 'jet',
      name: 'Item 2',
      type: 'event',
      startDate: new Date(this.now + this.millisInHour * 3),
      endDate: new Date(this.now + this.millisInHour * 4 + this.millisInDay * 3),
      allDay: false,
      onpress: (item: any) => {
        item.style = { color: 'pink', 'font-weight': 'bolder' };
        item.name = 'pressed';
      },
      ontap: (item: any) => {
        item.style = { color: 'white', 'font-weight': 'normal' }
        item.name = 'tapped';
      },
      ondoubletap: (item: any) => {
        item.style = { color: 'black', 'font-weight': '100' };
        item.name = 'dubbletapped';
      }
    },
    {
      data: {},
      class: 'class',
      icon: 'globe',
      name: 'Item 3',
      type: 'event',
      startDate: new Date(this.now + this.millisInDay),
      endDate: new Date(this.now + this.millisInDay * 2 + this.millisInHour * 3),
      allDay: false
    }
  ];
*/
  constructor(private nav: NavController, public events: Events, private http: Http, public navCtrl: NavController) {
    console.log("Static Events:-" + JSON.stringify(this.calEvents));
    this.loginas = localStorage.getItem("userInfoName");
    this.userId = localStorage.getItem("userInfoId");
    this.userId = localStorage.getItem("userInfoId");
    this.companyId = localStorage.getItem("userInfoCompanyId");
    this.pageTitle = "Calendar";
    events.subscribe('calendar-event:item-press', (event: any) => {
      console.log('calendar-event:item-press', event);
      this.onEventPressed(event[0]);
    });
    events.subscribe('calendar-event:month-grid-cell-press', (event: any) => {
      console.log('calendar-event:month-grid-cell-press - calendar', event);
      this.onMonthGridPressed(event[0]);
    });


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


    this.calEvents = [];

    //console.log($event.date.toDate())


  }



  afterEventMoved($event) {
    console.log('event moved parent', $event);
    /*this.nav.present(Toast.create({
      message: `Moved ${$event.element.name} to ${moment($event.element.startDate).format('MMM Do')}`,
      duration: 3000,
      position: 'top'
    }));
    */
    // alert(`Moved ${$event.element.name} to ${moment($event.element.startDate).format('MMM Do')}`)
  }

  onEventTap($event) {
    console.log('GENERIC ON EVENT TAP', $event);
    /* this.nav.present(Alert.create({
       title: `Clicked: ${$event.name}`,
       message: `From ${moment($event.startDate).calendar()} to ${moment($event.endDate).calendar()}`,
       buttons: ['Ok']
     }));
     */
    //alert(`From ${moment($event.startDate).calendar()} to ${moment($event.endDate).calendar()}`);
  }

  onEventPressed($event) {
    console.log('GENERIC ON EVENT PRESS', $event);
  }

  onMonthGridPressed($event) {
    console.log('GENERIC ON MONTHGRID PRESS', $event);
    this.showNewEventModal($event.date.toDate());
  }

  showNewEventModal(date?: Date) {
    if (!date) {
      date = new Date();
    }
    //console.log('Date is ' + date);
    /* let newEventModal = Modal.create(CalendarNewEventModal, { date: date });
     newEventModal.onDismiss(data => {
       if (data) {
         this.calendarComponent.addCalendarEvent(data);
       }
     });
     this.nav.present(newEventModal);
     */
  }

  previous() {
    this.navCtrl.push(HomePage);
  }
  notification() {
    this.navCtrl.push(NotificationPage);
  }
  redirectToUser() {
    this.navCtrl.push(UnitsPage);
  }
  redirectToMessage() {
    this.navCtrl.push(EmailPage);
  }
  redirectCalendar() {
    this.navCtrl.push(CalendarPage);
  }
  redirectToMaps() {
    this.navCtrl.push(MapsPage);
  }
  redirectToSettings() {
    this.navCtrl.push(OrgchartPage);
  }
}
