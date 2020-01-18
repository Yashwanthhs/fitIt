import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { NewTrainingComponent } from "./new-training/new-training.component";
import { CurrenttrainingComponent } from "./currenttraining/currenttraining.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingComponent } from "./training.component";
import { SharedModule } from "../shared/shared.module";
import { TrainingRouterModule } from "./training-router.module";
import { trainingReducer } from "./training-reducer.module";

@NgModule({
  declarations: [
    NewTrainingComponent,
    CurrenttrainingComponent,
    PastTrainingsComponent,
    TrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRouterModule,
    StoreModule.forFeature("training", trainingReducer)
  ],
  exports: []
})
export class TrainingModule {}
