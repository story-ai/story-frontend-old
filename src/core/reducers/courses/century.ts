import {
  LoadableMap,
  AddLoaded,
  AddFailures,
  AddPending,
  BlankLoadableMap
} from "../types/Loadable";
import {
  CoursesRequestFailed,
  CoursesRequested,
  CoursesRequestSucceeded,
  AllCoursesRequestFailed,
  AllCoursesRequestSucceeded,
  AllCoursesRequested
} from "../../actions/courses";
import { CenturyTypes } from "story-backend-utils/dist/types/CenturyTypes";

export type StateType = LoadableMap<CenturyTypes.Course>;

export const initial: StateType = BlankLoadableMap();

export const reducer = (
  state: StateType = initial,
  action:
    | CoursesRequestFailed
    | CoursesRequestSucceeded
    | CoursesRequested
    | AllCoursesRequestFailed
    | AllCoursesRequestSucceeded
    | AllCoursesRequested
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
