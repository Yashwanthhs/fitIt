import {
  AuthAction,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from "./auth-action.module";

export interface Authenicated {
  isAuthenticated: boolean;
}

const intialState: Authenicated = {
  isAuthenticated: false
};

export function AuthReducer(state = intialState, action: AuthAction) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export const getIsAuthenticated = (authenticated: Authenicated) =>
  authenticated.isAuthenticated;
