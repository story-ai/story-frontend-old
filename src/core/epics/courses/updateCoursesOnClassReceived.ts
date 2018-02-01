import { ActionsObservable } from "redux-observable";
import { Action, MiddlewareAPI } from "redux";
import { CenturyTypes, StoryTypes } from "story-backend-utils";
import axios from "axios";
import { StateType } from "../../reducers/index";

import {
  CLASSES_REQUEST_SUCCEEDED,
  ClassRequestSucceededAction
} from "../../actions/classes";
import { CoursesRequested } from "../../actions/courses";

export const updateCoursesOnClassReceived = (
  action$: ActionsObservable<Action>,
  store: MiddlewareAPI<StateType>
) =>
  action$
    .ofType(CLASSES_REQUEST_SUCCEEDED)
    .map((action$: ClassRequestSucceededAction) => {
      type Result = {
        [k: string]: StoryTypes.Course;
      };

      // add all courses we are hearing about now
      let courseIds: string[] = [];
      for (const classId in action$.items) {
        // GET study groups for each class
        courseIds = courseIds.concat(action$.items[classId].courses);
      }

      // filter out courses we already knew about
      const knownCourses = store.getState().courses;
      courseIds = courseIds.filter(t => !(t in knownCourses));

      return new CoursesRequested(courseIds);
    });
