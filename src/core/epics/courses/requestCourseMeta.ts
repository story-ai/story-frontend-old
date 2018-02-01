import { ActionsObservable } from "redux-observable";
import { Action, MiddlewareAPI } from "redux";
import { CenturyTypes, StoryTypes, Map } from "story-backend-utils";
import axios from "axios";
import { StateType } from "../../reducers/index";
import {
  AllCoursesRequestSucceeded,
  CoursesRequestSucceeded,
  CourseMetaRequestFailed,
  CourseMetaRequestSucceeded,
  CourseMetaRequested,
  AllCoursesRequested
} from "../../actions/courses";
import { StoryServices } from "../../../config/index";
import { Observable } from "rxjs/Observable";

export function requestCourseMeta(
  action$: ActionsObservable<Action>,
  store: MiddlewareAPI<StateType>
) {
  const idStream = action$
    .ofType(CoursesRequestSucceeded.type)
    .flatMap((action: CoursesRequestSucceeded) => Object.keys(action.items));

  const byId = idStream
    .buffer(idStream.debounceTime(100))
    .map(ids =>
      // filter out duplicates
      ids.filter((id, i, a) => a.indexOf(id) === i)
    )
    // don't send at all if we don't need to
    .filter(ids => ids.length > 0)
    .flatMap(ids => Observable.of(new CourseMetaRequested(ids)));

  const forAlls = action$
    .ofType(AllCoursesRequested.type)
    .flatMap((action: AllCoursesRequested) =>
      Observable.of(new CourseMetaRequested())
    );

  return Observable.merge(forAlls, byId);
}
