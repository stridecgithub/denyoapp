import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddcompanygroupPage } from './addcompanygroup';

@NgModule({
  declarations: [
    AddcompanygroupPage,
  ],
  imports: [
    IonicPageModule.forChild(AddcompanygroupPage),
  ],
  exports: [
    AddcompanygroupPage
  ]
})
export class AddcompanygroupPageModule {}
