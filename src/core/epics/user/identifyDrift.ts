import { ActionsObservable } from "redux-observable";
import { Action, Store } from "redux";
import { StateType } from "../../reducers";
import {
  USER_REQUEST_SUCCEEDED,
  SucceedUserRequestAction
} from "../../actions/user";

export const identifyDrift = (
  action$: ActionsObservable<Action>,
  store: Store<StateType>
) =>
  action$
    .ofType(USER_REQUEST_SUCCEEDED)
    .flatMap((action: SucceedUserRequestAction) => {
      drift.identify(action.user._id, {
        email: action.user.contact.emails.find(e => e.isVerified),
        name:
          action.user.personal.name.first + " " + action.user.personal.name.last
      });
      return [];
    });
