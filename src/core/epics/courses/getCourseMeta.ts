import axios from "axios";
import { Epic } from "redux-observable";
import { Map, StoryTypes } from "story-backend-utils";

import { StoryServices } from "../../../config";
import { AllActions } from "../../actions";
import {
  CourseMetaRequested,
  CourseMetaRequestFailed,
  CourseMetaRequestSucceeded
} from "../../actions/courses";
import { StateType } from "../../reducers";

export const getCourseMeta: Epic<AllActions, StateType> = action$ =>
  action$
    .ofType<CourseMetaRequested>(CourseMetaRequested.type)
    .flatMap(action =>
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
