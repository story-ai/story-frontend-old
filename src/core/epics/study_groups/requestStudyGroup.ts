import { keyBy } from "lodash";
import { Epic } from "redux-observable";
import { CenturyTypes } from "story-backend-utils";
import * as superagent from "superagent";

import { CENTURY_ACCOUNT_API } from "../../../config";
import { AllActions } from "../../actions";
import {
  StudyGroupsRequested,
  StudyGroupsRequestFailed,
  StudyGroupsRequestSucceeded
} from "../../actions/study_groups";
import { centuryAuthHeaders, getTokenStream } from "../../common";
import { StateType } from "../../reducers";
import { Observable } from "rxjs/Observable";

export const requestStudyGroup: Epic<AllActions, StateType> = (
  action$,
  state$
) =>
  action$
    .ofType<StudyGroupsRequested>(StudyGroupsRequested.type)
    // separate ids from all requests into a single ID stream
    .mergeMap((action: StudyGroupsRequested) => action.ids)
    // debounce
    .bufferTime(100)
    // filter out duplicates
    .map(ids => ids.filter((id, i, a) => a.indexOf(id) === i))
    // don't send at all if we don't need to
    .filter(ids => ids.length > 0)
    // finally actually make a request
    .combineLatest(getTokenStream(state$))
    .mergeMap(
      ([ids, token]) =>
        superagent
          .get(`${CENTURY_ACCOUNT_API}/study-groups`)
          .query({
            ids: ids.join(","),
            include: "course,class,coursePlan,isEnabled,status,filters"
          })
          .set(centuryAuthHeaders(token)),
      ([ids, token], res): [string[], superagent.Response] => [ids, res]
    )
    .map(([ids, res]) => {
      if (!res.ok) return new StudyGroupsRequestFailed(res.text, ids);

      const data = res.body as CenturyTypes.StudyGroup[];
      const map = keyBy(data, "_id");
      return new StudyGroupsRequestSucceeded(map);
    })
    .catch(e => Observable.of(new StudyGroupsRequestFailed(e)));
