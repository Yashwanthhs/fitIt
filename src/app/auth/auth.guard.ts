import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from "@angular/router";

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import * as fromRoot from "../app-reducer.module";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(["/login"]);
    // }

    if (this.store.select(fromRoot.getIsAuthenticated).pipe(take(1))) {
      return true;
    } else {
      this.router.navigate(["/login"]);
    }
  }

  canLoad(route: Route) {
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(["/login"]);
    // }
    if (this.store.select(fromRoot.getIsAuthenticated).pipe(take(1))) {
      return true;
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
