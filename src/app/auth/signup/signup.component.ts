import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { SharedService } from "src/app/shared/shared.service";
import { Subscription, Observable } from "rxjs";
import * as appRoot from "../../app-reducer.module";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  loadingSubscription: Subscription;
  loaderEnabled: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private store: Store<appRoot.State>
  ) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loaderEnabled = this.store.select(appRoot.getIsLoading);
    // this.loadingSubscription = this.sharedService.isLoadingState.subscribe(
    //   isLoading => {
    //     this.loaderEnabled = isLoading;
    //   }
    // );
  }

  OnSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    // if (this.loadingSubscription) {
    //   this.loadingSubscription.unsubscribe();
    // }
  }
}
