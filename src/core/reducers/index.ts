import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import * as classes from "./classes";
import * as courses from "./courses";
import * as teachers from "./teachers";

export interface StateType {
  readonly classes: classes.StateType;
  readonly courses: courses.StateType;
  readonly teachers: teachers.StateType;
}

export const initial: StateType = {
  classes: classes.initial,
  courses: courses.initial,
  teachers: teachers.initial
};

export const reducer = combineReducers<StateType>({
  classes: classes.reducer,
  courses: courses.reducer,
  teachers: teachers.reducer
});
