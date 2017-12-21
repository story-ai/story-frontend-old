import { StateType } from "../../core/reducers";
import * as React from "react";
import { connect } from "react-redux";
import { requestAllClasses } from "../../core/actions/classes";
import { Map, StoryTypes } from "story-backend-utils";
import { LoadableMap } from "../../core/reducers/types/Loadable";
import { ClassListing } from "./ClassListing";
import { requestStudyGroupList } from "../../core/actions/study_groups";

export class HomeComponent extends React.Component<{
  classes: string[];
  requestAllClasses: () => any;
  requestStudyGroupList: () => any;
}> {
  componentDidMount() {
    this.reload();
  }

  reload = () => {
    this.props.requestAllClasses();
    this.props.requestStudyGroupList();
  };

  render(): JSX.Element {
    return (
      <div>
        {this.props.classes.map(id => <ClassListing key={id} id={id} />)}
      </div>
    );
  }
}

export const Home = connect(
  (state: StateType) => ({
    classes: Object.keys(state.classes.LOADED)
  }),
  {
    requestAllClasses,
    requestStudyGroupList
  }
)(HomeComponent);
