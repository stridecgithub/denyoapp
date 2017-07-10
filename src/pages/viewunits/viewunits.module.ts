import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewunitsPage } from './viewunits';

@NgModule({
  declarations: [
    ViewunitsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewunitsPage),
  ],
  exports: [
    ViewunitsPage
  ]
})
export class ViewunitsPageModule {}
