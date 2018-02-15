import { Epic } from "redux-observable";
import * as superagent from "superagent";

import { CENTURY_LEARN_API } from "../../../config";
import { AllActions } from "../../actions";
import {
  StudyGroupListRequested,
  StudyGroupListRequestFailed,
  StudyGroupListRequestSucceeded,
  StudyGroupsRequested,
  ThumbnailsReceived
} from "../../actions/study_groups";
import { centuryAuthHeaders, getTokenStream } from "../../common";
import { StateType } from "../../reducers";
import { Observable } from "rxjs/Observable";
import { keyBy } from "lodash";

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

      type Thumb = {
        _id: string;
        name: string;
        files: [
          {
            filename: string;
            mimetype: string;
            type: "image";
            status: "active";
            s3: {
              path: string;
              region: string;
              bucket: string;
            };
            id: string;
          }
        ];
      };
      const data = res.body as {
        studyGroupId: string;
        thumb: Thumb;
        coursePlanId: string;
        name: string;
      }[];

      return [
        new StudyGroupListRequestSucceeded(data),
        new StudyGroupsRequested(data.map(x => x.studyGroupId)),
        new ThumbnailsReceived(
          data
            .filter(x => x.thumb !== undefined && x.thumb.files.length > 0)
            .map(x => ({
              id: x.studyGroupId,
              thumbnail: `https://cdn.prod.century.tech/media/${
                x.thumb.files[0].filename
              }`
            }))
        )
      ];
    })
    .catch((e: any) => Observable.of(new StudyGroupListRequestFailed(e)));
