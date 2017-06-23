import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddcommentsinfoPage } from './addcommentsinfo';

@NgModule({
  declarations: [
    AddcommentsinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddcommentsinfoPage),
  ],
  exports: [
    AddcommentsinfoPage
  ]
})
export class AddcommentsinfoPageModule {}
