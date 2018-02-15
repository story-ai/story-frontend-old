import { Epic } from "redux-observable";
import { CenturyTypes } from "story-backend-utils";
import * as superagent from "superagent";

import { CENTURY_ACCOUNT_API } from "../../../config";
import { AllActions } from "../../actions";
import { centuryAuthHeaders, getTokenStream } from "../../common";
import { StateType } from "../../reducers";
import {
  UserRequested,
  UserRequestFailed,
  UserRequestSucceeded
} from "../../actions/user";
import { Observable } from "rxjs/Observable";

export const requestUser: Epic<AllActions, StateType> = (action$, state$) =>
  action$
    .ofType<UserRequested>(UserRequested.type)
    .combineLatest(getTokenStream(state$))
    .switchMap(([action, token]) =>
      superagent
        .get(`${CENTURY_ACCOUNT_API}/users/me`)
        .set(centuryAuthHeaders(token))
    )
    .map(res => {
      if (!res.ok) return new UserRequestFailed(res.text);

      const data = res.body as CenturyTypes.User;
      return new UserRequestSucceeded(data);
    })
    .catch(e => Observable.of(new UserRequestFailed(e)));
