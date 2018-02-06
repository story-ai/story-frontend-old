import { StoryTypes } from "story-backend-utils";

import { AllActions } from "../../actions";
import {
  CourseMetaRequested,
  CourseMetaRequestFailed,
  CourseMetaRequestSucceeded
} from "../../actions/courses";
import {
  AddFailures,
  AddLoaded,
  AddPending,
  BlankLoadableMap,
  LoadableMap
} from "../types/Loadable";

export type StateType = LoadableMap<StoryTypes.StoryCourseFields>;

export const initial: StateType = BlankLoadableMap();

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    case CourseMetaRequestFailed.type:
      return AddFailures(state, action);

    case CourseMetaRequestSucceeded.type:
      return AddLoaded(state, action);

    case CourseMetaRequested.type:
      return AddPending(state, action);
  }
  return state;
};
