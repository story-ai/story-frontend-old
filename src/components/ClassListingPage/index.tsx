import { StateType } from "../../core/reducers";
import * as React from "react";
import { connect } from "react-redux";
import { AllCoursesRequested } from "../../core/actions/courses";

import { requestAllClasses } from "../../core/actions/classes";
import { Map, StoryTypes, CenturyTypes } from "story-backend-utils";
import { LoadableMap, Loadable } from "../../core/reducers/types/Loadable";
import { ClassListing } from "./ClassListing";
import { requestStudyGroupList } from "../../core/actions/study_groups";
import { STORY_ORGANISATION_ID } from "../../config";
import "./index.scss";

export class HomeComponent extends React.Component<{
  classes: string[];
  user: Loadable<CenturyTypes.User>;
  requestAllCourses: () => AllCoursesRequested;
  requestStudyGroupList: () => any;
}> {
  componentDidMount() {
    this.reload();
  }

  reload = () => {
    this.props.requestAllCourses();
    this.props.requestStudyGroupList();
  };

  render(): JSX.Element {
    if (this.props.user.state !== "LOADED") return <div>Loading...</div>;
    const org = this.props.user.item.profile.groups.organisations.find(
      o => o.organisation === STORY_ORGANISATION_ID
    );
    if (org === undefined) {
      console.error("Could not find the story organisation");
      return <div>An error occurred. Sorry!</div>;
    }
    return (
      <div className="app-content store">
        <div className="container">
          {this.props.classes.map(id => (
            <ClassListing
              key={id}
              id={id}
              reload={this.reload}
              owned={org.classes.indexOf(id) >= 0}
            />
          ))}
        </div>
      </div>
    );
  }
}

export const Home = connect(
  (state: StateType) => ({
    user: state.user,
    classes: Object.keys(state.classes.LOADED)
  }),
  {
    requestAllCourses: () => new AllCoursesRequested(),
    requestStudyGroupList
  }
)(HomeComponent);
