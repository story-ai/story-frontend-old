import { CenturyTypes } from "story-backend-utils";

import { AllActions } from "../actions";
import {
  StudyGroupListRequested,
  StudyGroupsRequested,
  StudyGroupsRequestFailed,
  StudyGroupsRequestSucceeded,
  ThumbnailsReceived
} from "../actions/study_groups";
import {
  AddFailures,
  AddLoaded,
  AddPending,
  BlankLoadableMap,
  LoadableMap,
  Loadable
} from "./types/Loadable";
import { keyBy, mapValues, Dictionary } from "lodash";

export type StateType = {
  thumbnails: { [id: string]: string };
  groups: Loadable<Dictionary<CenturyTypes.StudyGroup>>;
};

export const initial: StateType = {
  groups: {
    state: "UNKNOWN"
  },
  thumbnails: {}
};

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    // reset when we ask for a fresh list
    case StudyGroupListRequested.type:
      return { ...initial };

    case StudyGroupsRequestFailed.type:
      return {
        ...state,
        groups: {
          state: "FAILED",
          error: action.error
        }
      };

    case StudyGroupsRequestSucceeded.type:
      return {
        ...state,
        groups: {
          state: "LOADED",
          item: action.items
        }
      };

    case StudyGroupsRequested.type:
      return {
        ...state,
        groups: {
          state: "PENDING"
        }
      };

    case ThumbnailsReceived.type:
      const x = {
        ...state,
        thumbnails: mapValues(keyBy(action.thumbnails, "id"), x => x.thumbnail)
      };
      return x;
  }
  return state;
};
