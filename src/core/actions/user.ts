import { CenturyTypes, StoryTypes } from "story-backend-utils";

import { MyAction } from "./MyAction";

export class UserRequested extends MyAction {
  type = UserRequested.type;

  static type: "USER_REQUESTED" = "USER_REQUESTED";
}

export class UserRequestFailed extends MyAction {
  type = UserRequestFailed.type;

  static type: "USER_REQUEST_FAILED" = "USER_REQUEST_FAILED";
  error: string;
  constructor(error: string) {
    super();
    this.error = error;
  }
}
export class UserRequestSucceeded extends MyAction {
  type = UserRequestSucceeded.type;

  static type: "USER_REQUEST_SUCCEEDED" = "USER_REQUEST_SUCCEEDED";
  user: CenturyTypes.User;
  constructor(user: CenturyTypes.User) {
    super();
    this.user = user;
  }
}

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
