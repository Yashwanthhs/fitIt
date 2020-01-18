import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StopTrainingComponent } from "./stop-training.component";
import { TrainingService } from "../training.service";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as appRoot from "../../app-reducer.module";
import { SharedService } from "src/app/shared/shared.service";
import * as trainingRoot from "../training-reducer.module";
import { IExercise } from "../exercise.model";

@Component({
  selector: "app-currenttraining",
  templateUrl: "./currenttraining.component.html",
  styleUrls: ["./currenttraining.component.css"]
})
export class CurrenttrainingComponent implements OnInit, OnDestroy {
  progress: number = 100;
  timer: number;
  selectedExercise: Observable<IExercise>;
  loadingSubscription: Subscription;
  loaderEnabled: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private sharedService: SharedService,
    private store: Store<trainingRoot.State>
  ) {}

  ngOnInit() {
    this.selectedExercise = this.store.select(trainingRoot.getActiveExercise);
    this.StartorResumeTimer();
    this.loaderEnabled = this.store.select(appRoot.getIsLoading);
    // this.loadingSubscription = this.sharedService.isLoadingState.subscribe(
    //   isLoading => {
    //     this.loaderEnabled = isLoading;
    //   }
    // );
  }

  StartorResumeTimer() {
    this.store
      .select(trainingRoot.getActiveExercise)
      .subscribe(activeExercise => {
        const steps = (activeExercise.duration / 100) * 1000;
        this.timer = setInterval(() => {
          if (this.progress == 1) {
            this.trainingService.completedExercise();
            clearInterval(this.timer);
          }
          this.progress = this.progress - 1;
        }, steps);
      });
  }

  OnStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: Number(this.progress)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelledExercise(this.progress);
      } else {
        this.StartorResumeTimer();
      }
    });
  }

  ngOnDestroy() {
    // if (this.loadingSubscription) {
    //   this.loadingSubscription.unsubscribe();
    // }
  }
}
