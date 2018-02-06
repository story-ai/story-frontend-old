import { StoryTypes } from "story-backend-utils";

import { AllActions } from "../actions";
import {
  AllClassesRequested,
  ClassRequested,
  ClassRequestFailed,
  ClassRequestSucceeded
} from "../actions/classes";
import {
  AddFailures,
  AddLoaded,
  AddPending,
  BlankLoadableMap,
  LoadableMap
} from "./types/Loadable";

export type StateType = LoadableMap<StoryTypes.Class>;

export const initial: StateType = BlankLoadableMap();

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    case AllClassesRequested.type:
      return initial;

    case ClassRequested.type:
      return AddFailures(state, action);

    case ClassRequestSucceeded.type:
      return AddLoaded(state, action);

    case ClassRequestFailed.type:
      return AddPending(state, action);
  }
  return state;
};
