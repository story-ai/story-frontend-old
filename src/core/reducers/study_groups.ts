import {
  STUDY_GROUPS_REQUEST_FAILED,
  STUDY_GROUPS_REQUEST_SUCCEEDED,
  STUDY_GROUPS_REQUESTED,
  StudyGroupRequestFailedAction,
  StudyGroupRequestAction,
  StudyGroupRequestSucceededAction,
  STUDY_GROUP_LIST_REQUESTED,
  StudyGroupListRequestAction
} from "../actions/study_groups";

import {
  LoadableMap,
  AddLoaded,
  AddFailures,
  AddPending,
  BlankLoadableMap
} from "./types/Loadable";
import { CenturyTypes } from "story-backend-utils";

export type StateType = LoadableMap<CenturyTypes.StudyGroup>;

export const initial: StateType = BlankLoadableMap();

export const reducer = (
  state: StateType = initial,
  action:
    | StudyGroupRequestAction
    | StudyGroupRequestSucceededAction
    | StudyGroupRequestFailedAction
    | StudyGroupListRequestAction
): StateType => {
  switch (action.type) {
    // reset when we ask for a fresh list
    case STUDY_GROUP_LIST_REQUESTED:
      return initial;

    case STUDY_GROUPS_REQUEST_FAILED:
      return AddFailures(state, action);

    case STUDY_GROUPS_REQUEST_SUCCEEDED:
      console.log("done");
      return AddLoaded(state, action);

    case STUDY_GROUPS_REQUESTED:
      console.log("pending");
      return AddPending(state, action);
  }
  return state;
};
