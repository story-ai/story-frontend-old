import axios, { AxiosResponse } from "axios";
import { keyBy } from "lodash";
import { Epic } from "redux-observable";
import { Observable } from "rxjs";
import { CenturyTypes } from "story-backend-utils";

import { STORY_ORGANISATION_ID } from "../../../config";
import { AllActions } from "../../actions";
import { GotToken } from "../../actions/auth";
import {
  AllCoursesRequested,
  AllCoursesRequestFailed,
  AllCoursesRequestSucceeded
} from "../../actions/courses";
import { StateType } from "../../reducers";
import { getTokenStream, centuryAuthHeaders } from "../../common";
import * as superagent from "superagent";

export const requestCourses: Epic<AllActions, StateType> = (action$, state$) =>
  action$
    .ofType<AllCoursesRequested>(AllCoursesRequested.type)
    .combineLatest(getTokenStream(state$))
    .flatMap(([action, token]) =>
      Promise.all([
        superagent
          .get(`https://api.century.tech/content/v2/courses/`)
          .query({
            isAssignable: true,
            isPublished: true,
            isPublic: true,
            include: "organisation,description,strands,subject,level",
            type: "standard"
          })
          .set(centuryAuthHeaders(token)),

        superagent
          .get(`https://api.century.tech/content/v2/courses/`)
          .query({
            isAssignable: true,
            isPublished: true,
            org: STORY_ORGANISATION_ID,
            include: "organisation,description,strands,subject,level",
            type: "standard"
          })
          .set(centuryAuthHeaders(token))
      ])
    )
    .map(([century, story]) => {
      if (!century.ok) return new AllCoursesRequestFailed(century.text);
      if (!story.ok) return new AllCoursesRequestFailed(story.text);

      const data = (century.body as CenturyTypes.Course[]).concat(
        story.body as CenturyTypes.Course[]
      );
      return new AllCoursesRequestSucceeded(keyBy(data, "_id"));
    })

    .catch(e => Observable.of(new AllCoursesRequestFailed(e)));
