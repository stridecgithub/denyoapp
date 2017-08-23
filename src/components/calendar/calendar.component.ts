import { Component, Input, Output, EventEmitter, HostListener, ElementRef }
  from '@angular/core';
import { Events, NavController, AlertController, ToastController } from 'ionic-angular';
import * as moment from 'moment';
//import {DragulaModule , DragulaService} from "../../../node_modules/ng2-dragula/ng2-dragula"
import { DragulaModule, DragulaService } from "ng2-dragula/ng2-dragula"
import * as shortid from 'shortid';
import { Http, Headers, RequestOptions } from "@angular/http";
import { AlarmdetailsPage } from '../../pages/alarmdetails/alarmdetails';
import { CalendardetailPage } from '../../pages/calendardetail/calendardetail';

import { AddcalendarPage } from '../../pages/addcalendar/addcalendar';
interface CalendarEvent {
  data?: any;
  id?: string;
  name: string;
  type?: string;
  startDate: Date;
  endDate: Date;
  allDay?: boolean;
  isExtension?: boolean;
  extensionMonthViewDayIdxs?: number[];
  icon?: string;
  ontap?: Function;
  onpress?: Function;
  ondoubletap?: Function;
}

interface CalendarDay {
  date: moment.Moment;
  events: CalendarEvent[];
}

interface MonthView {
  days: CalendarDay[];
  numberOfDaysThisMonth: number;
  firstDayOfMonth: moment.Moment;
  lastDayOfMonth: moment.Moment;
  selectedDate: moment.Moment;
}

interface WeekView {
  days: any[];
  firstDayOfWeek: moment.Moment;
  lastDayOfWeek: moment.Moment;
  selectedDate: moment.Moment;
}

interface CalendarControl {
  viewMode: string;
  dateSelection: moment.Moment;
  selectedYear: number;
  selectedMonth: string;
  selectedDay: number;
  monthView: MonthView;
  weekView: WeekView;
}

/*@Component({
  templateUrl: 'build/components/calendar/calendar.component.html',
  selector: 'ionic2-calendar',
  //styleUrls: ['build/components/calendar.component.css'], wait for: https://github.com/driftyco/ionic-cli/issues/1196
  directives: [Dragula],
  viewProviders: [DragulaService]
})*/

@Component({
  selector: 'ionic2-calendar',
  templateUrl: 'calendar.component.html',
  providers: [DragulaService]
})

export class CalendarComponent {
  public totalCountEventDateWise: any;
  noeventtitle: any;
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
  public eventIdentify = [];
  public serviceIdentify = [];
  public alarmIdentity = [];
  public userId: any;
  public monthTitle: any;
  public yearTitle: any;
  public companyId: any;
  months: string[] = moment.months();
  weekDays: any[] = moment.weekdays();
  ctrl: CalendarControl;
  activeDragGroup: string;
  itemCameFromBag: any;
  draggingItem: any = null;
  draggingItemId: string;
  sizeClassChanged: boolean;
  sizeClass: string;

  @Input('calEvents') calEvents: any[];
  @Output() afterEventMove = new EventEmitter<any>();
  @Output() onEventTap = new EventEmitter<any>();
  @Output() onEventDoubleTap = new EventEmitter<any>();
  @Output() onEventPress = new EventEmitter<any>();

  constructor(private dragulaService: DragulaService, public navCtrl: NavController,
    private calendarElement: ElementRef,
    public events: Events, private http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController) {
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
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    //    dragulaService.dropModel.subscribe((value) => {
    //      console.log(`dropModel: ${value[0]}`);
    //      this.onDropModel(value.slice(1));
    //    });

    //this.defaultDevent('2017-08-22');
  }

  // In Dragula documentation it says dropModel for Angular2 also gives the
  // model on the controller, not just the HTML elements, but I see no
  // difference to onDrop function arguments. TRY AGAIN LATER!!
  //  private onDropModel(args) {
  //    let [bagName, el, target] = args;
  //    console.log('OnDropModel', bagName, el, target);
  //  }

