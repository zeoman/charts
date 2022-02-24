import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import {MaterialModule} from "../../core/material/material.module";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class DashboardModule {
}
