import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddalarmPage } from './addalarm';

@NgModule({
  declarations: [
    AddalarmPage,
  ],
  imports: [
    IonicPageModule.forChild(AddalarmPage),
  ],
  exports: [
    AddalarmPage
  ]
})
export class AddalarmPageModule {}
