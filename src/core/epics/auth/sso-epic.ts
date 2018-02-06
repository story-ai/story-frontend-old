import { Action } from "redux";
import { Epic } from "redux-observable";
import { Observer, Observable } from "rxjs";

import { STORY_ORGANISATION_ID } from "../../../config";
import { AllActions } from "../../actions";
import {
  AuthRequestFailed,
  LoginRequested,
  LoginRequestSucceeded,
  LogoutRequested,
  LogoutRequestSucceeded
} from "../../actions/auth";
import { StateType } from "../../reducers";
import { LoginStatus, SingleSignOnClient, TokenData } from "./century-sso";

const eventListeners: ((u: TokenData) => void)[] = [];
const client = new SingleSignOnClient({
  appKey: STORY_ORGANISATION_ID,
  onUpdate: update => eventListeners.forEach(f => f(update))
});

export const ssoObserver: Epic<AllActions, StateType> = action$ => {
  action$
    .ofType<LogoutRequested>(LogoutRequested.type)
    .subscribe(() => console.log("Got a logout request") || client.logout());
  action$
    .ofType<LoginRequested>(LoginRequested.type)
    .subscribe(() => console.log("Got a login request") || client.login());

  return Observable.create((o: Observer<Action>) => {
    eventListeners.push((update: TokenData) => {
      console.log("Got an update", update);
      switch (update.status) {
        case LoginStatus.errNoOrg:
        case LoginStatus.errNoTarget:
          return o.next(new AuthRequestFailed("Auth error: " + update.status));
        case LoginStatus.loggedIn:
          return o.next(new LoginRequestSucceeded(update));
        case LoginStatus.loggedOut:
          return o.next(new LogoutRequestSucceeded());
      }
    });
  });
};
