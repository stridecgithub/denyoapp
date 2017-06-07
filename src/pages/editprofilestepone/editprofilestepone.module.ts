import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditprofilesteponePage } from './editprofilestepone';

@NgModule({
  declarations: [
    EditprofilesteponePage,
  ],
  imports: [
    IonicPageModule.forChild(EditprofilesteponePage),
  ],
  exports: [
    EditprofilesteponePage
  ]
})
export class EditprofilesteponePageModule {}
