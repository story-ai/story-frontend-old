import { StoryTypes } from "story-backend-utils/dist/types/StoryTypes";

import {
  UserMetaRequested,
  UserMetaRequestFailed,
  UserMetaRequestSucceeded
} from "../../actions/user";
import { Loadable } from "../types/Loadable";

export type StateType = Loadable<StoryTypes.StoryUserFields>;

export const initial: StateType = { state: "UNKNOWN" };

export const reducer = (
  state: StateType = initial,
  action: UserMetaRequestFailed | UserMetaRequested | UserMetaRequestSucceeded
): StateType => {
  switch (action.type) {
    case UserMetaRequestFailed.type:
      return {
        state: "FAILED",
        error: action.error
      };

    case UserMetaRequestSucceeded.type:
      return {
        state: "LOADED",
        item: action.user
      };

    case UserMetaRequested.type:
      return {
        state: "PENDING"
      };
  }
  return state;
};
