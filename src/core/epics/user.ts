import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action, MiddlewareAPI } from "redux";
import axios from "axios";

import { StoryServices, CENTURY_ACCOUNT_API } from "../../config";
import {
  failUserRequest,
  RequestUserAction,
  succeedUserRequest,
  USER_REQUESTED
} from "../actions/user";
import { StoryTypes } from "story-backend-utils/dist/types/StoryTypes";
import { Store } from "react-redux";
import { StateType } from "../reducers/index";
import { Map } from "../../../../backend-utils/dist/types/common";
import { CenturyTypes } from "../../../../backend-utils/dist/types/CenturyTypes";

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
