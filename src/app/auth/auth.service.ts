import { Subject, Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TrainingService } from "../training/training.service";
import { SharedService } from "../shared/shared.service";
import { Store } from "@ngrx/store";
import * as fromRoot from "../app-reducer.module";
import * as UI from "../shared/ui.actions";
import * as Auth from "./auth-action.module";

@Injectable()
export class AuthService {
  public isAuthanticated: Observable<boolean>;
  //authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private sharedService: SharedService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        //this.isAuthanticated = true;
        this.store.dispatch(new Auth.SetAuthenticated());
        //this.authChange.next(true);
        this.router.navigate(["/training"]);
      } else {
        this.trainingService.unsubscribeFirebase();
        //this.authChange.next(false);
        this.router.navigate(["/login"]);
        //this.isAuthanticated = false;
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.store.dispatch(new UI.StopLoading());
      }
    });
  }
  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        this.sharedService.showSnackBar(
          "Successfully registered!!!",
          null,
          3000
        );
      })
      .catch(err => {
        this.store.dispatch(new UI.StopLoading());
        this.sharedService.showSnackBar(err.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        this.sharedService.showSnackBar("Successfully loggedIn!!!", null, 3000);
      })
      .catch(err => {
        this.store.dispatch(new UI.StopLoading());
        this.sharedService.showSnackBar(err.message, null, 3000);
      });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  // isAuth() {
  //   return (this.isAuthanticated = this.store.select(
  //     fromRoot.getIsAuthenticated
  //   ));
  // }
}
