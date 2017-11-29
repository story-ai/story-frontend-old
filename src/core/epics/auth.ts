import { AllActions } from "../actions";
import { ActionsObservable, Epic } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action, MiddlewareAPI } from "redux";
import axios from "axios";

import { StoryServices } from "../../config";
import { StateType } from "../reducers/index";
import {
  failLogin,
  LOGIN,
  LoginAction,
  LOGOUT,
  LogoutAction,
  RECEIVED_TOKEN,
  ReceivedTokenAction,
  receiveToken
} from "../actions/auth";

export const logout = (action$: ActionsObservable<LogoutAction>) =>
  action$.ofType(LOGOUT).flatMap(action => {
    window.localStorage.removeItem("authToken");
    return [];
  });

// export const persistToken = (action$: ActionsObservable<ReceivedTokenAction>) =>
//   action$.ofType(RECEIVED_TOKEN).flatMap((action: ReceivedTokenAction) => {
//     console.log("Read from storage");
//     window.localStorage.setItem("authToken", action.token);
//     return [];
//   });

// export const initToken: Epic<AllActions, StateType> = action$ =>
//   action$.ofType(APP_START).flatMap(action => {
//     const token = localStorage.getItem("authToken");
//     if (token !== undefined && token !== null) return [receiveToken(token)];
//     return [];
//   });

export const login = (
  action$: ActionsObservable<Action>,
  store: MiddlewareAPI<StateType>
) => {
  const x = action$.ofType(LOGIN).flatMap(async (action$: LoginAction) => {
    console.log("Gonna post!");
    type Result = {
      token: string;
    };
    try {
      if (action$.username === undefined || action$.username.length < 1) {
        return failLogin("Email must not be empty");
      }
      if (action$.password === undefined || action$.password.length < 1) {
        return failLogin("Password must not be empty");
      }
      const res = await axios.post<{ token: string }>(
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

      if (res.status !== 200) {
        console.log("Failed :(");
        return failLogin(res.statusText);
      }
      return receiveToken(res.data.token);
    } catch (e) {
      console.log(e.response);
      return failLogin(e.response.data.message);
    }
  });
  return x;
};
