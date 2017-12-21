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

export class AppComponent extends React.Component<
  {
    requestUser: () => any;
    user: userReducer.StateType;
  },
  {}
> {
  componentDidMount() {
    this.props.requestUser();
  }

  render() {
    return (
      <div className="app-container">
        <div className="header">
          <AppHeader />
        </div>
        <Container className="content">
          <Switch>
            <Route path="/page1" component={Home} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
        <div className="footer">
          <AppFooter />
        </div>
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
