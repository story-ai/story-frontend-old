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
  | RequestUserAction
  | StudyGroupListRequestAction
  | StudyGroupRequestAction
  | StudyGroupRequestFailedAction
  | StudyGroupRequestSucceededAction
  | AddToClassFailedAction
  | AddToClassRequestAction
  | AddToClassSucceededAction;
