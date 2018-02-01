import {
  REQUEST_ADD_TO_CLASS,
  AddToClassRequestAction,
  succeedAddToClassRequest,
  failAddToClassRequest
} from "../../actions/classes";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import axios from "axios";
import { Action, Store } from "redux";
import { StoryServices } from "../../../config";
import { StateType } from "../../reducers";
import {
  BuyCourseRequested,
  BuyCourseRequestFailed,
  BuyCourseRequestSucceeded
} from "../../actions/courses";

export const buyCourse = (
  action$: ActionsObservable<Action>,
  store: Store<StateType>
) =>
  action$
    .ofType(BuyCourseRequested.type)
    .flatMap((action: BuyCourseRequested): Observable<Action> => {
      const user = store.getState().user;
      if (user.details.state !== "LOADED") {
        return Observable.of(
          new BuyCourseRequestFailed(action.courseId, "User not loaded")
        );
      }

      return Observable.fromPromise(
        axios
          .put(
            `${StoryServices.material}/user/${user.details.item._id}/course`,
            { courseId: action.courseId, stripeToken: action.token },
            {
              headers: {
                Authorization: `Bearer ${store.getState().auth.token}`
              }
            }
          )
          .then(
            res =>
              res.status === 200
                ? new BuyCourseRequestSucceeded(action.courseId)
                : new BuyCourseRequestFailed(
                    action.courseId,
                    res.data.message || res.statusText
                  )
          )
          .catch(e => {
            const message =
              (e.response && e.response.data && e.response.data.message) ||
              e.message;
            console.log(e);
            return new BuyCourseRequestFailed(action.courseId, message);
          })
      );
    });
