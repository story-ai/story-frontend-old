import { ActionsObservable } from "redux-observable";
import { MiddlewareAPI, Action } from "redux";
import { StateType } from "../../reducers";
import {
  BuyCourseRequestSucceeded,
  BuyCourseRequested
} from "../../actions/courses";
import { requestStudyGroupList } from "../../actions/study_groups";

export function reloadOnBuy(
  action$: ActionsObservable<Action>,
  store: MiddlewareAPI<StateType>
) {
  return action$
    .ofType(BuyCourseRequestSucceeded.type)
    .map((action: BuyCourseRequestSucceeded) => requestStudyGroupList());
}
