import {
  FailCourseRequestAction,
  SucceedCourseRequestAction,
  RequestCoursesAction
} from "./courses";
import {
  failTeacherRequest,
  FailTeacherRequestAction,
  RequestTeachersAction,
  succeedTeacherRequest,
  SucceedTeacherRequestAction
} from "./teachers";
import {
  AllClassesRequestAction,
  ClassRequestAction,
  ClassRequestFailedAction,
  ClassRequestSucceededAction
} from "./classes";
import {
  LoginAction,
  LogoutAction,
  ReceivedTokenAction,
  RegisterAction
} from "./auth";
import { APP_START, AppStartAction } from "./app";

export type AllActions =
  | LoginAction
  | LogoutAction
  | ReceivedTokenAction
  | RegisterAction
  | AppStartAction
  | ClassRequestAction
  | ClassRequestFailedAction
  | ClassRequestSucceededAction
  | AllClassesRequestAction
  | FailTeacherRequestAction
  | SucceedTeacherRequestAction
  | RequestTeachersAction
  | FailCourseRequestAction
  | SucceedCourseRequestAction
  | RequestCoursesAction;
