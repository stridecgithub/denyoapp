import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddrequestsupportPage } from './addrequestsupport';

@NgModule({
  declarations: [
    AddrequestsupportPage,
  ],
  imports: [
    IonicPageModule.forChild(AddrequestsupportPage),
  ],
  exports: [
    AddrequestsupportPage
  ]
})
export class AddrequestsupportPageModule {}
