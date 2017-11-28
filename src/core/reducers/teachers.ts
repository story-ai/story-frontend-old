import {
  TEACHERS_REQUEST_FAILED,
  TEACHERS_REQUEST_SUCCEEDED,
  TEACHERS_REQUESTED,
  FailTeacherRequestAction,
  SucceedTeacherRequestAction,
  RequestTeachersAction
} from "../actions/teachers";
import { Loadable } from "./types/Loadable";
import { StoryTypes } from "story-backend-utils";

export type StateType = {
  teachers: {
    [id: string]: Loadable<StoryTypes.Teacher>;
  };
};

export const initial: StateType = {
  teachers: {}
};

export const reducer = (
  state: StateType = initial,
  action:
    | FailTeacherRequestAction
    | SucceedTeacherRequestAction
    | RequestTeachersAction
): StateType => {
  const stateCopy = Object.assign({}, state);

  switch (action.type) {
    case TEACHERS_REQUEST_FAILED:
      console.error(action.error);
      if (action.ids === null) {
        return { teachers: {} };
      }
      for (const id of action.ids) {
        state.teachers[id] = {
          state: "PENDING",
          item: null
        };
      }
      break;

    case TEACHERS_REQUEST_SUCCEEDED:
      for (const item of Object.keys(action.items)) {
        state.teachers[item] = {
          state: "LOADED",
          item: action.items[item]
        };
      }
      break;

    case TEACHERS_REQUESTED:
      for (const id of action.ids) {
        state.teachers[id] = {
          state: "PENDING",
          item: null
        };
      }
      break;
  }
  return state;
};
