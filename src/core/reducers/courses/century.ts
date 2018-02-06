import { CenturyTypes } from "story-backend-utils/dist/types/CenturyTypes";

import { AllActions } from "../../actions";
import {
  AllCoursesRequested,
  AllCoursesRequestFailed,
  AllCoursesRequestSucceeded,
  CoursesRequested,
  CoursesRequestFailed,
  CoursesRequestSucceeded
} from "../../actions/courses";
import {
  AddFailures,
  AddLoaded,
  AddPending,
  BlankLoadableMap,
  LoadableMap
} from "../types/Loadable";

export type StateType = LoadableMap<CenturyTypes.Course>;

export const initial: StateType = BlankLoadableMap();

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    case CoursesRequestFailed.type:
      return AddFailures(state, action);

    case AllCoursesRequestFailed.type:
      return AddFailures(state, action);

    case CoursesRequestSucceeded.type:
    case AllCoursesRequestSucceeded.type:
      return AddLoaded(state, action);

    case CoursesRequested.type:
      return AddPending(state, action);
    case AllCoursesRequested.type:
      return AddPending(state, {});
  }
  return state;
};
