import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserorgchartPage } from './userorgchart';

@NgModule({
  declarations: [
    UserorgchartPage,
  ],
  imports: [
    IonicPageModule.forChild(UserorgchartPage),
  ],
  exports: [
    UserorgchartPage
  ]
})
export class UserorgchartPageModule {}
