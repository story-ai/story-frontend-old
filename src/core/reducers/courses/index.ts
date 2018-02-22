import { combineReducers } from "redux";

import * as century from "./century";
import * as meta from "./meta";
import * as visible from "./visible";

export interface StateType {
  readonly meta: meta.StateType;
  readonly century: century.StateType;
  readonly visible: visible.StateType;
}

export const initial: StateType = {
  meta: meta.initial,
  century: century.initial,
  visible: visible.initial
};

export const reducer = combineReducers<StateType>({
  meta: meta.reducer,
  century: century.reducer,
  visible: visible.reducer
});
