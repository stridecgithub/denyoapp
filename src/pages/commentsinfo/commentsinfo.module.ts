import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentsinfoPage } from './commentsinfo';

@NgModule({
  declarations: [
    CommentsinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentsinfoPage),
  ],
  exports: [
    CommentsinfoPage
  ]
})
export class CommentsinfoPageModule {}
