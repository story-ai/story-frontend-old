import * as React from "react";
import "./index.scss";
import { Home } from "../ClassListingPage";
import { Switch, Route } from "react-router";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { AppHeader } from "./header";
import { AppFooter } from "./footer";
import { connect } from "react-redux";

export class AppComponent extends React.Component<{ startApp: () => any }, {}> {
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

export const App = connect(() => ({}), {})(AppComponent);
