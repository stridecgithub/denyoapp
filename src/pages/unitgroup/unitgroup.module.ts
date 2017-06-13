import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnitgroupPage } from './unitgroup';

@NgModule({
  declarations: [
    UnitgroupPage,
  ],
  imports: [
    IonicPageModule.forChild(UnitgroupPage),
  ],
  exports: [
    UnitgroupPage
  ]
})
export class UnitgroupPageModule {}
