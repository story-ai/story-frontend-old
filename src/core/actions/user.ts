import { StoryTypes } from "story-backend-utils";
import { CenturyTypes } from "../../../../backend-utils/dist/types/CenturyTypes";

export const USER_REQUESTED = "USER_REQUESTED";
export type RequestUserAction = {
  type: "USER_REQUESTED";
};
export const requestUser = (): RequestUserAction => ({
  type: USER_REQUESTED
});

export const USER_REQUEST_FAILED = "USER_REQUEST_FAILED";
export type FailRequestUserAction = {
  type: "USER_REQUEST_FAILED";
  error: string;
};
export const failUserRequest = (e: string): FailRequestUserAction => ({
  type: USER_REQUEST_FAILED,
  error: e
});

export const USER_REQUEST_SUCCEEDED = "USER_REQUEST_SUCCEEDED";
export type SucceedUserRequestAction = {
  type: "USER_REQUEST_SUCCEEDED";
  user: CenturyTypes.User;
};
export const succeedUserRequest = (
  user: CenturyTypes.User
): SucceedUserRequestAction => ({
  type: USER_REQUEST_SUCCEEDED,
  user
});
