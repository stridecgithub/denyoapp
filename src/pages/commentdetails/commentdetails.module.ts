import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentdetailsPage } from './commentdetails';

@NgModule({
  declarations: [
    CommentdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentdetailsPage),
  ],
  exports: [
    CommentdetailsPage
  ]
})
export class CommentdetailsPageModule {}
