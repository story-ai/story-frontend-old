import { AllActions } from "../actions";
import {
  AuthRequestFailed,
  LoginRequested,
  LoginRequestSucceeded,
  Register,
  RegisterFailed,
  RegisterSucceeded
} from "../actions/auth";

export type StateType = {
  token?: string;
  loginPending: boolean;
  loginError?: string;
  registerError?: string;
};

export const initial: StateType = { loginPending: false };

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    case LoginRequestSucceeded.type:
      return { loginPending: false, token: action.token.accessToken };

    case LoginRequested.type:
      return { loginPending: true };

    case AuthRequestFailed.type:
      return { loginPending: false, loginError: action.e };

    case Register.type:
      return { loginPending: true };

    case RegisterFailed.type:
      return { loginPending: false, registerError: action.e };

    case RegisterSucceeded.type:
      return { loginPending: false };
  }
  return state;
};