  private onDrag(args) {
    let [e, el] = args;
    console.log('dragging', e, el);
    this.itemCameFromBag = el;
    this.draggingItem = e;
    this.draggingItemId = e.id;
    if (e.className.indexOf('is-continued') > 0 || e.className.indexOf('does-continue') > 0) {
      var found = false, idx = 0, currentClassName;
      while (!found && idx < e.classList.length) {
        currentClassName = e.classList[idx++];
        if (currentClassName.startsWith('multi-span-')) {
          this.activeDragGroup = currentClassName;
          //document.getElementsByClassName(currentClassName);
        }
      }
    }
  }
  private onDrop(args) {
    let [e, el] = args;
    var droppedOnGridItem = el.parentElement.parentElement;
    var droppedOnGridItemIdx = droppedOnGridItem.dataset.idx;
    this.activeDragGroup = '';
    // Move events date and Output event
    // FOR isExtension events, move date moved by on all dates and move in grids!
    var movedElement, daysMoved, isExtensionOffsetToStartDate = 0;
    this.ctrl.monthView.days[droppedOnGridItemIdx].events.some((d: any) => {
      if (d.id === this.draggingItemId) {
        movedElement = d;
        if (movedElement.isExtension) {
          var cameFromGridIdx = this.itemCameFromBag.parentElement.parentElement.dataset.idx;
          console.log('moved element date', movedElement.startDate,
            'grid item it came from date', this.ctrl.monthView.days[cameFromGridIdx].date,
            '\n\ndays difference', this.ctrl.monthView.days[cameFromGridIdx].date.diff(moment(movedElement.startDate).startOf('day'), 'days'));
          isExtensionOffsetToStartDate = this.ctrl.monthView.days[cameFromGridIdx].date.diff(moment(movedElement.startDate).startOf('day'), 'days');
        }
        daysMoved = this.ctrl.monthView.days[droppedOnGridItemIdx].date.diff(moment(d.startDate).startOf('day'), 'days');
        d.startDate = this.moveDateByDays(d.startDate, daysMoved - isExtensionOffsetToStartDate);
        d.endDate = this.moveDateByDays(d.endDate, daysMoved - isExtensionOffsetToStartDate);
        // Now we need to move it into the correct order of events:
        var movedElementCalEventsIdx = this.calEvents.indexOf(movedElement);
        // Splice it:
        this.calEvents.splice(movedElementCalEventsIdx, 1);
        // Reinsert it at the correct position:
        this.insertDate(movedElement);
        console.log('Changed d.startDate to', d.startDate, 'and end date', d.endDate, '{IDX}', movedElementCalEventsIdx);
        return true;
      } else {
        return false;
      }
    });
    if (movedElement.isExtension) {
      // Remove all multi-span copies of moved item:
      movedElement.extensionMonthViewDayIdxs.forEach((d: number) => {
        var indexOfExtendedItem = this.ctrl.monthView.days[d].events.indexOf(movedElement);
        console.log('index of moved element', indexOfExtendedItem);
        if (indexOfExtendedItem >= 0) {
          this.ctrl.monthView.days[d].events.splice(indexOfExtendedItem, 1);
        }
      });
      // Now find first, create event there and extend: (SHOULD CHECK IF THERE IS OVERFLOW OR UNDERFLOW AFTER ADDING DAYS MOVED!!)
      console.log('daysMoves', daysMoved, movedElement.extensionMonthViewDayIdxs[0]);
      movedElement.isExtension = false;
      var firstDayMovesTo = movedElement.extensionMonthViewDayIdxs[0] + (daysMoved - isExtensionOffsetToStartDate);

      console.log('isExtensionOffsetToStartDate', isExtensionOffsetToStartDate);
      // Only add the event if it is not the first one. If it is the fisrt,
      // dragula will already add it, but after our code has finished, so we
      // would have our element twice:
      if (isExtensionOffsetToStartDate > 0) {
        this.ctrl.monthView.days[Math.max(0, firstDayMovesTo)].events.push(movedElement);
      }
      // Make new multi-span copies for moved event:
      this.makeExtensionEvents(this.ctrl.monthView.days[Math.max(0, firstDayMovesTo)], firstDayMovesTo);
    }
    // Emit event:
    this.emitEventMoved({
      element: movedElement,
      // Need to change this to firstItemDate if multi-span is moved
      movedToDate: this.ctrl.monthView.days[droppedOnGridItemIdx].date.toDate()
    })
    this.draggingItem = null;
  }

