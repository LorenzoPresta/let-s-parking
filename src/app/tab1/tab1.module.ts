import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ArcgisApiService } from '../service/arcgis-apiservice.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
  ],
  declarations: [Tab1Page],
  providers: [Geolocation, ArcgisApiService],
})
export class Tab1PageModule {}
