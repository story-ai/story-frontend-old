import { ReloadAll } from "./app";
import {
  AuthRequestFailed,
  GotToken,
  LoginRequested,
  LoginRequestSucceeded,
  LogoutRequested,
  LogoutRequestSucceeded,
  Register,
  RegisterFailed,
  RegisterSucceeded
} from "./auth";
import {
  AddToClassRequest,
  AddToClassRequestFailed,
  AddToClassRequestSucceeded,
  AllClassesRequested,
  ClassRequested,
  ClassRequestFailed,
  ClassRequestSucceeded
} from "./classes";
import {
  AllCoursesRequested,
  AllCoursesRequestFailed,
  AllCoursesRequestSucceeded,
  BuyCourseRequested,
  BuyCourseRequestFailed,
  BuyCourseRequestSucceeded,
  CourseMetaRequested,
  CourseMetaRequestFailed,
  CourseMetaRequestSucceeded,
  CoursesRequested,
  CoursesRequestFailed,
  CoursesRequestSucceeded
} from "./courses";
import {
  StudyGroupListRequested,
  StudyGroupListRequestFailed,
  StudyGroupListRequestSucceeded,
  StudyGroupsRequested,
  StudyGroupsRequestFailed,
  StudyGroupsRequestSucceeded,
  ThumbnailsReceived
} from "./study_groups";
import {
  TeachersRequested,
  TeachersRequestFailed,
  TeachersRequestSucceeded
} from "./teachers";
import {
  UserMetaRequested,
  UserMetaRequestFailed,
  UserMetaRequestSucceeded,
  UserRequested,
  UserRequestFailed,
  UserRequestSucceeded
} from "./user";

export { MyAction } from "./MyAction";

export type AllActions =
  | AddToClassRequest
  | AddToClassRequestFailed
  | AddToClassRequestSucceeded
  | AllClassesRequested
  | AllCoursesRequested
  | AllCoursesRequestFailed
  | AllCoursesRequestSucceeded
  | AuthRequestFailed
  | BuyCourseRequested
  | BuyCourseRequestFailed
  | BuyCourseRequestSucceeded
  | ClassRequested
  | ClassRequestFailed
  | ClassRequestSucceeded
  | CourseMetaRequested
  | CourseMetaRequestFailed
  | CourseMetaRequestSucceeded
  | CoursesRequested
  | CoursesRequestFailed
  | CoursesRequestSucceeded
  | GotToken
  | LoginRequested
  | LoginRequestSucceeded
  | LogoutRequested
  | ThumbnailsReceived
  | LogoutRequestSucceeded
  | Register
  | RegisterFailed
  | RegisterSucceeded
  | ReloadAll
  | StudyGroupListRequested
  | StudyGroupListRequestFailed
  | StudyGroupListRequestSucceeded
  | StudyGroupsRequested
  | StudyGroupsRequestFailed
  | StudyGroupsRequestSucceeded
  | TeachersRequested
  | TeachersRequestFailed
  | TeachersRequestSucceeded
  | UserMetaRequested
  | UserMetaRequestFailed
  | UserMetaRequestSucceeded
  | UserRequested
  | UserRequestFailed
  | UserRequestSucceeded;
