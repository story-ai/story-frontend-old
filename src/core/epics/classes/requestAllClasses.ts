import axios from "axios";
import { Epic } from "redux-observable";
import { Observable } from "rxjs";
import { StoryTypes } from "story-backend-utils";

import { StoryServices } from "../../../config";
import { AllActions } from "../../actions";
import {
  AllClassesRequested,
  ClassRequestFailed,
  ClassRequestSucceeded
} from "../../actions/classes";
import { StateType } from "../../reducers";

export const requestAllClasses: Epic<AllActions, StateType> = action$ =>
  action$
    .ofType<AllClassesRequested>(AllClassesRequested.type)
    .switchMap(action => {
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
      return new ClassRequestSucceeded(res.data.classes);
    })
    .catch(e => Observable.of(new ClassRequestFailed(e)));
