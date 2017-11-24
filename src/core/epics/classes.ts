import { PING, pong } from "../actions/ping";
import {
  CLASSES_REQUEST_SUCCEEDED,
  CLASSES_REQUEST_FAILED,
  CLASSES_REQUESTED,
  failClassRequest,
  succeedClassRequest,
  ClassRequestAction,
  ALL_CLASSES_REQUESTED,
  AllClassesRequestAction
} from "../actions/materials";
import {
  ActionsObservable,
  Epic,
  combineEpics,
  createEpicMiddleware
} from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action } from "redux";

export const requestAllClasses = (action$: ActionsObservable<Action>) =>
  action$
    .ofType(ALL_CLASSES_REQUESTED)
    .flatMap(action =>
      Observable.from(fetch("https://api.axontoken.com/material"))
    )
    .flatMap(res => {
      if (res.status !== 200) throw res.text();

      return res.json();
    })
    .map(action => {
      if (typeof action.classes !== "object") {
        throw "Unexpected result shape " + JSON.stringify(action);
      }
      return succeedClassRequest(action.classes);
    })
    .catch(e => Observable.of(failClassRequest(null, e)));
