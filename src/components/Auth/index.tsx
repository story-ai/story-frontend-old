import "./index.scss";
import * as React from "react";
import { ReactElement } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { RegistrationForm } from "./RegistrationForm";
import { LoginForm } from "./LoginForm";

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
          <a href="https://story-ai.com">Story</a>
        </div>
        <div>
          <a href="https://century.tech">Powered by CENTURY Tech</a>
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
        <Route exact path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </AuthPage>
  );
};
