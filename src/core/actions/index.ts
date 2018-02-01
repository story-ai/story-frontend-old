import {
  AllCoursesRequested,
  AllCoursesRequestFailed,
  AllCoursesRequestSucceeded,
  CourseMetaRequestFailed,
  CoursesRequestFailed,
  CoursesRequestSucceeded,
  CoursesRequested,
  CourseMetaRequested,
  CourseMetaRequestSucceeded
} from "./courses";
import {
  FailTeacherRequestAction,
  RequestTeachersAction,
  SucceedTeacherRequestAction
} from "./teachers";
import {
  AllClassesRequestAction,
  ClassRequestAction,
  ClassRequestFailedAction,
  ClassRequestSucceededAction,
  AddToClassFailedAction,
  AddToClassRequestAction,
  AddToClassSucceededAction
} from "./classes";
import {
  FailRequestUserAction,
  SucceedUserRequestAction,
  RequestUserAction
} from "./user";
import {
  LoginAction,
  LogoutAction,
  ReceivedTokenAction,
  RegisterAction
} from "./auth";
import {
  StudyGroupListRequestAction,
  StudyGroupRequestAction,
  StudyGroupRequestFailedAction,
  StudyGroupRequestSucceededAction
} from "./study_groups";
import { Action } from "redux";
export { MyAction } from "./MyAction";

export type AllActions =
  | LoginAction
  | LogoutAction
  | ReceivedTokenAction
  | RegisterAction
  | ClassRequestAction
  | ClassRequestFailedAction
  | ClassRequestSucceededAction
  | AllClassesRequestAction
  | FailTeacherRequestAction
  | SucceedTeacherRequestAction
  | RequestTeachersAction
  | FailRequestUserAction
  | SucceedUserRequestAction
  | RequestUserAction
  | StudyGroupListRequestAction
  | StudyGroupRequestAction
  | StudyGroupRequestFailedAction
  | StudyGroupRequestSucceededAction
  | AddToClassFailedAction
  | AddToClassRequestAction
  | AddToClassSucceededAction
  // courses
  | AllCoursesRequested
  | AllCoursesRequestFailed
  | AllCoursesRequestSucceeded
  | CourseMetaRequested
  | CourseMetaRequestFailed
  | CourseMetaRequestSucceeded
  | CoursesRequested
  | CoursesRequestFailed
  | CoursesRequestSucceeded;
