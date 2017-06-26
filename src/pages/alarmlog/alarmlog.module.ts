import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlarmlogPage } from './alarmlog';

@NgModule({
  declarations: [
    AlarmlogPage,
  ],
  imports: [
    IonicPageModule.forChild(AlarmlogPage),
  ],
  exports: [
    AlarmlogPage
  ]
})
export class AlarmlogPageModule {}
