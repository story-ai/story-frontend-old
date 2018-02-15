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
  LoadableMap
} from "./types/Loadable";
import { keyBy, mapValues } from "lodash";

export type StateType = {
  thumbnails: { [id: string]: string };
  items: LoadableMap<CenturyTypes.StudyGroup>;
};

export const initial: StateType = { items: BlankLoadableMap(), thumbnails: {} };

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    // reset when we ask for a fresh list
    case StudyGroupListRequested.type:
      return initial;

    case StudyGroupsRequestFailed.type:
      return { ...state, items: AddFailures(state.items, action) };

    case StudyGroupsRequestSucceeded.type:
      return { ...state, items: AddLoaded(state.items, action) };

    case StudyGroupsRequested.type:
      return { ...state, items: AddPending(state.items, action) };

    case ThumbnailsReceived.type:
      const x = {
        ...state,
        thumbnails: mapValues(keyBy(action.thumbnails, "id"), x => x.thumbnail)
      };
      return x;
  }
  return state;
};
