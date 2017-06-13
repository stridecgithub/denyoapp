import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnitsPage } from './units';

@NgModule({
  declarations: [
    UnitsPage,
  ],
  imports: [
    IonicPageModule.forChild(UnitsPage),
  ],
  exports: [
    UnitsPage
  ]
})
export class UnitsPageModule {}
