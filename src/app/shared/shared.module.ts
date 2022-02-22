import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {ChartsComponent} from "./components/charts/charts.component";
import {MaterialModule} from "../core/material/material.module";
import {HighchartsChartModule} from "highcharts-angular";



@NgModule({
  declarations: [
    HeaderComponent,
    ChartsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HighchartsChartModule
  ],
  exports: [
    HeaderComponent,
    ChartsComponent
  ]
})
export class SharedModule { }
