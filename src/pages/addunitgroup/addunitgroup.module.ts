import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddunitgroupPage } from './addunitgroup';

@NgModule({
  declarations: [
    AddunitgroupPage,
  ],
  imports: [
    IonicPageModule.forChild(AddunitgroupPage),
  ],
  exports: [
    AddunitgroupPage
  ]
})
export class AddunitgroupPageModule {}
