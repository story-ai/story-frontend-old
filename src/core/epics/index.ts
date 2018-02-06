import { combineEpics } from "redux-observable";

import { logout, register, ssoObserver } from "./auth";
import { requestAllClasses } from "./classes";
import {
  buyCourse,
  getCourseMeta,
  reloadOnBuy,
  requestCourseMeta,
  requestCourses,
  updateCoursesOnClassReceived
} from "./courses";
import { alertOnError } from "./errors";
import { requestStudyGroup, requestStudyGroupList } from "./study_groups";
import { requestTeachers, updateTeachersOnClassReceived } from "./teachers";
import {
  getUserMeta,
  identifyDrift,
  requestUser,
  requestUserMeta
} from "./user";
import { reload } from "./app";

export const epic = combineEpics(
  alertOnError,
  buyCourse,
  getCourseMeta,
  getUserMeta,
  identifyDrift,
  logout,
  register,
  reload,
  reloadOnBuy,
  requestAllClasses,
  requestCourseMeta,
  requestCourses,
  requestStudyGroup,
  requestStudyGroupList,
  requestTeachers,
  requestUser,
  requestUserMeta,
  ssoObserver,
  updateCoursesOnClassReceived,
  updateTeachersOnClassReceived
);
