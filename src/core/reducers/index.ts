import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import * as classes from "./classes";
import * as teachers from "./teachers";

export interface StateType {
  readonly classes: classes.StateType;
  readonly teachers: teachers.StateType;
}

export const initial: StateType = {
  teachers: teachers.initial,
  classes: classes.initial
};

export const reducer = combineReducers<StateType>({
  teachers: teachers.reducer,
  classes: classes.reducer
});
