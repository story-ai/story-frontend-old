import { StoryTypes } from "story-backend-utils";

import { AllActions } from "../../actions";
import { AddVisibleCourse, RemoveVisibleCourse } from "../../actions/app";

export type StateType = string[];

export const initial: StateType = [];

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    case AddVisibleCourse.type:
      return state.concat([action.course._id]);

    case RemoveVisibleCourse.type:
      return state.filter(id => action.course._id !== id);
  }
  return state;
};
