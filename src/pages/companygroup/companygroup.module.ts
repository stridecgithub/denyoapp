import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanygroupPage } from './companygroup';

@NgModule({
  declarations: [
    CompanygroupPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanygroupPage),
  ],
  exports: [
    CompanygroupPage
  ]
})
export class CompanygroupPageModule {}
