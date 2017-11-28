import {
  TEACHERS_REQUEST_FAILED,
  TEACHERS_REQUEST_SUCCEEDED,
  TEACHERS_REQUESTED,
  FailTeacherRequestAction,
  SucceedTeacherRequestAction,
  RequestTeachersAction
} from "../actions/teachers";
import {
  LoadableMap,
  AddLoaded,
  AddFailures,
  AddPending,
  BlankLoadableMap
} from "./types/Loadable";
import { StoryTypes } from "story-backend-utils";

export type StateType = LoadableMap<StoryTypes.Teacher>;

export const initial: StateType = BlankLoadableMap();

export const reducer = (
  state: StateType = initial,
  action:
    | FailTeacherRequestAction
    | SucceedTeacherRequestAction
    | RequestTeachersAction
): StateType => {
  switch (action.type) {
    case TEACHERS_REQUEST_FAILED:
      return AddFailures(state, action);

    case TEACHERS_REQUEST_SUCCEEDED:
      return AddLoaded(state, action);

    case TEACHERS_REQUESTED:
      return AddPending(state, action);
  }
  return state;
};
