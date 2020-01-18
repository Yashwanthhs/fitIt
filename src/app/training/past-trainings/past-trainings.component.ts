import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { IExercise } from "../exercise.model";
import { TrainingService } from "../training.service";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { SharedService } from "src/app/shared/shared.service";
import * as appRoot from "../../app-reducer.module";
import * as fromTraining from "../training-reducer.module";

@Component({
  selector: "app-past-trainings",
  templateUrl: "./past-trainings.component.html",
  styleUrls: ["./past-trainings.component.css"]
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<IExercise>();
  exerciseCompletedSubscription: Subscription;
  displayedColumns = ["date", "name", "calories", "duration", "state"];
  loadingSubscription: Subscription;
  loaderEnabled: Observable<boolean>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private sharedService: SharedService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.store
      .select(fromTraining.getFinishedExercises)
      .subscribe((exercise: IExercise[]) => {
        this.dataSource.data = exercise;
      });
    this.trainingService.getCompletedOrCancelledExercises();

    this.loaderEnabled = this.store.select(appRoot.getIsLoading);
    // this.loadingSubscription = this.sharedService.isLoadingState.subscribe(
    //   isLoading => {
    //     this.loaderEnabled = isLoading;
    //   }
    // );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    // if (this.exerciseCompletedSubscription) {
    //   this.exerciseCompletedSubscription.unsubscribe();
    // }
    // if (this.loadingSubscription) {
    //   this.loadingSubscription.unsubscribe();
    // }
  }
}
