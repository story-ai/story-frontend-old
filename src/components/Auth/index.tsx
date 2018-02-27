import "./index.scss";

import * as React from "react";
import { ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";
import { i18n } from "../../strings/i18n";

export const AuthPage: React.StatelessComponent<{
  children?: ReactElement<any>;
}> = props => {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="row">
          <div className="logo">
            <div />
          </div>
          {props.children}
        </div>
      </div>
      <div className="auth-footer">
        <div>
          <a href="https://story-ai.com">{i18n`Auth Page Story Link Text`}</a>
        </div>
        <div>
          <a href="https://century.tech">{i18n`Auth Page CENTURY Link Text`}</a>
        </div>
      </div>
    </div>
  );
};

export const AuthRoutes = () => {
  return (
    <AuthPage>
      <Switch>
        <Route path="/register" component={RegistrationForm} />
        <Route path="/login" component={LoginForm} />
        <Route
          render={({ location }) => (
            <Redirect to={`/login?redirect=${location.pathname}`} />
          )}
        />
      </Switch>
    </AuthPage>
  );
};
