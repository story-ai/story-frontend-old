import {
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
};

export const initial: StateType = { token: null };

export const reducer = (
  state: StateType = initial,
  action: ReceivedTokenAction | LogoutAction
): StateType => {
  switch (action.type) {
    case RECEIVED_TOKEN:
      return { token: action.token };

    case LOGOUT:
      return { token: null };
  }
  return state;
};
