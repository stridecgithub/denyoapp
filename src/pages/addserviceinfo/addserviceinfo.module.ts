import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddserviceinfoPage } from './addserviceinfo';

@NgModule({
  declarations: [
    AddserviceinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddserviceinfoPage),
  ],
  exports: [
    AddserviceinfoPage
  ]
})
export class AddserviceinfoPageModule {}
