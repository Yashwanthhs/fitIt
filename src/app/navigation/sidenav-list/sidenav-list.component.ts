import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../app-reducer.module";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"]
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter();
  authSubscribe: Subscription;
  isAuth: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    // this.authSubscribe = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // })
    this.isAuth = this.store.select(fromRoot.getIsAuthenticated);
  }

  OnSidenavClose() {
    this.sidenavClose.emit();
  }

  OnLogout() {
    this.authService.logout();
    this.OnSidenavClose();
  }

  ngOnDestroy() {
    // this.authSubscribe.unsubscribe();
  }
}
