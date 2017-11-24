import * as React from "react";
import { connect } from "react-redux";
import { ping } from "../../core/actions/ping";
import { requestAllClasses } from "../../core/actions/materials";

export class HomeComponent extends React.Component<{
  to?: string;
  requestAllClasses: () => any;
  ping: () => any;
}> {
  render(): JSX.Element {
    return (
      <div>
        <div>This is the home page!</div>
        <button onClick={() => this.props.requestAllClasses()}>
          Click me!
        </button>
        <button onClick={() => this.props.ping()}>Ping me!</button>
      </div>
    );
  }
}

export const Home = connect(state => ({}), {
  ping,
  requestAllClasses
})(HomeComponent);
