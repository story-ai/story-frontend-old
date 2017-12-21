import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action, MiddlewareAPI } from "redux";
import axios from "axios";

import {
  StoryServices,
  CENTURY_LEARN_API,
  CENTURY_ACCOUNT_API
} from "../../config";
import {
  STUDY_GROUP_LIST_REQUESTED,
  STUDY_GROUPS_REQUESTED,
  failStudyGroupRequest,
  requestStudyGroups,
  StudyGroupRequestAction,
  succeedStudyGroupRequest,
  StudyGroupListRequestAction
} from "../actions/study_groups";
import { StoryTypes, CenturyTypes, Map } from "story-backend-utils";
import { StateType } from "../reducers/index";
import { Store } from "react-redux";

export const requestStudyGroupList = (
  action$: ActionsObservable<Action>,
  store: Store<StateType>
) =>
  action$
    .ofType(STUDY_GROUP_LIST_REQUESTED)
    .flatMap((action: StudyGroupListRequestAction) => {
      const state = store.getState();
      return axios
        .get<{ studyGroupId: string }[]>(
          `${CENTURY_LEARN_API}/courses/current`,
          {
            headers: {
              Authorization: `Bearer ${state.auth.token}`
            }
          }
        )
        .then(res => {
          if (res.status !== 200) throw res.data;

          if (typeof res.data !== "object") {
            throw "Unexpected result shape " + JSON.stringify(res.data);
          }

          return requestStudyGroups(res.data.map(x => x.studyGroupId));
        })
        .catch(e => Observable.of(failStudyGroupRequest(null, e)));
    });

export const requestStudyGroup = (
  action$: ActionsObservable<Action>,
  store: Store<StateType>
) => {
  // separate ids out into a stream
  const idStream = action$
    .ofType(STUDY_GROUPS_REQUESTED)
    .flatMap((action: StudyGroupRequestAction) => action.ids);

  return (
    idStream
      .buffer(idStream.debounceTime(100))
      .map(ids =>
        // filter out duplicates
        ids.filter((id, i, a) => a.indexOf(id) === i)
      )
      // don't send at all if we don't need to
      .filter(ids => ids.length > 0)
      .flatMap(ids =>
        axios
          .get<CenturyTypes.StudyGroup[]>(
            `${CENTURY_ACCOUNT_API}/study-groups`,
            {
              params: {
                ids: ids.join(","),
                include: "course,class,coursePlan,isEnabled,status,filters"
              },
              headers: {
                Authorization: `Bearer ${store.getState().auth.token}`
              }
            }
          )
          .then(res => {
            if (res.status !== 200) throw res.data;

            if (typeof res.data !== "object") {
              throw "Unexpected result shape " + JSON.stringify(res.data);
            }

            const map = res.data.reduce<{
              [k: string]: CenturyTypes.StudyGroup;
            }>((map, group) => {
              map[group._id] = group;
              return map;
            }, {});

            return succeedStudyGroupRequest(map);
          })
          .catch(e => failStudyGroupRequest(ids, e))
      )
  );
};
