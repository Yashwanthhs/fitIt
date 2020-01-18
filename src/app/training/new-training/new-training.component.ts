import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { TrainingService } from "../training.service";
import { IExercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Store } from "@ngrx/store";
import * as appRoot from "../../app-reducer.module";
import * as appTraining from "../training-reducer.module";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableTraining$: Observable<IExercise[]>;
  //exerciseSubscription: Subscription;
  loaderEnabled$: Observable<boolean>;
  //loadingSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private sharedService: SharedService,
    private store: Store<appTraining.State>
  ) {}

  ngOnInit() {
    this.loaderEnabled$ = this.store.select(appRoot.getIsLoading);
    this.availableTraining$ = this.store.select(
      appTraining.getAvailableExercises
    );
    this.fetchExercises();
    // this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
    //   exercises => (this.availableTraining = exercises)
    // );
    // this.loadingSubscription = this.sharedService.isLoadingState.subscribe(
    //   isLoading => {
    //     this.loaderEnabled = isLoading;
    //   }
    // );
  }

  fetchExercises() {
    this.trainingService.getAvailableTraining();
  }

  OnStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    // if (this.exerciseSubscription) {
    //   this.exerciseSubscription.unsubscribe();
    // }
    // if (this.loadingSubscription) {
    //   this.loadingSubscription.unsubscribe();
    // }
  }
}
