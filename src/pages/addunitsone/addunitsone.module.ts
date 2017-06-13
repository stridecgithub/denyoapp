import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddunitsonePage } from './addunitsone';

@NgModule({
  declarations: [
    AddunitsonePage,
  ],
  imports: [
    IonicPageModule.forChild(AddunitsonePage),
  ],
  exports: [
    AddunitsonePage
  ]
})
export class AddunitsonePageModule {}
