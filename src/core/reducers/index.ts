import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import * as ping from "./ping";
import * as app from "./app";
import * as classes from "./classes";

export interface StateType {
  readonly app: app.StateType;
  readonly ping: ping.StateType;
  readonly classes: classes.StateType;
}

export const initial: StateType = {
  app: app.initial,
  ping: ping.initial,
  classes: classes.initial
};

export const reducer = combineReducers<StateType>({
  app: app.reducer,
  ping: ping.reducer,
  class: classes.reducer
});
