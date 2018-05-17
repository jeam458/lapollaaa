import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartidosPage } from './partidos';

@NgModule({
  declarations: [
    PartidosPage,
  ],
  imports: [
    IonicPageModule.forChild(PartidosPage),
  ],
})
export class PartidosPageModule {}
