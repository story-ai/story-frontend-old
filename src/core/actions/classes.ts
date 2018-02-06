import { StoryTypes } from "story-backend-utils/dist/types/StoryTypes";

import { MyAction } from "./MyAction";

export class AddToClassRequest extends MyAction {
  type = AddToClassRequest.type;

  static type: "REQUEST_ADD_TO_CLASS" = "REQUEST_ADD_TO_CLASS";
  token: string;
  classId: string;
  constructor(token: string, classId: string) {
    super();
    this.token = token;
    this.classId = classId;
  }
}

export class AddToClassRequestFailed extends MyAction {
  type = AddToClassRequestFailed.type;

  static type: "ADD_TO_CLASS_FAILED" = "ADD_TO_CLASS_FAILED";
  classId: string;
  error: string;
  constructor(classId: string, error: string) {
    super();
    this.error = error;
    this.classId = classId;
  }
}

export class AddToClassRequestSucceeded extends MyAction {
  type = AddToClassRequestSucceeded.type;

  static type: "ADD_TO_CLASS_SUCCEEDED" = "ADD_TO_CLASS_SUCCEEDED";
  classId: string;

  constructor(classId: string) {
    super();
    this.classId = classId;
  }
}

export class ClassRequested extends MyAction {
  type = ClassRequested.type;

  static type: "CLASS_REQUESTED" = "CLASS_REQUESTED";
  ids: string[];
  constructor(ids: string[]) {
    super();
    this.ids = ids;
  }
}

export class AllClassesRequested extends MyAction {
  type = AllClassesRequested.type;

  static type: "ALL_CLASS_REQUESTED" = "ALL_CLASS_REQUESTED";
}

export class ClassRequestFailed extends MyAction {
  type = ClassRequestFailed.type;

  static type: "CLASS_REQUST_FAILED" = "CLASS_REQUST_FAILED";
  ids?: string[];
  error: string;
  constructor(error: string, ids?: string[]) {
    super();
    this.ids = ids;
    this.error = error;
  }
}

export class ClassRequestSucceeded extends MyAction {
  type = ClassRequestSucceeded.type;

  static type: "CLASS_REQUEST_SUCCEEDED" = "CLASS_REQUEST_SUCCEEDED";
  items: { [k: string]: StoryTypes.Class };

  constructor(items: ClassRequestSucceeded["items"]) {
    super();
    this.items = items;
  }
}
