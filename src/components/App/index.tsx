import * as React from "react";
import "./index.scss";
import { Home } from "../Home";
import { Switch, Route } from "react-router";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { AppHeader } from "./header";
import { AppFooter } from "./footer";

export const App: React.StatelessComponent<{}> = () => {
  return (
    <div className="app-container">
      <div className="header">
        <AppHeader />
      </div>
      <Container className="content">
        <Switch>
          <Route path="/page2" render={() => <Home to="page 2" />} />
          <Route path="/" component={Home} />
        </Switch>
      </Container>
      <div className="footer">
        <AppFooter />
      </div>
    </div>
  );
};
