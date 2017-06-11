import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtmentionedPage } from './atmentioned';

@NgModule({
  declarations: [
    AtmentionedPage,
  ],
  imports: [
    IonicPageModule.forChild(AtmentionedPage),
  ],
  exports: [
    AtmentionedPage
  ]
})
export class AtmentionedPageModule {}