  /**
   * Fires when a calendar event was moved on the calendar.
   * The object this event fires contains the calendar event that moved (with
   * the start and end date already adjusted and the a date object for the day
   * the calendar event has moved to.
   */
  private emitEventMoved(ev) {
    this.afterEventMove.emit(ev);
  }

  private moveDateByDays(date, days) {
    var m = moment(date);
    m.add(days, 'days');
    return m.toDate();
  }

  ngOnInit() {
    // this.defaultDevent('2017-08-22');
    this.addMissingIds();
    this.ctrl = {
      viewMode: 'month',
      dateSelection: moment(),
      selectedYear: moment().year(),
      selectedMonth: this.months[moment().month()],
      selectedDay: moment().date(),
      monthView: {
        days: [],
        numberOfDaysThisMonth: 0,
        firstDayOfMonth: null,
        lastDayOfMonth: null,
        selectedDate: null
      },
      weekView: {
        days: [],
        firstDayOfWeek: null,
        lastDayOfWeek: null,
        selectedDate: null
      }
    };
    this.makeDaysInMonthViewList();
    console.log("ngOnInit" + JSON.stringify(this.ctrl));
    let currentDate = this.ctrl.selectedYear + "-" + moment().month() + "-" + this.ctrl.selectedDay
    this.defaultDevent(currentDate);
    this.monthTitle = this.months[moment().month()];
    this.yearTitle = moment().year();
  }

  ngAfterViewInit() {
    // This returns 0 clientWidth for some reason at first??? That's why wrapped
    // in timeout, UPDATE: only seems a problem when in phone emulation mode in chrome!!
    //    setTimeout(() => {
    this.updateSize();
    //    }, 1500);
  }

  addMissingIds() {
    this.calEvents.forEach((d: any) => {
      if (!d.id) {
        d.id = shortid.generate();
      }
    });
  }

  selectDate(date) {
    this.events.publish('calendar-event:month-grid-cell-tap', date);
    this.ctrl.dateSelection = date.date;
    this.ctrl.monthView.selectedDate = date;
  }

  monthNum2monthStr(monthNum) {
    return this.months[monthNum];
  };

  monthStr2monthNum(monthStr: string) {
    return this.months.indexOf(monthStr);
    //return this.months.indexOf([monthStr]);
  }

  updateMainView = function () {
    if (this.ctrl.viewMode === 'month') {
      this.makeDaysInMonthViewList();
    } else if (this.ctrl.viewMode === 'week') {
      this.makeDaysInWeekViewList();
    }
  }

  plusMonth = function (amount: number) {
    this.ctrl.dateSelection.add(amount, 'month');
    this.ctrl.selectedMonth = this.monthNum2monthStr(this.ctrl.dateSelection.month());
    console.log("plusMonth" + JSON.stringify(this.ctrl));
    let currentDate = this.ctrl.selectedYear + "-" + this.ctrl.dateSelection.month() + "-" + this.ctrl.selectedDay
    this.defaultDevent(currentDate);
    this.updateMainView();
    this.selectedYear = this.ctrl.selectedYear;
    this.selectedMonth = this.ctrl.dateSelection.month();


    this.monthTitle = this.ctrl.selectedMonth;
    this.yearTitle = moment().year();


  }

  setDateSelectionMonth($event) {
    console.log('change', $event);
    this.makeDaysInMonthViewList();
  }

