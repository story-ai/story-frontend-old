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
  token: string | undefined;
}> = props => {
  const { token } = props;
  console.log("Here is the token", token);
  let content;
  if (props.token) {
    content = <App />;
  } else {
    content = <AuthRoutes />;
  }

  return <BrowserRouter>{content}</BrowserRouter>;
};

export default connect((state: StateType) => ({
  token: state.auth.token
}))(RootComponent);
