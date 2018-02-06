import { combineReducers } from "redux";

import * as century from "./century";
import * as meta from "./meta";

export interface StateType {
  readonly meta: meta.StateType;
  readonly century: century.StateType;
}

export const initial: StateType = {
  meta: meta.initial,
  century: century.initial
};

export const reducer = combineReducers<StateType>({
  meta: meta.reducer,
  century: century.reducer
});
