import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action, MiddlewareAPI } from "redux";
import axios from "axios";

import { StoryServices } from "../../config";
import {
  COURSES_REQUESTED,
  failCourseRequest,
  requestCourse,
  RequestCoursesAction,
  succeedCourseRequest
} from "../actions/courses";
import { StoryTypes } from "story-backend-utils/dist/types/StoryTypes";
import {
  CLASSES_REQUEST_SUCCEEDED,
  ClassRequestSucceededAction
} from "../actions/classes";
import { StateType } from "../reducers/index";
import { Map } from "../../../../backend-utils/dist/types/common";

export const requestCourses = (action$: ActionsObservable<Action>) =>
  action$
    .ofType(COURSES_REQUESTED)
    .map((action: RequestCoursesAction) =>
      // filter out duplicates
      action.ids.filter((id, i, a) => a.indexOf(id) === i)
    )
    // don't send if we don't need to
    .filter(ids => ids.length > 0)
    .flatMap(ids =>
      axios.get<Map<StoryTypes.Course>>(`${StoryServices.material}/course`, {
        params: { ids: ids.join(",") }
      })
    )
    .map(res => {
      if (res.status !== 200) throw res.data;

      if (typeof res.data !== "object") {
        throw "Unexpected result shape " + JSON.stringify(res.data);
      }
      return succeedCourseRequest(res.data);
    })
    .catch(e => Observable.of(failCourseRequest(null, e)));

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
        courseIds = courseIds.concat(action$.items[classId].courses);
      }

      // filter out courses we already knew about
      const knownCourses = store.getState().courses;
      courseIds = courseIds.filter(t => !(t in knownCourses));

      return requestCourse(courseIds);
    });
