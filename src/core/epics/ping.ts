import { PING, pong, PingAction, PongAction } from "../actions/ping";
import {
  ActionsObservable,
  Epic,
  combineEpics,
  createEpicMiddleware
} from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import { Action } from "redux";
import { ALL_CLASSES_REQUESTED } from "../actions/materials";

export const ping = (action$: ActionsObservable<Action>) =>
  action$.ofType(PING).mapTo(pong());
