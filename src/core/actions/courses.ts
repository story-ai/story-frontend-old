import { StoryTypes } from "story-backend-utils";

import { MyAction } from "./MyAction";

export class AllCoursesRequested extends MyAction {
  type = AllCoursesRequested.type;

  static type: "ALL_COURSES_REQUESTED" = "ALL_COURSES_REQUESTED";
}

export class AllCoursesRequestFailed extends MyAction {
  type = AllCoursesRequestFailed.type;

  static type: "ALL_COURSES_REQUEST_FAILED" = "ALL_COURSES_REQUEST_FAILED";
  error: string;
  constructor(error: string) {
    super();
    this.error = error;
  }
}

export class AllCoursesRequestSucceeded extends MyAction {
  type = AllCoursesRequestSucceeded.type;

  static type: "ALL_COURSES_REQUEST_SUCCEEDED" = "ALL_COURSES_REQUEST_SUCCEEDED";
  items: { [k: string]: StoryTypes.Course };
  constructor(items: AllCoursesRequestSucceeded["items"]) {
    super();
    this.items = items;
  }
}

export class CourseMetaRequestFailed extends MyAction {
  type = CourseMetaRequestFailed.type;

  static type: "COURSE_META_REQUEST_FAILED" = "COURSE_META_REQUEST_FAILED";
  ids: null | string[];
  error: string;
  constructor(
    ids: CourseMetaRequestFailed["ids"],
    error: CourseMetaRequestFailed["error"]
  ) {
    super();
    this.ids = ids;
    this.error = error;
  }
}

export class CourseMetaRequestSucceeded extends MyAction {
  type = CourseMetaRequestSucceeded.type;

  static type: "COURSE_META_REQUEST_SUCEEDED" = "COURSE_META_REQUEST_SUCEEDED";
  items: { [k: string]: StoryTypes.StoryCourseFields };
  constructor(items: CourseMetaRequestSucceeded["items"]) {
    super();
    this.items = items;
  }
}

export class CourseMetaRequested extends MyAction {
  type = CourseMetaRequested.type;

  static type: "COURSE_META_REQUESTED" = "COURSE_META_REQUESTED";
  ids?: string[] | undefined;
  constructor(ids?: CourseMetaRequested["ids"]) {
    super();
    this.ids = ids;
  }
}

export class CoursesRequested extends MyAction {
  type = CoursesRequested.type;

  static type: "COURSES_REQUESTED" = "COURSES_REQUESTED";
  ids: string[];
  constructor(ids: CoursesRequested["ids"]) {
    super();
    this.ids = ids;
  }
}

export class CoursesRequestFailed extends MyAction {
  type = CoursesRequestFailed.type;

  static type: "COURSE_REQUEST_FAILED" = "COURSE_REQUEST_FAILED";
  ids: null | string[];
  error: string;
  constructor(
    ids: CoursesRequestFailed["ids"],
    error: CoursesRequestFailed["error"]
  ) {
    super();
    this.ids = ids;
    this.error = error;
  }
}

export class CoursesRequestSucceeded extends MyAction {
  type = CoursesRequestSucceeded.type;

  static type: "COURSE_REQUEST_SUCCEEDED" = "COURSE_REQUEST_SUCCEEDED";
  items: { [k: string]: StoryTypes.Course };
  constructor(items: CoursesRequestSucceeded["items"]) {
    super();
    this.items = items;
  }
}

export class BuyCourseRequested extends MyAction {
  type = BuyCourseRequested.type;

  static type: "BUY_COURSE_REQUESTED" = "BUY_COURSE_REQUESTED";
  courseId: string;
  token: string;
  constructor(
    courseId: BuyCourseRequested["courseId"],
    token: BuyCourseRequested["token"]
  ) {
    super();
    this.courseId = courseId;
    this.token = token;
  }
}

export class BuyCourseRequestSucceeded extends MyAction {
  type = BuyCourseRequestSucceeded.type;

  static type: "BUY_COURSE_REQUEST_SUCCEEDED" = "BUY_COURSE_REQUEST_SUCCEEDED";
  courseId: string;

  constructor(courseId: BuyCourseRequestSucceeded["courseId"]) {
    super();
    this.courseId = courseId;
  }
}

export class BuyCourseRequestFailed extends MyAction {
  type = BuyCourseRequestFailed.type;

  static type: "BUY_COURSE_REQUEST_FAILED" = "BUY_COURSE_REQUEST_FAILED";
  error: string;
  courseId: string;

  constructor(
    courseId: BuyCourseRequestFailed["courseId"],
    error: BuyCourseRequestFailed["error"]
  ) {
    super();
    this.courseId = courseId;
    this.error = error;
  }
}
