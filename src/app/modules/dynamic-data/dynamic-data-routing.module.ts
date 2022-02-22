import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DynamicDataLayoutComponent} from "./layout/dynamic-data-layout.component";

const routes: Routes = [
  {
    path: '',
    component: DynamicDataLayoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicDataRoutingModule { }
