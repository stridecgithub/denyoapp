import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddorgchartonePage } from './addorgchartone';

@NgModule({
  declarations: [
    AddorgchartonePage,
  ],
  imports: [
    IonicPageModule.forChild(AddorgchartonePage),
  ],
  exports: [
    AddorgchartonePage
  ]
})
export class AddorgchartonePageModule {}
