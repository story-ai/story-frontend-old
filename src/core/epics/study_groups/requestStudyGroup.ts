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
    .withLatestFrom(getTokenStream(state$))
    .mergeMap(
      ([req, token]) =>
        superagent
          .get(`${CENTURY_ACCOUNT_API}/study-groups`)
          .query({
            ids: req.ids.join(","),
            include: "course,class,coursePlan,isEnabled,status,filters"
          })
          .set(centuryAuthHeaders(token)),
      ([req, token], res): [string[], superagent.Response] => [req.ids, res]
    )
    .map(([ids, res]) => {
      if (!res.ok) return new StudyGroupsRequestFailed(res.text, ids);

      console.log("Got groups", res.body);
      const data = res.body as CenturyTypes.StudyGroup[];
      const map = keyBy(data, "_id");
      return new StudyGroupsRequestSucceeded(map);
    })
    .catch(e => Observable.of(new StudyGroupsRequestFailed(e)));
