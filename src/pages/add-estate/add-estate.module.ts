import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEstatePage } from './add-estate';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AddEstatePage,
  ],
  imports: [
    IonicPageModule.forChild(AddEstatePage),
  ] 
})
export class AddEstatePageModule {}
