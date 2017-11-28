import * as React from "react";
import "./index.scss";
import { Home } from "../ClassListingPage";
import { Switch, Route } from "react-router";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { AppHeader } from "./header";
import { AppFooter } from "./footer";
import { startApp } from "../../core/actions/app";
import { connect } from "react-redux";

export class AppComponent extends React.Component<{ startApp: () => any }, {}> {
  componentDidMount() {
    this.props.startApp();
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

export const App = connect(() => ({}), {
  startApp
})(AppComponent);
