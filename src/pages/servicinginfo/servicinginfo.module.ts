import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicinginfoPage } from './servicinginfo';

@NgModule({
  declarations: [
    ServicinginfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicinginfoPage),
  ],
  exports: [
    ServicinginfoPage
  ]
})
export class ServicinginfoPageModule {}
