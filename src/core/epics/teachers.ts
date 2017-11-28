import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action } from "redux";
import axios from "axios";

import { StoryServices } from "../../config";
import {
  failTeacherRequest,
  RequestTeachersAction,
  succeedTeacherRequest,
  TEACHERS_REQUESTED
} from "../actions/teachers";
import { StoryTypes } from "story-backend-utils/dist/types/StoryTypes";

export const requestTeachers = (action$: ActionsObservable<Action>) =>
  action$
    .ofType(TEACHERS_REQUESTED)
    .flatMap((action: RequestTeachersAction) => {
      type Result = {
        [k: string]: StoryTypes.Teacher;
      };
      return Observable.from(
        axios.get<Result>(`${StoryServices.material}/teacher`, {
          params: { ids: action.ids.join(",") }
        })
      );
    })
    .map(res => {
      if (res.status !== 200) throw res.data;

      if (typeof res.data !== "object") {
        throw "Unexpected result shape " + JSON.stringify(res.data);
      }
      return succeedTeacherRequest(res.data);
    })
    .catch(e => Observable.of(failTeacherRequest(null, e)));