  makeDaysInMonthViewList() {
    // List is 6x7, first need to find which day of the week the first is and then prepend from previous:
    // Must fill 42 cells, have n cells in this month...
    this.ctrl.monthView.numberOfDaysThisMonth = this.ctrl.dateSelection.daysInMonth();
    this.ctrl.monthView.firstDayOfMonth = moment(this.ctrl.dateSelection).startOf('month');
    this.ctrl.monthView.lastDayOfMonth = moment(this.ctrl.dateSelection).endOf('month');
    var firstDayOfMonthAsWeekday = this.ctrl.monthView.firstDayOfMonth.isoWeekday();
    //var lastDayOfMonthAsWeekday = this.ctrl.monthView.lastDayOfMonth.isoWeekday();
    var firstDayInViewOfPreviousMonth = moment(this.ctrl.monthView.firstDayOfMonth).subtract(firstDayOfMonthAsWeekday - 1, 'days');
    //    console.log('lastDayOfMonthAsWeekday', lastDayOfMonthAsWeekday, 'firstDayInViewOfPreviousMonth', firstDayInViewOfPreviousMonth);
    // Now we have the first and last dates of the grid view, let's make the grid:
    var currentDay = moment(firstDayInViewOfPreviousMonth);
    var days = [];
    var ctrlObj: any = {
      idx: 0,
      reachedEventListEnd: false,
      pastMaxDate: false,
      maxDate: moment(firstDayInViewOfPreviousMonth).add(42, 'days')
    };
    this.ctrl.monthView.days = [];
    for (var i = 0; i < 42; i++) {
      ctrlObj.currentDay = {
        date: moment(currentDay),
        events: []
      };
      if (!(ctrlObj.reachedEventListEnd || ctrlObj.pastMaxDate)) {
        this.findNextEvent(ctrlObj);
      }

      this.ctrl.monthView.days.push(ctrlObj.currentDay);
      currentDay.add(1, 'days');
    }
    // ALSO TO-DO: - Day, week and year view
    //             - Styles and classes for item, icon and text
    this.ctrl.monthView.days.forEach((d: CalendarDay, idx: number) => {
      this.makeExtensionEvents(d, idx);
    });
  }

  private eventFinishesOnDifferentDay(calEvent: CalendarEvent): boolean {
    return !moment(calEvent.startDate).isSame(calEvent.endDate, 'day');
  }

  private insertDate(elem) {
    var insertAt = null;
    this.calEvents.some((ce: CalendarEvent, idx: number) => {
      console.log(ce.startDate.getTime(), elem.startDate.getTime());
      if (ce.startDate.getTime() > elem.startDate.getTime()) {
        insertAt = idx;
        return true;
      }
      return false;
    });
    console.log('Inser at', insertAt, this.calEvents);
    if (insertAt !== null) {
      this.calEvents.splice(insertAt, 0, elem);
    } else {
      this.calEvents.push(elem);
    }
  }

  private makeExtensionEvents(d: CalendarDay, idx: number) {
    if (d.events.length > 0) {
      d.events.forEach((dd: any) => {
        if (dd.isExtension) {
          return;
        }
        dd.isExtension = this.eventFinishesOnDifferentDay(dd);
        dd.extensionMonthViewDayIdxs = [idx];
        var startDateEndOfDay = moment(dd.startDate).endOf('day'),
          endDateEndOfDay = moment(dd.endDate).endOf('day'),
          newEvent, daysPlus = 0;
        while (startDateEndOfDay.isBefore(endDateEndOfDay) && startDateEndOfDay.isBefore(this.ctrl.monthView.days[this.ctrl.monthView.days.length - 1].date)) {
          daysPlus++;
          dd.extensionMonthViewDayIdxs.push(idx + daysPlus);
          if (this.ctrl.monthView.days[idx + daysPlus].events.indexOf(dd) < 0) {
            this.ctrl.monthView.days[idx + daysPlus].events.push(dd);
          }
          startDateEndOfDay.add(1, 'days');
        }
        console.log('dd.extensionMonthViewDayIdxs', dd.extensionMonthViewDayIdxs);
      });
    }
  }

  findNextEvent(ctrlObj: any) {
    if (typeof this.calEvents === 'undefined') {
      return;
    }
    while (true) {
      if (ctrlObj.idx >= this.calEvents.length) {
        ctrlObj.reachedEventListEnd = true;
        return;
      }
      var stDate = this.calEvents[ctrlObj.idx].startDate.getTime();
      if (stDate > ctrlObj.maxDate.valueOf()) { //plus one day here
        ctrlObj.pastMaxDate = true;
        return;
      }
      if (ctrlObj.currentDay.date.valueOf() > stDate) {
        ctrlObj.idx = ctrlObj.idx + 1;
      } else if (ctrlObj.currentDay.date.valueOf() < stDate) {
        if (stDate > moment(ctrlObj.currentDay.date).add(1, 'days').valueOf()) {
          return;
        }
        // Reset isExtension, which could have been added previously:
        this.calEvents[ctrlObj.idx].isExtension = false;
        this.calEvents[ctrlObj.idx].extensionMonthViewDayIdxs = [];
        ctrlObj.currentDay.events.push(this.calEvents[ctrlObj.idx]);
        ctrlObj.idx = ctrlObj.idx + 1;
      }
    }
  }

