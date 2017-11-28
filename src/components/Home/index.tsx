import * as React from "react";
import { connect } from "react-redux";
import { requestAllClasses } from "../../core/actions/classes";

export class HomeComponent extends React.Component<{
  to?: string;
  requestAllClasses: () => any;
}> {
  render(): JSX.Element {
    return (
      <div>
        <div>This is the home page!</div>
        <button onClick={() => this.props.requestAllClasses()}>
          Click me!
        </button>
      </div>
    );
  }
}

export const Home = connect(state => ({}), {
  requestAllClasses
})(HomeComponent);
