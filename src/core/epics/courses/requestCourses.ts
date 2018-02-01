import { ActionsObservable } from "redux-observable";
import { Action } from "redux";
import { CenturyTypes, StoryTypes } from "story-backend-utils";
import axios, { AxiosResponse } from "axios";
import { keyBy } from "lodash";
import { STORY_ORGANISATION_ID } from "../../../config";
import {
  AllCoursesRequested,
  AllCoursesRequestSucceeded,
  AllCoursesRequestFailed
} from "../../actions/courses";
import { Store } from "react-redux";
import { StateType } from "../../reducers/index";

export const requestCourses = (
  action$: ActionsObservable<Action>,
  store: Store<StateType>
) => {
  // separate ids out into a stream
  return action$.ofType(AllCoursesRequested.type).flatMap(action => {
    // Get public CENTURY courses and private Story ones
    const token = store.getState().auth.token;

    const publicCourses = axios
      .get<CenturyTypes.Course[]>(
        `https://api.century.tech/content/v2/courses/`,
        {
          params: {
            isAssignable: true,
            isPublished: true,
            isPublic: true,
            include: "organisation,description,strands,subject,level",
            type: "standard"
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(extract);

    const storyCourses = axios
      .get<CenturyTypes.Course[]>(
        `https://api.century.tech/content/v2/courses/`,
        {
          params: {
            isAssignable: true,
            isPublished: true,
            org: STORY_ORGANISATION_ID,
            include: "organisation,description,strands,subject,level",
            type: "standard"
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(extract);

    return Promise.all([publicCourses, storyCourses])
      .then(([a, b]) => a.concat(b))
      .then(courses => new AllCoursesRequestSucceeded(keyBy(courses, "_id")))
      .catch(e => new AllCoursesRequestFailed(e));
  });
};

function extract<T>(res: AxiosResponse<T>): T {
  if (res.status !== 200) throw res.data;

  if (typeof res.data !== "object") {
    throw "Unexpected result shape " + JSON.stringify(res.data);
  }

  return res.data;
}
