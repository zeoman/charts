import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatRadioModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatRadioModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
