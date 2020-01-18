import * as formUi from "./shared/ui-reducer.module";
import * as fromAuth from "./auth/auth-reducer.module";

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

export interface State {
  ui: formUi.State;
  auth: fromAuth.Authenicated;
}

export const reducers: ActionReducerMap<State> = {
  ui: formUi.UIReducer,
  auth: fromAuth.AuthReducer
};

export const getUIState = createFeatureSelector<formUi.State>("ui");
export const getIsLoading = createSelector(getUIState, formUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.Authenicated>(
  "auth"
);
export const getIsAuthenticated = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticated
);
