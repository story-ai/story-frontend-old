import { StateType } from "../../core/reducers";
import * as React from "react";
import { StoryTypes, CenturyTypes } from "story-backend-utils";
import { connect } from "react-redux";
import {
  getState,
  Loadable,
  getLoadableFromMap
} from "../../core/reducers/types/Loadable";

export class CourseHeadingComponent extends React.Component<{
  studyGroup: CenturyTypes.StudyGroup | undefined;
  item: StoryTypes.Course;
}> {
  render() {
    const name = this.props.item.name;
    return (
      <li>
        {this.props.studyGroup ? (
          <a
            href={`https://app.century.tech/learn/study-groups/${
              this.props.studyGroup._id
            }`}
          >
            {name}
          </a>
        ) : (
          name
        )}
      </li>
    );
  }
}

export const CourseHeading = connect(
  (
    state: StateType,
    props: { item: StoryTypes.Course }
  ): {
    studyGroup: CenturyTypes.StudyGroup | undefined;
    item: StoryTypes.Course;
  } => {
    const studyGroup = Object.keys(state.studyGroups.LOADED)
      .map(k => state.studyGroups.LOADED[k])
      .find(g => g.course === props.item._id);
    return {
      studyGroup,
      item: props.item
    };
  }
)(CourseHeadingComponent);
