import { combineEpics } from "redux-observable";

import { login, logout, register } from "./auth";
import { reloadAfterAddingToClass, requestAllClasses } from "./classes";
import {
  buyCourse,
  getCourseMeta,
  requestCourseMeta,
  requestCourses,
  updateCoursesOnClassReceived
} from "./courses";
import { reloadOnBuy } from "./courses/reloadOnBuy";
import { alertOnError } from "./errors";
import { requestStudyGroup, requestStudyGroupList } from "./study_groups";
import { requestTeachers, updateTeachersOnClassReceived } from "./teachers";
import {
  getUserMeta,
  identifyDrift,
  requestUser,
  requestUserMeta
} from "./user";

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
  getCourseMeta,

  requestStudyGroup,
  requestStudyGroupList,
  // addToClass,
  reloadAfterAddingToClass,
  requestCourseMeta,
  buyCourse,
  reloadOnBuy,

  // user
  requestUser,
  requestUserMeta,
  identifyDrift,
  getUserMeta,

  // errors
  alertOnError
);
