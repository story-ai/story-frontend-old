import { CenturyTypes } from "story-backend-utils";

import { AllActions } from "../actions";
import {
  StudyGroupListRequested,
  StudyGroupsRequested,
  StudyGroupsRequestFailed,
  StudyGroupsRequestSucceeded
} from "../actions/study_groups";
import {
  AddFailures,
  AddLoaded,
  AddPending,
  BlankLoadableMap,
  LoadableMap
} from "./types/Loadable";

export type StateType = LoadableMap<CenturyTypes.StudyGroup>;

export const initial: StateType = BlankLoadableMap();

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    // reset when we ask for a fresh list
    case StudyGroupListRequested.type:
      return initial;

    case StudyGroupsRequestFailed.type:
      return AddFailures(state, action);

    case StudyGroupsRequestSucceeded.type:
      console.log("done");
      return AddLoaded(state, action);

    case StudyGroupsRequested.type:
      console.log("pending");
      return AddPending(state, action);
  }
  return state;
};
