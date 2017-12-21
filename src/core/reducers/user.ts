import {
  USER_REQUEST_FAILED,
  USER_REQUEST_SUCCEEDED,
  USER_REQUESTED,
  FailRequestUserAction,
  SucceedUserRequestAction,
  RequestUserAction
} from "../actions/user";
import { Loadable } from "./types/Loadable";
import { CenturyTypes } from "story-backend-utils";

export type StateType = Loadable<CenturyTypes.User>;

export const initial: StateType = { state: "UNKNOWN" };

export const reducer = (
  state: StateType = initial,
  action: FailRequestUserAction | SucceedUserRequestAction | RequestUserAction
): StateType | null => {
  switch (action.type) {
    case USER_REQUEST_FAILED:
      return {
        state: "FAILED",
        error: action.error
      };

    case USER_REQUEST_SUCCEEDED:
      return {
        state: "LOADED",
        item: action.user
      };

    case USER_REQUESTED:
      return {
        state: "PENDING"
      };
  }
  return state;
};
