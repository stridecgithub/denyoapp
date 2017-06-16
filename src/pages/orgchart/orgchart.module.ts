import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrgchartPage } from './orgchart';

@NgModule({
  declarations: [
    OrgchartPage,
  ],
  imports: [
    IonicPageModule.forChild(OrgchartPage),
  ],
  exports: [
    OrgchartPage
  ]
})
export class OrgchartPageModule {}
