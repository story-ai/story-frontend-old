import { Epic } from "redux-observable";
import * as superagent from "superagent";

import { CENTURY_LEARN_API } from "../../../config";
import { AllActions } from "../../actions";
import {
  StudyGroupListRequested,
  StudyGroupListRequestFailed,
  StudyGroupListRequestSucceeded,
  StudyGroupsRequested
} from "../../actions/study_groups";
import { centuryAuthHeaders, getTokenStream } from "../../common";
import { StateType } from "../../reducers";

export const requestStudyGroupList: Epic<AllActions, StateType> = (
  action$,
  state$
) =>
  action$
    .ofType<StudyGroupListRequested>(StudyGroupListRequested.type)
    .combineLatest(getTokenStream(state$))
    .switchMap(([action, token]) =>
      superagent
        .get(`${CENTURY_LEARN_API}/courses/current`)
        .set(centuryAuthHeaders(token))
    )
    .mergeMap<superagent.Response, AllActions>(res => {
      if (!res.ok) return [new StudyGroupListRequestFailed(res.text)];

      const data = res.body as { studyGroupId: string }[];
      return [
        new StudyGroupListRequestSucceeded(data),
        new StudyGroupsRequested(data.map(x => x.studyGroupId))
      ];
    });
