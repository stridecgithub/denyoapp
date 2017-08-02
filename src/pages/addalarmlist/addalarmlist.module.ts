import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddalarmlistPage } from './addalarmlist';

@NgModule({
  declarations: [
    AddalarmlistPage,
  ],
  imports: [
    IonicPageModule.forChild(AddalarmlistPage),
  ],
  exports: [
    AddalarmlistPage
  ]
})
export class AddalarmlistPageModule {}
