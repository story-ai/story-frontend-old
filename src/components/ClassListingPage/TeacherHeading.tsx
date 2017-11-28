import { StateType } from "../../core/reducers";
import * as React from "react";
import { StoryTypes } from "story-backend-utils";
import { connect } from "react-redux";
import {
  getState,
  Loadable,
  getLoadableFromMap
} from "../../core/reducers/types/Loadable";

export const TeacherHeadingComponent: React.StatelessComponent<{
  item: StoryTypes.Teacher;
}> = props => {
  const name = props.item.personal.name;
  return (
    <li>
      {name.first} {name.last}
    </li>
  );
};

export const TeacherHeading = TeacherHeadingComponent;
