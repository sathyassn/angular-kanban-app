import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnologiesRoutingModule } from './technologies-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListPageComponent, DetailPageComponent],
  imports: [CommonModule, TechnologiesRoutingModule, SharedModule],
})
export class TechnologiesModule {}
