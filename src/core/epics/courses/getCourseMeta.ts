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
  CourseMetaRequested
} from "../../actions/courses";
import { StoryServices } from "../../../config/index";
import { Observable } from "rxjs/Observable";

export function getCourseMeta(
  action$: ActionsObservable<Action>,
  store: MiddlewareAPI<StateType>
) {
  return action$.ofType(CourseMetaRequested.type).flatMap(
    (action: CourseMetaRequested) =>
      console.log(action) ||
      axios
        .get<Map<StoryTypes.StoryCourseFields>>(
          `${StoryServices.material}/course`,
          {
            params:
              typeof action.ids === "undefined"
                ? {}
                : { ids: action.ids.join(",") }
          }
        )
        .then(res => {
          if (res.status !== 200) throw res.data;

          if (typeof res.data !== "object") {
            throw "Unexpected result shape " + JSON.stringify(res.data);
          }
          return new CourseMetaRequestSucceeded(res.data);
        })
        .catch(e => new CourseMetaRequestFailed(action.ids, e))
  );
}
