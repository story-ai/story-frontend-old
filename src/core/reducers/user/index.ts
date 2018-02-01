import { combineReducers } from "redux";

import * as details from "./details";
import * as meta from "./meta";

export interface StateType {
  readonly meta: meta.StateType;
  readonly details: details.StateType;
}

export const initial: StateType = {
  meta: meta.initial,
  details: details.initial
};

export const reducer = combineReducers<StateType>({
  meta: meta.reducer,
  details: details.reducer
});
