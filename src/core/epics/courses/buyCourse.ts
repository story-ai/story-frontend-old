import { Epic } from "redux-observable";
import { Observable } from "rxjs";
import * as superagent from "superagent";

import { StoryServices } from "../../../config";
import { AllActions } from "../../actions";
import {
  BuyCourseRequested,
  BuyCourseRequestFailed,
  BuyCourseRequestSucceeded
} from "../../actions/courses";
import { centuryAuthHeaders, getTokenStream } from "../../common";
import { StateType } from "../../reducers";

export const buyCourse: Epic<AllActions, StateType> = (action$, state$) =>
  action$
    .ofType<BuyCourseRequested>(BuyCourseRequested.type)
    .combineLatest(getTokenStream(state$))
    .combineLatest(state$.map(s => s.user).distinctUntilChanged())
    .flatMap(([[action, token], user]) => {
      if (user.details.state !== "LOADED") {
        return Observable.of(
          new BuyCourseRequestFailed(action.courseId, "User not loaded")
        );
      }

      return Observable.fromPromise(
        superagent
          .put(`${StoryServices.material}/user/${user.details.item._id}/course`)
          .send({ courseId: action.courseId, stripeToken: action.token })
          .set(centuryAuthHeaders(token))
      )
        .map(res => {
          if (!res.ok)
            return new BuyCourseRequestFailed(action.courseId, res.text);

          console.log("Got an error sadly");

          return new BuyCourseRequestSucceeded(action.courseId);
        })
        .catch(e =>
          Observable.of(new BuyCourseRequestFailed(action.courseId, e))
        );
    });
