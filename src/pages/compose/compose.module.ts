import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Compose } from './compose';

@NgModule({
  declarations: [
    Compose,
  ],
  imports: [
    IonicPageModule.forChild(Compose),
  ],
  exports: [
    Compose
  ]
})
export class ComposeModule {}
