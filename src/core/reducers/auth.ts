import {
  LOGIN,
  LOGIN_FAILED,
  LoginAction,
  LoginFailedAction,
  LOGOUT,
  LogoutAction,
  RECEIVED_TOKEN,
  ReceivedTokenAction,
  RegisterAction,
  RegisterFailAction,
  RegisterSucceedAction,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCEEDED
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
  registerError?: string;
};

export const initial: StateType = { token: null, loginPending: false };

export const reducer = (
  state: StateType = initial,
  action:
    | ReceivedTokenAction
    | LogoutAction
    | LoginAction
    | LoginFailedAction
    | RegisterAction
    | RegisterFailAction
    | RegisterSucceedAction
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

    case REGISTER:
      return { token: null, loginPending: true };

    case REGISTER_FAIL:
      return { token: null, loginPending: false, registerError: action.e };

    case REGISTER_SUCCEEDED:
      return { token: null, loginPending: false };
  }
  return state;
};
