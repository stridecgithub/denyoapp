import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddreporttemplatePage } from './addreporttemplate';

@NgModule({
  declarations: [
    AddreporttemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(AddreporttemplatePage),
  ],
  exports: [
    AddreporttemplatePage
  ]
})
export class AddreporttemplatePageModule {}
