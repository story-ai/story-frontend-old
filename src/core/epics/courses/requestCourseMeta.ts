import { Epic } from "redux-observable";
import { Observable } from "rxjs";

import { AllActions } from "../../actions";
import {
  AllCoursesRequested,
  CourseMetaRequested,
  CoursesRequestSucceeded
} from "../../actions/courses";
import { StateType } from "../../reducers";

export const requestCourseMeta: Epic<AllActions, StateType> = action$ => {
  const idStream = action$
    .ofType<CoursesRequestSucceeded>(CoursesRequestSucceeded.type)
    .mergeMap(action => Object.keys(action.items));

  const byId = idStream
    .buffer(idStream.debounceTime(100))
    .map(ids =>
      // filter out duplicates
      ids.filter((id, i, a) => a.indexOf(id) === i)
    )
    // don't send at all if we don't need to
    .filter(ids => ids.length > 0)
    .mergeMap(ids => Observable.of(new CourseMetaRequested(ids)));

  const forAlls = action$
    .ofType<AllCoursesRequested>(AllCoursesRequested.type)
    .switchMap(() => Observable.of(new CourseMetaRequested()));

  return Observable.merge(forAlls, byId);
};
