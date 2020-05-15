import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbtableRoutingModule } from './dbtable-routing.module';
import { DbtableComponent } from './dbtable.component';
import { ViewAleft1Component } from './view-aleft1.component';
import { ViewAright1Component } from './view-aright1.component';
import { ViewAright2Component } from './view-aright2.component';
import { ViewAright3Component } from './view-aright3.component';


@NgModule({
  declarations: [DbtableComponent, ViewAleft1Component, ViewAright1Component, ViewAright2Component, ViewAright3Component],
  imports: [
    CommonModule,
    DbtableRoutingModule
  ]
})
export class DbtableModule { }
