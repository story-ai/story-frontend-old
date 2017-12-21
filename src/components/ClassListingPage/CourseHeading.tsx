import { StateType } from "../../core/reducers";
import * as React from "react";
import { StoryTypes } from "story-backend-utils";
import { connect } from "react-redux";
import {
  getState,
  Loadable,
  getLoadableFromMap
} from "../../core/reducers/types/Loadable";

export const CourseHeadingComponent: React.StatelessComponent<{
  item: StoryTypes.Course;
}> = props => {
  const name = props.item.name;
  return <li><a href="/">{name}</a></li>;
};

export const CourseHeading = CourseHeadingComponent;
