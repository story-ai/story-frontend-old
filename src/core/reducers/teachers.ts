import { StoryTypes } from "story-backend-utils";

import { AllActions } from "../actions";
import {
  TeachersRequested,
  TeachersRequestFailed,
  TeachersRequestSucceeded
} from "../actions/teachers";
import {
  AddFailures,
  AddLoaded,
  AddPending,
  BlankLoadableMap,
  LoadableMap
} from "./types/Loadable";

export type StateType = LoadableMap<StoryTypes.Teacher>;

export const initial: StateType = BlankLoadableMap();

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    case TeachersRequestFailed.type:
      return AddFailures(state, action);

    case TeachersRequestSucceeded.type:
      return AddLoaded(state, action);

    case TeachersRequested.type:
      return AddPending(state, action);
  }
  return state;
};
