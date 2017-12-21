import {
  CLASSES_REQUEST_SUCCEEDED,
  ClassRequestSucceededAction
} from "../actions/classes";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action, MiddlewareAPI } from "redux";
import axios from "axios";

import { StoryServices } from "../../config";
import {
  failTeacherRequest,
  requestTeacher,
  RequestTeachersAction,
  succeedTeacherRequest,
  TEACHERS_REQUESTED
} from "../actions/teachers";
import { StoryTypes } from "story-backend-utils/dist/types/StoryTypes";
import { Store } from "react-redux";
import { StateType } from "../reducers/index";
import { Map } from "../../../../backend-utils/dist/types/common";

export const requestTeachers = (action$: ActionsObservable<Action>) =>
  action$
    .ofType(TEACHERS_REQUESTED)
    .map((action: RequestTeachersAction) =>
      // filter out duplicates
      action.ids.filter((id, i, a) => a.indexOf(id) === i)
    )
    // don't send if we don't need to
    .filter(ids => ids.length > 0)
    .flatMap(ids =>
      axios.get<Map<StoryTypes.Teacher>>(`${StoryServices.material}/teacher`, {
        params: { ids: ids.join(",") }
      })
    )
    .map(res => {
      if (res.status !== 200) throw res.data;

      if (typeof res.data !== "object") {
        throw "Unexpected result shape " + JSON.stringify(res.data);
      }
      return succeedTeacherRequest(res.data);
    })
    .catch(e => Observable.of(failTeacherRequest(null, e)));

export const updateTeachersOnClassReceived = (
  action$: ActionsObservable<Action>,
  store: MiddlewareAPI<StateType>
) =>
  action$
    .ofType(CLASSES_REQUEST_SUCCEEDED)
    .map((action$: ClassRequestSucceededAction) => {
      type Result = {
        [k: string]: StoryTypes.Teacher;
      };

      // add all teachers we are becoming aware of
      let teacherIds: string[] = [];
      for (const classId in action$.items) {
        teacherIds = teacherIds.concat(action$.items[classId].teachers);
      }

      // filter out teachers we already knew (or have asked about)
      const knownTeachers = store.getState().teachers;
      teacherIds = teacherIds.filter(
        t => !(t in knownTeachers.LOADED || t in knownTeachers.PENDING)
      );

      // fetch any that are still unknown
      return requestTeacher(teacherIds);
    });
