import { ActionsObservable } from "redux-observable";
import { Action } from "redux";
import { StateType } from "../../reducers/index";
import { Store } from "react-redux";
import {
  USER_REQUEST_SUCCEEDED,
  UserMetaRequested,
  SucceedUserRequestAction
} from "../../actions/user";

export const requestUserMeta = (
  action$: ActionsObservable<Action>,
  store: Store<StateType>
) =>
  action$
    .ofType(USER_REQUEST_SUCCEEDED)
    .map(
      (action: SucceedUserRequestAction) =>
        new UserMetaRequested(action.user._id)
    );
