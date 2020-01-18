import { Component, OnInit } from "@angular/core";
import { Subscription, Observable } from "rxjs";
//import { TrainingService } from "./training.service";
import { Store } from "@ngrx/store";
import * as training from "./training-reducer.module";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"]
})
export class TrainingComponent implements OnInit {
  OngoingTarining: Observable<boolean>;
  //exerciseSubscribe : Subscription;

  constructor(
    //private trainingService: TrainingService,
    private store: Store<training.State>
  ) {}

  ngOnInit() {
    // this.exerciseSubscribe = this.trainingService.exerciseChanged.subscribe( exercise => {
    //   if(exercise){
    //     this.OngoingTarining = true;
    //   }else {
    //     this.OngoingTarining = false;
    //   }
    // });
    this.OngoingTarining = this.store.select(training.IsActiveExercise);
  }
}
