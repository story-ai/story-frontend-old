import { CenturyTypes } from "story-backend-utils";

export const STUDY_GROUPS_REQUESTED = "STUDY_GROUP_REQUESTED";
export type StudyGroupRequestAction = {
  type: "STUDY_GROUP_REQUESTED";
  ids: string[];
};
export const requestStudyGroups = (ids: string[]): StudyGroupRequestAction => ({
  type: STUDY_GROUPS_REQUESTED,
  ids
});

export const STUDY_GROUPS_REQUEST_FAILED = "STUDY_GROUP_REQUEST_FAILED";
export type StudyGroupRequestFailedAction = {
  type: "STUDY_GROUP_REQUEST_FAILED";
  ids: null | string[];
  error: string;
};
export const failStudyGroupRequest = (
  ids: null | string[],
  error: string
): StudyGroupRequestFailedAction => ({
  type: STUDY_GROUPS_REQUEST_FAILED,
  error,
  ids
});

export const STUDY_GROUPS_REQUEST_SUCCEEDED = "STUDY_GROUPS_REQUEST_SUCCEEDED";
export type StudyGroupRequestSucceededAction = {
  type: "STUDY_GROUPS_REQUEST_SUCCEEDED";
  items: { [k: string]: CenturyTypes.StudyGroup };
};
export const succeedStudyGroupRequest = (items: {
  [k: string]: CenturyTypes.StudyGroup;
}): StudyGroupRequestSucceededAction => ({
  type: STUDY_GROUPS_REQUEST_SUCCEEDED,
  items
});

export const STUDY_GROUP_LIST_REQUESTED = "STUDY_GROUP_LIST_REQUESTED";
export type StudyGroupListRequestAction = {
  type: "STUDY_GROUP_LIST_REQUESTED";
};
export const requestStudyGroupList = (): StudyGroupListRequestAction => ({
  type: STUDY_GROUP_LIST_REQUESTED
});

// export const STUDY_GROUP_LIST_REQUEST_FAILED = "STUDY_GROUP_LIST_REQUEST_FAILED";
// export type StudyGroupListRequestFailedAction = {
//   type: "STUDY_GROUP_LIST_REQUEST_FAILED";
//   error: string;
// };
// export const failStudyGroupListRequest = (
//   error: string
// ): StudyGroupListRequestFailedAction => ({
//   type: STUDY_GROUP_LIST_REQUEST_FAILED,
//   error,
// });

// export const STUDY_GROUP_LIST_REQUEST_SUCCEEDED = "STUDY_GROUP_LIST_REQUEST_SUCCEEDED";
// export type StudyGroupListRequestSucceededAction = {
//   type: "STUDY_GROUP_LIST_REQUEST_SUCCEEDED";
//   items: { [k: string]: StoryTypes.StudyGroup };
// };
// export const succeedStudyGroupRequest = (items: {
//   [k: string]: StoryTypes.StudyGroup;
// }): StudyGroupRequestSucceededAction => ({
//   type: STUDY_GROUPS_REQUEST_SUCCEEDED,
//   items
// });
