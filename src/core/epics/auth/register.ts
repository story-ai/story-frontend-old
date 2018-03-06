import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import * as superagent from "superagent";

import { StoryServices } from "../../../config";
import { AllActions } from "../../actions";
import {
  LoginRequested,
  Register,
  RegisterFailed,
  RegisterSucceeded
} from "../../actions/auth";
import { StateType } from "../../reducers";

export const register: Epic<AllActions, StateType> = action$ =>
  action$.ofType<Register>(Register.type).switchMap(action =>
    Observable.fromPromise(
      superagent.post(`${StoryServices.material}/user`).send({
        ...action
      })
    )
      .mergeMap((res): AllActions[] => {
        const data = res.body as {
          success: boolean;
          message?: string;
        };

        if (data) {
          if (data.success)
            return [new RegisterSucceeded(), new LoginRequested()];
          return [new RegisterFailed(data.message)];
        }

        console.error(res);
        return [new RegisterFailed("An unknown error occurred")];
      })
      .catch(e => {
        console.error(e);
        if (e.response.body && !e.response.body.success) {
          return [new RegisterFailed(e.response.body.message)];
        }
        return Observable.of(new RegisterFailed("An unknown error occurred"));
      })
  );
