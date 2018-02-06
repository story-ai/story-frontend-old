import { combineReducers } from "redux";
import * as form from "redux-form";
import { FormStateMap } from "redux-form/lib/reducer";

import { AllActions } from "../actions";
import { LogoutRequestSucceeded } from "../actions/auth";
import * as auth from "./auth";
import * as classes from "./classes";
import * as courses from "./courses";
import * as studyGroups from "./study_groups";
import * as teachers from "./teachers";
import * as user from "./user";

export interface StateType {
  readonly auth: auth.StateType;
  readonly user: user.StateType;
  readonly classes: classes.StateType;
  readonly courses: courses.StateType;
  readonly studyGroups: studyGroups.StateType;
  readonly teachers: teachers.StateType;
  readonly form: FormStateMap;
}

export const initial: StateType = {
  auth: auth.initial,
  user: user.initial,
  classes: classes.initial,
  courses: courses.initial,
  studyGroups: studyGroups.initial,
  teachers: teachers.initial,
  form: {}
};

export const mainReducer = combineReducers<StateType>({
  auth: auth.reducer,
  user: user.reducer,
  classes: classes.reducer,
  courses: courses.reducer,
  studyGroups: studyGroups.reducer,
  teachers: teachers.reducer,
  form: form.reducer
});

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    case LogoutRequestSucceeded.type:
      return initial;
  }
  return mainReducer(state, action);
};