  @HostListener('window:resize')
  updateSize() {
    var wkds;
    console.log('this.calendarElement.nativeElement.clientWidth', this.calendarElement.nativeElement.clientWidth);
    if (this.calendarElement.nativeElement.clientWidth < 400) {
      wkds = moment.weekdaysMin();
      if (this.sizeClass !== 'extra-small') {
        this.sizeClass = 'extra-small';
        this.sizeClassChanged = true;
      } else {
        this.sizeClassChanged = false;
      }
    } else if (this.calendarElement.nativeElement.clientWidth < 600) {
      wkds = moment.weekdaysShort();
      if (this.sizeClass !== 'small') {
        this.sizeClass = 'small';
        this.sizeClassChanged = true;
      } else {
        this.sizeClassChanged = false;
      }
    } else {
      wkds = moment.weekdays();
      if (this.sizeClass !== '') {
        this.sizeClass = '';
        this.sizeClassChanged = true;
      } else {
        this.sizeClassChanged = false;
      }
    }
    if (this.sizeClassChanged) {
      this.weekDays = wkds;
    }
  }

  tmpTapCount = 0;
  eventOnClick(item: CalendarEvent, $event) {
    $event.srcEvent.stopPropagation(); // <-- Doesn't seem to work
    this.tmpTapCount = $event.tapCount;
    setTimeout(() => {
      if (this.tmpTapCount === 1) {
        if (this.draggingItem === null) {
          this.events.publish('calendar-event:item-tap', item);
          if (typeof item.ontap === 'function') {
            item.ontap(item);
          } else if (this.onEventTap) {
            this.onEventTap.emit(item);
          }
        }
      } else if (this.tmpTapCount === 2) {
        this.events.publish('calendar-event:item-doubletap', item);
        if (typeof item.ondoubletap === 'function') {
          item.ondoubletap(item);
        } else if (this.onEventDoubleTap) {
          this.onEventDoubleTap.emit(item);
        }
      }
      this.tmpTapCount = 0;
    }, 300);
  }

  stopPressPropagation = false; // <-- Fix to stop mothDayGrid press event to
  //     get triggered too.
  eventOnPress(item: CalendarEvent, $event) {
    $event.srcEvent.stopImmediatePropagation();
    $event.srcEvent.stopPropagation();
    this.stopPressPropagation = true;
    setTimeout(() => {
      this.stopPressPropagation = false;
    }, 100);
    console.log('STOPPED PROPAGATION');
    if (this.draggingItem === null) {
      this.events.publish('calendar-event:item-press', item);
      if (typeof item.onpress === 'function') {
        item.onpress(item);
      } else if (this.onEventPress) {
        this.onEventPress.emit(item);
      }
    }
  }

  monthDayGridCellOnPress(item: CalendarEvent, $event) {
    $event.srcEvent.stopPropagation(); // <-- Doesn't seem to work
    if (this.draggingItem === null && this.tmpTapCount === 0 && !this.stopPressPropagation) {
      this.events.publish('calendar-event:month-grid-cell-press - calendar.components', item);
    }
  }

  addCalendarEvent(calEvent: CalendarEvent) {
    console.log('adding event', calEvent);
    if (typeof calEvent.id !== 'string') {
      calEvent.id = shortid.generate();
    }
    this.insertDate(calEvent);
    this.ctrl.monthView.days.some((d: CalendarDay) => {
      if (d.date.isSame(calEvent.startDate, 'day')) {
        d.events.push(calEvent);
        return true;
      }
      return false;
    });
  }



