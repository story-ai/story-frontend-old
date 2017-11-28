import {
  COURSES_REQUEST_FAILED,
  COURSES_REQUEST_SUCCEEDED,
  COURSES_REQUESTED,
  FailCourseRequestAction,
  SucceedCourseRequestAction,
  RequestCoursesAction
} from "../actions/courses";

import {
  LoadableMap,
  AddLoaded,
  AddFailures,
  AddPending,
  BlankLoadableMap
} from "./types/Loadable";
import { StoryTypes } from "story-backend-utils";

export type StateType = LoadableMap<StoryTypes.Course>;

export const initial: StateType = BlankLoadableMap();

export const reducer = (
  state: StateType = initial,
  action:
    | FailCourseRequestAction
    | SucceedCourseRequestAction
    | RequestCoursesAction
): StateType => {
  switch (action.type) {
    case COURSES_REQUEST_FAILED:
      return AddFailures(state, action);

    case COURSES_REQUEST_SUCCEEDED:
      return AddLoaded(state, action);

    case COURSES_REQUESTED:
      return AddPending(state, action);
  }
  return state;
};
