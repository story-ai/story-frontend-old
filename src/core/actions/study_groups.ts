import { CenturyTypes } from "story-backend-utils";

import { MyAction } from "./MyAction";

export class StudyGroupsRequested extends MyAction {
  type = StudyGroupsRequested.type;

  static type: "STUDY_GROUPS_REQUESTED" = "STUDY_GROUPS_REQUESTED";
  ids: string[];
  constructor(ids: string[]) {
    super();
    this.ids = ids;
  }
}

export class StudyGroupsRequestFailed extends MyAction {
  type = StudyGroupsRequestFailed.type;

  static type: "STUDY_GROUPS_REQUEST_FAILED" = "STUDY_GROUPS_REQUEST_FAILED";
  error: string;
  ids?: string[];

  constructor(error: string, ids?: string[]) {
    super();
    this.error = error;
    this.ids = ids;
  }
}

export class StudyGroupsRequestSucceeded extends MyAction {
  type = StudyGroupsRequestSucceeded.type;

  static type: "STUDY_GROUPS_REQUEST_SUCCEEDED" = "STUDY_GROUPS_REQUEST_SUCCEEDED";
  items: { [k: string]: CenturyTypes.StudyGroup };

  constructor(items: StudyGroupsRequestSucceeded["items"]) {
    super();
    this.items = items;
  }
}

export class StudyGroupListRequested extends MyAction {
  type = StudyGroupListRequested.type;

  static type: "STUDY_GROUP_LIST_REQUESTED" = "STUDY_GROUP_LIST_REQUESTED";
}

export class StudyGroupListRequestFailed extends MyAction {
  type = StudyGroupListRequestFailed.type;

  static type: "STUDY_GROUP_LIST_REQUEST_FAILED" = "STUDY_GROUP_LIST_REQUEST_FAILED";
  error: string;

  constructor(error: string) {
    super();
    this.error = error;
  }
}

export class StudyGroupListRequestSucceeded extends MyAction {
  type = StudyGroupListRequestSucceeded.type;

  static type: "STUDY_GROUP_LIST_REQUEST_SUCCEEDED" = "STUDY_GROUP_LIST_REQUEST_SUCCEEDED";
  items: { studyGroupId: string }[];
  constructor(items: StudyGroupListRequestSucceeded["items"]) {
    super();
    this.items = items;
  }
}
