import { Epic } from "redux-observable";

import { AllActions } from "../../actions";
import { UserMetaRequested, UserRequestSucceeded } from "../../actions/user";
import { StateType } from "../../reducers";

export const requestUserMeta: Epic<AllActions, StateType> = action$ =>
  action$
    .ofType<UserRequestSucceeded>(UserRequestSucceeded.type)
    .map(action => new UserMetaRequested(action.user._id));
