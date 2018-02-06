import { Epic } from "redux-observable";
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
  action$
    .ofType<Register>(Register.type)
    .switchMap(action =>
      superagent.post(`${StoryServices.material}/user`).send({
        username: action.username,
        password: action.password,
        passwordConfirmation: action.passwordConfirmation
      })
    )
    .mergeMap((res): AllActions[] => {
      const data = res.body as {
        success: boolean;
        mesage?: string;
      };

      if (res.status !== 200) return [new RegisterFailed(res.body)];

      return [new RegisterSucceeded(), new LoginRequested()];
    });
