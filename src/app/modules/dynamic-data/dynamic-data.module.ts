import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDataLayoutComponent } from './layout/dynamic-data-layout.component';
import {DynamicDataRoutingModule} from "./dynamic-data-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../core/material/material.module";


@NgModule({
  declarations: [
    DynamicDataLayoutComponent
  ],
  imports: [
    CommonModule,
    DynamicDataRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class DynamicDataModule { }
