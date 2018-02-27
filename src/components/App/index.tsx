import "./index.scss";

import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from "react-router";

import { UserRequested } from "../../core/actions/user";
import { StateType } from "../../core/reducers";
import * as userReducer from "../../core/reducers/user";
import { Home } from "../ClassListingPage";
import { AppFooter } from "./footer";
import { AppHeader } from "./header";
import { i18n } from "../../strings/i18n";

const Head = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{i18n`Page Title`}</title>
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
