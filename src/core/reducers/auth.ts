import {
  LOGIN,
  LOGIN_FAILED,
  LoginAction,
  LoginFailedAction,
  LOGOUT,
  LogoutAction,
  RECEIVED_TOKEN,
  ReceivedTokenAction
} from "../actions/auth";
import {
  LoadableMap,
  AddLoaded,
  AddFailures,
  AddPending,
  BlankLoadableMap
} from "./types/Loadable";

export type StateType = {
  token: string | null;
  loginPending: boolean;
  loginError?: string;
};

export const initial: StateType = { token: null, loginPending: false };

export const reducer = (
  state: StateType = initial,
  action: ReceivedTokenAction | LogoutAction | LoginAction | LoginFailedAction
): StateType => {
  switch (action.type) {
    case RECEIVED_TOKEN:
      return { loginPending: false, token: action.token };

    case LOGOUT:
      return { loginPending: false, token: null };

    case LOGIN:
      return { loginPending: true, token: null };

    case LOGIN_FAILED:
      return { loginPending: false, token: null, loginError: action.e };
  }
  return state;
};
