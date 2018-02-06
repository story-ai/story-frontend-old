import { StoryTypes } from "story-backend-utils";

import { MyAction } from "./MyAction";

export class TeachersRequested extends MyAction {
  type = TeachersRequested.type;

  static type: "TEACHERS_REQUESTED" = "TEACHERS_REQUESTED";
  ids: string[];
  constructor(ids: string[]) {
    super();
    this.ids = ids;
  }
}

export class TeachersRequestFailed extends MyAction {
  type = TeachersRequestFailed.type;

  static type: "TEACHERS_REQUEST_FAILED" = "TEACHERS_REQUEST_FAILED";
  error: string;
  ids?: string[];
  constructor(error: string, ids?: string[]) {
    super();
    this.error = error;
    this.ids = ids;
  }
}

export class TeachersRequestSucceeded extends MyAction {
  type = TeachersRequestSucceeded.type;

  static type: "TEACHERS_REQUEST_SUCCEEDED" = "TEACHERS_REQUEST_SUCCEEDED";
  items: { [k: string]: StoryTypes.Teacher };

  constructor(items: TeachersRequestSucceeded["items"]) {
    super();
    this.items = items;
  }
}
