import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardLayoutComponent} from "./layout/dashboard-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
