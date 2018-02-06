import { Epic } from "redux-observable";

import { AllActions } from "../../actions";
import { UserRequestSucceeded } from "../../actions/user";
import { StateType } from "../../reducers";

export const identifyDrift: Epic<AllActions, StateType> = action$ =>
  action$
    .ofType<UserRequestSucceeded>(UserRequestSucceeded.type)
    .do(action => {
      drift.identify(action.user._id, {
        email: action.user.contact.emails.find(e => e.isVerified),
        name:
          action.user.personal.name.first + " " + action.user.personal.name.last
      });
    })
    .ignoreElements();
