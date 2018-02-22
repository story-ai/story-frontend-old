import { Epic } from "redux-observable";

import { AllActions } from "../../actions";
import { BuyCourseRequestSucceeded } from "../../actions/courses";
import { StudyGroupListRequested } from "../../actions/study_groups";
import { StateType } from "../../reducers";

export const reloadOnBuy: Epic<AllActions, StateType> = action$ => {
  return action$
    .ofType<BuyCourseRequestSucceeded>(BuyCourseRequestSucceeded.type)
    .map(() => new StudyGroupListRequested());
};
