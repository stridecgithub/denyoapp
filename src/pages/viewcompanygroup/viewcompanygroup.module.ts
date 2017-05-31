import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewcompanygroupPage } from './viewcompanygroup';

@NgModule({
  declarations: [
    ViewcompanygroupPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewcompanygroupPage),
  ],
  exports: [
    ViewcompanygroupPage
  ]
})
export class ViewcompanygroupPageModule {}
