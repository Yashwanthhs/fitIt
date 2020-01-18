import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { AuthService } from "src/app/auth/auth.service";
import * as fromRoot from "../../app-reducer.module";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavtoggle = new EventEmitter();
  isAuth: Observable<boolean>;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus
    // });

    this.isAuth = this.store.select(fromRoot.getIsAuthenticated);
  }

  OnToggleSidenav() {
    this.sidenavtoggle.emit();
  }

  OnLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    //this.authSubscription.unsubscribe();
  }
}
