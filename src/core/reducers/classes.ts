import {
  CLASSES_REQUEST_FAILED,
  CLASSES_REQUEST_SUCCEEDED,
  CLASSES_REQUESTED,
  ALL_CLASSES_REQUESTED,
  AllClassesRequestAction,
  ClassRequestAction,
  ClassRequestFailedAction,
  ClassRequestSucceededAction
} from "../actions/classes";
import {
  LoadableMap,
  AddLoaded,
  AddFailures,
  AddPending,
  BlankLoadableMap
} from "./types/Loadable";
import { StoryTypes } from "../../../../backend-utils/dist/index";

export type StateType = LoadableMap<StoryTypes.Class>;

export const initial: StateType = BlankLoadableMap();

export const reducer = (
  state: StateType = initial,
  action:
    | ClassRequestAction
    | AllClassesRequestAction
    | ClassRequestFailedAction
    | ClassRequestSucceededAction
): StateType => {
  switch (action.type) {
    case ALL_CLASSES_REQUESTED:
      return initial;

    case CLASSES_REQUEST_FAILED:
      return AddFailures(state, action);

    case CLASSES_REQUEST_SUCCEEDED:
      return AddLoaded(state, action);

    case CLASSES_REQUESTED:
      return AddPending(state, action);
  }
  return state;
};
