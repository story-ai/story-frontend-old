import { Epic } from "redux-observable";

import { AllActions } from "../../actions";
import { ReloadAll } from "../../actions/app";
import { AllCoursesRequested } from "../../actions/courses";
import { StudyGroupListRequested } from "../../actions/study_groups";
import { StateType } from "../../reducers";

export const reload: Epic<AllActions, StateType> = action$ => {
  const x = action$
    .ofType<ReloadAll>(ReloadAll.type)
    .switchMap(a => [new AllCoursesRequested(), new StudyGroupListRequested()]);
  return x;
};
