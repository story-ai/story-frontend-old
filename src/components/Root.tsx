// ==== Node Modules
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Link } from "react-router-dom";

// ==== Local Files
import "../css/style.scss";
import { LoginForm, LogoutPage } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { App } from "./App";

export default class Root extends React.Component<{ store: any }, {}> {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={LogoutPage} />
            <Route component={App} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
