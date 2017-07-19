import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnginedetailviewPage } from './enginedetailview';

@NgModule({
  declarations: [
    EnginedetailviewPage,
  ],
  imports: [
    IonicPageModule.forChild(EnginedetailviewPage),
  ],
  exports: [
    EnginedetailviewPage
  ]
})
export class EnginedetailviewPageModule {}
