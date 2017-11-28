import { requestAllClasses } from "./classes";
import { requestTeachers, updateTeachersOnClassReceived } from "./teachers";
import { requestCourses, updateCoursesOnClassReceived } from "./courses";
import { combineEpics } from "redux-observable";

export const epic = combineEpics(
  requestAllClasses,
  requestTeachers,
  requestCourses,
  updateTeachersOnClassReceived,
  updateCoursesOnClassReceived
);
