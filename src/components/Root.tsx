// ==== Node Modules
import * as React from "react";
import { connect, Provider } from "react-redux";
import { StateType } from "../core/reducers";

// ==== Local Files
import "../css/style.scss";
import { AuthRoutes } from "./Auth";
import { App } from "./App";
import { Store } from "redux";
import { withRouter, RouteComponentProps } from "react-router";

export const RootComponent: React.StatelessComponent<
  {
    token: string | undefined;
  } & RouteComponentProps<{}>
> = props => {
  const { token } = props;
  let content;
  if (props.token) {
    content = <App />;
  } else {
    content = <AuthRoutes />;
  }
  return content;
};

export default withRouter(
  connect((state: StateType) => ({
    token: state.auth.token
  }))(RootComponent)
);
