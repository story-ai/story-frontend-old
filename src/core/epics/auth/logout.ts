import { Epic } from "redux-observable";

import { AllActions } from "../../actions";
import { LogoutRequestSucceeded } from "../../actions/auth";
import { StateType } from "../../reducers";

export const logout: Epic<AllActions, StateType> = action$ =>
  action$
    .ofType(LogoutRequestSucceeded.type)
    .do(() => window.localStorage.removeItem("authToken"))
    .ignoreElements();
