import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlarmlistdetailPage } from './alarmlistdetail';

@NgModule({
  declarations: [
    AlarmlistdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AlarmlistdetailPage),
  ],
  exports: [
    AlarmlistdetailPage
  ]
})
export class AlarmlistdetailPageModule {}
