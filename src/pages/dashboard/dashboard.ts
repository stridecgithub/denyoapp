import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { MyaccountPage } from '../myaccount/myaccount';
import { UnitgroupPage } from '../unitgroup/unitgroup';
import { UnitsPage } from '../units/units';
import { RolePage } from '../role/role';
import { NotificationPage } from '../notification/notification';
import { MapsPage } from '../maps/maps';
import { ReportsPage } from '../reports/reports';
import { CalendarPage } from '../calendar/calendar';
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
 public loginas: any;
  constructor(public navCtrl: NavController,public nav: NavController) {
 this.loginas = localStorage.getItem("userInfoName");
  }

  goPage(page) {
    console.log(page);
    if (page == 'MapsPage') {
      this.nav.setRoot(MapsPage);
    } else if (page == 'ReportsPage') {
      this.nav.setRoot(ReportsPage);
    } else if (page == 'CalendarPage') {
      this.nav.setRoot(CalendarPage);
    }else if (page == 'UnitsPage') {
      this.nav.setRoot(UnitsPage);
    }

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
}
