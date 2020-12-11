import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnologiesRoutingModule } from './technologies-routing.module';
import { ListPageComponent } from './list-page/list-page.component';


@NgModule({
  declarations: [ListPageComponent],
  imports: [
    CommonModule,
    TechnologiesRoutingModule
  ]
})
export class TechnologiesModule { }
