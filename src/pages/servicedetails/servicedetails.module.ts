import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicedetailsPage } from './servicedetails';

@NgModule({
  declarations: [
    ServicedetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicedetailsPage),
  ],
  exports: [
    ServicedetailsPage
  ]
})
export class ServicedetailsPageModule {}
