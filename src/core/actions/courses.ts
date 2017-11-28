import { StoryTypes } from "story-backend-utils";

export const COURSES_REQUESTED = "COURSES_REQUESTED";
export type RequestCoursesAction = {
  type: "COURSES_REQUESTED";
  ids: string[];
};
export const requestCourse = (ids: string[]): RequestCoursesAction => ({
  type: COURSES_REQUESTED,
  ids
});

export const COURSES_REQUEST_FAILED = "COURSES_REQUEST_FAILED";
export type FailCourseRequestAction = {
  type: "COURSES_REQUEST_FAILED";
  ids: null | string[];
  error: string;
};
export const failCourseRequest = (
  ids: null | string[],
  error: string
): FailCourseRequestAction => ({
  type: COURSES_REQUEST_FAILED,
  error,
  ids
});

export const COURSES_REQUEST_SUCCEEDED = "COURSES_REQUEST_SUCCEEDED";
export type SucceedCourseRequestAction = {
  type: "COURSES_REQUEST_SUCCEEDED";
  items: { [k: string]: StoryTypes.Course };
};
export const succeedCourseRequest = (items: {
  [k: string]: StoryTypes.Course;
}): SucceedCourseRequestAction => ({
  type: COURSES_REQUEST_SUCCEEDED,
  items
});
