import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TrainingComponent } from "./training.component";

const route: Routes = [{ path: "", component: TrainingComponent }];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class TrainingRouterModule {}
