import "./index.scss";

import * as React from "react";
import { connect } from "react-redux";
import { CenturyTypes, StoryTypes } from "story-backend-utils";
import { ReloadAll } from "../../core/actions/app";

import {
  AllCoursesRequested,
  BuyCourseRequested
} from "../../core/actions/courses";
import { StudyGroupListRequested } from "../../core/actions/study_groups";
import { StateType } from "../../core/reducers";
import { CourseListing } from "./CourseListing";

type Props = (
  | { loaded: false }
  | {
      loaded: true;
      courseToStudyGroup: { [k: string]: string };
      courses: (CenturyTypes.Course & StoryTypes.StoryCourseFields)[];
      email: string;
      thumbnailMap: { [k: string]: string };
    }) & {
  reload: () => ReloadAll;
  buy: (courseId: string, token: string) => BuyCourseRequested;
};

export class HomeComponent extends React.Component<Props> {
  componentDidMount() {
    console.log("Mounted home");
    this.reload();
  }

  reload = () => {
    this.props.reload();
  };

  render(): JSX.Element {
    // if (this.props.user.state !== "LOADED") return <div>Loading...</div>;
    // const org = this.props.user.item.profile.groups.organisations.find(
    //   o => o.organisation === STORY_ORGANISATION_ID
    // );
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    const { email, courses, courseToStudyGroup, thumbnailMap } = this.props;
    return (
      <div className="app-content store">
        <div className="container">
          {courses.map(course => {
            const studyGroupId = courseToStudyGroup[course._id];
            return (
              <CourseListing
                key={course._id}
                course={course}
                reload={this.reload}
                email={email}
                thumbnail={thumbnailMap[studyGroupId]}
                studyGroupId={studyGroupId}
                buy={this.props.buy}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = (state: StateType) => {
  // TODO: Move to selector
  const courseKeys = Object.keys(state.courses.meta.LOADED);
  const courses: (CenturyTypes.Course & StoryTypes.StoryCourseFields)[] = [];
  for (const k of courseKeys) {
    if (k in state.courses.century.LOADED) {
      courses.push({
        ...state.courses.meta.LOADED[k],
        ...state.courses.century.LOADED[k]
      });
    }
  }

  // TODO: move to selector
  if (state.user.details.state !== "LOADED") {
    return { loaded: false };
  }

  // TODO: move to selector
  const courseToStudyGroup: { [course: string]: string } = {};
  for (const k of Object.keys(state.studyGroups.items.LOADED)) {
    courseToStudyGroup[state.studyGroups.items.LOADED[k].course] = k;
  }

  // TODO: move to selector
  const email = state.user.details.item.contact.emails[0].address;
  return {
    loaded: true,
    courseToStudyGroup,
    email,
    courses,
    thumbnailMap: state.studyGroups.thumbnails
  };
};

export const Home = connect(mapState, {
  reload: () => new ReloadAll(),
  buy: (courseId: string, token: string) =>
    new BuyCourseRequested(courseId, token)
})(HomeComponent);
