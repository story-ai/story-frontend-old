import { ActionsObservable } from "redux-observable";
import { Action } from "redux";
import { StateType } from "../../reducers/index";
import { Store } from "react-redux";
import {
  UserMetaRequested,
  UserMetaRequestSucceeded,
  UserMetaRequestFailed
} from "../../actions/user";
import { StoryTypes } from "story-backend-utils";
import { StoryServices } from "../../../config/index";
import axios from "axios";
import { Observable } from "rxjs";

export const getUserMeta = (
  action$: ActionsObservable<Action>,
  store: Store<StateType>
) =>
  action$
    .ofType(UserMetaRequested.type)
    .flatMap((action: UserMetaRequested) => {
      return axios.get<StoryTypes.StoryUserFields>(
        `${StoryServices.material}/user/${action.user_id}`
      );
    })
    .map(res => {
      if (res.status !== 200) throw res.data;

      if (typeof res.data !== "object") {
        throw "Unexpected result shape " + JSON.stringify(res.data);
      }
      return new UserMetaRequestSucceeded(res.data);
    })
    .catch(e => Observable.of(new UserMetaRequestFailed(e)));