  defaultDevent(currentdate) {
    let
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.apiServiceURL + "/calendar? is_mobile=1&loginid=" + this.userId + "&date=" + currentdate + "&companyid=" + this.companyId;
    console.log("All Events calling API URL" + url);

    // console.log(url);
    let colors: string[] = ['primary', 'warning', 'danger', 'success'];
    this.http.get(url, options)
      .subscribe((data) => {
        let res = data.json();
        this.eventIdentify = res.allevents;
        let eventcountindication;
        for (var i = 0; i < this.eventIdentify.length; i += 1) {
          console.log('i increment:' + i);
          if (i == 1) {
            eventcountindication++;
          }
          var startTime;
          var endTime;
          var event_date_array = this.eventIdentify[i]['event_date'].split('-');
          console.log("DATE FORMAT" + this.eventIdentify[i]['event_date']);
          var yearstr = event_date_array[0];
          var monthstr = parseInt(event_date_array[1], 10) - 1;
          var datestr = parseInt(event_date_array[2], 10);
          console.log("Month String:-" + monthstr);
          console.log("Date String:-" + datestr);
          // var startMinute = Math.floor(Math.random() * 24 * 60);
          // var endMinute = Math.floor(Math.random() * 1) + startMinute;
          var startMinute = 20;
          var endMinute = 10 + startMinute;
          startTime = new Date(yearstr, monthstr, datestr, 10, 0 + startMinute);
          endTime = new Date(yearstr, monthstr, datestr, 10, 0 + endMinute);
          //console.log("TEST CALENDAR-1"+startTime+"//"+endTime);

          // startTime = new Date(event_date_array[0], event_date_array[1], event_date_array[2], 0, 0,0);
          // endTime = new Date(event_date_array[0], event_date_array[1], event_date_array[2], 0, 0,0);
          /*
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
          */
          this.calEvents.push({
            data: {},
            id: this.eventIdentify[i]['event_id'],
            event_id: this.eventIdentify[i]['event_id'],
            startDate: startTime,
            endDate: endTime,
            name: this.eventIdentify[i]['event_title'],
            type: 'event',
            event_type: 'E',
            allDay: false,
            icon: 'clock',
            class: 'eventclass',
            iconStyle: { color: 'green' },
            style: { color: 'red' },
            eventlength: this.eventIdentify.length,
            //eventlength: eventcountindication,
            event_time: this.eventIdentify[i]['event_time'],
            event_location: this.eventIdentify[i]['event_location'],
            event_remark: this.eventIdentify[i]['event_remark'],
            event_addedby_name: this.eventIdentify[i]['event_addedby_name'],
          });
        }


        this.serviceIdentify = res.allservices;
        let servicecountindication = 0;
        for (var j = 0; j < this.serviceIdentify.length; j += 1) {
          if (j == 1) {
            servicecountindication++;
          }
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




          console.log("DATE FORMAT" + this.serviceIdentify[j]['serviced_datetime']);
          var yearstr = service_date_array[0];
          var monthstr = parseInt(service_date_array[1], 10) - 1;
          var datestr = parseInt(service_date_array[2], 10);
          // var startMinute = Math.floor(Math.random() * 24 * 60);
          // var endMinute = Math.floor(Math.random() * 1) + startMinute;
          var startMinute = 20;
          var endMinute = 10 + startMinute;
          startTime = new Date(yearstr, monthstr, datestr, 10, 0 + startMinute);
          endTime = new Date(yearstr, monthstr, datestr, 10, 0 + endMinute);
          // console.log("TEST CALENDAR-2"+startTime+"//"+endTime);
          // startTime = new Date(service_date_array[0], service_date_array[1], service_date_array[2], 0, 0,0);
          //endTime = new Date(service_date_array[0], service_date_array[1], service_date_array[2], 0, 0,0);
          /*this.calEvents.push({
            title: this.serviceIdentify[j]['service_subject'],
            startTime: startTime,
            endTime: endTime,
            allDay: true,
            icon: 'service',
            class: 'service'
          });
*/

          this.calEvents.push({
            data: {},
            id: this.serviceIdentify[j]['service_id'],
            event_id: this.serviceIdentify[j]['service_id'],
            startDate: startTime,
            endDate: endTime,
            name: this.serviceIdentify[j]['service_subject'],
            type: 'event',
            allDay: false,
            icon: 'camera',
            event_type: 'S',
            class: 'serviceclass',
            iconStyle: { color: 'green' },
            style: { color: 'green' },
            servicelength: this.serviceIdentify.length,
            //servicelength: servicecountindication,
            event_time: this.serviceIdentify[j]['serviced_time'],
            event_remark: this.serviceIdentify[j]['service_remark'],
            event_location: this.serviceIdentify[j]['service_location'],
            event_addedby_name: this.serviceIdentify[j]['serviced_by_name'],
          });


        }


        this.alarmIdentity = res.allalarms;
        let alarmcountindication = 0;
        for (var k = 0; k < this.alarmIdentity.length; k += 1) {
          if (k == 1) {
            alarmcountindication++;
          }
          var startTime;
          var endTime;
          var substrdt = this.alarmIdentity[k]['alarm_received_date'];//.substring(0, 10)'
          console.log("DATE FORMAT" + this.alarmIdentity[k]['alarm_received_date']);

          console.log("Date Substr result" + substrdt);
          var service_date_array = substrdt.split('-');
          var yearstr = service_date_array[0];
          var monthstr = parseInt(service_date_array[1], 10) - 1;
          var datestr = parseInt(service_date_array[2], 10);
          //var startMinute = Math.floor(Math.random() * 24 * 60);
          var startMinute = 20;
          var endMinute = 10 + startMinute;

          startTime = new Date(yearstr, monthstr, datestr, 10, 0 + startMinute);
          endTime = new Date(yearstr, monthstr, datestr, 10, 0 + endMinute);
          ///console.log("TEST CALENDAR-3"+startTime+"//"+endTime);
          // startTime = new Date(service_date_array[0], service_date_array[1], service_date_array[2], 0, 0,0);
          // endTime = new Date(service_date_array[0], service_date_array[1], service_date_array[2], 0, 0,0);
          /* this.calEvents.push({
             title: this.alarmIdentity[k]['alarm_name'],
             startTime: startTime,
             endTime: endTime,
             allDay: true,
             icon: 'alarm',
             class: 'alarm'
           });
 */

          this.calEvents.push({
            data: {},
            id: this.alarmIdentity[k]['alarm_id'],
            event_id: this.alarmIdentity[k]['alarm_id'],
            startDate: startTime,
            endDate: endTime,
            name: this.alarmIdentity[k]['alarm_name'],
            type: 'event',
            allDay: false,
            event_type: 'A',
            icon: 'alarm',
            class: 'alarmclass',
            iconStyle: { color: 'orange' },
            style: { color: 'orange' },
            alarmlength: this.alarmIdentity.length,
            //alarmlength: alarmcountindication,

            event_remark: this.alarmIdentity[k]['alarm_remark'],
            event_location: this.alarmIdentity[k]['alarm_location'],
            event_addedby_name: this.alarmIdentity[k]['alarm_assginedby_name'],
          });


        }


        // If the request was successful notify the user
        if (data.status === 200) {


        }
        // Otherwise let 'em know anyway
        else {

        }



        this.totalCountEventDateWise = this.calEvents.length;
        if (this.totalCountEventDateWise == 0) {
          this.noeventtitle = 'There is no events';
        }

        console.log("Calendar response:" + JSON.stringify(this.calEvents));
      });
  }

  doAdd() {
    this.navCtrl.push(AddcalendarPage);
  }

  doCalendarDelete(item, action) {
    console.log("Deleted Id" + item.event_id);
    let confirm = this.alertCtrl.create({
      message: 'Are you sure you want to delete?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.deleteEntry(item.event_id, action);
          for (let q: number = 0; q < this.calEvents.length; q++) {
            if (this.calEvents[q] == item) {
              this.calEvents.splice(q, 1);
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
    this.navCtrl.push(AddcalendarPage, {
      item: item,
      type: type
    });
  }

  doCalendarView(event_id) {
    this.navCtrl.push(CalendardetailPage, {
      event_id: event_id
    });
  }

  doAlarmView(event_id) {
    this.navCtrl.push(AlarmdetailsPage, {
      record: event_id,
      act: 'Push'
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


}
