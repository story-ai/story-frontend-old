import { combineEpics } from "redux-observable";

import {
  requestAllClasses,
  addToClass,
  reloadAfterAddingToClass
} from "./classes";
import { requestUser, identifyDrift } from "./user";
import { requestTeachers, updateTeachersOnClassReceived } from "./teachers";
import { requestCourses, updateCoursesOnClassReceived } from "./courses";
import { login, logout, register } from "./auth";
import { requestStudyGroup, requestStudyGroupList } from "./study_groups";
import { alertOnError } from "./errors";

export const epic = combineEpics(
  // auth
  login,
  logout,
  register,

  // materials
  requestAllClasses,
  requestTeachers,
  requestCourses,
  updateTeachersOnClassReceived,
  updateCoursesOnClassReceived,

  // user
  requestUser,
  requestStudyGroup,
  requestStudyGroupList,
  addToClass,
  reloadAfterAddingToClass,
  identifyDrift,

  // errors
  alertOnError
);
