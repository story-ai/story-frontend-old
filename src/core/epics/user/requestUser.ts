import { ActionsObservable } from "redux-observable";
import { Action, Store } from "redux";
import { StateType } from "../../reducers";
import {
  USER_REQUESTED,
  RequestUserAction,
  succeedUserRequest,
  failUserRequest
} from "../../actions/user";
import { CenturyTypes } from "story-backend-utils";
import axios from "axios";
import { Observable } from "rxjs";
import { CENTURY_ACCOUNT_API } from "../../../config";

export const requestUser = (
  action$: ActionsObservable<Action>,
  store: Store<StateType>
) =>
  action$
    .ofType(USER_REQUESTED)
    .flatMap((action: RequestUserAction) => {
      const state = store.getState();
      return axios.get<CenturyTypes.User>(`${CENTURY_ACCOUNT_API}/users/me`, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`
        }
      });
    })
    .map(res => {
      if (res.status !== 200) throw res.data;

      if (typeof res.data !== "object") {
        throw "Unexpected result shape " + JSON.stringify(res.data);
      }
      return succeedUserRequest(res.data);
    })
    .catch(e => Observable.of(failUserRequest(e)));
