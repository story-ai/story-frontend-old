import { Epic } from "redux-observable";
import { StoryTypes } from "story-backend-utils";
import * as superagent from "superagent";

import { StoryServices } from "../../../config";
import { AllActions } from "../../actions";
import {
  UserMetaRequested,
  UserMetaRequestFailed,
  UserMetaRequestSucceeded
} from "../../actions/user";
import { StateType } from "../../reducers";
import { Observable } from "rxjs/Observable";

export const getUserMeta: Epic<AllActions, StateType> = action$ =>
  action$
    .ofType<UserMetaRequested>(UserMetaRequested.type)
    .switchMap(action =>
      superagent.get(`${StoryServices.material}/user/${action.user_id}`)
    )
    .map(res => {
      if (res.status !== 200) return new UserMetaRequestFailed(res.text);
      const data = res.body as StoryTypes.StoryUserFields;

      return new UserMetaRequestSucceeded(data);
    })
    .catch(e => Observable.of(new UserMetaRequestFailed(e)));
