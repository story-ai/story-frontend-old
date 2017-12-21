import { combineReducers } from "redux";
import * as form from "redux-form";
import * as classes from "./classes";
import * as courses from "./courses";
import * as teachers from "./teachers";
import * as user from "./user";
import * as auth from "./auth";
import { FormStateMap } from "redux-form/lib/reducer";

export interface StateType {
  readonly auth: auth.StateType;
  readonly user: user.StateType;
  readonly classes: classes.StateType;
  readonly courses: courses.StateType;
  readonly teachers: teachers.StateType;
  readonly form: FormStateMap;
}

export const initial: StateType = {
  auth: auth.initial,
  user: user.initial,
  classes: classes.initial,
  courses: courses.initial,
  teachers: teachers.initial,
  form: {}
};

export const reducer = combineReducers<StateType>({
  auth: auth.reducer,
  user: user.reducer,
  classes: classes.reducer,
  courses: courses.reducer,
  teachers: teachers.reducer,
  form: form.reducer
});
