import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UseraccountPage } from './useraccount';

@NgModule({
  declarations: [
    UseraccountPage,
  ],
  imports: [
    IonicPageModule.forChild(UseraccountPage),
  ],
  exports: [
    UseraccountPage
  ]
})
export class UseraccountPageModule {}
