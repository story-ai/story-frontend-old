import { AllActions } from "../actions";
import { ActionsObservable, Epic } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action, MiddlewareAPI } from "redux";
import axios from "axios";
import { APP_START, AppStartAction } from "../actions/app";

import { StoryServices } from "../../config";
import { StateType } from "../reducers/index";
import {
  LOGIN,
  LoginAction,
  LOGOUT,
  LogoutAction,
  RECEIVED_TOKEN,
  receiveToken,
  ReceivedTokenAction
} from "../actions/auth";

export const logout = (action$: ActionsObservable<LogoutAction>) =>
  action$.ofType(LOGOUT).flatMap(action => {
    window.localStorage.removeItem("authToken");
    return [];
  });

export const persistToken = (action$: ActionsObservable<ReceivedTokenAction>) =>
  action$.ofType(RECEIVED_TOKEN).flatMap((action: ReceivedTokenAction) => {
    console.log("Read from storage");
    window.localStorage.setItem("authToken", action.token);
    return [];
  });

export const initToken: Epic<AllActions, StateType> = action$ =>
  action$.ofType(APP_START).flatMap(action => {
    const token = localStorage.getItem("authToken");
    if (token !== undefined && token !== null) return [receiveToken(token)];
    return [];
  });

export const login = (
  action$: ActionsObservable<Action>,
  store: MiddlewareAPI<StateType>
) =>
  action$
    .ofType(LOGIN)
    .flatMap((action$: LoginAction) => {
      type Result = {
        token: string;
      };
      return axios.post<{ token: string }>(
        "https://api.century.tech/accounts/v2/login-sessions",
        {
          email: action$.username,
          password: action$.password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    })
    .map(res => {
      if (res.status !== 200) throw res.statusText;
      return receiveToken(res.data.token);
    });
