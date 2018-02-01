import {
  failClassRequest,
  succeedClassRequest,
  ALL_CLASSES_REQUESTED,
  AllClassesRequestAction
} from "../../actions/classes";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import axios from "axios";
import { Action, Store } from "redux";
import { StoryServices } from "../../../config";
import { StoryTypes } from "story-backend-utils";

export const requestAllClasses = (action$: ActionsObservable<Action>) =>
  action$
    .ofType(ALL_CLASSES_REQUESTED)
    .flatMap((action: AllClassesRequestAction) => {
      type Result = {
        classes: {
          [k: string]: StoryTypes.Class;
        };
      };
      return Observable.from(axios.get<Result>(StoryServices.material));
    })
    .map(res => {
      if (res.status !== 200) throw res.data;
      if (typeof res.data.classes !== "object") {
        throw "Unexpected result shape " + JSON.stringify(res.data);
      }
      return succeedClassRequest(res.data.classes);
    })
    .catch(e => Observable.of(failClassRequest(null, e)));
