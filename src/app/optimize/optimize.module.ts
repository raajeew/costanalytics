import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptimizeRoutingModule } from './optimize-routing.module';
import { OptimizeComponent } from './optimize.component';


@NgModule({
  declarations: [OptimizeComponent],
  imports: [
    CommonModule,
    OptimizeRoutingModule
  ]
})
export class OptimizeModule { }
