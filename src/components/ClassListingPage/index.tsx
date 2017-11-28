import { StateType } from "../../core/reducers";
import * as React from "react";
import { connect } from "react-redux";
import { requestAllClasses } from "../../core/actions/classes";
import { Map, StoryTypes } from "story-backend-utils";
import { LoadableMap } from "../../core/reducers/types/Loadable";
import { ClassListing } from "./ClassListing";

export class HomeComponent extends React.Component<{
  classes: string[];
  requestAllClasses: () => any;
}> {
  componentDidMount() {
    this.reload();
  }

  reload = () => {
    this.props.requestAllClasses();
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
    requestAllClasses
  }
)(HomeComponent);
