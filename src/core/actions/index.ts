import {
  FailCourseRequestAction,
  SucceedCourseRequestAction,
  RequestCoursesAction
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
  ClassRequestSucceededAction
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
  | FailCourseRequestAction
  | SucceedCourseRequestAction
  | RequestCoursesAction
  | FailRequestUserAction
  | SucceedUserRequestAction
  | RequestUserAction;
