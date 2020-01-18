import { Subject } from "rxjs/Subject";
import { Injectable, Pipe } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

import { IExercise } from "./exercise.model";
import { SharedService } from "../shared/shared.service";
import * as UI from "../shared/ui.actions";
import * as appRoot from "./training-reducer.module";
import * as TrainingActions from "./training-action";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<IExercise>();
  exercisesChanged = new Subject<IExercise[]>(); // used to emit out whenever there is change in exercises.
  completedExercisesChanged = new Subject<IExercise[]>();
  private availableExercise: IExercise[] = []; // actual exercise as fetched from DB.
  private runningExercise: IExercise;
  private firebaseSubscribe: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private sharedServcie: SharedService,
    private store: Store<appRoot.State>
  ) {}

  getAvailableTraining() {
    // this.sharedServcie.isLoadingState.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.firebaseSubscribe.push(
      this.db
        .collection("availableExercise")
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()["name"],
                duration: doc.payload.doc.data()["duration"],
                calories: doc.payload.doc.data()["calories"]
              };
            });
          })
        )
        .subscribe(
          (exercises: IExercise[]) => {
            //this.sharedServcie.isLoadingState.next(false);
            this.store.dispatch(new UI.StopLoading());
            //   this.availableExercise = exercises;
            //   this.exercisesChanged.next([...this.availableExercise]);
            this.store.dispatch(
              new TrainingActions.SetAvailableExercises(exercises)
            );
          },
          error => {
            this.sharedServcie.showSnackBar(
              "Fetching exercises failed Please try again later!!!",
              null,
              3000
            );
            //this.exercisesChanged.next(null);
            //this.sharedServcie.isLoadingState.next(false);\
            // this.store.dispatch(
            //   new TrainingActions.SetAvailableExercises(null)
            // );
            this.store.dispatch(new UI.StopLoading());
          }
        )
    );
  }

  startExercise(selectedId: string) {
    // this.runningExercise = this.availableExercise.find(
    //   exe => exe.id == selectedId
    // );
    //this.exerciseChanged.next({ ...this.runningExercise });
    this.store.dispatch(new TrainingActions.SetStartExercise(selectedId));
  }

  completedExercise() {
    this.store
      .select(appRoot.getActiveExercise)
      .pipe(take(1))
      .subscribe(activeExercise => {
        this.addCompletedOrCancelledExerciseToDb({
          ...activeExercise,
          date: new Date(),
          state: "completed"
        });
        this.store.dispatch(new TrainingActions.SetStopExercise());
      });
    //this.runningExercise = null;
    //this.exerciseChanged.next(null);
    //this.store.dispatch(new TrainingActions.SetStopExercise());
  }

  cancelledExercise(progress: number) {
    this.store
      .select(appRoot.getActiveExercise)
      .pipe(take(1))
      .subscribe(activeExercise => {
        this.addCompletedOrCancelledExerciseToDb({
          ...activeExercise,
          duration: activeExercise.duration * ((100 - progress) / 100),
          calories: activeExercise.calories * ((100 - progress) / 100),
          state: "cancelled",
          date: new Date()
        });
        this.store.dispatch(new TrainingActions.SetStopExercise());
      });
    //this.runningExercise = null;
    //this.exerciseChanged.next(null);
  }

  // getRunningExercise() {
  //   return { ...this.runningExercise };
  // }

  getCompletedOrCancelledExercises() {
    //this.sharedServcie.isLoadingState.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.firebaseSubscribe.push(
      this.db
        .collection("CompletedOrCancelledExercise")
        .valueChanges()
        .subscribe((exercise: IExercise[]) => {
          // this.sharedServcie.isLoadingState.next(false);
          this.store.dispatch(new UI.StopLoading());
          //this.completedExercisesChanged.next(exercise);
          this.store.dispatch(
            new TrainingActions.SetFinishedExercises(exercise)
          );
        })
    );
  }

  private addCompletedOrCancelledExerciseToDb(exercise: IExercise) {
    this.db.collection("CompletedOrCancelledExercise").add(exercise);
  }

  unsubscribeFirebase() {
    this.firebaseSubscribe.forEach(subscip => {
      if (subscip) {
        subscip.unsubscribe();
      }
    });
  }
}
