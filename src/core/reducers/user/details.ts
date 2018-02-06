import { CenturyTypes } from "story-backend-utils";

import { AllActions } from "../../actions";
import {
  UserRequested,
  UserRequestFailed,
  UserRequestSucceeded
} from "../../actions/user";
import { Loadable } from "../types/Loadable";

export type StateType = Loadable<CenturyTypes.User>;

export const initial: StateType = { state: "UNKNOWN" };

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    case UserRequestFailed.type:
      return {
        state: "FAILED",
        error: action.error
      };

    case UserRequestSucceeded.type:
      return {
        state: "LOADED",
        item: action.user
      };

    case UserRequested.type:
      return {
        state: "PENDING"
      };
  }
  return state;
};
