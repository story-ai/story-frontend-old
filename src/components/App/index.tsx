import * as React from "react";
import { StateType } from "../../core/reducers";
import "./index.scss";
import { Home } from "../ClassListingPage";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
  Redirect
} from "react-router";
import { AppHeader } from "./header";
import { AppFooter } from "./footer";
import { connect } from "react-redux";
import { UserRequested } from "../../core/actions/user";
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
    requestUser: () => UserRequested;
    user: userReducer.StateType;
  } & RouteComponentProps<{}>,
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
          <Route
            path="/login"
            component={(props: RouteComponentProps<{}>) => {
              const match = props.location.search.match("redirect=([^&]*)");
              if (match) {
                const redirect = match[1];
                return <Redirect to={match[1]} />;
              }
              return <Redirect to="/" />;
            }}
          />
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

export const App = withRouter(
  connect(
    (state: StateType) => ({
      user: state.user
    }),
    {
      requestUser: () => new UserRequested()
    }
  )(AppComponent)
);
