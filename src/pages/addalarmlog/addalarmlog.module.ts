import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddalarmlogPage } from './addalarmlog';

@NgModule({
  declarations: [
    AddalarmlogPage,
  ],
  imports: [
    IonicPageModule.forChild(AddalarmlogPage),
  ],
  exports: [
    AddalarmlogPage
  ]
})
export class AddalarmlogPageModule {}
