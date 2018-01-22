import * as React from "react";
import { StateType } from "../../core/reducers";
import "./index.scss";
import { Home } from "../ClassListingPage";
import { Switch, Route } from "react-router";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { AppHeader } from "./header";
import { AppFooter } from "./footer";
import { connect } from "react-redux";
import { requestUser } from "../../core/actions/user";
import { CenturyTypes } from "story-backend-utils";
import * as userReducer from "../../core/reducers/user";

import { Helmet } from "react-helmet";

const Head = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Story</title>
  </Helmet>
);

export class AppComponent extends React.Component<
  {
    requestUser: () => any;
    user: userReducer.StateType;
  },
  {}
> {
  // TODO: I feel like we should be kicking off epics outside the component
  componentDidMount() {
    this.props.requestUser();
  }

  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
        <div className="footer">
          <AppFooter />
        </div>

        <Head />
      </div>
    );
  }
}

export const App = connect(
  (state: StateType) => ({
    user: state.user
  }),
  {
    requestUser
  }
)(AppComponent);
