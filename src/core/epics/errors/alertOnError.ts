import { Epic } from "redux-observable";

import { AllActions } from "../../actions";
import { AddToClassRequestFailed } from "../../actions/classes";
import { StateType } from "../../reducers";

export const alertOnError: Epic<AllActions, StateType> = action$ =>
  action$
    // TODO: this should fire for all unhandled errors really, not just AddToClass
    .ofType<AddToClassRequestFailed>(AddToClassRequestFailed.type)
    .do(action => {
      alert(action.error);
    })
    .ignoreElements();
