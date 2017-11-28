import {
  COURSES_REQUEST_FAILED,
  COURSES_REQUEST_SUCCEEDED,
  COURSES_REQUESTED,
  FailCourseRequestAction,
  SucceedCourseRequestAction,
  RequestCoursesAction
} from "../actions/courses";
import { Loadable } from "./types/Loadable";
import { StoryTypes } from "story-backend-utils";

export type StateType = {
  [id: string]: Loadable<StoryTypes.Course>;
};

export const initial: StateType = {};

export const reducer = (
  state: StateType = initial,
  action:
    | FailCourseRequestAction
    | SucceedCourseRequestAction
    | RequestCoursesAction
): StateType => {
  const stateCopy = Object.assign({}, state);

  switch (action.type) {
    case COURSES_REQUEST_FAILED:
      console.error(action.error);
      if (action.ids === null) {
        return initial;
      }
      for (const id of action.ids) {
        state[id] = {
          state: "PENDING",
          item: null
        };
      }
      break;

    case COURSES_REQUEST_SUCCEEDED:
      for (const item of Object.keys(action.items)) {
        state[item] = {
          state: "LOADED",
          item: action.items[item]
        };
      }
      break;

    case COURSES_REQUESTED:
      for (const id of action.ids) {
        state[id] = {
          state: "PENDING",
          item: null
        };
      }
      break;
  }
  return state;
};
