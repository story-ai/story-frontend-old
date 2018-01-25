// ==== Node Modules
import * as React from "react";
import { connect, Provider } from "react-redux";
import { Switch, Route, Link, Redirect, BrowserRouter } from "react-router-dom";
import { StateType } from "../core/reducers";

// ==== Local Files
import "../css/style.scss";
import { AuthRoutes } from "./Auth";
import { App } from "./App";
import { Store } from "redux";

export const RootComponent: React.StatelessComponent<{
  token: string | null;
}> = props => {
  const { token } = props;
  let content;
  if (props.token === null) {
    content = <AuthRoutes />;
  } else {
    content = <App />;
  }

  return <BrowserRouter>{content}</BrowserRouter>;
};

export default connect((state: StateType) => ({
  token: state.auth.token
}))(RootComponent);
