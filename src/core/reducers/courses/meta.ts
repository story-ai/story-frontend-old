import {
  LoadableMap,
  AddLoaded,
  AddFailures,
  AddPending,
  BlankLoadableMap
} from "../types/Loadable";
import { StoryTypes } from "story-backend-utils";
import {
  CoursesRequestFailed,
  CoursesRequested,
  CoursesRequestSucceeded,
  CourseMetaRequestFailed,
  CourseMetaRequestSucceeded,
  CourseMetaRequested
} from "../../actions/courses";

export type StateType = LoadableMap<StoryTypes.StoryCourseFields>;

export const initial: StateType = BlankLoadableMap();

export const reducer = (
  state: StateType = initial,
  action:
    | CourseMetaRequestFailed
    | CourseMetaRequestSucceeded
    | CourseMetaRequested
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
