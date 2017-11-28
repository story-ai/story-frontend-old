import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action } from "redux";
import axios from "axios";

import { StoryServices } from "../../config";
import {
  failCourseRequest,
  RequestCoursesAction,
  succeedCourseRequest,
  COURSES_REQUESTED
} from "../actions/courses";
import { StoryTypes } from "story-backend-utils/dist/types/StoryTypes";

export const requestCourses = (action$: ActionsObservable<Action>) =>
  action$
    .ofType(COURSES_REQUESTED)
    .flatMap((action: RequestCoursesAction) => {
      type Result = {
        [k: string]: StoryTypes.Course;
      };
      return Observable.from(
        axios.get<Result>(`${StoryServices.material}/course`, {
          params: { ids: action.ids.join(",") }
        })
      );
    })
    .map(res => {
      if (res.status !== 200) throw res.data;

      if (typeof res.data !== "object") {
        throw "Unexpected result shape " + JSON.stringify(res.data);
      }
      return succeedCourseRequest(res.data);
    })
    .catch(e => Observable.of(failCourseRequest(null, e)));
