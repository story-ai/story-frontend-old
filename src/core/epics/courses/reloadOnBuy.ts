import { Epic } from "redux-observable";

import { AllActions } from "../../actions";
import { ReloadAll } from "../../actions/app";
import { BuyCourseRequestSucceeded } from "../../actions/courses";
import { StateType } from "../../reducers";

export const reloadOnBuy: Epic<AllActions, StateType> = action$ => {
  return action$
    .ofType<BuyCourseRequestSucceeded>(BuyCourseRequestSucceeded.type)
    .map(() => new ReloadAll());
};
