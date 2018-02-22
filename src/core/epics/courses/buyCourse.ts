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
import { UserMetaRequested } from "../../actions/user";
import { DeactivateDiscounts } from "../../actions/discounts";

export const buyCourse: Epic<AllActions, StateType> = (action$, state$) =>
  action$
    .ofType<BuyCourseRequested>(BuyCourseRequested.type)
    .withLatestFrom(getTokenStream(state$))
    .withLatestFrom(state$.map(s => s.user).distinctUntilChanged())
    .mergeMap(([[action, token], user]) => {
      if (user.details.state !== "LOADED") {
        return Observable.of(
          new BuyCourseRequestFailed(action.courseId, "User not loaded")
        );
      }
      const userId = user.details.item._id;

      let resultStream = Observable.fromPromise(
        superagent
          .put(`${StoryServices.material}/user/${userId}/course`)
          .send({
            courseId: action.courseId,
            stripeToken: action.token,
            discount: action.discount
          })
          .set(centuryAuthHeaders(token))
      )
        .map(res => {
          if (!res.ok)
            return new BuyCourseRequestFailed(action.courseId, res.text);

          return new BuyCourseRequestSucceeded(action.courseId);
        })
        .catch(e =>
          Observable.of(new BuyCourseRequestFailed(action.courseId, e))
        );

      // If we used a discount, we should reload the user meta
      if (action.discount !== undefined) {
        return resultStream.mergeMap(action => [
          action,
          new UserMetaRequested(userId),
          new DeactivateDiscounts()
        ]);
      }

      return resultStream;
    });
