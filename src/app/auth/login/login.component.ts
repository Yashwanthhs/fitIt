import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { SharedService } from "src/app/shared/shared.service";
import { Subscription, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as formRoot from "../../app-reducer.module";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  loaderEnabled: Observable<boolean>;
  loadingSubsciption: Subscription;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private store: Store<formRoot.State>
  ) {}

  ngOnInit() {
    this.loaderEnabled = this.store.select(formRoot.getIsLoading);
    // this.loadingSubsciption = this.sharedService.isLoadingState.subscribe(
    //   isLoading => {
    //     this.loaderEnabled = isLoading;
    //   }
    // );
  }

  OnSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.Password
    });
  }

  ngOnDestroy() {
    // if(this.loadingSubsciption){
    //   this.loadingSubsciption.unsubscribe();
    // }
  }
}
