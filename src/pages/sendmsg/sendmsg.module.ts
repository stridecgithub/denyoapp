import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Sendmsg } from './sendmsg';

@NgModule({
  declarations: [
    Sendmsg,
  ],
  imports: [
    IonicPageModule.forChild(Sendmsg),
  ],
  exports: [
    Sendmsg
  ]
})
export class SendmsgModule {}
