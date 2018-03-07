import { MyAction } from "./MyAction";
import { StoryTypes, CenturyTypes } from "story-backend-utils";

export class ReloadAll extends MyAction {
  type = ReloadAll.type;

  static type: "RELOAD_ALL" = "RELOAD_ALL";
}

export class AddVisibleCourse extends MyAction {
  type = AddVisibleCourse.type;

  static type: "ADD_VISIBLE_COURSE" = "ADD_VISIBLE_COURSE";
  course: StoryTypes.StoryCourseFields & CenturyTypes.Course;

  constructor(course: AddVisibleCourse["course"]) {
    super();
    this.course = course;
  }
}

export class RemoveVisibleCourse extends MyAction {
  type = RemoveVisibleCourse.type;

  static type: "REMOVE_VISIBLE_COURSE" = "REMOVE_VISIBLE_COURSE";
  course: StoryTypes.StoryCourseFields & CenturyTypes.Course;

  constructor(course: RemoveVisibleCourse["course"]) {
    super();
    this.course = course;
  }
}

export class ExpandCourse extends MyAction {
  type = ExpandCourse.type;

  static type: "EXPAND_COURSE" = "EXPAND_COURSE";
  course: StoryTypes.StoryCourseFields & CenturyTypes.Course;

  constructor(course: ExpandCourse["course"]) {
    super();
    this.course = course;
  }
}

export class OpenCheckout extends MyAction {
  type = OpenCheckout.type;

  static type: "OPEN_CHECKOUT" = "OPEN_CHECKOUT";
  course: StoryTypes.StoryCourseFields & CenturyTypes.Course;

  constructor(course: OpenCheckout["course"]) {
    super();
    this.course = course;
  }
}
