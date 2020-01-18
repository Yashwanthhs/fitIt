import { Action } from "@ngrx/store";

export const SET_AUTHENTICATED = "Set Authenticated";
export const SET_UNAUTHENTICATED = "Set Unauthenticated";

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export type AuthAction = SetAuthenticated | SetUnauthenticated;
