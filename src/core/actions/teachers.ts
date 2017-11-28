import { StoryTypes } from "story-backend-utils";

export const TEACHERS_REQUESTED = "TEACHERS_REQUESTED";
export type RequestTeachersAction = {
  type: "TEACHERS_REQUESTED";
  ids: string[];
};
export const requestTeacher = (ids: string[]): RequestTeachersAction => ({
  type: TEACHERS_REQUESTED,
  ids
});

export const TEACHERS_REQUEST_FAILED = "TEACHERS_REQUEST_FAILED";
export type FailTeacherRequestAction = {
  type: "TEACHERS_REQUEST_FAILED";
  ids: null | string[];
  error: string;
};
export const failTeacherRequest = (
  ids: null | string[],
  error: string
): FailTeacherRequestAction => ({
  type: TEACHERS_REQUEST_FAILED,
  error,
  ids
});

export const TEACHERS_REQUEST_SUCCEEDED = "TEACHERS_REQUEST_SUCCEEDED";
export type SucceedTeacherRequestAction = {
  type: "TEACHERS_REQUEST_SUCCEEDED";
  items: { [k: string]: StoryTypes.Teacher };
};
export const succeedTeacherRequest = (items: {
  [k: string]: StoryTypes.Teacher;
}): SucceedTeacherRequestAction => ({
  type: TEACHERS_REQUEST_SUCCEEDED,
  items
});
