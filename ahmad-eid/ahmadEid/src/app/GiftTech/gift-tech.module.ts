import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftTechRoutingModule } from './gift-tech-routing.module';
import { GiftTechMainComponent } from './gift-tech-main/gift-tech-main.component';


@NgModule({
  declarations: [
    GiftTechMainComponent
  ],
  imports: [
    CommonModule,
    GiftTechRoutingModule
  ]
})
export class GiftTechModule { }
