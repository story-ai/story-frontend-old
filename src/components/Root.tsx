// ==== Node Modules
import * as React from "react";
import { connect, Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Link } from "react-router-dom";
import { StateType } from "../core/reducers";

// ==== Local Files
import "../css/style.scss";
import { LoginPage } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { App } from "./App";

const RoutesComponent: React.StatelessComponent<{
  token: string | null;
}> = ({ token }) => {
  const loggedInRoutes = <Route component={App} />;
  const loggedOutRoutes = (
    <Switch>
      <Route path="/register" component={RegisterForm} />
      <Route component={LoginPage} />
    </Switch>
  );

  return (
    <BrowserRouter>
      {token === null ? loggedOutRoutes : loggedInRoutes}
    </BrowserRouter>
  );
};

const Routes = connect((state: StateType) => ({ token: state.auth.token }))(
  RoutesComponent
);

export default class Root extends React.Component<{ store: any }, {}> {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
