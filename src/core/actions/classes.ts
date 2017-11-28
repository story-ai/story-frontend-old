import { StoryTypes } from "story-backend-utils/dist/types/StoryTypes";

export const CLASSES_REQUESTED = "CLASS_REQUESTED";
export type ClassRequestAction = {
  type: "CLASS_REQUESTED";
  ids: string[];
};
export const requestClass = (ids: string[]): ClassRequestAction => ({
  type: CLASSES_REQUESTED,
  ids
});

export const ALL_CLASSES_REQUESTED = "ALL_CLASSES_REQUESTED";
export type AllClassesRequestAction = {
  type: "ALL_CLASSES_REQUESTED";
};
export const requestAllClasses = (): AllClassesRequestAction => ({
  type: ALL_CLASSES_REQUESTED
});

export const CLASSES_REQUEST_FAILED = "CLASS_REQUEST_FAILED";
export type ClassRequestFailedAction = {
  type: "CLASS_REQUEST_FAILED";
  ids: null | string[];
  error: string;
};
export const failClassRequest = (
  ids: null | string[],
  error: string
): ClassRequestFailedAction => ({
  type: CLASSES_REQUEST_FAILED,
  error,
  ids
});

export const CLASSES_REQUEST_SUCCEEDED = "CLASS_REQUEST_SUCCEEDED";
export type ClassRequestSucceededAction = {
  type: "CLASS_REQUEST_SUCCEEDED";
  items: { [k: string]: StoryTypes.Class };
};
export const succeedClassRequest = (items: {
  [k: string]: StoryTypes.Class;
}): ClassRequestSucceededAction => ({
  type: CLASSES_REQUEST_SUCCEEDED,
  items
});
