import { CenturyTypes, StoryTypes } from "story-backend-utils";
import { MyAction } from "./MyAction";

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

export class UserMetaRequested extends MyAction {
  type = UserMetaRequested.type;
  user_id: string;

  static type: "USER_META_REQUESTED" = "USER_META_REQUESTED";
  constructor(user_id: string) {
    super();
    this.user_id = user_id;
  }
}

export class UserMetaRequestFailed extends MyAction {
  type = UserMetaRequestFailed.type;

  static type: "USER_META_REQUEST_FAILED" = "USER_META_REQUEST_FAILED";
  error: string;

  constructor(error: UserMetaRequestFailed["error"]) {
    super();
    this.error = error;
  }
}

export class UserMetaRequestSucceeded extends MyAction {
  type = UserMetaRequestSucceeded.type;

  static type: "USER_META_REQUEST_SUCCEEDED" = "USER_META_REQUEST_SUCCEEDED";
  user: StoryTypes.StoryUserFields;

  constructor(user: UserMetaRequestSucceeded["user"]) {
    super();
    this.user = user;
  }
}
