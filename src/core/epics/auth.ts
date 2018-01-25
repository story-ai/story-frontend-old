import { AllActions } from "../actions";
import { ActionsObservable, Epic } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action, MiddlewareAPI } from "redux";
import axios from "axios";
import { CENTURY_LEARN_API } from "../../config";

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
  receiveToken,
  REGISTER,
  REGISTER_SUCCEEDED,
  RegisterAction,
  registerFail,
  registerSucceed,
  login as loginAction
} from "../actions/auth";

export const logout = (action$: ActionsObservable<LogoutAction>) =>
  action$.ofType(LOGOUT).flatMap(action => {
    window.localStorage.removeItem("authToken");
    return [];
  });

export const login = (
  action$: ActionsObservable<Action>,
  store: MiddlewareAPI<StateType>
) => {
  const x = action$.ofType(LOGIN).flatMap(async (action$: LoginAction) => {
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
        return failLogin(res.statusText);
      }
      return receiveToken(res.data.token);
    } catch (e) {
      return failLogin(e.response.data.message);
    }
  });
  return x;
};

export const register = (
  action$: ActionsObservable<Action>,
  store: MiddlewareAPI<StateType>
) => {
  const x = action$
    .ofType(REGISTER)
    .flatMap(async (action$: RegisterAction): Promise<Action[]> => {
      type Result = {
        token: string;
      };
      try {
        const registration = await axios.post<{
          success: boolean;
          message?: string;
        }>(`${StoryServices.material}/user`, {
          username: action$.username,
          password: action$.password,
          passwordConfirmation: action$.passwordConfirmation
        });

        if (registration.status !== 200 || registration.data.success !== true) {
          return [
            registerFail(registration.data.message || registration.statusText)
          ];
        }
        return [
          registerSucceed(),
          loginAction({
            username: action$.username,
            password: action$.password
          })
        ];
      } catch (e) {
        if (e.response && e.response.data && e.response.data.message) {
          return [registerFail(e.response.data.message)];
        }
        return [registerFail(e.message)];
      }
    })
    .flatMap(os => Observable.from(os));
  return x;
};
