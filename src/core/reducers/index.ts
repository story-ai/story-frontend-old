import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import * as classes from "./classes";
import * as courses from "./courses";
import * as teachers from "./teachers";
import * as auth from "./auth";

export interface StateType {
  readonly auth: auth.StateType;
  readonly classes: classes.StateType;
  readonly courses: courses.StateType;
  readonly teachers: teachers.StateType;
}

export const initial: StateType = {
  auth: auth.initial,
  classes: classes.initial,
  courses: courses.initial,
  teachers: teachers.initial
};

export const reducer = combineReducers<StateType>({
  auth: auth.reducer,
  classes: classes.reducer,
  courses: courses.reducer,
  teachers: teachers.reducer
});
