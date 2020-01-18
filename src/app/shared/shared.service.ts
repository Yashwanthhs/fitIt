import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class SharedService {
  isLoadingState = new Subject<boolean>();

  constructor(private matSnackBar: MatSnackBar) {}

  showSnackBar(message, action, timeSpan) {
    this.matSnackBar.open(message, action, {
      duration: timeSpan
    });
  }
}
