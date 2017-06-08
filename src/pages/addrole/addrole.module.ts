import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddrolePage } from './addrole';

@NgModule({
  declarations: [
    AddrolePage,
  ],
  imports: [
    IonicPageModule.forChild(AddrolePage),
  ],
  exports: [
    AddrolePage
  ]
})
export class AddrolePageModule {}
