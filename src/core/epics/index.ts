import { combineEpics } from "redux-observable";

import { requestAllClasses } from "./classes";
import { requestTeachers, updateTeachersOnClassReceived } from "./teachers";
import { requestCourses, updateCoursesOnClassReceived } from "./courses";
import { login, logout, initToken, persistToken } from "./auth";

export const epic = combineEpics(
  // auth
  login,
  logout,
  persistToken,
  initToken

  // materials
  // requestAllClasses,
  // requestTeachers,
  // requestCourses,
  // updateTeachersOnClassReceived,
  // updateCoursesOnClassReceived
);
