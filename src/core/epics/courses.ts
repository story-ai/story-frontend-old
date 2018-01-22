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
  succeedCourseRequest,
  SucceedCourseRequestAction,
  FailCourseRequestAction
} from "../actions/courses";
import { StoryTypes, Map } from "story-backend-utils";
import {
  CLASSES_REQUEST_SUCCEEDED,
  ClassRequestSucceededAction
} from "../actions/classes";
import { StateType } from "../reducers/index";

export const requestCourses = (action$: ActionsObservable<Action>) => {
  // separate ids out into a stream
  const idStream = action$
    .ofType(COURSES_REQUESTED)
    .flatMap((action: RequestCoursesAction) => action.ids);

  return (
    idStream
      .buffer(idStream.debounceTime(100))
      .map(ids =>
        // filter out duplicates
        ids.filter((id, i, a) => a.indexOf(id) === i)
      )
      // don't send at all if we don't need to
      .filter(ids => ids.length > 0)
      .flatMap(ids => {
        // TODO: Don't need to go via Story here - the CENTURY course endpoint is student-accessible
        const x = axios
          .get<Map<StoryTypes.Course>>(`${StoryServices.material}/course`, {
            params: { ids: ids.join(",") }
          })
          .then(res => {
            if (res.status !== 200) throw res.data;

            if (typeof res.data !== "object") {
              throw "Unexpected result shape " + JSON.stringify(res.data);
            }
            return succeedCourseRequest(res.data);
          })
          .catch(e => failCourseRequest(ids, e));
        return x;
      })
  );
};

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

      return requestCourse(courseIds);
    });
