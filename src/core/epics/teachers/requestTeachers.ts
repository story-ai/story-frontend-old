import { Epic } from "redux-observable";
import { StoryTypes } from "story-backend-utils";
import * as superagent from "superagent";

import { StoryServices } from "../../../config";
import { AllActions } from "../../actions";
import {
  TeachersRequested,
  TeachersRequestFailed,
  TeachersRequestSucceeded
} from "../../actions/teachers";
import { StateType } from "../../reducers";
import { Observable } from "rxjs/Observable";

export const requestTeachers: Epic<AllActions, StateType> = action$ =>
  action$
    .ofType<TeachersRequested>(TeachersRequested.type)
    // separate ids from all requests into a single ID stream
    .mergeMap((action: TeachersRequested) => action.ids)
    // debounce
    .bufferTime(100)
    // filter out duplicates
    .map(ids => ids.filter((id, i, a) => a.indexOf(id) === i))
    // don't send at all if we don't need to
    .filter(ids => ids.length > 0)
    // finally actually make a request
    .mergeMap(
      ids =>
        superagent.get(`${StoryServices.material}/teacher`).query({
          ids: ids.join(",")
        }),
      (ids, res): [string[], superagent.Response] => [ids, res]
    )
    .map(([ids, res]) => {
      if (!res.ok) return new TeachersRequestFailed(res.text, ids);
      const data = res.body as { [k: string]: StoryTypes.Teacher };

      return new TeachersRequestSucceeded(data);
    })
    .catch(e => Observable.of(new TeachersRequestFailed(e)));
