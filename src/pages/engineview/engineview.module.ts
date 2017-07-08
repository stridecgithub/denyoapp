import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngineviewPage } from './engineview';

@NgModule({
  declarations: [
    EngineviewPage,
  ],
  imports: [
    IonicPageModule.forChild(EngineviewPage),
  ],
  exports: [
    EngineviewPage
  ]
})
export class EngineviewPageModule {}
