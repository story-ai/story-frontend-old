import { StateType } from "../../core/reducers";
import * as React from "react";
import { StoryTypes, CenturyTypes } from "story-backend-utils";
import { connect } from "react-redux";
import {
  getState,
  Loadable,
  getLoadableFromMap
} from "../../core/reducers/types/Loadable";

export class StrandHeading extends React.Component<{
  item: CenturyTypes.Course["strands"][0];
  bought: boolean;
}> {
  render() {
    const name = this.props.item.name;
    return (
      <li>
        {name} ({this.props.item.nuggets.length} nuggets)
        {/* {this.props.studyGroup && this.props.bought ? (
          <a
            href={`https://app.century.tech/learn/study-groups/${
              this.props.studyGroup._id
            }`}
          >
            {name}
          </a>
        ) : (
          name
        )} */}
      </li>
    );
  }
}

// export const StrandHeading = connect(
//   (
//     state: StateType,
//     props: { item: CenturyTypes.Course["strands"][0]; bought: boolean }
//   ): {
//     item: StoryTypes.Course;
//     bought: boolean;
//   } => {
//     return {
//       ...props
//     };
//   }
// )(StrandHeadingComponent);
